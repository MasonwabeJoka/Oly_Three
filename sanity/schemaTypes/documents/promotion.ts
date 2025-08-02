import { defineType, defineField } from 'sanity';

export const promotion = defineType({
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The public title of the promotion (used in UI, emails, etc).',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'A URL-safe identifier for internal linking and tracking.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A detailed description of the promotion, used in banners or newsletters.',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'Date and time when the promotion becomes active.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'Date and time when the promotion ends.',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: true,
      description: 'Use this to manually disable the promotion without deleting it.',
    }),
    defineField({
      name: 'targetSites',
      title: 'Target Sites',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Oly', value: 'oly' },
          { title: 'Oly Auto', value: 'oly-auto' },
          { title: 'Oly Properties', value: 'oly-properties' },
          { title: 'Oly Hiring', value: 'oly-hiring' },
          { title: 'Oly Services', value: 'oly-services' },
        ],
      },
      description: 'Specify which platforms this promotion appears on.',
    }),
    defineField({
      name: 'promoCode',
      title: 'Promo Code',
      type: 'string',
      description: 'Optional promo code users can enter during checkout.',
    }),
    defineField({
      name: 'ads',
      title: 'Associated Ads',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'ad' }] }],
      description: 'Ads that are being promoted via this campaign.',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      description: 'Image used in promotional banners or featured placements.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'priority',
      title: 'Display Priority',
      type: 'number',
      description: 'Higher numbers appear first when multiple promotions are shown.',
      initialValue: 0,
    }),
    defineField({
      name: 'createdBy',
      title: 'Created By',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'Who created this promotion (for auditing purposes).',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      rows: 2,
      description: 'Optional notes only visible to administrators.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'bannerImage',
      subtitle: 'promoCode',
    },
  },
});
