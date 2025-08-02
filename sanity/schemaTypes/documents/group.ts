import { defineType, defineField } from 'sanity';

export const group = defineType({
    name: 'group',
    title: 'Group',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The name or title of the group.',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'A brief summary of the group’s purpose or topic.',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            description: 'The category that best describes the group’s theme or topic.',
        }),
        defineField({
            name: 'members',
            title: 'Members',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'user' }] }],
            description: 'List of users who are members of this group.',
        }),
        defineField({
            name: 'createdBy',
            title: 'Created By',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who created the group.',
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            description: 'The date and time when the group was created.',
        }),
        defineField({
            name: 'updatedAt',
            title: 'Updated At',
            type: 'datetime',
            description: 'The date and time when the group was last updated.',
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Indicates whether the group is currently active.',
        }),
       
    ],
});
