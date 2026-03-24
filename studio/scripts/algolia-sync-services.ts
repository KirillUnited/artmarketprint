import { createClient } from '@sanity/client';
import { algoliasearch } from 'algoliasearch';
import dotenv from 'dotenv';
import { generateImageUrlForAlgolia } from '../../lib/image-utils';

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

// Algolia client configuration (algoliasearch v5)
const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_ADMIN_KEY || ''
);

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

// Run the sync if this file is executed directly
if (require.main === module) {
  syncServicesToAlgolia();
}

export { syncServicesToAlgolia, transformServiceForAlgolia };