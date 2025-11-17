// GROQ queries for blog
import {defineQuery, groq} from 'next-sanity';

const POST = groq`
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    _type,
    _key,
    title,
    slug,
    excerpt,
    body,
    featuredImage,
    author->{name, image},
    categories[]->{title, slug},
    publishDate,
    seo {
      title, 
      description, 
      "ogImage": image.asset->url
    },
    faq,
    readingTime
`;

export const ALL_POSTS_QUERY = defineQuery(`*[_type == "blog.post"]|order(publishDate desc){
  ${POST}
}`);

export const POST_BY_SLUG_QUERY = defineQuery(`*[_type == "blog.post" && slug.current == $slug][0]{
  ${POST}
}`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "blog.post" && references(^.categoryId)]|order(publishDate desc){
  ${POST}
}`);
export const RELATED_POSTS_QUERY = defineQuery(`*[_type == 'blog.post' && count(categories[@._ref in ^.categories[]._ref]) > 0 && _id != $categoryId]|order(publishDate desc){
  ${POST}
}`);
