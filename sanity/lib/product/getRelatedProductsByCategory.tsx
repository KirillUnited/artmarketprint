import { defineQuery } from "next-sanity";
import { getSanityDocuments } from "../fetch-sanity-data";

export default async function getRelatedProductsByCategory(category: string, currentProductId: string, limit: number = 9) {
    const RELATED_PRODUCTS_QUERY = defineQuery(`*[
        _type == "product" && 
        category == $category && 
        _id != $currentProductId
    ][0...$limit]`);

    try {
        const relatedProducts = await getSanityDocuments(RELATED_PRODUCTS_QUERY, { 
            category,
            currentProductId,
            limit: limit - 1 // Adjust limit to account for 0-based array indexing
        });

        return relatedProducts ?? [];
    } catch (error) {
        console.error('Error fetching related products:', error);
        return [];
    }
}