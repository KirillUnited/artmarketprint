import React, {JSX} from 'react';
import Image from 'next/image';

import {Post} from '../lib/types';

import {urlFor} from '@/sanity/lib/image';

/**
 * A function that renders a post avatar component.
 * @param {post: Post} props - The props object with required properties.
 * @returns {React.ReactElement} A JSX element that represents the post avatar.
 */
export default function PostAvatar({post}: {post: Post}): JSX.Element | null {
	if (!post.author) return null;

	return (
		<div className={'flex items-center gap-2 text-xs'}>
			{post.author.image && (
				<Image priority alt={post.author?.name || ''} className="w-8 h-8 object-cover rounded-full" height={64} src={urlFor(post.author.image).width(64).format('webp').url()} width={64} />
			)}
			<span>{post.author?.name || ''}</span>
		</div>
	);
}
