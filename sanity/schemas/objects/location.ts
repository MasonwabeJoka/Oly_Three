//This schema stores detailed user location information.

import { defineType, defineField } from 'sanity';

export const location = defineType({
    name: 'location',
    title: 'Location',
    type: 'object',
    fields: [
  
        defineField({
            name: 'address',
            title: 'Address',
            type: 'string',
            description: 'The full address as a string.',
        }),
        defineField({
            name: 'suburb',
            title: 'Suburb',
            type: 'string',
            description: 'The Suburb of the location.',
        }),
        defineField({
            name: 'city',
            title: 'City',
            type: 'string',
            description: 'City or locality of the location.',
        }),
        defineField({
            name: 'region',
            title: 'Region',
            type: 'string',
            description: 'State, province, or region of the location.',
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
            description: 'Country of the location.',
        }),
        defineField({
            name: 'postalCode',
            title: 'Postal Code',
            type: 'string',
            description: 'Postal or ZIP code of the location.',
        }),
        defineField({
            name: 'coordinates',
            title: 'Coordinates',
            type: 'geopoint',
            description: 'Geographical coordinates of the location.',
        }),
        // ... any other fields as needed
    ],
});

