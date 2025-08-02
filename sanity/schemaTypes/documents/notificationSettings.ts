// schemas/documents/notificationSettings.ts
import { defineType, defineField } from 'sanity'

export const notificationSettings = defineType({
  name: 'notificationSettings',
  title: 'Notification Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user whose settings are being defined.',
      validation: (Rule) => Rule.required(),
    }),

    // Channels
    defineField({
      name: 'channels',
      title: 'Notification Channels',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email Notifications',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'push',
          title: 'Push Notifications',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'sms',
          title: 'SMS Notifications',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'inApp',
          title: 'In-App Notifications',
          type: 'boolean',
          initialValue: true,
        },
      ],
      description: 'Which channels the user wants to receive notifications on.',
    }),

    // Categories
    defineField({
      name: 'categories',
      title: 'Notification Categories',
      type: 'object',
      fields: [
        {
          name: 'messages',
          title: 'New Messages',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'replies',
          title: 'Ad Replies',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'ads',
          title: 'Ad Updates & Expiry',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'promotion',
          title: 'Promotional Offers',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'security',
          title: 'Security & Account Activity',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'newsletter',
          title: 'Newsletter & Announcements',
          type: 'boolean',
          initialValue: true,
        },
      ],
      description: 'Which kinds of events the user wants to be notified about.',
    }),

    // Frequency
    defineField({
      name: 'digestFrequency',
      title: 'Digest Frequency',
      type: 'string',
      options: {
        list: [
          { title: 'Instant', value: 'instant' },
          { title: 'Hourly', value: 'hourly' },
          { title: 'Daily', value: 'daily' },
          { title: 'Weekly', value: 'weekly' },
          { title: 'Off', value: 'off' },
        ],
      },
      initialValue: 'instant',
      description: 'How often notifications are delivered if grouped (e.g. for newsletters or batch updates).',
    }),

    // Quiet Hours
    defineField({
      name: 'quietHours',
      title: 'Do Not Disturb (Quiet Hours)',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Quiet Hours',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'start',
          title: 'Start Time',
          type: 'string',
          options: {
            list: Array.from({ length: 24 }, (_, i) => ({
              title: `${i}:00`,
              value: `${i}:00`,
            })),
          },
        },
        {
          name: 'end',
          title: 'End Time',
          type: 'string',
          options: {
            list: Array.from({ length: 24 }, (_, i) => ({
              title: `${i}:00`,
              value: `${i}:00`,
            })),
          },
        },
      ],
      description: 'Prevent notifications during these hours.',
    }),

    // Language (Multilingual Notifications)
    defineField({
      name: 'language',
      title: 'Preferred Notification Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Afrikaans', value: 'af' },
          { title: 'Zulu', value: 'zu' },
          { title: 'Xhosa', value: 'xh' },
          { title: 'Sesotho', value: 'st' },
        ],
      },
      initialValue: 'en',
      description: 'Preferred language for notifications.',
    }),

    // Last updated
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      readOnly: true,
      hidden: true,
    }),
  ],
})
