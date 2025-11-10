import { Post } from '@/lib/posts/types';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white dark:bg-neutral-900 rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      <Link href={`/blog/${post.slug}`}>
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-xl font-semibold mb-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300 mb-4 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-neutral-500 mt-auto">
          <span>{post.readTime} min read</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-blue-600 hover:underline">
            Read more <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
