'use client';

import {Post} from '@/components/blog/lib/types';
import {PostCard} from '@/components/blog/ui';
import {Carousel} from '@/components/shared/carousel';

interface PostListingProps {
	posts: Post[];
}
const PostListingCarousel = ({posts}: PostListingProps) => <Carousel items={posts} renderProps={(item) => <PostCard key={item.slug.current} post={item} />} />;

export {PostListingCarousel};
