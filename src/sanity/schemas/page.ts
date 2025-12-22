import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      of: [
        { type: 'hero' },
        { type: 'experienceSection' },
        { type: 'projectsSection' },
        { type: 'contactSection' },
      ],
    }),
  ],
});
