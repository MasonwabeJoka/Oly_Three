import { defineType, defineField } from 'sanity';

export const auctionLot = defineType({
    name: 'auctionLot',
    title: 'Auction Lot',
    type: 'document',
    fields: [
        defineField({
            name: 'biddingHistory',
            title: 'Bidding History',
            type: 'array',
            of: [{ type: 'bid' }],
            description: 'A history of all bids placed on this lot.',
        }),
        defineField({
            name: 'auctionStartDate',
            title: 'Auction Start Date',
            type: 'datetime',
            description: 'The date and time when the auction for this lot starts.',
        }),
        defineField({
            name: 'shippingDetails',
            title: 'Shipping Details',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Information regarding the shipping of the lot after the auction.',
        }),
        defineField({
            name: 'returnPolicy',
            title: 'Return Policy',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Details about the return policy applicable to this lot, if any.',
        }),
        defineField({
            name: 'lotStatus',
            title: 'Lot Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Active', value: 'active' },
                    { title: 'Closed', value: 'closed' },
                    { title: 'Sold', value: 'sold' },
                    { title: 'Unsold', value: 'unsold' },
                ],
            },
            description: 'The current status of the lot (e.g., active, closed, sold, unsold).',
        }),
        defineField({
            name: 'buyer',
            title: 'Buyer',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who won the lot, applicable if the lot is sold.',
        }),
        defineField({
            name: 'sellerNotes',
            title: 'Seller Notes',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Additional notes or comments from the seller about the lot.',
        }),
        defineField({
            name: 'currentHighestBid',
            title: 'Current Highest Bid',
            type: 'reference',
            to: [{ type: 'bid' }],
            description: 'The current highest bid on this lot.',
        }),
        defineField({
            name: 'auctionEndDate',
            title: 'Auction End Date',
            type: 'datetime',
            description: 'The date and time when the auction for this lot ends.',
        }),
        defineField({
            name: 'paymentTerms',
            title: 'Payment Terms',
            type: 'array',
            of: [
                {
                    type: 'block'
                }
            ],
            description: 'Terms and conditions related to the payment for this lot.',
        }),
       
    ],
});
