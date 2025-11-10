/**
 * Card component for displaying a blog post preview.
 * @param post - Blog post object
 */
import Link from 'next/link';
import { ArrowRightIcon, Clock10Icon } from 'lucide-react';
import Image from 'next/image';

import { Post } from '../lib/types';
import { urlFor } from '@/sanity/lib/image';
import { Card } from '@heroui/card';

export default function PostCard({ post }: { post: Post }) {
	return (
		<Card as={'article'}>
			{post?.featuredImage && (
				<Link href={`/blog/${post?.slug?.current || ''}`}>
					<Image alt={post.title} className="w-full h-48 object-cover" height={220} src={urlFor(post.featuredImage).width(220).format('webp').url()} width={220} />
				</Link>
			)}
			<div className="p-6 flex flex-col flex-1">
				<h2 className="text-xl font-semibold mb-2">
					<Link href={`/blog/${post?.slug?.current || ''}`}>{post.title}</Link>
				</h2>
				<p className="text-neutral-600 dark:text-neutral-300 mb-4 flex-1">{post.excerpt}</p>
				<div className="flex items-center justify-between text-sm text-neutral-500 mt-auto">
					<div className="flex items-center gap-2">
						<Clock10Icon size={16} />
						<span>{post.readingTime} мин</span>
					</div>
					<span>{new Date(post.publishDate).toLocaleDateString()}</span>
					<Link className="inline-flex items-center gap-1 text-blue-600 hover:underline" href={`/blog/${post?.slug?.current || ''}`}>
						Читать далее <ArrowRightIcon size={16} />
					</Link>
				</div>
			</div>
		</Card>
	);
}
