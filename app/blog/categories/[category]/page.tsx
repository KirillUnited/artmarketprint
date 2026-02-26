import React from 'react';
import {Metadata} from 'next';

import NotFound from '@/app/blog/not-found';
import Section, {SectionHeading} from '@/components/layout/Section';
import {PostListing} from '@/components/blog';
import PostCatsFilter from '@/components/blog/ui/PostCats';
import {ClientPagination} from '@/components/shared/product/ui/Pagination';
import {getAllBlogCategories, getPaginatedPostsByCategory, getTotalPostsCountByCategory} from '@/components/blog/lib/fetch-data';

const POSTS_PER_PAGE = 8;

export interface Props {
	category: string;
}

export const metadata: Metadata = {
	title: 'Наш Блог',
	description: 'Читайте наши последние статьи, новости и статьи от нашей команды',
};

export default async function BlogCategoryPage({params, searchParams}: {params: Promise<Props>; searchParams: Promise<{page?: string}>}) {
	const {category} = await params;
	const {page} = await searchParams;
	const pageNumber = Math.max(1, Number.parseInt(page || '1', 10) || 1);
	const [categories, totalPosts, posts] = await Promise.all([getAllBlogCategories(), getTotalPostsCountByCategory(category), getPaginatedPostsByCategory(category, pageNumber, POSTS_PER_PAGE)]);
	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

	if (!Array.isArray(posts) || posts.length === 0) return <NotFound />;

	return (
		<Section>
			<SectionHeading>
				<h1 className="text-3xl font-semibold">Наш Блог</h1>
				<PostCatsFilter categories={categories || []} currentSlug={category} />
			</SectionHeading>
			<PostListing posts={posts} />
			{totalPages > 1 && <ClientPagination totalPages={totalPages} pageNumber={pageNumber} basePath={`/blog/categories/${category}`} />}
		</Section>
	);
}
