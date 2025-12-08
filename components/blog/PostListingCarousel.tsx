'use client';

import { Post } from '@/components/blog/lib/types';
import { PostCard, PostMetadata } from '@/components/blog/ui';
import { Carousel } from '@/components/shared/carousel';
import { POST_CARD_VARIANTS } from './ui/PostCard';
import { ArrowRightIcon} from 'lucide-react';
import Link from 'next/link';

interface PostListingProps {
	posts: Post[];
}
const PostListingCarousel = ({ posts }: PostListingProps) => <Carousel items={posts} renderProps={(item) => <PostCard variant={POST_CARD_VARIANTS.compact} key={item.slug.current} post={item} footerSlot={
	<>
		<PostMetadata post={item} />
		<Link className="inline-flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium" href={`/blog/${item?.slug?.current || ''}`}>
			Читать далее <ArrowRightIcon size={16} />
		</Link>
	</>
} />} />;

export { PostListingCarousel };
