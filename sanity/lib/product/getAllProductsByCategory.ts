import { defineQuery } from 'next-sanity';

import { sanityFetch } from '@/sanity/lib/sanityFetch';

/**
 * Fetches all products by category from Sanity.
 *
 * @param {string} category - The category name (slug).
 *
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 */
export async function getAllProductsByCategory(category: string) {
    const ALL_PRODUCTS_BY_CATEGORY_QUERY = defineQuery('*[_type == "product" && category == $category]');

    try {
        const products = await sanityFetch({query: ALL_PRODUCTS_BY_CATEGORY_QUERY, params: { category }});

        return products ?? [];
    } catch (error) {
        console.error('Error fetching products by category:', error);

        return [];
    }
}