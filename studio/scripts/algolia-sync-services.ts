import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { algoliasearch } from 'algoliasearch';
import dotenv from 'dotenv';

// Load env the same way as local Next.js: `.env` then `.env.local` (local overrides).
// `dotenv.config()` alone only reads `.env`, so values only in `.env.local` were missing.
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';
const sanityToken =
  process.env.SANITY_API_TOKEN?.trim() ||
  process.env.NEXT_PUBLIC_SANITY_TOKEN?.trim() ||
  '';

if (!sanityProjectId) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to `.env.local` (or `.env`) and run the sync again.'
  );
}

// Sanity client configuration
const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  token: sanityToken,
  useCdn: false,
  apiVersion: '2024-01-01',
});

const ALGOLIA_SERVICES_INDEX = 'services';
const ALGOLIA_PRODUCTS_INDEX = 'products';
const imageBuilder = createImageUrlBuilder({
  projectId: sanityProjectId,
  dataset: sanityDataset,
});

// Algolia client configuration (algoliasearch v5)
const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_ADMIN_KEY || ''
);

function generateImageUrlForAlgolia(image: any): string | undefined {
  if (!image) return undefined;

  try {
    return imageBuilder
      .image(image)
      .format('webp')
      .fit('crop')
      .width(400)
      .height(400)
      .quality(80)
      .url();
  } catch (error) {
    console.warn('Failed to generate image URL for Algolia:', error);
    return undefined;
  }
}

// Define the service type for Algolia
type ServiceAlgoliaRecord = {
  objectID: string;
  title: string;
  slug: string;
  description?: string;
  price?: string;
  imageUrl?: string;
  publishedAt?: string;
};

type ProductAlgoliaRecord = {
  objectID: string;
  id: string;
  name: string;
  description?: string;
  category?: string;
  subcategory?: string;
  sku?: string;
  brand?: string;
  price?: number;
  stock?: number;
  materials?: string[];
  colors?: string[];
  dominantColors?: string[];
  galleryImages?: string[];
  variantImagesByColor?: Record<string, string>;
  searchImageHints?: string[];
  sizes?: string[];
  imageUrl?: string;
  url: string;
  updatedAt?: string;
};

// GROQ query to fetch services
const SERVICES_QUERY = `*[_type == "service" && defined(slug.current) && !(_id in path("drafts.**"))]{
  _id,
  title,
  "slug": slug.current,
  description,
  price,
  image,
  publishedAt
}`;

const PRODUCTS_QUERY = `*[_type == "product" && defined(id) && !(_id in path("drafts.**"))]{
  _id,
  id,
  name,
  description,
  category,
  subcategory,
  sku,
  brand,
  price,
  stock,
  materials,
  colors,
  sizes,
  image,
  "imagePalette": image.asset->metadata.palette,
  items[]{
    color,
    images_urls,
    cover
  },
  images_urls,
  _updatedAt
}`;

async function transformServiceForAlgolia(service: any): Promise<ServiceAlgoliaRecord> {
  // Truncate description to ~200 characters
  let truncatedDescription: string | undefined;
  if (service.description) {
    truncatedDescription = service.description.length > 200
      ? service.description.substring(0, 200) + '...'
      : service.description;
  }

  // Generate image URL if image exists
  const imageUrl = generateImageUrlForAlgolia(service.image);

  return {
    objectID: service._id,
    title: service.title,
    slug: service.slug,
    description: truncatedDescription,
    price: service.price,
    imageUrl: imageUrl,
    publishedAt: service.publishedAt,
  };
}

function pickProductImage(product: any): string | undefined {
  if (typeof product.image === 'string' && product.image.trim() !== '') {
    return product.image;
  }

  if (Array.isArray(product.images_urls)) {
    const firstImage = product.images_urls.find((item: unknown) => typeof item === 'string' && item.trim() !== '');
    if (typeof firstImage === 'string') {
      return firstImage;
    }
  }

  return generateImageUrlForAlgolia(product.image);
}

function normalizeStock(stock: unknown): number | undefined {
  if (typeof stock === 'number' && Number.isFinite(stock)) {
    return stock;
  }

  if (typeof stock === 'string' && stock.trim() !== '') {
    const parsed = Number(stock);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function normalizeColorKey(value: string): string {
  return value.trim().toLowerCase().replaceAll('ё', 'е');
}

function toImageArray(value: unknown): string[] {
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');
  }

  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (typeof item === 'string') {
      return item
        .split(',')
        .map((img) => img.trim())
        .filter((img) => img !== '');
    }
    return [];
  });
}

