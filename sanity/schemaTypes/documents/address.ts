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
        }),
        defineField({
            name: 'province',
            title: 'Province',
            type: 'string',
            description: 'The province of the address.',
            options: {
                list: ["Western Cape", "Gauteng", "Eastern Cape", "KwaZulu-Natal", "Free State", "Limpopo", "Mpumalanga", "North West", "Northern Cape"] 
            }
        }),
        defineField({
            name: 'provinceAbbreviation',
            title: 'Province Abbreviation',
            type: 'string',
            description: 'The abbreviation of the province of the address.',
         
        }),
        defineField({
            name: 'city',
            title: 'City',
            type: 'string',
            description: 'The city in which the address is located.',
            // options: {
            //     list: [] // Populate with city options as needed
            // }
        }),
        defineField({
            name: 'cityAbbreviation',
            title: 'City Abbreviation',
            type: 'string',
            description: 'The abbreviation of the city in which the address is located.',
            // options: {
            //     list: [] // Populate with city options as needed
            // }
        }),
        defineField({
            name: 'suburb',
            title: 'Suburb',
            type: 'string',
            description: 'The suburb of the address.',
            // options: {
            //     list: [] // Populate with suburb options as needed
            // }
        }),
        defineField({
            name: 'additionalInfo',
            title: 'Additional Information',
            type: 'string',
            description: 'Additional details or instructions related to the address.',
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
            name: 'location',
            title: 'Location',
            type: 'geopoint',
            description: 'Geographical coordinates of the address.',
        }),
        defineField({
            name: 'contactPhone',
            title: 'Contact Phone',
            type: 'string',
            description: 'Contact phone number associated with the address.',
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            description: 'Contact email associated with the address.',
        }),
    ],
});