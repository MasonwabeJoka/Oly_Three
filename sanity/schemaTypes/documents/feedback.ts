import { defineType, defineField } from 'sanity';

export const feedback = defineType({
    name: 'feedback',
    title: 'Feedback',
    type: 'document',
    fields: [
        defineField({
            name: 'submittedBy',
            title: 'Submitted By',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who submitted the feedback.',
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'The content of the feedback message.',
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            description: 'The rating score provided by the user.',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            description: 'The date and time when the feedback was created.',
        }),
        
    ],
});
