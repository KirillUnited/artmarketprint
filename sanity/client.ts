import { createClient, QueryParams } from 'next-sanity';

export const client = createClient({
    projectId: 'p5q8f9ac',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: true,
});
export async function sanityFetch<const QueryString extends string>({
    query,
    params = {},
    revalidate = 60, // default revalidation time in seconds
    tags = [],
  }: {
    query: QueryString
    params?: QueryParams
    revalidate?: number | false
    tags?: string[]
  }) {
    return client.fetch(query, params, {
      next: {
        revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
        tags, // for tag-based revalidation
      },
    })
  }