import { defineType, defineField } from 'sanity';

// This schema allows users to set alerts based on specific locations for new ads or other relevant activities.
export const locationAlertSettings = defineType({
    name: 'locationAlertSettings',
    title: 'Location Alert Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'userId',
            title: 'User ID',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user setting the location alerts.',
        }),
        defineField({
            name: 'alertLocations',
            title: 'Alert Locations',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'location' }] }],
            description: 'Locations for which the user wants to receive alerts.',
        }),
        defineField({
            name: 'alertTypes',
            title: 'Alert Types',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Types of alerts the user wishes to receive for these locations (e.g., new ads, price changes).',
        }),
        // ... any other fields as needed
    ],
});
