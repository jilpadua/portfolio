import { defineType, defineField } from 'sanity';

// Define Experience Item as a separate object schema
const experienceItem = defineType({
  name: 'experienceItem',
  title: 'Experience Item',
  type: 'object',
  fields: [
    defineField({ name: 'role', type: 'string', title: 'Role' }),
    defineField({ name: 'company', type: 'string', title: 'Company' }),
    defineField({ name: 'period', type: 'string', title: 'Period' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
  ],
});

export default defineType({
  name: 'experienceSection',
  title: 'Experience Section',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Experience Items',
      type: 'array',
      of: [{ type: 'experienceItem' }], // Reference the separate schema here
    }),
  ],
  // Register the nested type with this schema
  preview: {
    select: {
      title: 'items.0.role',
    },
  },
});
