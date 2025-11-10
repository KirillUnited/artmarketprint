// GROQ queries for blog
import {defineQuery} from 'next-sanity';

export const ALL_POSTS_QUERY = defineQuery(`*[_type == "blog.post"]|order(publishDate desc){
  _id,
  title,
  slug,
  excerpt,
  body,
  featuredImage,
  author->{name, image},
  categories[]->{title, slug},
  publishDate,
  seo,
  faq,
  readingTime
}`);

export const POST_BY_SLUG_QUERY = defineQuery(`*[_type == "blog.post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body,
  featuredImage,
  author->{name, image},
  categories[]->{title, slug},
  publishDate,
  seo,
  faq,
  readingTime
}`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "blog.post" && references(^.categoryId)]|order(publishDate desc){
  _id,
  title,
  slug,
  excerpt,
  body,
  featuredImage,
  author->{name, image},
  categories[]->{title, slug},
  publishDate,
  seo,
  faq,
  readingTime
}`);
