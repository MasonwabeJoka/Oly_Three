// schemas/documents/propertyDetails.ts
import { defineType, defineField } from 'sanity';
import { MdHome } from 'react-icons/md';

export const propertyDetails = defineType({
  name: 'propertyDetails',
  title: 'Property Details',
  type: 'document',
  icon: MdHome,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required(),
    }),

    // Property details
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'House', value: 'house' },
          { title: 'Apartment / Flat', value: 'apartment' },
          { title: 'Townhouse', value: 'townhouse' },
          { title: 'Duplex', value: 'duplex' },
          { title: 'Sectional Title', value: 'sectional-title' },
          { title: 'Vacant Land / Plot', value: 'land' },
          { title: 'Farm / Smallholding', value: 'farm' },
          { title: 'Commercial Property', value: 'commercial' },
          { title: 'Industrial Property', value: 'industrial' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'listingType',
      title: 'Listing Type',
      type: 'string',
      options: {
        list: [
          { title: 'For Sale', value: 'for-sale' },
          { title: 'For Rent (Monthly)', value: 'to-rent' },
          { title: 'Student Accommodation', value: 'student' },
          { title: 'Shared Property', value: 'shared' },
        ],
      },
      initialValue: 'for-sale',
    }),
    defineField({
      name: 'price',
      title: 'Price (ZAR)',
      type: 'number',
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'levies',
      title: 'Levies (Monthly)',
      type: 'number',
      description: 'Applicable for sectional title properties.',
    }),
    defineField({
      name: 'ratesAndTaxes',
      title: 'Rates and Taxes (Monthly)',
      type: 'number',
      description: 'Municipal rates paid monthly.',
    }),
    defineField({
      name: 'beds',
      title: 'Bedrooms',
      type: 'number',
    }),
    defineField({
      name: 'baths',
      title: 'Bathrooms',
      type: 'number',
    }),
    defineField({
      name: 'parking',
      title: 'Parking Spaces',
      type: 'number',
    }),

    // Localised Location
    defineField({
      name: 'province',
      title: 'Province',
      type: 'string',
      options: {
        list: [
          'Eastern Cape',
          'Free State',
          'Gauteng',
          'KwaZulu-Natal',
          'Limpopo',
          'Mpumalanga',
          'Northern Cape',
          'North West',
          'Western Cape',
        ],
      },
    }),
    defineField({
      name: 'municipality',
      title: 'Municipality',
      type: 'string',
      description: 'Optional local municipality (e.g., City of Johannesburg)',
    }),
    defineField({
      name: 'suburb',
      title: 'Suburb',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
    }),
    defineField({
      name: 'geoLocation',
      title: 'GPS Coordinates',
      type: 'geopoint',
      description: 'Used for maps and location-based search.',
    }),

    // Media
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'videos',
      title: 'Video Tours',
      type: 'array',
      // of: [{ type: 'mux.video' }],
      of: [{ type: 'reference', to: [{ type: 'videoFile' }] }],
    }),

    // Features
    defineField({
      name: 'features',
      title: 'Property Features',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Pet Friendly',
          'Swimming Pool',
          'Garden',
          'Security Estate',
          'Balcony',
          'Built-in Braai',
          'Fibre Ready',
          'Staff Quarters',
          'Borehole',
          'Solar Panels',
          'Backup Power',
          'Flatlet',
        ],
        layout: 'tags',
      },
    }),
    defineField({
      name: 'isPetFriendly',
      title: 'Pet Friendly',
      type: 'boolean',
    }),
    defineField({
      name: 'availableFrom',
      title: 'Available From',
      type: 'date',
    }),

    // Legal/Docs
    defineField({
      name: 'attachments',
      title: 'Attachments',
      type: 'array',
      of: [{ type: 'file' }],
      description: 'Upload floor plans, zoning certificate, or sale docs.',
    }),

    // Contact & Ownership
    defineField({
      name: 'listedBy',
      title: 'Listed By',
      type: 'reference',
      to: [{ type: 'user' }],
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Listing',
      type: 'boolean',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Sold', value: 'sold' },
          { title: 'Rented', value: 'rented' },
          { title: 'Off Market', value: 'off-market' },
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'dateListed',
      title: 'Date Listed',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'suburb',
      media: 'images.0',
    },
  },
});
