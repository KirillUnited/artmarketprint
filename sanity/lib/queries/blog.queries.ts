// GROQ queries for blog
export const getAllPostsQuery = `*[_type == "post"]|order(publishDate desc){
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

export const getPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
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

export const getPostsByCategoryQuery = `*[_type == "post" && references(^.categoryId)]|order(publishDate desc){
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
