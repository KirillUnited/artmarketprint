import {sanityFetch} from '@/sanity/lib/sanityFetch';
import {
	ALL_POSTS_QUERY,
	CATEGORIES_QUERY,
	PAGINATED_POSTS_QUERY,
	POST_BY_SLUG_QUERY,
	POSTS_BY_CATEGORY_QUERY,
	RELATED_POSTS_QUERY,
	TOTAL_POSTS_COUNT_QUERY,
} from '@/components/blog/lib/queries';

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
 * Fetch blog posts for a specific page.
 * @param pageNumber - current page number (1-based)
 * @param postsPerPage - amount of posts per page
 */
export const getPaginatedPosts = async (pageNumber: number, postsPerPage: number) => {
	try {
		const safePage = Math.max(1, pageNumber);
		const start = (safePage - 1) * postsPerPage;
		const end = start + postsPerPage;
		const posts = await sanityFetch({query: PAGINATED_POSTS_QUERY, params: {start, end}});

		return posts || [];
	} catch (error) {
		console.error('Error fetching paginated posts:', error);

		return [];
	}
};

/**
 * Fetch total amount of blog posts.
 */
export const getTotalPostsCount = async () => {
	try {
		const total = await sanityFetch({query: TOTAL_POSTS_COUNT_QUERY});

		return typeof total === 'number' ? total : 0;
	} catch (error) {
		console.error('Error fetching total posts count:', error);

		return 0;
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
