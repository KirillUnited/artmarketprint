/**
 * Renders the header for a blog post, including image, title, meta, and excerpt.
 * @param post - Blog post object
 */
import NextImage from 'next/image';
import {Image} from '@heroui/image';

import {Post} from '@/components/blog/lib/types';
import {urlFor} from '@/sanity/lib/image';
import {PostMetadata} from '@/components/blog/ui';

export default function PostHeader({post}: {post: Post}) {
	return (
		<header className="flex flex-col gap-4 mb-8">
			<PostMetadata post={post} />
			<div className={'space-y-4'}>
				<h1 className="text-3xl font-bold pb-4 border-b-1">{post.title}</h1>
				<p className="text-lg text-neutral-700 dark:text-neutral-300">{post.excerpt}</p>
			</div>
			<Image
				priority
				removeWrapper
				alt={post.title}
				as={NextImage}
				className="w-full h-72 object-cover rounded-large my-4"
				height={270}
				src={urlFor(post.featuredImage).width(1200).format('webp').url()}
				width={1200}
			/>
		</header>
	);
}
