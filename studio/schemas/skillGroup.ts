import { defineType, defineField } from 'sanity'

export const skillGroup = defineType({
  name: 'skillGroup',
  title: 'Skill Group',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Backend', value: 'backend' },
          { title: 'API', value: 'api' },
          { title: 'Database', value: 'database' },
          { title: 'Frontend', value: 'frontend' },
          { title: 'Tools', value: 'tools' },
        ],
      },
    }),
    defineField({
      name: 'label',
      title: 'Display Label',
      type: 'string',
      description: 'Override label shown on site (defaults to category)',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'label', category: 'category', technologies: 'technologies' },
    prepare({ title, category, technologies }) {
      return {
        title: title || category,
        subtitle: technologies?.join(' · '),
      }
    },
  },
})
