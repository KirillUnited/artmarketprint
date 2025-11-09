import { Post } from '@/lib/posts/types';

export default function PostHeader({ post }: { post: Post }) {
  return (
    <header className="mb-8">
      <img
        src={post.featuredImage}
        alt={post.title}
        className="w-full h-72 object-cover rounded-lg mb-4"
        loading="lazy"
      />
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="flex items-center text-sm text-neutral-500 gap-4 mb-2">
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span>{post.author?.name}</span>
        <span>{post.readTime} min read</span>
      </div>
      <p className="text-lg text-neutral-700 dark:text-neutral-300">{post.excerpt}</p>
    </header>
  );
}
