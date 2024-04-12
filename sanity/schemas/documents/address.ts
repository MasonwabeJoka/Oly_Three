import { defineType, defineField } from 'sanity';

export const address = defineType({
    name: 'address',
    title: 'Address',
    type: 'document',
    fields: [
        defineField({
            name: 'addressLine1',
            title: 'Address Line 1',
            type: 'string',
            description: 'The primary line of the address (e.g., street, number).',
        }),
        defineField({
            name: 'addressLine2',
            title: 'Address Line 2',
            type: 'string',
            description: 'The secondary line of the address (e.g., apartment, suite number).',
            validation: (Rule) => Rule.optional(),
        }),
        defineField({
            name: 'city',
            title: 'City',
            type: 'string',
            description: 'The city in which the address is located.',
        }),
        defineField({
            name: 'state',
            title: 'State/Province/Region',
            type: 'string',
            description: 'The state, province, or region of the address.',
        }),
        defineField({
            name: 'postalCode',
            title: 'Postal Code',
            type: 'string',
            description: 'The postal code of the address.',
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
            description: 'The country of the address.',
        }),
        defineField({
            name: 'isBillingAddress',
            title: 'Is Billing Address',
            type: 'boolean',
            description: 'Indicates if this address is used for billing purposes.',
        }),
        defineField({
            name: 'isShippingAddress',
            title: 'Is Shipping Address',
            type: 'boolean',
            description: 'Indicates if this address is used for shipping purposes.',
        }),
        defineField({
            name: 'userId',
            title: 'User ID',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user to whom this address belongs.',
        }),
        defineField({
            name: 'additionalInfo',
            title: 'Additional Information',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Any additional information or instructions related to the address.',
            validation: (Rule:any) => Rule.optional(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'geopoint',
            description: 'Geographical coordinates of the address.',
            validation: (Rule) => Rule.optional(),
        }),
        defineField({
            name: 'contactPhone',
            title: 'Contact Phone',
            type: 'string',
            description: 'Contact phone number associated with the address.',
            validation: (Rule) => Rule.optional(),
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            description: 'Contact email associated with the address.',
            validation: (Rule) => Rule.optional(),
        }),
        // ... other relevant fields as needed
    ],
});
