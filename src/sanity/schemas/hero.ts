// sanity/schemas/hero.ts
import { defineType, defineField } from 'sanity'

export const hero = defineType({
  name: 'hero',          // the internal type name
  title: 'Hero',         // what shows up in the Studio
  type: 'document',      // this is a document type
  fields: [
    defineField({
      name: 'greeting',
      title: 'Greeting',
      type: 'string',
    }),
  ],
})
