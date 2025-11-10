/**
 * Renders the header for a blog post, including image, title, meta, and excerpt.
 * @param post - Blog post object
 */
import Image from 'next/image';
import {Calendar1Icon, Clock1Icon, User2Icon} from 'lucide-react';

import {Post} from '@/components/blog/lib/types';
import {urlFor} from '@/sanity/lib/image';

export default function PostHeader({post}: {post: Post}) {
	return (
		<header className="mb-8">
			<Image priority alt={post.title} className="w-full h-72 object-cover rounded-lg mb-4" height={630} src={urlFor(post.featuredImage).width(1200).format('webp').url()} width={1200} />
			<h1 className="text-3xl font-bold mb-2">{post.title}</h1>
			<div className="flex items-center text-sm text-neutral-500 gap-4 mb-2">
				<p className={'flex items-center gap-2'}>
					<Calendar1Icon size={16} />
					<span>{new Date(post.publishDate).toLocaleDateString()}</span>
				</p>
				<p className={'flex items-center gap-2'}>
					<User2Icon size={16} />
					<span>{post.author?.name}</span>
				</p>
				<p className={'flex items-center gap-2'}>
					<Clock1Icon size={16} />
					<span>{post.readingTime} мин</span>
				</p>
			</div>
			<p className="text-lg text-neutral-700 dark:text-neutral-300">{post.excerpt}</p>
		</header>
	);
}
