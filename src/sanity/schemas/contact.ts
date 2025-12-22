import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
    }),
  ],
});
