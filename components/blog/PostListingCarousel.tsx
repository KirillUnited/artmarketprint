'use client';

import {Post} from '@/components/blog/lib/types';
import {PostCard} from '@/components/blog/ui';
import {Carousel} from '@/components/shared/carousel';
import { POST_CARD_VARIANTS } from './ui/PostCard';

interface PostListingProps {
	posts: Post[];
}
const PostListingCarousel = ({posts}: PostListingProps) => <Carousel items={posts} renderProps={(item) => <PostCard variant={POST_CARD_VARIANTS.compact} key={item.slug.current} post={item} />} />;

export {PostListingCarousel};
