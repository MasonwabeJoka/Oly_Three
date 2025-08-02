// schemas/documents/dealerProfile.ts
import { defineType, defineField } from 'sanity';

export const dealerProfile = defineType({
  name: 'dealerProfile',
  title: 'Dealer Profile',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'location', title: 'Location', type: 'reference', to: [{ type: 'location' }] }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
  ],
});
