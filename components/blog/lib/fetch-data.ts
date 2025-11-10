import {sanityFetch} from '@/sanity/lib/sanityFetch';
import {ALL_POSTS_QUERY, POST_BY_SLUG_QUERY, POSTS_BY_CATEGORY_QUERY} from '@/components/blog/lib/queries';

/**
 * Fetch all blog posts ordered by publish date.
 */
export const getAllPosts = async () => {
	try {
		return await sanityFetch({query: ALL_POSTS_QUERY});
	} catch (error) {
		console.error('Error fetching all posts:', error);

		return [];
	}
};

/**
 * Fetch a blog post by its slug.
 * @param slug - The post slug
 */
export const getPostBySlug = async (slug: string) => {
	try {
		const post = await sanityFetch({query: POST_BY_SLUG_QUERY, params: {slug}});

		return post || null;
	} catch (error) {
		console.error('Error fetching post by slug:', error);

		return null;
	}
};

/**
 * Fetch posts by category (categoryId).
 * @param categoryId - The category document _id
 */
export const getPostsByCategory = async (categoryId: string) => {
	try {
		return await sanityFetch({query: POSTS_BY_CATEGORY_QUERY, params: {categoryId}});
	} catch (error) {
		console.error('Error fetching posts by category:', error);

		return [];
	}
};
