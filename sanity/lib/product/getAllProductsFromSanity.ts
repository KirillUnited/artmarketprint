import { defineQuery } from 'next-sanity';

import { sanityFetch } from "@/sanity/lib/sanityFetch";

/**
 * Fetches all products from Sanity.
 *
 * @return {Promise<any[]>} A promise that resolves to an array of products.
 */
export async function getAllProductsFromSanity(): Promise<any[]> {
    /**
     * The GROQ query to fetch all products from Sanity ordered by name ascending.
     * The `*[_type == "product"]` syntax tells Sanity to fetch all documents of type `product`.
     * The `| order(name asc)` syntax tells Sanity to order the results by the `name` field in ascending order.
     */
    const ALL_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && stock > 30]{
        id,
        brand,
        category,
        subcategory,
        colors,
        sizes,
        name,
        price,
        image,
        items,
        "total": count(*[_type == "product"])
        }`);

    try {
        // Fetch the products from Sanity using the client.fetch() method
        const products = await sanityFetch({query: ALL_PRODUCTS_QUERY});

        // Return the list of products or an empty array if not available
        return products ?? [];
    } catch (error) {
        // Log any errors that occur while fetching the products to the console
        console.error('Error fetching products:', error);

        // Return an empty array if there was an error
        return [];
    }
}