import { defineType, defineField } from 'sanity';

export const messageReply = defineType({
  name: 'messageReply',
  title: 'Message Reply',
  type: 'document',
  fields: [
    defineField({
      name: 'parentMessage',
      title: 'Parent Message',
      type: 'reference',
      to: [{ type: 'message' }],
      description: 'The message this is replying to.',
    }),
    defineField({
      name: 'sender',
      title: 'Sender',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user who sent the reply.',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The textual content of the reply.',
    }),
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      description: 'The date and time when the reply was sent.',
    }),
  ],
});
