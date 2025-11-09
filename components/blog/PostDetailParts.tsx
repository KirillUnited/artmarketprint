import { Post } from '@/lib/posts/types';
import Link from 'next/link';

export function RelatedPosts({ currentPostId }: { currentPostId: string }) {
  // Placeholder: In production, fetch related posts by category/tag
  return (
    <aside className="mb-8">
      <h3 className="text-lg font-semibold mb-2">Related Posts</h3>
      <ul className="space-y-2">
        {/* TODO: Dynamically render related posts */}
        <li>
          <Link href="#" className="text-blue-600 hover:underline">
            Example Related Post
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export function ShareButtons({ post }: { post: Post }) {
  // Placeholder: Add real share logic
  return (
    <div className="flex gap-2 mt-6 mb-2">
      <button className="btn btn-sm btn-outline">Share</button>
      {/* Add HeroUI/heroicons here */}
    </div>
  );
}

export function Comments({ postId }: { postId: string }) {
  // Placeholder: Integrate Disqus or custom comments
  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <div className="text-neutral-500">Comments integration coming soon.</div>
    </section>
  );
}
