import { defineQuery } from "next-sanity";

export const SERVICES_QUERY = `*[
    _type == "service"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{title,
      description,
      image, 
      price,
      "currentSlug": slug.current}`;

export const SERVICE_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0]{
  ...,
  calculator -> {
      title,
      description,
      type
  }
  ,
  seo {
    title,
    description,
    "ogImage": image.asset->url
  }
}`);