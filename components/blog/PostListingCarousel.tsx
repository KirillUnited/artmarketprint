'use client';

import {clsx} from 'clsx';

import styles from './styles.module.css';

import {Post} from '@/components/blog/lib/types';
import {PostCard} from '@/components/blog/ui';
import {Carousel} from '@/components/shared/carousel';

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
const PostListingCarousel = ({posts}: PostListingProps) => <Carousel items={posts} renderProps={(item) => <PostCard key={item.slug.current} post={item} />} />;

export default PostListing;
export {PostListingCarousel};
