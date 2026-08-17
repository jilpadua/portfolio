import { defineType, defineField, defineArrayMember } from 'sanity'

const architectureNodeTypeOptions = [
  { title: 'Client', value: 'client' },
  { title: 'API / Gateway', value: 'gateway' },
  { title: 'Service', value: 'service' },
  { title: 'Database', value: 'database' },
  { title: 'External System', value: 'external' },
]

const architectureNodeLogoOptions = [
  { title: 'None', value: 'none' },
  { title: 'Flutter', value: 'flutter' },
  { title: 'GraphQL', value: 'graphql' },
  { title: 'Node.js', value: 'nodejs' },
  { title: 'Database', value: 'database' },
  { title: 'API Gateway', value: 'api-gateway' },
  { title: 'Service', value: 'service' },
  { title: 'Hardware', value: 'hardware' },
  { title: 'Parking Device', value: 'parking-device' },
]

const focusAreaOptions = [
  { title: 'Backend', value: 'backend' },
  { title: 'APIs', value: 'api' },
  { title: 'Databases', value: 'database' },
  { title: 'Frontend', value: 'frontend' },
  { title: 'Mobile', value: 'mobile' },
]

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
      name: 'featuredForRecruiters',
      title: 'Featured for Recruiters',
      type: 'boolean',
      initialValue: false,
      description: 'Show in Recruiter Mode project list',
    }),
    defineField({
      name: 'focusAreas',
      title: 'Focus Areas',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: focusAreaOptions },
      description: 'Used for recruiter skill filters',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Optional project duration (e.g. 6 months)',
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
      name: 'contributionGroups',
      title: 'Contribution Groups',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contributionGroup',
          fields: [
            defineField({ name: 'category', title: 'Category', type: 'string' }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { title: 'category', items: 'items' },
            prepare({ title, items }) {
              return {
                title: title || 'Contribution group',
                subtitle: items?.join(' · '),
              }
            },
          },
        }),
      ],
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
      title: 'Architecture Steps (Legacy)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Legacy ordered flow steps — prefer Architecture Graph below',
    }),
    defineField({
      name: 'architectureGraph',
      title: 'Architecture Graph',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'nodes',
          title: 'Nodes',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'architectureNode',
              fields: [
                defineField({
                  name: 'id',
                  title: 'ID',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'type',
                  title: 'Type',
                  type: 'string',
                  options: { list: architectureNodeTypeOptions },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'logo',
                  title: 'Logo',
                  type: 'string',
                  options: { list: architectureNodeLogoOptions },
                  description: 'Optional visual icon for the static architecture flow',
                }),
                defineField({ name: 'purpose', title: 'Purpose', type: 'text', rows: 2 }),
                defineField({ name: 'technology', title: 'Technology', type: 'string' }),
                defineField({
                  name: 'responsibilities',
                  title: 'Responsibilities',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
                defineField({
                  name: 'relatedApis',
                  title: 'Related APIs',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
              ],
              preview: {
                select: { title: 'label', subtitle: 'type' },
              },
            }),
          ],
        }),
        defineField({
          name: 'connections',
          title: 'Connections',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'architectureConnection',
              fields: [
                defineField({
                  name: 'from',
                  title: 'From Node ID',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'to',
                  title: 'To Node ID',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: { from: 'from', to: 'to' },
                prepare({ from, to }) {
                  return { title: `${from} → ${to}` }
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'implementation',
      title: 'Technical Implementation',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'implementationSection',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 2 }),
            defineField({
              name: 'steps',
              title: 'Steps',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { title: 'title', steps: 'steps' },
            prepare({ title, steps }) {
              return {
                title: title || 'Implementation section',
                subtitle: steps?.length ? `${steps.length} steps` : undefined,
              }
            },
          },
        }),
      ],
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
      name: 'outcomes',
      title: 'Outcomes',
      type: 'array',
      of: [{ type: 'string' }],
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
