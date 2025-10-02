import { defineType, defineField } from 'sanity'

export const serviceProvider = defineType({
  name: 'serviceProvider',
  title: 'Service Provider',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User Account',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'Link to the CMS user who manages this profile',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'name',
      title: 'Display Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),

    defineField({
      name: 'businessName',
      title: 'Business / Brand Name',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short one-liner describing the provider',
    }),

    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
        },
      ],
    }),

    defineField({
      name: 'introVideo',
      title: 'Intro Video',
      type: 'url',
      description: 'Link to a hosted intro video (YouTube, Vimeo, etc.)',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'categories',
      title: 'Categories / Services',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'High level categories, e.g. Design, Plumbing, Photography',
    }),

    defineField({
      name: 'services',
      title: 'Services Offered',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'summary', title: 'Summary', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'duration', title: 'Typical Duration', type: 'string', description: 'E.g. 1 hour, 2-3 days' },
            { name: 'price', title: 'Price', type: 'number' },
            { name: 'currency', title: 'Currency', type: 'string', initialValue: 'USD' },
            { name: 'pricingModel', title: 'Pricing Model', type: 'string', options: { list: ['fixed','hourly','per_project'] } },
            { name: 'notes', title: 'Notes', type: 'string' },
          ],
        },
      ],
    }),

    defineField({
      name: 'pricingRange',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          { title: '$', value: 'low' },
          { title: '$$', value: 'medium' },
          { title: '$$$', value: 'high' },
        ],
      },
    }),

    defineField({
      name: 'portfolio',
      title: 'Portfolio / Work Samples',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'link', title: 'Link', type: 'url' },
          ],
        },
        { type: 'file', title: 'Document / Attachment' },
      ],
    }),

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
            {
              type: 'object',
              fields: [
                { name: 'platform', title: 'Platform', type: 'string' },
                { name: 'url', title: 'URL', type: 'url' },
              ],
            },
          ],
        },
      ],
    }),

     defineField({
            name: 'address',
            title: 'Address',
            type: 'reference',
            to: [{ type: 'address' }],
            description: 'The address associated with the user.',
        }),
          

    defineField({
      name: 'availability',
      title: 'Availability / Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: { list: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
            },
            { name: 'from', title: 'From (HH:MM)', type: 'string' },
            { name: 'to', title: 'To (HH:MM)', type: 'string' },
            { name: 'closed', title: 'Closed', type: 'boolean', initialValue: false },
          ],
        },
      ],
    }),

    defineField({
      name: 'booking',
      title: 'Booking & Scheduling',
      type: 'object',
      fields: [
        { name: 'bookingLink', title: 'Booking Link', type: 'url' },
        { name: 'bookingProvider', title: 'Provider', type: 'string', description: 'E.g. Calendly, Acuity, Custom' },
        { name: 'acceptsOnline', title: 'Accepts Online/Remote', type: 'boolean', initialValue: true },
      ],
    }),

    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'responseTime',
      title: 'Typical Response Time',
      type: 'string',
      description: 'E.g. Within 24 hours',
    }),

    defineField({
      name: 'certifications',
      title: 'Certifications / Licenses',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'insurance',
      title: 'Insurance / Coverage',
      type: 'string',
      description: 'List any professional insurance or coverage details',
    }),

    defineField({
      name: 'documents',
      title: 'Documents',
      type: 'array',
      of: [
        {
          type: 'file',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
        },
      ],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'averageRating',
      title: 'Average Rating',
      type: 'number',
      readOnly: true,
      description: 'Computed from linked reviews (0-5)',
    }),

    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
    }),

    defineField({
      name: 'policies',
      title: 'Policies / Terms',
      type: 'array',
      of: [{ type: 'block' }],
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