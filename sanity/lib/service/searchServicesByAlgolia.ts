import type { SearchResponse } from '@algolia/client-search';

import { createAlgoliaSearchClient } from '@/lib/algolia-client';

export type ServiceSearchItem = {
  objectID: string;
  title?: string;
  slug?: string;
  description?: string;
  price?: string;
  imageUrl?: string;
};

type ServiceSearchResult = {
  services: ServiceSearchItem[];
  totalFound: number;
};

const getServicesIndexName = () =>
  process.env.NEXT_PUBLIC_ALGOLIA_SERVICES_INDEX || 'services';

const hasAlgoliaSearchConfig = () =>
  Boolean(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID && process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY);

export async function searchServicesByAlgolia(
  query: string,
  hitsPerPage = 6
): Promise<ServiceSearchResult> {
  if (!hasAlgoliaSearchConfig()) {
    return { services: [], totalFound: 0 };
  }

  const client = createAlgoliaSearchClient();
  const response: SearchResponse<ServiceSearchItem> = await client.searchSingleIndex<ServiceSearchItem>({
    indexName: getServicesIndexName(),
    searchParams: {
      query,
      page: 0,
      hitsPerPage,
      typoTolerance: true,
      removeStopWords: ['ru'],
    },
  });

  return {
    services: Array.isArray(response.hits) ? response.hits : [],
    totalFound: typeof response.nbHits === 'number' ? response.nbHits : 0,
  };
}
