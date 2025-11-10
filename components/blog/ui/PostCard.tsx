/**
 * Card component for displaying a blog post preview.
 * @param post - Blog post object
 */
import Link from 'next/link';
import {ArrowRightIcon} from 'lucide-react';
import Image from 'next/image';

import {Post} from '../lib/types';

export default function PostCard({post}: {post: Post}) {
	return (
		<article className="bg-white dark:bg-neutral-900 rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
			<Link href={`/blog/${post.slug}`}>
				<Image alt={post.title} className="w-full h-48 object-cover" height={220} src={post.featuredImage} width={220} />
			</Link>
			<div className="p-6 flex flex-col flex-1">
				<h2 className="text-xl font-semibold mb-2">
					<Link href={`/blog/${post.slug}`}>{post.title}</Link>
				</h2>
				<p className="text-neutral-600 dark:text-neutral-300 mb-4 flex-1">{post.excerpt}</p>
				<div className="flex items-center justify-between text-sm text-neutral-500 mt-auto">
					<span>{post.readTime} min read</span>
					<span>{new Date(post.date).toLocaleDateString()}</span>
					<Link className="inline-flex items-center gap-1 text-blue-600 hover:underline" href={`/blog/${post.slug}`}>
						Read more <ArrowRightIcon size={16} />
					</Link>
				</div>
			</div>
		</article>
	);
}
