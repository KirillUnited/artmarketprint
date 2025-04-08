import type { SanityDocument } from 'next-sanity';

import { client } from '@/sanity/client';
import { SERVICES_QUERY } from '@/sanity/lib/queries';

const options = { next: { revalidate: 30 } };

export async function getSanityDocuments(QUERY = SERVICES_QUERY, params={}) {
  try {
    return await client.fetch<SanityDocument[]>(QUERY, params, options);
  } catch (error) {
    console.error('Error fetching Sanity documents:', error);

    return [];
  }
}