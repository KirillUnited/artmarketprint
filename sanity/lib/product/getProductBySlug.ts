import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export default async function getProductBySlug(slug: string) {
    const PRODUCT_BY_SLUG = defineQuery(`*[_type == "product" && _id == $slug]`);
    try {
        const {data: product} = await sanityFetch({query: PRODUCT_BY_SLUG, params: { slug }});

        return product[0] ?? [];
    } catch (error) {
        console.error('Error fetching product by slug:', error);

        return [];
    }
}