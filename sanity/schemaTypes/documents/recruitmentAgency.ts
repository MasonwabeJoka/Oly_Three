import { defineType, defineField } from 'sanity'

export const recruitmentAgency = defineType({
  name: 'recruitmentAgency',
  title: 'Recruitment Agency',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Agency Name',
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
      title: 'Owner / Account Manager',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'Primary user who manages this agency in the CMS',
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
      description: 'Short description of the recruitment agency and its mission',
    }),

    // Address  
    defineField({
        name: 'address',
        title: 'Address',
        type: 'reference',
        to: [{ type: 'address' }],
        description: 'The address associated with the user.',
    }),
      

    // Contact info
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

    // Business details
    defineField({
      name: 'services',
      title: 'Services Offered',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g. Permanent placement, contract staffing, executive search',
    }),

    defineField({
      name: 'specialties',
      title: 'Industry Specialties / Roles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g. Fintech, Healthcare, Sales, Engineering, C-suite',
    }),

    defineField({
      name: 'feeStructure',
      title: 'Fee Structure',
      type: 'object',
      fields: [
        { name: 'model', title: 'Model', type: 'string', options: { list: [{ title: 'Contingency', value: 'contingency' }, { title: 'Retained', value: 'retained' }, { title: 'Hourly/Contract', value: 'hourly' }] } },
        { name: 'details', title: 'Details', type: 'text' },
        { name: 'typicalPercentage', title: 'Typical Percentage / Range', type: 'string' },
      ],
    }),

    // Recruiters and team
    defineField({
      name: 'recruiters',
      title: 'Recruiters / Hiring Team',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'user' }] }],
    }),

    // Clients and partnerships
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'company' }] }],
    }),

    // Open roles (reference to job posts)
    // defineField({
    //   name: 'openRoles',
    //   title: 'Open Roles',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'jobPost' }] }],
    //   description: 'Active job postings handled by this agency',
    // }),

    // Compliance, certifications & docs
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'complianceDocs',
      title: 'Compliance / Legal Documents',
      type: 'array',
      of: [
        defineField({
          name: 'doc',
          title: 'Document',
          type: 'file',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
        }),
      ],
    }),

    // Testimonials & case studies
    defineField({
      name: 'testimonials',
      title: 'Testimonials / Case Studies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'client', title: 'Client Name', type: 'string' },
            { name: 'quote', title: 'Quote', type: 'text' },
            { name: 'role', title: 'Role Filled', type: 'string' },
            { name: 'date', title: 'Date', type: 'date' },
          ],
        },
      ],
    }),

    // Intake form template (optional structured template for candidate intake)
    defineField({
      name: 'intakeFormTemplate',
      title: 'Intake Form Template',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'key', title: 'Key', type: 'string' },
            { name: 'type', title: 'Field Type', type: 'string', options: { list: ['text', 'textarea', 'select', 'date', 'number', 'checkbox'] } },
            { name: 'required', title: 'Required', type: 'boolean' },
            { name: 'options', title: 'Options (for select)', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
      description: 'Optional template to standardize client intake forms',
    }),

    // Hours / availability
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
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
                list: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
              },
            },
            { name: 'from', title: 'From (HH:MM)', type: 'string' },
            { name: 'to', title: 'To (HH:MM)', type: 'string' },
            { name: 'closed', title: 'Closed', type: 'boolean', initialValue: false },
          ],
        },
      ],
    }),

    // Ratings & reviews
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

    // Visibility & metadata
    defineField({
      name: 'privacy',
      title: 'Privacy',
      type: 'string',
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Private', value: 'private' },
        ],
      },
      initialValue: 'public',
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

    // Internal notes / admin
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
    }),
  ],
})