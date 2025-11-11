import {Metadata} from 'next';
import {notFound} from 'next/navigation';

import {getPostBySlug} from '@/components/blog/lib/fetch-data';
import ArticleBody from '@/components/blog/ArticleBody';
import PostHeader from '@/components/blog/PostHeader';
import {ShareButtons, TOC, RelatedPosts} from '@/components/blog/ui';

type Props = {
	slug: string;
};

export async function generateMetadata({params}: {params: Promise<Props>}): Promise<Metadata> {
	const {slug} = await params;
	const post = await getPostBySlug(slug);

	if (!post) return {};

	return {
		title: post.seo?.title || post.title,
		description: post.seo?.description || post.excerpt,
		openGraph: {
			title: post.seo?.title || post.title,
			description: post.seo?.description || post.excerpt,
			images: [
				{
					url: post.seo?.ogImage || '',
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
			type: 'website',
			locale: 'ru_RU',
			siteName: 'ArtMarketPrint',
			url: `https://artmarketprint.by/blog/${slug}`,
		},
		twitter: {
			card: 'summary_large_image',
			title: post.seo?.title || post.title,
			description: post.seo?.description || post.excerpt,
			images: [post.seo?.ogImage || ''],
			creator: '@artmarketprint',
			site: '@artmarketprint',
		},
		alternates: {
			canonical: `https://artmarketprint.by/blog/${slug}`,
		},
	};
}

export default async function PostDetailPage({params}: {params: Promise<Props>}) {
	const {slug} = await params;
	const post = await getPostBySlug(slug);

	console.log('Post Detail Page post', post);

	if (!post) return notFound();

	return (
		<main className="container mx-auto py-8">
			<PostHeader post={post} />
			<div className="flex flex-col lg:flex-row gap-8">
				<article className="flex-1">
					<TOC body={post.body} />
					<ArticleBody body={post.body} />
					<ShareButtons post={post} />
				</article>
				<aside className="w-full lg:w-80">
					<RelatedPosts currentPostId={post.id} />
				</aside>
			</div>
		</main>
	);
}
