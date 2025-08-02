import { defineType, defineField } from 'sanity';

export const message = defineType({
    name: 'message',
    title: 'Message',
    type: 'document',
    fields: [
        defineField({
            name: 'conversation',
            title: 'Conversation',
            type: 'reference',
            to: [{ type: 'conversation' }],
            description: 'The conversation to which this message belongs.',
        }),
        defineField({
            name: 'sender',
            title: 'Sender',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who sent the message.',
        }),
        defineField({
            name: 'timestamp',
            title: 'Timestamp',
            type: 'datetime',
            description: 'The date and time when the message was sent.',
        }),
        defineField({
            name: 'text',
            title: 'Text',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'The textual content of the message.',
        }),
        defineField({
            name: 'reactions',
            title: 'Reactions',
            type: 'array',
            of: [
                defineType({
                    name: 'reaction',
                    title: 'Reaction',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'type',
                            title: 'Type',
                            type: 'string',
                            description: 'The type of reaction (e.g., like, love, haha).',
                        }),
                        defineField({
                            name: 'user',
                            title: 'User',
                            type: 'reference',
                            to: [{ type: 'user' }],
                            description: 'The user who reacted to the message.',
                        }),
                    ],
                    description: 'Reactions to this message by different users.',
                }),
            ],
        }),
        defineField({
            name: 'replies',
            title: 'Replies',
            type: 'array',
            of: [{ type: 'message' }],
            description: 'Replies to this message, enabling threaded conversations.',
        }),
        defineField({
            name: 'uploads',
            title: 'Uploads',
            type: 'array',
            of: [{ type: 'upload' }],
            description: 'Any files, images, or other media attached to the message.',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Sent', value: 'sent' },
                    { title: 'Delivered', value: 'delivered' },
                    { title: 'Read', value: 'read' },
                ],
                layout: 'radio',
            },
            description: 'The delivery status of the message.',
        }),
        defineField({
            name: 'flags',
            title: 'Flags',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'messageFlag' }] }],
            description: 'Moderation flags associated with this message.',
        }),
        defineField({
            name: 'metrics',
            title: 'Metrics',
            type: 'object',
            fields: [
                defineField({
                    name: 'views',
                    title: 'Views',
                    type: 'number',
                    description: 'The number of times the message was viewed.',
                }),
                defineField({
                    name: 'interactions',
                    title: 'Interactions',
                    type: 'number',
                    description: 'The number of direct interactions with the message.',
                }),
                // You can add more metrics fields if needed
            ],
            description: 'Analytics metrics for the message, like views and interactions.',
        }),
       
    ],
});
