import { defineType, defineField } from 'sanity'

type SectionCopyOptions = {
  eyebrowPlaceholder: string
  headingPlaceholder: string
  descriptionPlaceholder: string
  headingDescription: string
}

function sectionCopyFields({
  eyebrowPlaceholder,
  headingPlaceholder,
  descriptionPlaceholder,
  headingDescription,
}: SectionCopyOptions) {
  return [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label shown above the heading.',
      placeholder: eyebrowPlaceholder,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: headingDescription,
      placeholder: headingPlaceholder,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short intro shown under the heading.',
      placeholder: descriptionPlaceholder,
    }),
  ]
}

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile', default: true },
    { name: 'homepage', title: 'Homepage' },
    { name: 'recruiter', title: 'Recruiter Mode' },
    { name: 'footer', title: 'Footer' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'profile',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'profile',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'focusLine',
      title: 'Focus Line',
      type: 'string',
      group: 'profile',
      description: 'e.g. Backend · APIs · Databases',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'profile',
      rows: 3,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'profile',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
      group: 'profile',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'profile',
    }),
    defineField({
      name: 'cvUrl',
      title: 'CV / Resume URL',
      type: 'url',
      group: 'profile',
    }),
    defineField({
      name: 'selectedWork',
      title: 'Selected Work',
      type: 'object',
      group: 'homepage',
      description: 'Copy for the Selected Work section on the homepage.',
      fields: sectionCopyFields({
        eyebrowPlaceholder: 'Portfolio',
        headingPlaceholder: 'Selected Work',
        descriptionPlaceholder:
          'Projects where I contributed to real systems, applications, APIs, or product functionality.',
        headingDescription: 'Section title displayed above the project list.',
      }),
      initialValue: {
        eyebrow: 'Portfolio',
        heading: 'Selected Work',
        description:
          'Projects where I contributed to real systems, applications, APIs, or product functionality.',
      },
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'object',
      group: 'homepage',
      description: 'Copy for the Experience section on the homepage.',
      fields: sectionCopyFields({
        eyebrowPlaceholder: 'Career',
        headingPlaceholder: 'Experience',
        descriptionPlaceholder:
          'Professional roles with engineering context beyond a resume listing.',
        headingDescription: 'Section title displayed above the role list.',
      }),
      initialValue: {
        eyebrow: 'Career',
        heading: 'Experience',
        description: 'Professional roles with engineering context beyond a resume listing.',
      },
    }),
    defineField({
      name: 'engineering',
      title: 'Skills',
      type: 'object',
      group: 'homepage',
      description: 'Copy for the Skills / Technical Stack section on the homepage.',
      fields: sectionCopyFields({
        eyebrowPlaceholder: 'Technical focus',
        headingPlaceholder: 'Skills',
        descriptionPlaceholder:
          'Technologies organized by capability, with a clear backend emphasis.',
        headingDescription: 'Section title displayed above the skill groups.',
      }),
      initialValue: {
        eyebrow: 'Technical focus',
        heading: 'Skills',
        description: 'Technologies organized by capability, with a clear backend emphasis.',
      },
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      group: 'homepage',
      description: 'Copy for the Contact section on the homepage.',
      fields: sectionCopyFields({
        eyebrowPlaceholder: 'Contact',
        headingPlaceholder: "Let's build something useful.",
        descriptionPlaceholder:
          'Available for junior software development opportunities and interesting engineering projects.',
        headingDescription: 'Headline displayed above the contact buttons.',
      }),
      initialValue: {
        eyebrow: 'Contact',
        heading: "Let's build something useful.",
        description:
          'Available for junior software development opportunities and interesting engineering projects.',
      },
    }),
    defineField({
      name: 'recruiter',
      title: 'Recruiter Mode',
      type: 'object',
      group: 'recruiter',
      description: 'Copy shown when Recruiter Mode is on. Project lists and filters stay unchanged.',
      fields: [
        defineField({
          name: 'modeLabel',
          title: 'Mode Label',
          type: 'string',
          description: 'Small label above the name in Recruiter Mode.',
          placeholder: 'Recruiter mode',
        }),
        defineField({
          name: 'quickProfileHeading',
          title: 'Quick Profile Heading',
          type: 'string',
          description: 'Title of the quick profile block.',
          placeholder: 'Quick profile',
        }),
        defineField({
          name: 'projects',
          title: 'Projects',
          type: 'object',
          description: 'Heading and description above the Recruiter Mode project list.',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              placeholder: 'Best projects',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              placeholder: 'Projects selected for backend, API, and integration work.',
            }),
          ],
        }),
        defineField({
          name: 'ctaHeading',
          title: 'Call to Action Heading',
          type: 'string',
          description: 'Headline above the Recruiter Mode resume and contact buttons.',
          placeholder: 'Interested in working together?',
        }),
      ],
      initialValue: {
        modeLabel: 'Recruiter mode',
        quickProfileHeading: 'Quick profile',
        projects: {
          heading: 'Best projects',
          description: 'Projects selected for backend, API, and integration work.',
        },
        ctaHeading: 'Interested in working together?',
      },
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      description: 'Credit line shown after the copyright year and name.',
      fields: [
        defineField({
          name: 'credit',
          title: 'Credit Line',
          type: 'string',
          description: 'Appears after the year and name, e.g. Built with Next.js and Sanity.',
          placeholder: 'Built with Next.js and Sanity.',
        }),
      ],
      initialValue: {
        credit: 'Built with Next.js and Sanity.',
      },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
})
