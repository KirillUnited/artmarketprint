export const CATEGORIES_QUERY = `*[
    _type == "category"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{title,
      description,
      image, 
      price,
      "currentSlug": slug.current}`;