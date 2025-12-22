import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'primaryButton',
      type: 'object',
      title: 'Primary Button',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'link', type: 'url', title: 'Button Link' },
      ],
    }),
    defineField({
      name: 'secondaryButton',
      type: 'object',
      title: 'Secondary Button',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'link', type: 'url', title: 'Button Link' },
      ],
    }),
  ],
});
