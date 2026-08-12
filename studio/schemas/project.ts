import { defineType, defineField, defineArrayMember } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'One-line description of what the project is',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Problem/context blurb for project cards',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 5,
      description: 'Full case-study overview',
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'audience',
      title: 'Who Uses It',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'My Role',
      type: 'string',
      description: 'e.g. Backend Developer',
    }),
    defineField({
      name: 'contribution',
      title: 'My Contribution',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'techGroups',
      title: 'Technical Stack',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'techGroup',
          fields: [
            defineField({ name: 'category', title: 'Category', type: 'string' }),
            defineField({
              name: 'technologies',
              title: 'Technologies',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { title: 'category', technologies: 'technologies' },
            prepare({ title, technologies }) {
              return {
                title: title || 'Stack group',
                subtitle: technologies?.join(' · '),
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'architecture',
      title: 'Architecture Steps',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ordered flow steps for architecture diagram',
    }),
    defineField({
      name: 'technicalChallenges',
      title: 'Engineering Challenges',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'challenge',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'problem', title: 'The Problem', type: 'text', rows: 3 }),
            defineField({
              name: 'investigation',
              title: 'The Investigation',
              type: 'text',
              rows: 3,
            }),
            defineField({ name: 'solution', title: 'The Solution', type: 'text', rows: 3 }),
            defineField({ name: 'result', title: 'The Result', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),
    defineField({
      name: 'technicalDecisions',
      title: 'Technical Decisions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'decision',
          fields: [
            defineField({ name: 'title', title: 'Decision', type: 'string' }),
            defineField({ name: 'rationale', title: 'Rationale', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'tagline', media: 'heroImage' },
  },
})
