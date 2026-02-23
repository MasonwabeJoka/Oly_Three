import { defineType, defineField } from 'sanity';

export const imageFile = defineType({
  name: 'imageFile',
  title: 'Image File',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      hidden: false,
      description: 'Reference to the user who uploaded the image.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/*',
        metadata: [
           'blurhash',   
           'lqip',      
           'palette',   
           'exif',       
           'location',   
         ],
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Alternative text for the image, used for accessibility and SEO.',
        }),
        defineField({
          name: 'originalFilename',
          title: 'Original Filename',
          type: 'string',
          description: 'The original filename of the uploaded image.',
        }),
        defineField({
          name: 'location',
          title: 'Location',
          type: 'geopoint',
          description: 'Geographic location where the image was taken.',
        }),
      ],
      description: 'The image asset with optional metadata fields.',
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
