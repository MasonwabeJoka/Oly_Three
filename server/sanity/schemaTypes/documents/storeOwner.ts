import { defineType, defineField } from 'sanity';

export const storeOwner = defineType({
  name: 'storeOwner',
  title: 'Store Owner',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user account that owns this store.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storeName',
      title: 'Store Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'storeName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Store Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'banner',
      title: 'Store Banner',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Store Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
      description: 'Physical or operational location of the store.',
    }),
    defineField({
      name: 'contactNumber',
      title: 'Contact Number',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^[+0][0-9]{9,13}$/, {
          name: 'SA Phone Number',
          invert: false,
        }).warning('Enter a valid South African phone number'),
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email().warning('Enter a valid email'),
    }),
    defineField({
      name: 'verified',
      title: 'Verified Store',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'storeCategories',
      title: 'Store Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
