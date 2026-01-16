import { client } from '../../sanity/client';

export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
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
  }`

  const post = await client.fetch(query, { slug })

  if (!post) return null;

  return post
}
