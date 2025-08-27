import { defineType, defineField } from 'sanity'

export const store = defineType({
  name: 'store',
  title: 'Store',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Store Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'owner',
      title: 'Owner',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user who owns or manages this store',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text', description: 'Describe the image for accessibility' },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description of the store',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One or more categories or tags',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'line1', title: 'Address Line 1', type: 'string' },
        { name: 'line2', title: 'Address Line 2', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'region', title: 'Region/State', type: 'string' },
        { name: 'postalCode', title: 'Postal Code', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
        {
          name: 'location',
          title: 'Geo Location',
          type: 'geopoint',
          description: 'Latitude/longitude for maps',
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
          validation: (Rule) => Rule.min(7).max(32),
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) =>
            Rule.email().error('Must be a valid email address'),
        },
        { name: 'website', title: 'Website', type: 'url' },
        {
          name: 'social',
          title: 'Social Links',
          type: 'array',
          of: [
            defineField({
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                { name: 'platform', title: 'Platform', type: 'string' },
                { name: 'url', title: 'URL', type: 'url' },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      description: 'Structured opening hours for each day',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
              },
            },
            { name: 'open', title: 'Open (HH:MM)', type: 'string' },
            { name: 'close', title: 'Close (HH:MM)', type: 'string' },
            {
              name: 'closed',
              title: 'Closed',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'averageRating',
      title: 'Average Rating',
      type: 'number',
      readOnly: true,
      description: 'Calculated from reviews (0-5)',
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishAt',
      title: 'Publish At',
      type: 'datetime',
      description: 'Schedule publish date/time',
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' },
      ],
    }),
    // admin / internal
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      hidden: false,
    }),
  ],
})