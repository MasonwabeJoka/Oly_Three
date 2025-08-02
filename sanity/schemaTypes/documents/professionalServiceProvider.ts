import { defineType, defineField } from 'sanity';

export const professionalServiceProvider = defineType({
  name: 'professionalServiceProvider',
  title: 'Professional Service Provider',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Business Name',
      type: 'string',
    }),
    defineField({
      name: 'user',
      title: 'User Account',
      type: 'reference',
      to: [{ type: 'user' }],
    }),
    defineField({
      name: 'verified',
      title: 'Verified Professional?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
