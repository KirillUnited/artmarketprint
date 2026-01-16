import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'
import { getUrlFor } from '@/lib/utils'
import { PortableText } from 'next-sanity'
import { CalendarIcon } from 'lucide-react'
import Section from '@/components/layout/Section'
import { Metadata } from 'next'

interface PostPageProps {
  slug: string
}

export async function generateMetadata({ params }: { params: Promise<PostPageProps> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${slug}`;

  if (!post) return {};

  return {
    title: post.seo?.title || `${post.title}`,
    description: post.seo?.description || `${post.excerpt}`,
    alternates: {
      canonical: url,
      languages: {
        'ru-BY': url,
        'ru-RU': 'https://artmarketprint.ru/posts/' + slug,
        'x-default': url,
      },
    },
  }
}

export default async function PostPage({ params }: { params: Promise<PostPageProps> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Section>
      <header className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <time dateTime={post.publishedAt} className="flex items-center gap-2 text-sm">
            <CalendarIcon size={16} />
            {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.author && (
            <address className="text-sm not-italic">
              By <span className="font-medium">{post.author}</span>
            </address>
          )}
        </div>
        
        {post.mainImage && (
          <figure className="mb-8 mx-auto">
            <Image
              src={getUrlFor(post.mainImage)}
              alt={post.title}
              width={1200}
              height={630}
              className="rounded-lg object-cover w-full"
              priority
            />
          </figure>
        )}
      </header>
      <article className="prose mx-auto py-8">
        <PortableText value={post.body} />
      </article>
    </Section>
  )
}
