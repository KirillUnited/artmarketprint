import { defineQuery } from "next-sanity";

export const CATEGORIES_QUERY = defineQuery(`*[
    _type == "category"
    && defined(slug.current)
  ]|order(publishedAt desc){
      title,
      featured,
      description,
      image, 
      price,
      "currentSlug": slug.current,
      subcategories
      }`);

export const CATEGORY_QUERY = defineQuery(`*[_type == "category" && slug.current == $slug][0]`);