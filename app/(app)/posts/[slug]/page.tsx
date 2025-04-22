import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'
import { getUrlFor } from '@/lib/utils'
import { PortableText } from 'next-sanity'
import { CalendarIcon } from 'lucide-react'

interface PostPageProps {
  slug: string
}

export default async function PostPage({ params }: { params: Promise<PostPageProps> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen container max-w-4xl py-8">
      <header className="mb-8">
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
      </header>

      {post.mainImage && (
        <figure className="mb-8">
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

      <div className="prose max-w-none">
        <PortableText value={post.body} />
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-4">
          {post.categories?.map(({title}: {title: string}, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {title}
            </span>
          ))}
        </div>
      </footer>
    </article>
  )
}