function pickVariantImage(item: any): string | undefined {
  if (typeof item?.cover === 'string' && item.cover.trim() !== '') {
    return item.cover.trim();
  }

  const variantImages = toImageArray(item?.images_urls);
  return variantImages[0];
}

function getVariantImagesByColor(product: any): Record<string, string> {
  if (!Array.isArray(product?.items)) {
    return {};
  }

  const mapping: Record<string, string> = {};

  for (const item of product.items) {
    if (typeof item?.color !== 'string') {
      continue;
    }

    const key = normalizeColorKey(item.color);
    if (!key || mapping[key]) {
      continue;
    }

    const variantImage = pickVariantImage(item);
    if (variantImage) {
      mapping[key] = variantImage;
    }
  }

  return mapping;
}

function getGalleryImages(product: any, imageUrl?: string): string[] {
  const allImages = new Set<string>();

  if (imageUrl) {
    allImages.add(imageUrl);
  }

  if (typeof product?.image === 'string' && product.image.trim() !== '') {
    allImages.add(product.image.trim());
  }

  for (const image of toImageArray(product?.images_urls)) {
    allImages.add(image);
  }

  if (Array.isArray(product?.items)) {
    for (const item of product.items) {
      const variantImage = pickVariantImage(item);
      if (variantImage) {
        allImages.add(variantImage);
      }
    }
  }

  return Array.from(allImages);
}

async function transformProductForAlgolia(product: any): Promise<ProductAlgoliaRecord> {
  let truncatedDescription: string | undefined;
  if (typeof product.description === 'string' && product.description.trim() !== '') {
    truncatedDescription = product.description.length > 200
      ? product.description.substring(0, 200) + '...'
      : product.description;
  }

  const id = String(product.id || product._id);
  const imageUrl = pickProductImage(product);
  const variantImagesByColor = getVariantImagesByColor(product);
  const galleryImages = getGalleryImages(product, imageUrl);
  const searchImageHints = Array.from(
    new Set([
      ...Object.keys(variantImagesByColor),
      ...(Array.isArray(product.colors)
        ? product.colors
            .filter((color: unknown) => typeof color === 'string')
            .map((color: string) => normalizeColorKey(color))
        : []),
    ])
  );

  // Extract dominant colors from Sanity image palette
  const dominantColors: string[] = [];
  if (product.imagePalette) {
    const palette = product.imagePalette;
    const colorTypes = ['vibrant', 'darkVibrant', 'lightVibrant', 'muted', 'darkMuted', 'lightMuted', 'dominant'];
    
    for (const type of colorTypes) {
      if (palette[type] && palette[type].background) {
        dominantColors.push(palette[type].background.toUpperCase());
      }
    }
  }

  return {
    objectID: String(product._id),
    id,
    name: String(product.name || ''),
    description: truncatedDescription,
    category: typeof product.category === 'string' ? product.category : undefined,
    subcategory: typeof product.subcategory === 'string' ? product.subcategory : undefined,
    sku: typeof product.sku === 'string' ? product.sku : undefined,
    brand: typeof product.brand === 'string' ? product.brand : undefined,
    price: typeof product.price === 'number' ? product.price : Number(product.price) || undefined,
    stock: normalizeStock(product.stock),
    materials: Array.isArray(product.materials) ? product.materials : undefined,
    colors: Array.isArray(product.colors) ? product.colors : undefined,
    dominantColors: dominantColors.length > 0 ? Array.from(new Set(dominantColors)) : undefined,
    galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
    variantImagesByColor: Object.keys(variantImagesByColor).length > 0 ? variantImagesByColor : undefined,
    searchImageHints: searchImageHints.length > 0 ? searchImageHints : undefined,
    sizes: Array.isArray(product.sizes) ? product.sizes : undefined,
    imageUrl,
    url: `/products/${id}`,
    updatedAt: product._updatedAt,
  };
}

async function syncServicesToAlgolia() {
  try {
    console.log('Fetching services from Sanity...');

    // Fetch all services from Sanity
    const services = await sanityClient.fetch(SERVICES_QUERY);
    console.log(`Found ${services.length} services to sync`);

    // Transform services for Algolia
    const algoliaRecords: ServiceAlgoliaRecord[] = [];
    for (const service of services) {
      const algoliaRecord = await transformServiceForAlgolia(service);
      algoliaRecords.push(algoliaRecord);
    }

    // Clear existing objects in the index
    console.log('Clearing existing objects in Algolia index...');
    await algoliaClient.clearObjects({ indexName: ALGOLIA_SERVICES_INDEX });

    // Batch upload to Algolia
    console.log('Uploading services to Algolia...');
    const batchResponses = await algoliaClient.saveObjects({
      indexName: ALGOLIA_SERVICES_INDEX,
      objects: algoliaRecords,
      waitForTasks: true,
    });
    const objectIDs = batchResponses.flatMap((r) => r.objectIDs);

    console.log(`Successfully synced ${objectIDs.length} services to Algolia`);
  } catch (error) {
    console.error('Error syncing services to Algolia:', error);
    process.exit(1);
  }
}

