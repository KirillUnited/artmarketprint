// Blog Listing Page
import {Metadata} from 'next';

import {getAllCategories, getAllPosts} from '@/components/blog/lib/fetch-data';
import {PostListing} from '@/components/blog';
import NotFound from '@/app/blog/not-found';
import Section, {SectionHeading} from '@/components/layout/Section';
import PostCats from '@/components/blog/ui/PostCats';

export const metadata: Metadata = {
	title: 'Наш Блог',
	description: 'Читайте наши последние статьи, новости и статьи от нашей команды',
};

export default async function BlogPage() {
	const posts = await getAllPosts();
	const categories = await getAllCategories();

	if (!Array.isArray(posts) || posts.length === 0) return <NotFound />;

	return (
		<Section>
			<SectionHeading>
				<h1 className="text-3xl font-bold">Наш Блог</h1>
				<PostCats categories={categories} />
			</SectionHeading>
			<PostListing posts={posts} />
		</Section>
	);
}
