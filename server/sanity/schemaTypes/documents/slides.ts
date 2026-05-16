import { defineType, defineField } from 'sanity';

export const slide = defineType({
  name: 'slide',
  title: 'Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, 
      },
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
          {
              type: 'block'
          }
      ], 
    }),
  ],
});