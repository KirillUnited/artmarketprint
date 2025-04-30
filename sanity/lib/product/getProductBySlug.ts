import { defineQuery } from "next-sanity";
import { getSanityDocuments } from "../fetch-sanity-data";

export default async function getProductBySlug(slug: string) {
    const PRODUCT_BY_SLUG = defineQuery(`*[_type == "product" && _id == $slug]`);
    try {
        const product = await getSanityDocuments(PRODUCT_BY_SLUG, { slug });

        return product[0] ?? [];
    } catch (error) {
        console.error('Error fetching product by slug:', error);

        return [];
    }
}