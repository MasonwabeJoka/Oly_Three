import { defineType, defineField } from 'sanity';

const accept= "text/plain,text/html,text/css,text/csv,application/javascript,application/json,application/xml,text/markdown,application/msword,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.spreadsheet,application/vnd.oasis.opendocument.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf,application/postscript,application/epub+zip,application/x-mobipocket-ebook,application/zip,application/gzip,application/x-rar-compressed,application/x-7z-compressed"

export const attachment = defineType({
  name: 'attachment',
  title: 'Attachment',
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
      name: 'attachment',
      title: 'Attachment',
      type: 'file',
      options: {
        accept: accept,
      },
      fields: [
        defineField({
          name: 'fileName',
          title: 'File Name',
          type: 'string',
        }),

        defineField({
          name: 'originalFilename',
          title: 'Original Filename',
          type: 'string',
          description: 'The original filename of the uploaded file.',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'user.firstName',
      user: 'user.firstName',
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
