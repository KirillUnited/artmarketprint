'use client';
import {clsx} from 'clsx';
import {Button} from '@heroui/button';
import Link from 'next/link';
import {ArrowRightIcon} from 'lucide-react';

import styles from './styles.module.css';
import {POST_CARD_VARIANTS} from './ui/PostCard';
import PostMetadata from './ui/PostMetadata';

import {Post} from '@/components/blog/lib/types';
import {PostCard} from '@/components/blog/ui';

interface PostListingProps {
	posts: Post[];
}

const PostListing = ({posts}: PostListingProps) => (
	<div className={clsx(styles.PostListing)}>
		{posts.map((post: Post) => (
			<PostCard
				key={post.slug.current}
				footerSlot={
					<>
						<PostMetadata post={post} />
						<Button as={Link} className="inline-flex items-center gap-1" color={'primary'} href={`/blog/${post?.slug?.current || ''}`} size="md" variant="light">
							Читать далее <ArrowRightIcon size={16} />
						</Button>
					</>
				}
				post={post}
				variant={POST_CARD_VARIANTS.compact}
			/>
		))}
	</div>
);

export default PostListing;
