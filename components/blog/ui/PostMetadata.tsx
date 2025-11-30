import {JSX} from 'react';
import {Calendar1Icon, Clock1Icon} from 'lucide-react';
import {clsx} from 'clsx';

import styles from './styles.module.css';

import {Post} from '@/components/blog/lib/types';

/**
 * A function that renders post metadata.
 * @param {post: Post} post - Post metadata to render.
 * @returns {JSX.Element} A JSX element that represents the post metadata.
 */
export default function PostMetadata({post}: {post: Post}): JSX.Element {
	return (
		<div className={clsx(styles.PostMetadata)}>
			<p className={'flex items-center gap-1'}>
				<Calendar1Icon size={14} />
				<span>{new Date(post?.publishDate || post?._createdAt).toLocaleDateString('ru', {dateStyle: 'medium'})}</span>
			</p>
			<p className={'flex items-center gap-1'}>
				<Clock1Icon size={14} />
				<span>{post.readingTime || '5'} мин</span>
			</p>
		</div>
	);
}
