// Algolia client configuration (algoliasearch v5 — use the named `algoliasearch` factory)
import { algoliasearch } from 'algoliasearch';

// Create Algolia client for server-side operations
export const createAlgoliaAdminClient = () => {
  return algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
    process.env.ALGOLIA_ADMIN_KEY || ''
  );
};

// Create Algolia client for client-side search
export const createAlgoliaSearchClient = () => {
  return algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''
  );
};