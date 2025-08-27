import { defineType, defineField } from 'sanity'

export const carDealership = defineType({
  name: 'carDealership',
  title: 'Car Dealership',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Dealership Name',
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
      description: 'User who manages this dealership',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    // Address & geo
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

    // Contact
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Phone', type: 'string' },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.email().error('Must be a valid email'),
        },
        { name: 'website', title: 'Website', type: 'url' },
        {
          name: 'social',
          title: 'Social Links',
          type: 'array',
          of: [
            defineField({
              name: 'socialLink',
              title: 'Social Link',
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

    // Opening hours
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
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
            { name: 'closed', title: 'Closed', type: 'boolean', initialValue: false },
          ],
        },
      ],
    }),

    // Inventory: array of car objects
    defineField({
      name: 'inventory',
      title: 'Inventory',
      type: 'array',
      of: [
        defineField({
          name: 'car',
          title: 'Car',
          type: 'object',
          fields: [
            { name: 'make', title: 'Make', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'model', title: 'Model', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'trim', title: 'Trim', type: 'string' },
            { name: 'year', title: 'Year', type: 'number' },
            { name: 'vin', title: 'VIN', type: 'string' },
            { name: 'mileage', title: 'Mileage', type: 'number' },
            {
              name: 'condition',
              title: 'Condition',
              type: 'string',
              options: {
                list: [
                  { title: 'New', value: 'new' },
                  { title: 'Used', value: 'used' },
                  { title: 'Certified', value: 'certified' },
                ],
              },
            },
            { name: 'price', title: 'Price', type: 'number' },
            { name: 'currency', title: 'Currency', type: 'string', initialValue: 'USD' },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
                },
              ],
            },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'available',
              title: 'Available',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'postedAt',
              title: 'Posted At',
              type: 'datetime',
            },
          ],
        }),
      ],
    }),

    // Services offered (maintenance, detailing, trade-in, appraisal, etc.)
    defineField({
      name: 'services',
      title: 'Services Offered',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'price', title: 'Price', type: 'number' },
          ],
        },
      ],
    }),

    // Financing info
    defineField({
      name: 'financing',
      title: 'Financing',
      type: 'object',
      fields: [
        { name: 'offersFinancing', title: 'Offers Financing', type: 'boolean', initialValue: false },
        { name: 'financingDetails', title: 'Financing Details', type: 'text' },
        { name: 'prequalLink', title: 'Pre-qualification Link', type: 'url' },
      ],
    }),

    // Ratings & reviews
    defineField({
      name: 'averageRating',
      title: 'Average Rating',
      type: 'number',
      readOnly: true,
      description: 'Calculated value (0-5) from reviews',
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
    }),

    // Tags / specialties (brands carried, EV, luxury, fleet, etc.)
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g. Tesla, BMW, used, fleet sales, EV servicing',
    }),

    // Admin / metadata
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
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' },
      ],
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
    }),
  ],
})