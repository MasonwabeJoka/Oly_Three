import { defineType, defineField } from 'sanity';

export const locationHistory = defineType({
    name: 'locationHistory',
    title: 'Location History',
    type: 'document',
    fields: [
        defineField({
            name: 'userId',
            title: 'User ID',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user whose location history is being recorded.',
        }),
        defineField({
            name: 'locations',
            title: 'Locations',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'location',
                            title: 'Location',
                            type: 'reference',
                            to: [{ type: 'location' }],
                        }),
                        defineField({
                            name: 'timestamp',
                            title: 'Timestamp',
                            type: 'datetime',
                        }),
                    ],
                },
            ],
            description: 'The history of locations associated with the user.',
        }),
        
    ],
});
