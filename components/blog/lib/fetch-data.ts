import {sanityFetch} from '@/sanity/lib/sanityFetch';
import {ALL_POSTS_QUERY, CATEGORIES_QUERY, POST_BY_SLUG_QUERY, POSTS_BY_CATEGORY_QUERY, RELATED_POSTS_QUERY} from '@/components/blog/lib/queries';

/**
 * Fetch all blog posts ordered by publish date.
 */
export const getAllPosts = async () => {
	try {
		const posts = await sanityFetch({query: ALL_POSTS_QUERY});

		return posts || [];
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
		const posts = await sanityFetch({query: POSTS_BY_CATEGORY_QUERY, params: {categoryId}});

		return posts || [];
	} catch (error) {
		console.error('Error fetching posts by category:', error);

		return [];
	}
};

/**
 * Fetch related posts by category (categoryId).
 * @param categoryId - The category document _id
 */
export const getRelatedPosts = async (categoryId: string) => {
	try {
		const posts = await sanityFetch({query: RELATED_POSTS_QUERY, params: {categoryId}});

		return posts || null;
	} catch (error) {
		console.error('Error fetching related posts:', error);

		return null;
	}
};

export const getAllBlogCategories = async () => {
	try {
		const categories = await sanityFetch({query: CATEGORIES_QUERY});

		return categories || [];
	} catch (error) {
		console.error('Error fetching all categories:', error);

		return [];
	}
};
