// schemas/documents/notification.ts
import { defineType, defineField } from 'sanity'

export const notification = defineType({
  name: 'notification',
  title: 'Notification',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'Recipient',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user who will receive the notification.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 3,
      description: 'The main content of the notification.',
      validation: (Rule) => Rule.required().min(5),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'The type of notification.',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Success', value: 'success' },
          { title: 'Warning', value: 'warning' },
          { title: 'Error', value: 'error' },
          { title: 'Promotion', value: 'promotion' },
          { title: 'System', value: 'system' },
          { title: 'Chat', value: 'chat' },
          { title: 'New Listing', value: 'new-listing' },
          { title: 'Booking', value: 'booking' },
          { title: 'Auction', value: 'auction' },
          { title: 'Reminder', value: 'reminder' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Read Status',
      type: 'string',
      description: 'The read/delivery status of this notification.',
      options: {
        list: [
          { title: 'Unread', value: 'unread' },
          { title: 'Read', value: 'read' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'unread',
    }),
    defineField({
      name: 'actionLabel',
      title: 'Action Label',
      type: 'string',
      description: 'Optional call-to-action label, e.g., "View Ad", "Open Chat".',
    }),
    defineField({
      name: 'actionUrl',
      title: 'Action URL',
      type: 'url',
      description: 'Optional URL users are taken to when clicking the notification.',
    }),
    defineField({
      name: 'referenceType',
      title: 'Related Type',
      type: 'string',
      options: {
        list: [
          { title: 'Ad', value: 'ad' },
          { title: 'Chat', value: 'chat' },
          { title: 'User', value: 'user' },
          { title: 'Auction', value: 'auction' },
          { title: 'None', value: 'none' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'referenceId',
      title: 'Reference ID',
      type: 'string',
      description: 'Optional related document ID (e.g., Ad ID, Chat ID). Used for linking.',
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: [
          { title: 'Oly', value: 'oly' },
          { title: 'Oly Properties', value: 'oly-properties' },
          { title: 'Oly Auto', value: 'oly-auto' },
          { title: 'Oly Hiring', value: 'oly-hiring' },
          { title: 'Oly Services', value: 'oly-services' },
        ],
        layout: 'dropdown',
      },
      description: 'The specific site this notification is related to.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sentAt',
      title: 'Sent At',
      type: 'datetime',
      description: 'Date and time the notification was sent.',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readAt',
      title: 'Read At',
      type: 'datetime',
      description: 'Timestamp when the user read the notification.',
    }),
    defineField({
      name: 'delivered',
      title: 'Delivered?',
      type: 'boolean',
      initialValue: false,
      description: 'Whether the notification was successfully delivered (e.g., push, email).',
    }),
    defineField({
      name: 'deliveryAttempts',
      title: 'Delivery Attempts',
      type: 'number',
      initialValue: 0,
      description: 'How many times delivery has been attempted (for retry logic).',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      title: 'message',
      subtitle: 'type',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Type: ${selection.subtitle}`,
      }
    },
  },
})
