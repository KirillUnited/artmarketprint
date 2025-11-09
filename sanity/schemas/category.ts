import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
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
    defineField({ name: 'description', type: 'text', title: 'Description' }),
  ],
});
