import { defineQuery } from "next-sanity";
import { getSanityDocuments } from "../fetch-sanity-data";

export async function getAllProductsByCategory(category: string) {
    const ALL_PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "product" && category == $category]`);
    try {
        const products = await getSanityDocuments(ALL_PRODUCTS_BY_CATEGORY_QUERY, { category });

        return products ?? [];
    } catch (error) {
        console.error('Error fetching products by category:', error);

        return [];
    }
}