export const SERVICES_QUERY = `*[
    _type == "service"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{title,
      description,
      image, 
      price,
      "currentSlug": slug.current}`;

export const SERVICE_QUERY = '*[_type == "service" && slug.current == $slug][0]';