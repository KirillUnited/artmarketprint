import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt' }),
    defineField({ name: 'body', type: 'array', title: 'Body', of: [{type: 'block'}] }),
    defineField({ name: 'featuredImage', type: 'image', title: 'Featured Image', options: { hotspot: true } }),
    defineField({ name: 'author', type: 'reference', to: [{type: 'author'}], title: 'Author' }),
    defineField({ name: 'categories', type: 'array', title: 'Categories', of: [{type: 'reference', to: [{type: 'category'}]}] }),
    defineField({ name: 'publishDate', type: 'datetime', title: 'Publish Date' }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDesc', type: 'string', title: 'Meta Description' },
        { name: 'keywords', type: 'array', title: 'Keywords', of: [{type: 'string'}] },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ (JSON-LD)',
      type: 'text',
      description: 'Optional: Structured FAQ schema for SEO',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'number',
      description: 'Auto-calculate or enter manually',
    }),
  ],
});
