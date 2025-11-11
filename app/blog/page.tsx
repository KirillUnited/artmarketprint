// Blog Listing Page
import {Metadata} from 'next';

import {getAllPosts} from '@/components/blog/lib/fetch-data';
import {PostListing} from '@/components/blog';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Latest posts, news, and insights',
};

export default async function BlogPage() {
	const posts = await getAllPosts();

	console.log('Blog Page posts', posts);

	return (
		<main className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Блог</h1>
			<PostListing posts={posts} />
		</main>
	);
}
