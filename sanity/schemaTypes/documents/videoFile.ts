import { defineType, defineField } from 'sanity';

export const videoFile = defineType({
  name: 'videoFile',
  title: 'Video File',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      hidden: false,
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
    
        accept: 'video/*',
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),

        defineField({
          name: 'originalFilename',
          title: 'Original Filename',
          type: 'string',
          description: 'The original filename of the uploaded video.',
        }),

        defineField({
          name: 'location',
          title: 'Location',
          type: 'geopoint',
          description: 'Geographic location where the video was taken.',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'user.firstName',
      user: 'user.name',
      image: 'image',
    },
    prepare(selection) {
      const { title, user, image } = selection;
      return {
        title: user || title || 'Untitled',
        media: image,
      };
    },
  },
});
