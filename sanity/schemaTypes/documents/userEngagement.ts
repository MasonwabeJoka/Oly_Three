// schemas/documents/userEngagement.ts
import { defineType, defineField } from 'sanity';

// Tracks engagement events per user across Oly platforms (Auto, Hiring, Properties, etc.)
export const userEngagement = defineType({
  name: 'userEngagement',
  title: 'User Engagement',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user whose engagement is being tracked.',
    }),

    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: ['oly', 'oly-properties', 'oly-auto', 'oly-hiring', 'oly-services'],
      },
      description: 'The site on which the engagement occurred.',
    }),

    defineField({
      name: 'sessionId',
      title: 'Session ID',
      type: 'string',
      description: 'A unique identifier for the user session.',
    }),

    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Page View', value: 'page_view' },
          { title: 'Search', value: 'search' },
          { title: 'Click', value: 'click' },
          { title: 'Message Sent', value: 'message_sent' },
          { title: 'Ad Saved', value: 'ad_saved' },
          { title: 'Ad Shared', value: 'ad_shared' },
          { title: 'Phone Number Viewed', value: 'phone_viewed' },
        ],
      },
      description: 'Type of interaction the user performed.',
    }),

    defineField({
      name: 'eventTargetId',
      title: 'Target Item ID',
      type: 'string',
      description: 'ID of the listing, service, or job involved in the interaction.',
    }),

    defineField({
      name: 'deviceType',
      title: 'Device Type',
      type: 'string',
      options: {
        list: ['desktop', 'mobile', 'tablet', 'unknown'],
      },
      description: 'Type of device used during the session.',
    }),

    defineField({
      name: 'browser',
      title: 'Browser',
      type: 'string',
      description: 'Browser used by the user (optional).',
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
      description: 'Approximate location based on IP or GPS (optional).',
    }),

    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      description: 'When the engagement event occurred.',
    }),
  ],
});
