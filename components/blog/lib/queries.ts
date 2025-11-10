// GROQ queries for blog
import groq from 'groq';

export const getAllPostsQuery = groq`*[_type == "post"]|order(publishDate desc){
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
}`;

export const getPostBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
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
}`;

export const getPostsByCategoryQuery = groq`*[_type == "post" && references(^.categoryId)]|order(publishDate desc){
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
}`;
