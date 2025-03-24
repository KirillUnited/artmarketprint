export const CATEGORIES_QUERY = `*[
    _type == "category"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{title,
      description,
      image, 
      price,
      "currentSlug": slug.current}`;

export const CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug][0]`;