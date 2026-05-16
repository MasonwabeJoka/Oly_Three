import { defineType, defineField } from 'sanity';

export const bidderHistory = defineType({
    name: 'bidderHistory',
    title: 'Bidder History',
    type: 'document',
    fields: [
        defineField({
            name: 'bidder',
            title: 'Bidder',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user whose bidding history is being tracked.',
        }),
        defineField({
            name: 'bids',
            title: 'Bids',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'bid' }] }],
            description: 'A comprehensive list of all bids placed by the bidder.',
        }),
       
    ],
});
