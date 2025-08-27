import { defineType, defineField } from 'sanity'

export const company = defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'companyName', maxLength: 96 },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'Industry or sector',
    }),
    defineField({
      name: 'description',
      title: 'Company Description',
      type: 'text',
    }),
    defineField({
      name: 'employees',
      title: 'Number of Employees',
      type: 'number',
    }),
    defineField({
      name: 'headquarters',
      title: 'Headquarters',
      type: 'object',
      fields: [
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
        { name: 'location', title: 'Geo Location', type: 'geopoint' },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location (general)',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'recruiter',
      title: 'Recruiter/Employer',
      type: 'reference',
      to: [{ type: 'user' }],
    }),

    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})