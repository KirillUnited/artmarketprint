import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'
import Section from '@/components/layout/Section'
import { Metadata } from 'next'
import { ArticleBody } from '@/components/blog'

interface ArticlePageProps {
    slug: string
}

export async function generateMetadata({ params }: {params: Promise<ArticlePageProps>}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${slug}`;

  return {
    alternates: {
      canonical: url,
      languages: {
        'ru-BY': url,
        'ru-RU': 'https://artmarketprint.ru/posts/' + slug,
        'x-default': url,
      },
    },
  };
}

export default async function ArticlePage({ params }: {params: Promise<ArticlePageProps>}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Section>
      <div className={'max-w-screen-lg mx-auto'}>
        <div className="flex flex-col gap-8">
          {post?.body && (
            <article className="flex-1">
              <ArticleBody body={post.body} />
            </article>
          )}
        </div>
      </div>
    </Section>
  )
}
