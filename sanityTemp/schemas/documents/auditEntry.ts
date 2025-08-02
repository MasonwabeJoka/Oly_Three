import { defineType, defineField } from 'sanity';

export const auditEntry = defineType({
    name: 'auditEntry',
    title: 'Audit Entry',
    type: 'object',
    fields: [
        defineField({
            name: 'actionDate',
            title: 'Action Date',
            type: 'datetime',
            description: 'The date and time when the action was taken.',
        }),
        defineField({
            name: 'action',
            title: 'Action',
            type: 'string',
            description: 'Description of the action taken (e.g., flag reviewed, message deleted, user notified).',
        }),
        defineField({
            name: 'actionBy',
            title: 'Action By',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user or system that performed the action.',
        }),
        defineField({
            name: 'comments',
            title: 'Comments',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Any additional comments or notes related to the action taken.',
        }),
    ],
    description: 'An entry documenting a specific action or change made as part of the flag moderation process.',
});
