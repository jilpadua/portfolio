import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'focusLine',
      title: 'Focus Line',
      type: 'string',
      description: 'e.g. Backend · APIs · Databases',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'selectedWork',
      title: 'Selected Work',
      type: 'object',
      description:
        'Heading and description shown in the Selected Work section on the homepage.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Section title displayed above the project list.',
          placeholder: 'Selected Work',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          description: 'Short intro shown under the heading.',
          placeholder:
            'Projects where I contributed to real systems, applications, APIs, or product functionality.',
        }),
      ],
      initialValue: {
        heading: 'Selected Work',
        description:
          'Projects where I contributed to real systems, applications, APIs, or product functionality.',
      },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'cvUrl',
      title: 'CV / Resume URL',
      type: 'url',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
})
