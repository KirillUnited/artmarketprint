import {JSX} from 'react';
import {Calendar1Icon, Clock1Icon, User2Icon} from 'lucide-react';

import {Post} from '@/components/blog/lib/types';
import CopyButton from '@/components/ui/button/CopyButton';

/**
 * A function that renders post metadata.
 * @param {post: Post} post - Post metadata to render.
 * @returns {JSX.Element} A JSX element that represents the post metadata.
 */
export default function PostMetadata({post}: {post: Post}): JSX.Element {
	return (
		<div className="flex items-center text-xs text-neutral-500 gap-4 mb-2">
			<p className={'flex items-center gap-1'}>
				<Calendar1Icon size={14} />
				<span>{new Date(post.publishDate).toLocaleDateString('ru', {dateStyle: 'medium'})}</span>
			</p>
			<p className={'flex items-center gap-1'}>
				<User2Icon size={14} />
				<span>{post.author?.name || ''}</span>
			</p>
			<p className={'flex items-center gap-1'}>
				<Clock1Icon size={14} />
				<span>{post.readingTime || '5'} мин</span>
			</p>
			<CopyButton textToCopy={`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${post.slug?.current}` || ''} />
		</div>
	);
}
