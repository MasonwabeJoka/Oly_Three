import { defineType, defineField } from 'sanity';

export const review = defineType({
    name: 'review',
    title: 'Review',
    type: 'document',
    fields: [
        defineField({
            name: 'reviewer',
            title: 'Reviewer',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who wrote the review.'
        }),
        defineField({
            name: 'subject',
            title: 'Review Subject',
            type: 'reference',
            to: [{ type: 'user' }, { type: 'ad' }, { type: 'auctionLot' }], // Adjust the types according to what can be reviewed on your platform
            description: 'The subject of the review, such as a user, an ad, or an auction lot.'
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.min(1).max(5),
            description: 'The rating given by the reviewer, typically on a scale from 1 to 5.'
        }),
        defineField({
            name: 'title',
            title: 'Review Title',
            type: 'string',
            description: 'A brief title for the review.'
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'The detailed content of the review.'
        }),
        defineField({
            name: 'date',
            title: 'Review Date',
            type: 'datetime',
            description: 'The date when the review was posted.'
        }),
        defineField({
            name: 'response',
            title: 'Response',
            type: 'object',
            fields: [
                defineField({
                    name: 'respondent',
                    title: 'Respondent',
                    type: 'reference',
                    to: [{ type: 'user' }],
                    description: 'The user who responded to the review, typically the subject of the review.'
                }),
                defineField({
                    name: 'responseContent',
                    title: 'Response Content',
                    type: 'array',
                    of: [
                        {
                            type: 'block'
                        }
                    ],
                    description: 'The content of the response to the review.'
                }),
                defineField({
                    name: 'responseDate',
                    title: 'Response Date',
                    type: 'datetime',
                    description: 'The date when the response was posted.'
                }),
            ],
            description: 'A response to the review by the subject or another user.'
        }),
        defineField({
            name: 'verifiedPurchase',
            title: 'Verified Purchase',
            type: 'boolean',
            description: 'Indicates if the review is related to a verified purchase or transaction.'
        }),
        
    ],
});
