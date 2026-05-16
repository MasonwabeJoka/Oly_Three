import { defineType, defineField } from 'sanity';

export const socialMediaLink = defineType({
  name: 'socialMediaLink',
  title: 'Social Media Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});

  