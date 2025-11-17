/**
 * Card component for displaying a blog post preview.
 * @param post - Blog post object
 */
import Link from 'next/link';
import {ArrowRightIcon, Calendar1Icon, Clock10Icon} from 'lucide-react';
import {Image} from '@heroui/image';
import NextImage from 'next/image';
import {Card, CardBody, CardFooter, CardHeader} from '@heroui/card';
import {Button} from '@heroui/button';

import {Post} from '../lib/types';

import {urlFor} from '@/sanity/lib/image';

export default function PostCard({post}: {post: Post}) {
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
				<h2 className="text-xl font-semibold mb-2 leading-none line-clamp-3">
					<Link className="block" href={`/blog/${post?.slug?.current || ''}`}>
						{post.title}
					</Link>
				</h2>
			</CardHeader>
			<CardBody>
				<p className="text-neutral-600 dark:text-neutral-300 flex-1 line-clamp-4">{post.excerpt}</p>
			</CardBody>
			<CardFooter className="max-xl:flex-col max-xl:items-stretch gap-2 justify-between text-sm text-neutral-500 flex-wrap">
				<div className="flex items-center flex-wrap gap-2">
					{post?.readingTime && (
						<div className="flex items-center gap-2">
							<Clock10Icon size={16} />
							<span>{post.readingTime} мин</span>
						</div>
					)}
					{post?.publishDate && (
						<div className="flex items-center gap-2">
							<Calendar1Icon size={16} />
							<span>{new Date(post.publishDate).toLocaleDateString()}</span>
						</div>
					)}
				</div>
				<Button as={Link} className="border-1 inline-flex items-center gap-1" color={'primary'} href={`/blog/${post?.slug?.current || ''}`} size="sm" variant="ghost">
					Читать далее <ArrowRightIcon size={16} />
				</Button>
			</CardFooter>
		</Card>
	);
}
