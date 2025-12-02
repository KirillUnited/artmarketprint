import React from 'react';
import {Metadata} from 'next';

import {sanityFetch} from '@/sanity/lib/sanityFetch';
import {POSTS_BY_CATEGORY_QUERY} from '@/components/blog/lib/queries';
import NotFound from '@/app/blog/not-found';
import Section, {SectionHeading} from '@/components/layout/Section';
import {PostListing} from '@/components/blog';

export interface Props {
	category: string;
}

export const metadata: Metadata = {
	title: 'Наш Блог',
	description: 'Читайте наши последние статьи, новости и статьи от нашей команды',
};

export default async function BlogCategoryPage({params}: {params: Promise<Props>}) {
	const {category} = await params;
	const posts: any = await sanityFetch({query: POSTS_BY_CATEGORY_QUERY, params: {categorySlug: category}});

	if (!Array.isArray(posts) || posts.length === 0) return <NotFound />;

	return (
		<Section>
			<SectionHeading>
				<h1 className="text-3xl font-bold">Наш Блог</h1>
			</SectionHeading>
			<PostListing posts={posts} />
		</Section>
	);
}
