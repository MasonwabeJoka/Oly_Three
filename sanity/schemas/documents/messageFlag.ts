import { defineType, defineField } from 'sanity';

export const messageFlag = defineType({
    name: 'messageFlag',
    title: 'Message Flag',
    type: 'document',
    fields: [
        defineField({
            name: 'message',
            title: 'Message',
            type: 'reference',
            to: [{ type: 'message' }],
            description: 'The specific message that is being flagged.',
        }),
        defineField({
            name: 'flaggedBy',
            title: 'Flagged By',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who raised the flag on this message.',
        }),
        defineField({
            name: 'reason',
            title: 'Reason',
            type: 'string',
            description: 'The reason for flagging, such as spam, offensive content, or other violations.',
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
            description: 'Any additional details or context provided regarding the flag.',
        }),
        defineField({
            name: 'flaggedAt',
            title: 'Flagged At',
            type: 'datetime',
            description: 'The date and time when the message was flagged.',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending Review', value: 'pending' },
                    { title: 'Reviewed', value: 'reviewed' },
                    { title: 'Action Taken', value: 'action_taken' },
                    { title: 'Dismissed', value: 'dismissed' },
                ],
                layout: 'dropdown',
            },
            description: 'The current status of the flag within the moderation process.',
        }),
        defineField({
            name: 'violationType',
            title: 'Violation Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Harassment', value: 'harassment' },
                    { title: 'Spam', value: 'spam' },
                    { title: 'Inappropriate Content', value: 'inappropriate_content' },
                    { title: 'Hate Speech', value: 'hate_speech' },
                    { title: 'Other', value: 'other' },
                ],
                layout: 'dropdown',
            },
            description: 'Categorizes the type of violation reported.',
        }),
        defineField({
            name: 'reviewedBy',
            title: 'Reviewed By',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The moderator who reviewed the flagged message.',
        }),
        defineField({
            name: 'reviewedAt',
            title: 'Reviewed At',
            type: 'datetime',
            description: 'The date and time when the flagged message was reviewed by a moderator.',
        }),
        defineField({
            name: 'actionTaken',
            title: 'Action Taken',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Details of any action taken by moderators in response to the flag.',
        }),
        defineField({
            name: 'systemFlagged',
            title: 'System Flagged',
            type: 'boolean',
            description: 'Indicates whether this message was flagged by an automated system or algorithm.',
        }),
        defineField({
            name: 'userFeedback',
            title: 'User Feedback',
            type: 'object',
            fields: [
                defineField({
                    name: 'satisfied',
                    title: 'Satisfied with Outcome',
                    type: 'boolean',
                    description: 'Indicates if the user who flagged the message is satisfied with the moderation outcome.',
                }),
                defineField({
                    name: 'feedbackComments',
                    title: 'Feedback Comments',
                    type: 'array',
                    of: [
                        {
                            type: 'block'
                        }
                    ],
                    description: 'Additional comments or feedback from the user regarding the moderation process or outcome.',
                }),
            ],
            description: 'Feedback from the user who raised the flag about the moderation process and its outcome.',
        }),
        defineField({
            name: 'auditTrail',
            title: 'Audit Trail',
            type: 'array',
            of: [{ type: 'auditEntry' }],
            description: 'A record of all actions and changes made to this flag, providing a complete audit trail.',
        }),
        
    ],
});
