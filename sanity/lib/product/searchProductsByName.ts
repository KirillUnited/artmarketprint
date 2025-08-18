import { defineQuery } from 'next-sanity';

import { sanityFetch } from '@/sanity/lib/sanityFetch';

/**
 * Searches for products by name and returns the result.
 * @param searchParam {string} The search parameter to use for the query.
 * @returns {Promise<any[]>} A promise that resolves to an array of products that match the search parameter.
 */
export async function searchProductsByName(searchParam: string): Promise<any[]> {
    const PRODUCT_SEARCH_QUERY = defineQuery(
        /**
         * The GROQ query to search for products by name.
         * The `name match` operator is used to search for products that start with the search parameter.
         * The `*` character is used as a wildcard to match any characters after the search parameter.
         */
        `*[_type == "product" && (
            name match $searchParam + "*" ||
            description match $searchParam + "*" ||
            category match $searchParam + "*" ||
            subcategory match $searchParam + "*" ||
            tags[]->name match $searchParam + "*"
        )] | score(
            name match $searchParam + "*" ||
            description match $searchParam + "*" ||
            category match $searchParam + "*" ||
            subcategory match $searchParam + "*" ||
            tags[]->name match $searchParam + "*"
        ) | order(_score desc) {
            ...,
            "currentSlug": slug.current
        }`
    );

    try {
        // Fetch the products from Sanity using the client.fetch() method
        const products = await sanityFetch({
            query: PRODUCT_SEARCH_QUERY,
            params: {
                searchParam
            }
        });

        // Return the list of products or an empty array if not available
        return products ?? [];
    } catch (error) {
        // Log any errors that occur while fetching the products to the console
        console.error('Error fetching products by name:', error);

        // Return an empty array if there was an error
        return [];
    }
}
