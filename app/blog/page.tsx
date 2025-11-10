// Blog Listing Page
import {Metadata} from 'next';

import {getAllPosts} from '@/components/blog/lib/fetch-data';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Latest posts, news, and insights',
};

export default async function BlogPage() {
	const posts = await getAllPosts();

	console.log(posts);

	return (
		<main className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Blog</h1>
			{/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">*/}
			{/*	{posts.map((post) => (*/}
			{/*		<PostCard key={post.slug} post={post} />*/}
			{/*	))}*/}
			{/*</div>*/}
		</main>
	);
}
