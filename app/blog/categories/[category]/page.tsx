import React from 'react';
import { Metadata } from 'next';

import NotFound from '@/app/blog/not-found';
import Section from '@/components/layout/Section';
import { PostListing } from '@/components/blog';
import BlogPageHeader from '@/components/blog/BlogPageHeader';
import { ClientPagination } from '@/components/shared/product/ui/Pagination';
import { getAllBlogCategories, getCategoryBySlug, getPaginatedPostsByCategory, getTotalPostsCountByCategory } from '@/components/blog/lib/fetch-data';
import { ServiceBreadcrumb } from '@/components/ui/Breadcrumb';

const POSTS_PER_PAGE = 8;

export interface Props {
	category: string;
}

export async function generateMetadata({ params }: { params: Promise<Props> }): Promise<Metadata> {
	const { category } = await params;
	const data = await getCategoryBySlug(category);
	const { title = '', description = '', ogImage = '' } = data?.seo || {};
	const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/categories/${category}`;
	const fallbackTitle = title || data?.title || 'Наш Блог';
	const fallbackDescription = `${fallbackTitle}. Читайте в блоге ArtMarketPrint.` || 'Читайте в блоге ArtMarketPrint.';
	const fallbackImage = ogImage || '/apple-touch-icon.png';

	return {
		title: fallbackTitle,
		description: fallbackDescription,
		openGraph: {
			title: fallbackTitle,
			description: fallbackDescription,
			url,
			siteName: 'ArtMarketPrint',
			locale: 'ru_RU',
			type: 'website',
			images: [
				{
					url: fallbackImage,
					width: 1200,
					height: 630,
					alt: fallbackTitle,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: fallbackTitle,
			description: fallbackDescription,
			images: [fallbackImage],
		},
		alternates: {
			canonical: url,
			languages: {
				'ru-BY': url,
				'ru-RU': `https://artmarketprint.ru/blog/categories/${category}`,
				'x-default': url,
			},
		},
	};
}

export default async function BlogCategoryPage({ params, searchParams }: { params: Promise<Props>; searchParams: Promise<{ page?: string }> }) {
	const { category } = await params;
	const { page } = await searchParams;
	const pageNumber = Math.max(1, Number.parseInt(page || '1', 10) || 1);
	const [categories, totalPosts, posts] = await Promise.all([getAllBlogCategories(), getTotalPostsCountByCategory(category), getPaginatedPostsByCategory(category, pageNumber, POSTS_PER_PAGE)]);
	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
	const title = categories?.find((cat: any) => cat.slug?.current === category)?.title || '';

	if (!Array.isArray(posts) || posts.length === 0) return <NotFound />;

	return (
		<>
			<div className='flex flex-col gap-6'>
				<ServiceBreadcrumb service="Блог" serviceSlug="blog" title={title} />
				<BlogPageHeader title={title || 'Наш Блог'} categories={categories || []} currentSlug={category} />
			</div>
			<PostListing posts={posts} />
			{totalPages > 1 && <ClientPagination basePath={`/blog/categories/${category}`} pageNumber={pageNumber} totalPages={totalPages} />}
		</>
	);
}
