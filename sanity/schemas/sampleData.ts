// Sample data for seeding (for development/testing)
export const sampleAuthors = [
  { _type: 'author', name: 'Jane Doe', bio: 'Tech writer', image: null },
  { _type: 'author', name: 'John Smith', bio: 'SEO specialist', image: null },
];

export const sampleCategories = [
  { _type: 'category', title: 'Next.js', slug: { current: 'nextjs' }, description: 'All about Next.js' },
  { _type: 'category', title: 'SEO', slug: { current: 'seo' }, description: 'SEO best practices' },
];

export const samplePosts = [
  {
    _type: 'post',
    title: 'How to Build an SEO-Optimized Blog with Next.js',
    slug: { current: 'seo-optimized-blog-nextjs' },
    excerpt: 'Learn how to leverage Next.js for SEO.',
    body: [{ _type: 'block', children: [{ _type: 'span', text: 'Full article body here.' }] }],
    featuredImage: null,
    author: { _type: 'reference', _ref: 'author-1' },
    categories: [{ _type: 'reference', _ref: 'category-1' }],
    publishDate: '2025-11-01T10:00:00Z',
    seo: { metaTitle: 'SEO Blog Next.js', metaDesc: 'Build SEO blogs with Next.js', keywords: ['nextjs', 'seo', 'blog'] },
    faq: '',
    readingTime: 5,
  },
];
