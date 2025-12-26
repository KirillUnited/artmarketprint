import {Metadata} from 'next';
import {notFound} from 'next/navigation';

import {getPostBySlug} from '@/components/blog/lib/fetch-data';
import ArticleBody from '@/components/blog/ArticleBody';
import PostHeader from '@/components/blog/PostHeader';
import {TOC, RelatedPosts} from '@/components/blog/ui';
import {ServiceBreadcrumb} from '@/components/ui/Breadcrumb';
import Section from '@/components/layout/Section';

type Props = {
	slug: string;
};

export async function generateMetadata({params}: {params: Promise<Props>}): Promise<Metadata> {
	const {slug} = await params;
	const post = await getPostBySlug(slug);
	const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${slug}`;

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
			url: url,
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
			canonical: url,
			languages: {
				'ru-BY': url,
				'ru-RU': 'https://artmarketprint.ru/blog/' + slug,
				'x-default': url,
			},
		},
	};
}

export default async function PostDetailPage({params}: {params: Promise<Props>}) {
	const {slug} = await params;
	const post = await getPostBySlug(slug);

	if (!post) return notFound();

	return (
		<Section>
			<div className={'max-w-screen-lg mx-auto'}>
				<PostHeader post={post} />
				<div className="mb-4">
					<ServiceBreadcrumb service="Блог" serviceSlug="blog" title={post.title} />
				</div>
				<div className="flex flex-col gap-8">
					{post?.body && (
						<article className="flex-1">
							<TOC body={post.body} />
							<ArticleBody body={post.body} />
						</article>
					)}
					<aside className="w-full">
						<RelatedPosts currentPostId={post._id} />
					</aside>
				</div>
			</div>
		</Section>
	);
}
