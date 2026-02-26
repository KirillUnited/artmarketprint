// Blog Listing Page
import {Metadata} from 'next';

import {getAllBlogCategories, getPaginatedPosts, getTotalPostsCount} from '@/components/blog/lib/fetch-data';
import {PostListing} from '@/components/blog';
import NotFound from '@/app/blog/not-found';
import Section, {SectionHeading} from '@/components/layout/Section';
import PostCatsFilter from '@/components/blog/ui/PostCats';
import {ClientPagination} from '@/components/shared/product/ui/Pagination';

const POSTS_PER_PAGE = 8;

export const metadata: Metadata = {
	title: 'Наш Блог',
	description: 'Читайте наши последние статьи, новости и статьи от нашей команды',
};

export default async function BlogPage({searchParams}: {searchParams: Promise<{page?: string}>}) {
	const {page} = await searchParams;
	const pageNumber = Math.max(1, Number.parseInt(page || '1', 10) || 1);
	const [categories, totalPosts, posts] = await Promise.all([getAllBlogCategories(), getTotalPostsCount(), getPaginatedPosts(pageNumber, POSTS_PER_PAGE)]);
	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

	if (!Array.isArray(posts) || posts.length === 0) return <NotFound />;

	return (
		<Section>
			<SectionHeading>
				<h1 className="text-3xl font-bold">Наш Блог</h1>
				<PostCatsFilter categories={categories} currentSlug="" />
			</SectionHeading>
			<PostListing posts={posts} />
			{totalPages > 1 && <ClientPagination totalPages={totalPages} pageNumber={pageNumber} basePath="/blog" />}
		</Section>
	);
}
