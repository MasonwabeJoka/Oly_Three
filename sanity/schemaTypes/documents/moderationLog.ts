// schemas/documents/moderationLog.ts
import { defineType, defineField } from 'sanity';

// This schema logs moderation actions taken on content across the classifieds websites.
// Useful for audit trails, user disputes, and training AI/automated moderation systems.
export const moderationLog = defineType({
  name: 'moderationLog',
  title: 'Moderation Log',
  type: 'document',
  fields: [
    defineField({
      name: 'moderatorId',
      title: 'Moderator',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user (moderator or admin) who performed the moderation action.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'string',
      options: {
        list: [
          { title: 'Approve', value: 'approve' },
          { title: 'Reject', value: 'reject' },
          { title: 'Flag for Review', value: 'flag' },
          { title: 'Delete', value: 'delete' },
          { title: 'Edit', value: 'edit' },
          { title: 'Hide', value: 'hide' },
          { title: 'Unhide', value: 'unhide' },
          { title: 'Restore', value: 'restore' },
        ],
        layout: 'dropdown',
      },
      description: 'The type of moderation action taken.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: ['listing', 'review', 'message', 'comment', 'userProfile'],
        layout: 'dropdown',
      },
      description: 'The type of content moderated. Helps categorize the action.',
    }),
    defineField({
      name: 'contentId',
      title: 'Content Reference',
      type: 'reference',
      to: [
        { type: 'listing' },
        { type: 'review' },
        { type: 'message' },
        { type: 'moderationComment' },
        { type: 'user' },
      ],
      description: 'The specific content item that was moderated.',
    }),
    defineField({
      name: 'reason',
      title: 'Reason',
      type: 'string',
      description: 'Short reason code or tag for moderation action (e.g. spam, harassment).',
    }),
    defineField({
      name: 'notes',
      title: 'Moderator Notes',
      type: 'text',
      description: 'Optional free-form notes explaining the moderation decision.',
    }),
    defineField({
      name: 'previousState',
      title: 'Previous State',
      type: 'string',
      description: 'State of the content before the moderation (e.g. published, pending).',
    }),
    defineField({
      name: 'newState',
      title: 'New State',
      type: 'string',
      description: 'State of the content after the moderation (e.g. rejected, hidden).',
    }),
    defineField({
      name: 'automated',
      title: 'Automated Moderation',
      type: 'boolean',
      description: 'Whether this action was performed by an automated system or human.',
      initialValue: false,
    }),
    defineField({
      name: 'date',
      title: 'Date & Time',
      type: 'datetime',
      description: 'The timestamp of the moderation action.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: ['oly', 'oly-auto', 'oly-properties', 'oly-hiring', 'oly-services'],
        layout: 'dropdown',
      },
      description: 'The site on which the moderation occurred.',
    }),
  ],
});
