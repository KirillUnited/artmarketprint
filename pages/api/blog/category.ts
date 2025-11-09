import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPostsQuery } from '@/sanity/lib/queries/blog.queries';
import { sanityFetch } from '@/sanity/lib/sanityFetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;
  if (!category || typeof category !== 'string') {
    res.status(400).json({ error: 'Missing or invalid category' });
    return;
  }
  // Replace with proper GROQ for category filtering
  const posts = await sanityFetch({ query: getAllPostsQuery });
  const filtered = posts.filter((post: any) =>
    post.categories?.some((cat: any) => cat.slug?.current === category)
  );
  res.status(200).json(filtered);
}
