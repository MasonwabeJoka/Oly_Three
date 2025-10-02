import { defineType, defineField } from 'sanity';

export const bid = defineType({
    name: 'bid',
    title: 'Bid',
    type: 'document',
    fields: [
        defineField({
            name: 'amount',
            title: 'Bid Amount',
            type: 'number',
            description: 'The monetary value of the bid.',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'bidder',
            title: 'Bidder',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who placed the bid.',
        }),
        defineField({
            name: 'bidDate',
            title: 'Bid Date',
            type: 'datetime',
            description: 'The date and time when the bid was placed.',
        }),
        defineField({
            name: 'associatedListing',
            title: 'Associated Listing',
            type: 'reference',
            to: [{ type: 'listing' }],
            description: 'The classified listing this bid is associated with.',
        }),
        defineField({
            name: 'isLive',
            title: 'Is Live',
            type: 'boolean',
            description: 'Indicates if this bid is part of a live bidding session.',
        }),
        defineField({
            name: 'bidStartTime',
            title: 'Bid Start Time',
            type: 'datetime',
            description: 'The time when the bidder started bidding in a live session.',
        }),
        defineField({
            name: 'bidDropOutTime',
            title: 'Bid Drop Out Time',
            type: 'datetime',
            description: 'The time when the bidder dropped out of the bidding.',
        }),
        defineField({
            name: 'bidStatus',
            title: 'Bid Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Bidding', value: 'bidding' },
                    { title: 'Dropped Out', value: 'dropped-out' },
                ],
            },
            description: 'Status of the bidder in the live session (Bidding or Dropped Out).',
        }),
      
    ],
});
