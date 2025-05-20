import { defineQuery } from 'next-sanity';

import { sanityFetch } from '@/sanity/lib/sanityFetch';

/**
 * Fetches a product by its slug from Sanity.
 *
 * @param {string} slug - The slug of the product to fetch.
 *
 * @returns {Promise<any>} A promise that resolves to the product document if available, or an empty array if not.
 */
export default async function getProductBySlug(slug: string) {
    const PRODUCT_BY_SLUG = defineQuery('*[_type == "product" && _id == $slug]');

    try {
        const product = await sanityFetch({query: PRODUCT_BY_SLUG, params: { slug }});

        return product[0] ?? [];
    } catch (error) {
        console.error('Error fetching product by slug:', error);

        return [];
    }
}