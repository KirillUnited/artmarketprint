import { CATEGORIES_QUERY } from "../queries/category.query";
import { sanityFetch } from "@/sanity/lib/sanityFetch";

/**
 * Retrieves a list of unique product categories from the available products.
 *
 * @return {Promise<string[]>} A promise that resolves to an array of unique product categories
 */
export async function getAllProductCategories(): Promise<string[]> {
    try {
        // Fetch all categories from Sanity
        const categories = await sanityFetch({ query: CATEGORIES_QUERY });

        // Return an array of category names
        return categories.map((category: any) => category.title);
    } catch (error) {
        // Log any errors that occur while fetching the categories to the console
        console.error('Error fetching categories:', error);
        // Return an empty array if there was an error
        return [];
    }
}
