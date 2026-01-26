import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/sanityFetch';

const POST_BY_SLUG_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  seo{
      title,
      description,
      ogImage,
    },
    _id,
    title,
    slug,
    body,
    excerpt,
    mainImage,
    "author": author->{name, picture},
    publishedAt,
    "categories": categories[]->{ title }
}`);

export const getPostBySlug = async (slug: string) => {
  try {
    const post = await sanityFetch({query: POST_BY_SLUG_QUERY, params: {slug}});

    return post ?? null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);

    return null;
  }
};