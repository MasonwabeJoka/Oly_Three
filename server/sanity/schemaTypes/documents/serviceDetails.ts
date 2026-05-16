// schemas/documents/serviceDetails.ts
import { defineType, defineField } from 'sanity';

// This schema stores detailed information about service listings for Oly Services.
export const serviceDetails = defineType({
  name: 'serviceDetails',
  title: 'Service Details',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100),
      description: 'The title of the service listing (e.g., "Plumbing Repairs in Johannesburg").',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'A detailed description of the service offered, including scope, availability, and expertise.',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'The starting price or hourly rate for the service.',
    }),
    defineField({
      name: 'priceUnit',
      title: 'Price Unit',
      type: 'string',
      options: {
        list: ['per hour', 'per job', 'per day', 'starting from', 'negotiable'],
        layout: 'radio',
      },
      initialValue: 'negotiable',
      description: 'Unit or pricing model for the service.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
      description: 'The primary service area or location of the provider.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'The category under which this service falls (e.g., Home Repairs, Beauty, Legal).',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      description: 'Typical hours or days of availability (e.g., "Mon–Sat, 8am–6pm").',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' },
      description: 'Photos that showcase the service or past work.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords to help users find the service (e.g., emergency, 24/7, mobile).',
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'reference',
      to: [{ type: 'user' }, { type: 'storeOwner' }, { type: 'professionalServiceProvider' }],
      description: 'The user or business offering the service.',
    }),
    defineField({
      name: 'listingPackage',
      title: 'Listing Package',
      type: 'reference',
      to: [{ type: 'listingPackage' }],
      description: 'Optional paid plan or promotional package attached to the listing.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Listing',
      type: 'boolean',
      initialValue: false,
      description: 'Whether the service is featured/promoted.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'active',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
          { title: 'Pending Approval', value: 'pending' },
        ],
        layout: 'radio',
      },
      description: 'The publication status of the listing.',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      description: 'Timestamp of when the listing was created.',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true,
      description: 'Timestamp of the last update.',
    }),
  ],
});
