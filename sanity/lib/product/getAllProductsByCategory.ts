import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getAllProductsByCategory(category: string) {
    const ALL_PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "product" && category == $category]`);
    try {
        const {data: products} = await sanityFetch({query: ALL_PRODUCTS_BY_CATEGORY_QUERY, params: { category }});

        return products ?? [];
    } catch (error) {
        console.error('Error fetching products by category:', error);

        return [];
    }
}