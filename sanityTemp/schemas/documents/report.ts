import { defineType, defineField } from 'sanity';

export const report = defineType({
    name: 'report',
    title: 'Report',
    type: 'document',
    fields: [
        defineField({
            name: 'reportedBy',
            title: 'Reported By',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who created this report.'
        }),
        defineField({
            name: 'reportedUser',
            title: 'Reported User',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who is being reported.'
        }),
        defineField({
            name: 'reason',
            title: 'Reason',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'The reason why the report is being made, such as a violation of terms.'
        }),
        defineField({
            name: 'details',
            title: 'Details',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Additional details or context about the report.'
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            description: 'The date and time when the report was created.'
        }),
       
    ],
});
