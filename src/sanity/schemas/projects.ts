import { defineType, defineField } from 'sanity';

// Define Project as a separate object schema
const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'link', type: 'url', title: 'Project Link' }),
  ],
});

export default defineType({
  name: 'projectsSection',
  title: 'Projects Section',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Projects',
      type: 'array',
      of: [{ type: 'project' }], // Reference the separate schema here
    }),
  ],
  preview: {
    select: {
      title: 'items.0.title',
    },
  },
});
