import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import ArticleBody from '@/components/blog/ArticleBody';
import PostHeader from '@/components/blog/PostHeader';
import { Comments, ShareButtons, TOC, RelatedPosts } from '@/components/blog/PostDetailParts';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    openGraph: { images: [post.featuredImage] },
  };
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  return (
    <main className="container mx-auto py-8">
      <PostHeader post={post} />
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1">
          <TOC body={post.body} />
          <ArticleBody body={post.body} />
          <ShareButtons post={post} />
          <Comments postId={post.id} />
        </article>
        <aside className="w-full lg:w-80">
          <RelatedPosts currentPostId={post.id} />
        </aside>
      </div>
    </main>
  );
}
