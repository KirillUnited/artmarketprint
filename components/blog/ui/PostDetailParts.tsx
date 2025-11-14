import Link from 'next/link';

import {Post} from '@/components/blog/lib/types';

/**
 * RelatedPosts component displays related blog posts.
 * @param {Object} props - Component props
 * @param {string} props.currentPostId - ID of the current post
 */
export function RelatedPosts({currentPostId}: {currentPostId: string}) {
	// Placeholder: In production, fetch related posts by category/tag
	return (
		<aside className="mb-8">
			<h3 className="text-lg font-semibold mb-2">Похожие статьи</h3>
			<ul className="space-y-2">
				{/* TODO: Dynamically render related posts */}
				<li>
					<Link className="text-blue-600 hover:underline" href="#">
						Статья 1
					</Link>
				</li>
			</ul>
		</aside>
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
