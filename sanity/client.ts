import { createClient } from 'next-sanity';

export const client = createClient({
    projectId: 'p5q8f9ac',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
});