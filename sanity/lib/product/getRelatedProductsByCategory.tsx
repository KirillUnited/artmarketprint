import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export default async function getRelatedProductsByCategory(category: string, currentProductId: string, limit: number = 9) {
    const RELATED_PRODUCTS_QUERY = defineQuery(`*[
        _type == "product" && 
        category == $category && 
        _id != $currentProductId
    ][0...$limit]`);

    try {
        const { data: relatedProducts } = await sanityFetch({
            query: RELATED_PRODUCTS_QUERY,
            params: { category, currentProductId, limit: limit - 1 }
        });

        return relatedProducts ?? [];
    } catch (error) {
        console.error('Error fetching related products:', error);
        return [];
    }
}