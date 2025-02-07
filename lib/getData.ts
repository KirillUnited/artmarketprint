import { client } from "@/sanity/client";
import type { SanityDocument } from "next-sanity";

const SERVICES_QUERY = `*[
  _type == "service"
  && defined(slug.current)
]|order(publishedAt desc)[0...4]{title,
    description,
    image, 
    price,
    "currentSlug": slug.current}`;
const options = { next: { revalidate: 30 } };

export async function getSanityDocuments(QUERY = SERVICES_QUERY) {
  try {
    return await client.fetch<SanityDocument[]>(QUERY, {}, options);
  } catch (error) {
    console.error("Error fetching Sanity documents:", error);
    return [];
  }
}