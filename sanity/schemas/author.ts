import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: Rule => Rule.required() }),
    defineField({ name: 'bio', type: 'text', title: 'Bio' }),
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
  ],
});
