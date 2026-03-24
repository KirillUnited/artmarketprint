import { algoliasearch } from 'algoliasearch';
import { generateImageUrlForAlgolia } from '../../lib/image-utils';

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

// Function to transform Sanity service document to Algolia record
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
    slug: service.slug?.current || service.slug,
    description: truncatedDescription,
    price: service.price,
    imageUrl: imageUrl,
    publishedAt: service.publishedAt,
  };
}

// Sync function to handle CREATE/UPDATE/DELETE operations
export async function syncServiceToAlgolia(document: any, operation: 'create' | 'update' | 'delete') {
  try {
    // Ignore drafts
    if (document._id.startsWith('drafts.')) {
      console.log('Ignoring draft document:', document._id);
      return;
    }

    const objectId = document._id.replace('drafts.', '');

    if (operation === 'delete') {
      // Remove object from Algolia
      console.log('Removing service from Algolia:', objectId);
      await algoliaClient.deleteObject({
        indexName: ALGOLIA_SERVICES_INDEX,
        objectID: objectId,
      });
      console.log('Successfully removed service from Algolia:', objectId);
    } else {
      // For CREATE/UPDATE operations, upsert the object
      console.log('Upserting service to Algolia:', objectId);

      // Transform the document for Algolia
      const algoliaRecord = await transformServiceForAlgolia(document);

      // Save object to Algolia
      await algoliaClient.saveObject({
        indexName: ALGOLIA_SERVICES_INDEX,
        body: algoliaRecord,
      });
      console.log('Successfully upserted service to Algolia:', objectId);
    }
  } catch (error) {
    console.error('Error syncing service to Algolia:', error);
    throw error;
  }
}