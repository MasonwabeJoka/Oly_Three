import { defineType, defineField } from 'sanity';

export const Footer = defineType({
  name: 'Footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'socialMediaLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{ type: 'socialMediaLink' }],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Information',
      type: 'string',
    }),
  ],
});
