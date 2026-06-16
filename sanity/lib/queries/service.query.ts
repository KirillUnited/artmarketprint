import { defineQuery, groq } from 'next-sanity';

const calculator = groq`
      title,
      description,
      type
`;

export const SERVICES_QUERY = defineQuery(`*[
    _type == "service"
    && defined(slug.current)
  ]|order(publishedAt desc){title,
      description,
      image, 
      price,
      "currentSlug": slug.current,
      calculator -> {
        ${calculator}
        }
      }`);

export const SERVICE_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0]{
  ...,
  calculator -> {
    ${calculator}
    }
  ,
  seo {
    title,
    description,
    "ogImage": image.asset->url
  }
}`);