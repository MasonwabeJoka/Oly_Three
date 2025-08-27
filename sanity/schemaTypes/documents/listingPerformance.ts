import { defineType, defineField } from 'sanity';

// This schema tracks the performance metrics of advertisements across the websites.
export const listingPerformance = defineType({
  name: 'listingPerformance',
  title: 'Listing Performance',
  type: 'document',
  fields: [
    defineField({
      name: 'listingId',
      title: 'Listing',
      type: 'reference',
      to: [{ type: 'listing' }],
      description: 'Reference to the advertisement whose performance is tracked.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      description: 'The number of times the listing has been viewed.',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'clicks',
      title: 'Clicks',
      type: 'number',
      description: 'The number of times the listing has been clicked.',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'impressions',
      title: 'Impressions',
      type: 'number',
      description: 'Total number of times the listing was shown (e.g. in listings, search, etc).',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'conversions',
      title: 'Conversions',
      type: 'number',
      description: 'Number of meaningful outcomes (e.g. contact form submitted, checkout started).',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'ctr',
      title: 'Click Through Rate (CTR)',
      type: 'number',
      description: 'Optional precomputed CTR to allow filtering/sorting in Sanity dashboard.',
      readOnly: true,
      hidden: true, // Only if calculated externally
    }),

    defineField({
      name: 'period',
      title: 'Tracking Period',
      type: 'string',
      description: 'Time period of this metric set (e.g., daily, weekly, monthly).',
      options: {
        list: [
          { title: 'Daily', value: 'daily' },
          { title: 'Weekly', value: 'weekly' },
          { title: 'Monthly', value: 'monthly' },
          { title: 'Lifetime', value: 'lifetime' },
        ],
        layout: 'radio',
      },
      initialValue: 'daily',
    }),

    defineField({
      name: 'date',
      title: 'Tracking Date',
      type: 'datetime',
      description: 'Timestamp for the start of the tracking period (e.g., start of day).',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      description: 'The Oly platform where the listing is listed (e.g., oly, oly-auto, oly-properties).',
      options: {
        list: ['oly', 'oly-auto', 'oly-properties', 'oly-hiring', 'oly-services'],
        layout: 'dropdown',
      },
      initialValue: 'oly',
    }),

    defineField({
      name: 'source',
      title: 'Traffic Source',
      type: 'string',
      description: 'Where the traffic originated from (e.g., organic, search, campaign, social).',
      options: {
        list: [
          { title: 'Organic', value: 'organic' },
          { title: 'Search', value: 'search' },
          { title: 'Social', value: 'social' },
          { title: 'Email', value: 'email' },
          { title: 'Paid Listings', value: 'paid' },
        ],
        layout: 'dropdown',
      },
    }),
  ],

  preview: {
    select: {
      listing: 'listingId.title',
      views: 'views',
      clicks: 'clicks',
      date: 'date',
    },
    prepare({ listing, views, clicks, date }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : 'Unknown date';
      return {
        title: listing || 'Untitled Listing',
        subtitle: `${views || 0} views, ${clicks || 0} clicks on ${dateStr}`,
      };
    },
  },
});
