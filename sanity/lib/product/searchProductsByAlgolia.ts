import type { SearchResponse } from '@algolia/client-search';

import type { ProductData } from '@/components/shared/product/product.types';
import { createAlgoliaSearchClient } from '@/lib/algolia-client';
import { pickRelevantImageForQuery } from '@/lib/search/relevant-image';
import { SEARCH_CONFIG, SEARCH_PARAMETERS, RUSSIAN_SEARCH_CONFIG } from '@/lib/search-config';
import { searchProductsByName } from '@/sanity/lib/product/searchProductsByName';

type AlgoliaProductHit = {
  objectID: string;
  id?: string | number;
  name?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  sku?: string;
  brand?: string;
  price?: number | string;
  stock?: number | string;
  materials?: string[];
  colors?: string[];
  galleryImages?: string[];
  variantImagesByColor?: Record<string, string>;
  sizes?: string[];
  imageUrl?: string;
  url?: string;
  updatedAt?: string;
};

type AlgoliaSearchResult = {
  products: ProductData[];
  totalFound: number;
  totalPages: number;
  currentPage: number;
};

type SearchProductsOptions = {
  sort?: string | null;
  material?: string | null;
  color?: string | null;
};

const DEFAULT_IMAGE = '/images/product-no-image.jpg';

const getAlgoliaIndexName = () =>
  process.env.NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX || SEARCH_CONFIG.INDEX_NAME;

const hasAlgoliaSearchConfig = () =>
  Boolean(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID && process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY);

const mapAlgoliaHitToProduct = (hit: AlgoliaProductHit, searchQuery: string): ProductData => {
  const relevantImage = pickRelevantImageForQuery(hit, searchQuery);
  const image = typeof relevantImage === 'string' && relevantImage.trim() !== '' ? relevantImage : DEFAULT_IMAGE;
  const id = String(hit.id ?? hit.objectID ?? '');
  const price =
    typeof hit.price === 'number'
      ? hit.price
      : typeof hit.price === 'string'
        ? Number(hit.price) || 0
        : 0;
  const stock =
    typeof hit.stock === 'number'
      ? String(hit.stock)
      : typeof hit.stock === 'string'
        ? hit.stock
        : '';

  return {
    _id: String(hit.objectID ?? id),
    id,
    name: hit.name ?? '',
    price,
    image,
    images: [],
    images_urls: image,
    description: hit.description ?? '',
    variation_description: '',
    category: hit.category ?? '',
    subcategory: hit.subcategory ?? '',
    colors: Array.isArray(hit.colors) ? hit.colors : [],
    materials: Array.isArray(hit.materials) ? hit.materials : [],
    sizes: Array.isArray(hit.sizes) ? hit.sizes : [],
    quantity: 0,
    items: [],
    stock,
    sku: hit.sku ?? '',
    brand: hit.brand ?? '',
  };
};

const normalizeToken = (value?: string | null) =>
  typeof value === 'string' ? value.trim().toLowerCase() : '';

const includesToken = (arr: string[] | undefined, value: string) =>
  Array.isArray(arr) && arr.some((item) => item.toLowerCase() === value);

const applyProductFilters = (products: ProductData[], options: SearchProductsOptions) => {
  const material = normalizeToken(options.material);
  const color = normalizeToken(options.color);

  return products.filter((product) => {
    const materialPass = material === '' || includesToken(product.materials, material);
    const colorPass = color === '' || includesToken(product.colors, color);
    return materialPass && colorPass;
  });
};

const applyProductSort = (products: ProductData[], sort?: string | null) => {
  if (sort === 'price-asc') return [...products].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') return [...products].sort((a, b) => b.price - a.price);
  return products;
};

const runAlgoliaSearch = async (
  query: string,
  page: number,
  hitsPerPage: number,
): Promise<SearchResponse<AlgoliaProductHit>> => {
  const client = createAlgoliaSearchClient();
  const indexName = getAlgoliaIndexName();

  return client.searchSingleIndex<AlgoliaProductHit>({
    indexName,
    searchParams: {
      query,
      page: Math.max(0, page - 1),
      hitsPerPage,
      // Apply Russian language optimizations
      ...SEARCH_PARAMETERS,
      ...RUSSIAN_SEARCH_CONFIG.queryParameters,
      // Boost exact matches and word forms
      optionalWords: query,
      // Handle different word forms
      alternativesAsExact: ['ignorePlurals', 'singleWordSynonym', 'multiWordsSynonym'],
      // Improve typo tolerance for Russian
      typoTolerance: 'min',
      // Remove stop words for better Russian search
      removeStopWords: ['ru'],
    },
  });
};

export async function searchProductsByAlgolia(
  searchParam: string,
  page: number,
  hitsPerPage: number = SEARCH_CONFIG.HITS_PER_PAGE,
  options: SearchProductsOptions = {},
): Promise<AlgoliaSearchResult> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const hasDynamicFilters = Boolean(normalizeToken(options.material) || normalizeToken(options.color) || options.sort);

  if (!hasAlgoliaSearchConfig()) {
    console.warn('Algolia search is not configured. Falling back to Sanity search.');
    const products = await searchProductsByName(searchParam);
    const filtered = applyProductSort(
      applyProductFilters((Array.isArray(products) ? products : []) as ProductData[], options),
      options.sort
    );
    const totalFound = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalFound / hitsPerPage));
    const pageToUse = Math.min(safePage, totalPages);
    const start = (pageToUse - 1) * hitsPerPage;

    return {
      products: filtered.slice(start, start + hitsPerPage),
      totalFound,
      totalPages,
      currentPage: pageToUse,
    };
  }

  if (!hasDynamicFilters) {
    const response = await runAlgoliaSearch(searchParam, safePage, hitsPerPage);
    const totalFound = typeof response.nbHits === 'number' ? response.nbHits : 0;
    const totalPages = typeof response.nbPages === 'number' ? response.nbPages : 0;

    if (totalPages > 0 && safePage > totalPages) {
      const fallbackResponse = await runAlgoliaSearch(searchParam, totalPages, hitsPerPage);
      return {
        products: fallbackResponse.hits.map((hit) => mapAlgoliaHitToProduct(hit, searchParam)),
        totalFound,
        totalPages,
        currentPage: totalPages,
      };
    }

    return {
      products: response.hits.map((hit) => mapAlgoliaHitToProduct(hit, searchParam)),
      totalFound,
      totalPages,
      currentPage: safePage,
    };
  }

  const firstPage = await runAlgoliaSearch(searchParam, 1, 1000);
  const allHits = [...firstPage.hits];
  const totalAlgoliaPages = typeof firstPage.nbPages === 'number' ? firstPage.nbPages : 0;

  for (let p = 2; p <= totalAlgoliaPages; p += 1) {
    const pageResponse = await runAlgoliaSearch(searchParam, p, 1000);
    allHits.push(...pageResponse.hits);
  }

  const allProducts = allHits.map((hit) => mapAlgoliaHitToProduct(hit, searchParam));
  const filtered = applyProductSort(applyProductFilters(allProducts, options), options.sort);
  const totalFound = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalFound / hitsPerPage));
  const pageToUse = Math.min(safePage, totalPages);
  const start = (pageToUse - 1) * hitsPerPage;

  return {
    products: filtered.slice(start, start + hitsPerPage),
    totalFound,
    totalPages,
    currentPage: pageToUse,
  };
}
