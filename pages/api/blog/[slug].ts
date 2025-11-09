import { NextApiRequest, NextApiResponse } from 'next';
import { getPostBySlugQuery } from '@/sanity/lib/queries/blog.queries';
import { sanityFetch } from '@/sanity/lib/sanityFetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  if (!slug || typeof slug !== 'string') {
    res.status(400).json({ error: 'Missing or invalid slug' });
    return;
  }
  const post = await sanityFetch({ query: getPostBySlugQuery, params: { slug } });
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  res.status(200).json(post);
}
