// Blog Listing Page
import { Metadata } from 'next';

import { getAllBlogCategories, getPaginatedPosts, getTotalPostsCount } from '@/components/blog/lib/fetch-data';
import { PostListing } from '@/components/blog';
import NotFound from '@/app/blog/not-found';
import Section from '@/components/layout/Section';
import BlogPageHeader from '@/components/blog/BlogPageHeader';
import { ClientPagination } from '@/components/shared/product/ui/Pagination';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { NAVIGATION_QUERY } from '@/sanity/lib/queries';

const POSTS_PER_PAGE = 8;

export const metadata: Metadata = {
	title: 'Блог ArtMarketPrint: полезные статьи о технологиях печати',
	description: 'Подробные статьи о шелкографии, DTF, УФ-печати и гравировке. Узнайте, как выбрать технологию, рассчитать стоимость и создать качественную продукцию. Полезные советы для бизнеса.',
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
	const { page } = await searchParams;
	const pageNumber = Math.max(1, Number.parseInt(page || '1', 10) || 1);
	const [categories, totalPosts, posts, breadcrumbs] = await Promise.all([
		getAllBlogCategories(), 
		getTotalPostsCount(), 
		getPaginatedPosts(pageNumber, POSTS_PER_PAGE),
		getSanityDocuments(NAVIGATION_QUERY)
	]);
	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

	if (!Array.isArray(posts) || posts.length === 0) return <NotFound />;

	return (
		<>
			<div className='flex flex-col gap-6'>
				<BaseBreadcrumb items={breadcrumbs[0].links} section="blog" />
				<BlogPageHeader title="Наш Блог" categories={categories} currentSlug="" />
			</div>
			<PostListing posts={posts} />
			{totalPages > 1 && <ClientPagination basePath="/blog" pageNumber={pageNumber} totalPages={totalPages} />}
		</>
	);
}
