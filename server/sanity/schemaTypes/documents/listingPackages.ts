// schemas/documents/listingPackage.ts
import { defineType, defineField } from 'sanity';

export const listingPackage = defineType({
  name: 'listingPackage',
  title: 'Listing Package',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Package Name', type: 'string' }),
    defineField({ name: 'price', title: 'Price (ZAR)', type: 'number' }),
    defineField({ name: 'isFeatured', title: 'Featured Listing', type: 'boolean' }),
    defineField({ name: 'durationDays', title: 'Duration (Days)', type: 'number' }),
    defineField({ name: 'highlightColor', title: 'Highlight Color', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ],
});
