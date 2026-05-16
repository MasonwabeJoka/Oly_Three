// schemas/documents/makeModel.ts
import { defineType, defineField } from 'sanity';

export const makeModel = defineType({
  name: 'makeModel',
  title: 'Make & Model',
  type: 'document',
  fields: [
    defineField({
      name: 'make',
      title: 'Make',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
    }),
    defineField({
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      },
    }),
    defineField({
      name: 'bodyType',
      title: 'Body Type',
      type: 'string',
      options: {
        list: ['Hatchback', 'Sedan', 'SUV', 'Bakkie', 'Coupe', 'Van'],
      },
    }),
  ],
});
