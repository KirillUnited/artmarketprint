// Blog Listing Page
import {Metadata} from 'next';

import {getAllPosts} from '@/components/blog/lib/fetch-data';
import {PostListing} from '@/components/blog';
import NotFound from '@/app/blog/not-found';
import BaseBreadcrumb from '@/components/ui/Breadcrumb';
import {getSanityDocuments} from '@/sanity/lib/fetch-sanity-data';
import {NAVIGATION_QUERY} from '@/sanity/lib/queries';

export const metadata: Metadata = {
	title: 'Наш Блог',
	description: 'Читайте наши последние статьи, новости и статьи от нашей команды',
};

export default async function BlogPage() {
	const posts = await getAllPosts();
	const breadcrumbs = (await getSanityDocuments(NAVIGATION_QUERY))[0].links;

	if (!Array.isArray(posts) || posts.length === 0) return <NotFound />;

	return (
		<main className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Наш Блог</h1>
			{/* Breadcrumb navigation */}
			<section>
				<div className="container">
					<div className="mt-10 mb-6">
						<BaseBreadcrumb items={breadcrumbs} section={'Блог'} />
					</div>
				</div>
			</section>
			<PostListing posts={posts} />
		</main>
	);
}
