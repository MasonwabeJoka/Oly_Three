// schemas/documents/comment.ts
import { defineType, defineField } from 'sanity';

export const moderationComment = defineType({
  name: 'moderationComment',
  title: 'Moderation Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
