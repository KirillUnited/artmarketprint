import {clsx} from 'clsx';

import styles from './styles.module.css';

import {Post} from '@/components/blog/lib/types';
import {PostCard} from '@/components/blog/ui';
import { POST_CARD_VARIANTS } from './ui/PostCard';

interface PostListingProps {
	posts: Post[];
}

const PostListing = ({posts}: PostListingProps) => (
	<div className={clsx(styles.PostListing)}>
		{posts.map((post: Post) => (
			<PostCard key={post.slug.current} post={post} variant={POST_CARD_VARIANTS.compact} />
		))}
	</div>
);

export default PostListing;
