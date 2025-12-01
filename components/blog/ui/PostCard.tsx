/**
 * Card component for displaying a blog post preview.
 * @param post - Blog post object
 */
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { Image } from '@heroui/image';
import NextImage from 'next/image';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';

import { Post } from '../lib/types';

import { urlFor } from '@/sanity/lib/image';
import PostMetadata from './PostMetadata';

type PostCardVariant = 'default' | 'compact';

export const POST_CARD_VARIANTS: Record<PostCardVariant, PostCardVariant> = {
	default: 'default',
	compact: 'compact',
};

export type PostCardProps = {
	post: Post;
	variant?: PostCardVariant;
};

export default function PostCard({ post, variant = POST_CARD_VARIANTS.default }: PostCardProps) {
	return (
		<Card isHoverable as={'article'} className="hover:shadow-xl border hover:border-primary-300 transition-all">
			{post?.featuredImage && (
				<Link className="overflow-hidden" href={`/blog/${post?.slug?.current || ''}`}>
					<Image
						isZoomed
						removeWrapper
						alt={post.title}
						as={NextImage}
						className="w-full h-48 object-cover"
						fallbackSrc="https://via.placeholder.com/300x200"
						height={220}
						quality={100}
						src={urlFor(post.featuredImage).format('webp').url()}
						width={220}
					/>
				</Link>
			)}
			<CardHeader className="pb-0">
				<h2 className="text-xl font-semibold mb-2 leading-none line-clamp-3 text-gray-900 dark:text-gray-100">
					<Link className="block" href={`/blog/${post?.slug?.current || ''}`}>
						{post.title}
					</Link>
				</h2>
			</CardHeader>
			{
				variant === POST_CARD_VARIANTS.default && (
					<CardBody className='flex-1'>
						<p className="text-neutral-600 dark:text-neutral-300 line-clamp-4">{post.excerpt}</p>
					</CardBody>
				)
			}
			<CardFooter className="mt-auto max-xl:flex-col max-xl:items-stretch gap-2 justify-between text-sm text-neutral-500 flex-wrap">
				<PostMetadata post={post} />
				<Button as={Link} className="border-1 inline-flex items-center gap-1" color={'primary'} href={`/blog/${post?.slug?.current || ''}`} size="sm" variant="ghost">
					Читать далее <ArrowRightIcon size={16} />
				</Button>
			</CardFooter>
		</Card>
	);
}
