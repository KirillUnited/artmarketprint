import {Post} from '@/components/blog/lib/types';
import {getRelatedPosts} from '@/components/blog/lib/fetch-data';
import {PostListing} from '@/components/blog';
import {SectionInner, SectionTitle} from '@/components/layout/Section';

/**
 * RelatedPosts component displays related blog posts.
 * @param {Object} props - Component props
 * @param {string} props.currentPostId - ID of the current post
 */
export async function RelatedPosts({currentPostId}: {currentPostId: string}) {
	const relatedPosts = await getRelatedPosts(currentPostId);

	if (!relatedPosts) return null;

	return (
		<SectionInner>
			<SectionTitle>Ещё статьи</SectionTitle>
			<PostListing posts={relatedPosts} />
		</SectionInner>
	);
}

/**
 * ShareButtons component for sharing a post.
 * @param {Object} props - Component props
 * @param {Post} props.post - Blog post object
 */
export function ShareButtons({post}: {post: Post}) {
	// Placeholder: Add real share logic
	return (
		<div className="flex gap-2 mt-6 mb-2">
			<button className="btn btn-sm btn-outline">Share</button>
			{/* Add HeroUI/heroicons here */}
		</div>
	);
}

/**
 * Comments component for displaying blog comments.
 * @param {Object} props - Component props
 * @param {string} props.postId - ID of the current post
 */
export function Comments({postId}: {postId: string}) {
	// Placeholder: Integrate Disqus or custom comments
	return (
		<section className="mt-8">
			<h3 className="text-lg font-semibold mb-2">Comments</h3>
			<div className="text-neutral-500">Comments integration coming soon.</div>
		</section>
	);
}
