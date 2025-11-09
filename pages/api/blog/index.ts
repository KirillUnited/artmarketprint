import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPostsQuery } from '@/sanity/lib/queries/blog.queries';
import { sanityFetch } from '@/sanity/lib/sanityFetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = await sanityFetch({ query: getAllPostsQuery });
  res.status(200).json(posts);
}
