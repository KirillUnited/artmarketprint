import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPostBySlug } from '@/components/blog/lib/fetch-data';
import ArticleBody, { type ArticleHeading } from '@/components/blog/ArticleBody';
import PostHeader from '@/components/blog/PostHeader';
import { TOC, RelatedPosts } from '@/components/blog/ui';
import type { Heading } from '@/components/blog/ui/TOC';
import { ServiceBreadcrumb } from '@/components/ui/Breadcrumb';
import { dedupeSlugs, slugify } from '@/lib/slugify';
import { Image } from '@heroui/image';
import NextImage from 'next/image';
import { urlFor } from '@/sanity/lib/image';

type Props = {
	slug: string;
};

export async function generateMetadata({ params }: { params: Promise<Props> }): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPostBySlug(slug);
	const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${slug}`;
	const title = post.title;
	const description = `${title}. Читайте в блоге ArtMarketPrint.`;

	if (!post) return {};

	return {
		title,
		description,
		openGraph: {
			title,
			description,
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
			title,
			description,
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

export default async function PostDetailPage({ params }: { params: Promise<Props> }) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) return notFound();

	const jsonLd = post?.faq || [];

	// Готовим список H2-заголовков один раз с уникальными slug-ами —
	// передаём в TOC (для ссылок) и в ArticleBody (для id на DOM-узлах),
	// чтобы они гарантированно совпадали.
	const headings: Heading[] = (post.body || [])
		.filter(
			(block: any) =>
				block._type === 'block' &&
				block.style === 'h2' &&
				block.children &&
				block.children.length > 0,
		)
		.map((block: any) => {
			const text = (block.children as Array<{ text?: string }>)
				.map((c) => c.text ?? '')
				.join(' ');
			return { key: block._key, style: block.style, text, slug: '' };
		});
	const uniqueSlugs = dedupeSlugs(headings.map((h) => slugify(h.text)));
	headings.forEach((h, i) => {
		h.slug = uniqueSlugs[i];
	});

	const articleHeadings: ArticleHeading[] = headings.map((h) => ({
		_key: h.key,
		slug: h.slug,
		text: h.text,
	}));

	return (
		<>
			{/* JSON-LD script */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: jsonLd,
				}}
			/>
			<ServiceBreadcrumb service="Блог" serviceSlug="blog" title={post.title} />
			<div className={'grid xl:grid-cols-[480px_1fr] gap-8'}>
				{post.featuredImage && (
					<Image
						priority
						removeWrapper
						alt={post.title}
						as={NextImage}
						className="w-full h-72 object-cover rounded-large xl:hidden"
						height={270}
						src={urlFor(post.featuredImage).width(1200).format('webp').url()}
						width={1200}
					/>
				)}
				<TOC className="sticky top-32" headings={headings} />
				<div>
					<PostHeader post={post} />
					<div className="flex flex-col gap-8">
						{post?.body && (
							<article className="flex-1">
								<ArticleBody body={post.body} headings={articleHeadings} />
							</article>
						)}
					</div>
				</div>
			</div>
			<aside className="w-full">
				<RelatedPosts currentPostId={post._id} />
			</aside>F
		</>
	);
}
