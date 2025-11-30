import {clsx} from 'clsx';

import styles from './styles.module.css';

import {Post} from '@/components/blog/lib/types';
import {PostCard} from '@/components/blog/ui';

interface PostListingProps {
	posts: Post[];
}

const PostListing = ({posts}: PostListingProps) => (
	<div className={clsx(styles.PostListing)}>
		{posts.map((post: Post) => (
			<PostCard key={post.slug.current} post={post} />
		))}
	</div>
);

export default PostListing;
