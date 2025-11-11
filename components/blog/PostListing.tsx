import styles from './styles.module.css';

import {Post} from '@/components/blog/lib/types';
import {PostCard} from '@/components/blog/ui';
import {cn} from '@/lib/utils';

interface PostListingProps {
	posts: Post[];
}

const PostListing = ({posts}: PostListingProps) => (
	<div className={cn(styles.PostListing)}>
		{posts.map((post: Post) => (
			<PostCard key={post.slug.current} post={post} />
		))}
	</div>
);

export default PostListing;
