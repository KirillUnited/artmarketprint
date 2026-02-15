/**
 * Renders the header for a blog post, including image, title, meta, and excerpt.
 * @param post - Blog post object
 */
import NextImage from 'next/image';
import {Image} from '@heroui/image';

import PostCatsFilter from './ui/PostCats';

import {Post} from '@/components/blog/lib/types';
import {urlFor} from '@/sanity/lib/image';
import {PostAvatar, PostMetadata} from '@/components/blog/ui';
import CopyButton from '@/components/ui/button/CopyButton';

export default function PostHeader({post}: {post: Post}) {
	return (
		<header className="flex flex-col gap-8 mb-8">
			<div className={'flex flex-wrap items-center gap-x-4 gap-y-2'}>
				<PostMetadata post={post} />
				<PostCatsFilter categories={post?.categories || []} />
			</div>
			<div className={'space-y-4'}>
				<h1 className="text-3xl font-bold pb-4 border-b-1">
					{post.title}
					<CopyButton className="ml-2" textToCopy={`artmarketprint.by/blog/${post.slug?.current}` || ''} />
				</h1>
				<p className="text-lg text-neutral-700 dark:text-neutral-300">{post.excerpt}</p>
				<PostAvatar post={post} />
			</div>
			{post.featuredImage && (
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
			)}
		</header>
	);
}
