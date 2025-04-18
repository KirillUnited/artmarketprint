import { defineQuery } from 'next-sanity';
import { getSanityDocuments } from '../fetch-sanity-data';

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
    const ALL_PRODUCTS_QUERY = defineQuery(`*[_type == "product"][0...5000] | order(name asc)`);

    try {
        // Fetch the products from Sanity using the client.fetch() method
        const products = await getSanityDocuments(ALL_PRODUCTS_QUERY);

        console.log("Products", products);

        // Return the list of products or an empty array if not available
        return products ?? [];
    } catch (error) {
        // Log any errors that occur while fetching the products to the console
        console.error('Error fetching products:', error);
        // Return an empty array if there was an error
        return [];
    }
}