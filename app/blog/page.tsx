// Blog Listing Page
import {Metadata} from 'next';

import {getAllPosts} from '@/components/blog/lib/fetch-data';
import {PostListing} from '@/components/blog';
import NotFound from '@/app/blog/not-found';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import {getSanityDocuments} from '@/sanity/lib/fetch-sanity-data';
import {NAVIGATION_QUERY} from '@/sanity/lib/queries';
import Section, {SectionHeading} from '@/components/layout/Section';

export const metadata: Metadata = {
	title: 'Наш Блог',
	description: 'Читайте наши последние статьи, новости и статьи от нашей команды',
};

export default async function BlogPage() {
	const posts = await getAllPosts();
	const breadcrumbs = (await getSanityDocuments(NAVIGATION_QUERY))[0].links;

	if (!Array.isArray(posts) || posts.length === 0) return <NotFound />;

	return (
		<Section>
			<SectionHeading>
				{/* Breadcrumb navigation */}
				<div>
					<BaseBreadcrumb items={breadcrumbs} section={'Блог'} />
				</div>
				<h1 className="text-3xl font-bold">Наш Блог</h1>
			</SectionHeading>
			<PostListing posts={posts} />
		</Section>
	);
}
