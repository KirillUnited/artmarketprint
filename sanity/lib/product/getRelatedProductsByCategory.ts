import { defineQuery } from 'next-sanity';

import { sanityFetch } from '@/sanity/lib/sanityFetch';

/**
 * Fetches a list of related products from Sanity that belong to the same category
 * as the product with the given `currentProductId`.
 *
 * @param {string} category - The category slug
 * @param {string} currentProductId - The ID of the current product
 * @param {number} [limit=9] - The maximum number of related products to fetch
 * @returns {Promise<Product[]>} A promise that resolves to an array of related products
 */
export default async function getRelatedProductsByCategory(category: string, currentProductId: string, limit: number = 9) {
    const RELATED_PRODUCTS_QUERY = defineQuery(`*[
        _type == "product" && 
        category == $category && 
        _id != $currentProductId
    ][0...$limit]`);

    try {
        const relatedProducts = await sanityFetch({
            query: RELATED_PRODUCTS_QUERY,
            params: { category, currentProductId, limit: limit - 1 }
        });

        return relatedProducts ?? [];
    } catch (error) {
        console.error('Error fetching related products:', error);

        return [];
    }
}