import { defineType, defineField } from 'sanity';

export const conversation = defineType({
    name: 'conversation',
    title: 'Conversation',
    type: 'document',
    fields: [
        defineField({
            name: 'participants',
            title: 'Participants',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'user' }] }],
            description: 'List of users participating in the conversation.',
        }),
        defineField({
            name: 'startedBy',
            title: 'Started By',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who initiated the conversation.',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            description: 'The date and time when the conversation was created.',
        }),
        defineField({
            name: 'updatedAt',
            title: 'Updated At',
            type: 'datetime',
            description: 'The date and time when the conversation was last updated.',
        }),
        defineField({
            name: 'archived',
            title: 'Archived',
            type: 'boolean',
            description: 'Indicates if the conversation has been archived by the user.',
        }),
        defineField({
            name: 'isGroup',
            title: 'Is Group',
            type: 'boolean',
            description: 'Indicates if the conversation is a group chat.',
        }),
        defineField({
            name: 'groupName',
            title: 'Group Name',
            type: 'string',
            description: 'The name of the group, applicable if this is a group chat.',
        }),
        defineField({
            name: 'groupIcon',
            title: 'Group Icon',
            type: 'image',
            description: 'An image representing the group, used if this is a group chat.',
        }),
        defineField({
            name: 'messages',
            title: 'Messages',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'message' }] }],
            description: 'The messages exchanged in the conversation.',
        }),
       
    ],
});