async function syncProductsToAlgolia() {
  try {
    console.log('Fetching products from Sanity...');
    const products = await sanityClient.fetch(PRODUCTS_QUERY);
    console.log(`Found ${products.length} products to sync`);

    const algoliaRecords: ProductAlgoliaRecord[] = [];
    for (const product of products) {
      const algoliaRecord = await transformProductForAlgolia(product);
      algoliaRecords.push(algoliaRecord);
    }

    console.log('Clearing existing products in Algolia index...');
    await algoliaClient.clearObjects({ indexName: ALGOLIA_PRODUCTS_INDEX });

    // Configure index settings for Russian language support
    console.log('Configuring Algolia index settings for Russian language...');
    await algoliaClient.setSettings({
      indexName: ALGOLIA_PRODUCTS_INDEX,
      indexSettings: {
        // Enable proper Russian language processing
        indexLanguages: ['ru'],
        queryLanguages: ['ru'],
        // Configure search behavior for Russian
        searchableAttributes: [
          'unordered(name)',
          'unordered(description)',
          'unordered(colors)',
          'unordered(dominantColors)',
          'unordered(materials)',
          'unordered(category)',
          'unordered(subcategory)',
          'sku'
        ],
        attributesForFaceting: [
          'filterOnly(category)',
          'filterOnly(subcategory)',
          'filterOnly(materials)',
          'filterOnly(colors)',
          'filterOnly(dominantColors)',
          'searchable(brand)'
        ],
        // Configure ranking criteria
        ranking: [
          'words',
          'typo',
          'proximity',
          'attribute',
          'exact',
          'custom'
        ],
      }
    });

    // Add synonyms for common Russian word variations
    await algoliaClient.saveSynonyms({
      indexName: ALGOLIA_PRODUCTS_INDEX,
      replaceExistingSynonyms: true,
      synonymHit: [
        // Color variations
        { objectID: 'synonym-1', type: 'synonym', synonyms: ['красный', 'красная', 'красное', 'красные'] },
        { objectID: 'synonym-2', type: 'synonym', synonyms: ['синий', 'синяя', 'синее', 'синие'] },
        { objectID: 'synonym-3', type: 'synonym', synonyms: ['зеленый', 'зеленая', 'зеленое', 'зеленые'] },
        { objectID: 'synonym-4', type: 'synonym', synonyms: ['желтый', 'желтая', 'желтое', 'желтые'] },
        { objectID: 'synonym-5', type: 'synonym', synonyms: ['белый', 'белая', 'белое', 'белые'] },
        { objectID: 'synonym-6', type: 'synonym', synonyms: ['черный', 'черная', 'черное', 'черные'] },
        { objectID: 'synonym-7', type: 'synonym', synonyms: ['серый', 'серая', 'серое', 'серые'] },
        { objectID: 'synonym-8', type: 'synonym', synonyms: ['розовый', 'розовая', 'розовое', 'розовые'] },
        // Add more synonyms as needed for your product catalog
      ],
    });

    // Clear existing query rules (rules with automatic facet filters need placeholders in pattern)
    await algoliaClient.saveRules({
      indexName: ALGOLIA_PRODUCTS_INDEX,
      clearExistingRules: true,
      rules: [],
    });

    console.log('Uploading products to Algolia...');
    const batchResponses = await algoliaClient.saveObjects({
      indexName: ALGOLIA_PRODUCTS_INDEX,
      objects: algoliaRecords,
      waitForTasks: true,
    });
    const objectIDs = batchResponses.flatMap((r) => r.objectIDs);

    console.log(`Successfully synced ${objectIDs.length} products to Algolia`);
  } catch (error) {
    console.error('Error syncing products to Algolia:', error);
    process.exit(1);
  }
}

// Run the sync if this file is executed directly
const isDirectRun = process.argv[1]?.includes('algolia-sync-services.ts');
if (isDirectRun) {
  syncServicesToAlgolia();
}

export { syncProductsToAlgolia, syncServicesToAlgolia, transformProductForAlgolia, transformServiceForAlgolia };
