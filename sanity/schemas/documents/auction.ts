import { defineType, defineField } from 'sanity';

export const auction = defineType({
    name: 'auction',
    title: 'Auction',
    type: 'document',
    fields: [
        defineField({
            name: 'startingPrice',
            title: 'Starting Price',
            type: 'number',
            description: 'The initial price at which the auction starts.',
        }),
        defineField({
            name: 'estimatedPrice',
            title: 'Estimated Price',
            type: 'number',
            description: 'The estimated price range for the auctioned item.',
        }),
        defineField({
            name: 'highestBid',
            title: 'Highest Bid',
            type: 'reference',
            to: [{ type: 'bid' }],
            description: 'The current highest bid in the auction.',
        }),
        defineField({
            name: 'serviceFeeBidder',
            title: 'Service Fee for Bidder',
            type: 'number',
            description: 'The service fee charged to the bidder (5% of the current highest bid).',
        }),
        defineField({
            name: 'serviceFeeAdvertiser',
            title: 'Service Fee for Advertiser',
            type: 'number',
            description: 'The service fee charged to the advertiser (5% of the current highest bid).',
        }),
        defineField({
            name: 'liveBiddingStart',
            title: 'Live Bidding Start Time',
            type: 'datetime',
            description: 'The time when live bidding starts for this auction.',
        }),
        defineField({
            name: 'duration',
            title: 'Duration of Auction',
            type: 'number',
            description: 'The total duration of the auction in hours or days.',
        }),
        defineField({
            name: 'timeLeft',
            title: 'Time Left',
            type: 'number',
            description: 'Countdown time left for the auction to end.',
        }),
        defineField({
            name: 'minimumBid',
            title: 'Minimum Bid',
            type: 'number',
            description: 'The minimum amount by which the next bid must exceed the current highest bid.',
        }),
        defineField({
            name: 'biddersList',
            title: 'List of All Bidders',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'user' }] }],
            description: 'A list of all users who have placed bids in this auction.',
        }),
        defineField({
            name: 'currentLiveBidders',
            title: 'Current Live Bidders',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'user' }] }],
            description: 'List of bidders currently participating in the live bid.',
        }),
        defineField({
            name: 'totalBidders',
            title: 'Total Number of Bidders',
            type: 'number',
            description: 'The total number of bidders who have participated in this auction.',
        }),
        defineField({
            name: 'currentLiveBiddersCount',
            title: 'Number of Current Live Bidders',
            type: 'number',
            description: 'The number of bidders currently in the live bid.',
        }),
        defineField({
            name: 'lots',
            title: 'Lots',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'auctionLot' }] }],
            description: 'Different items or lots available in this auction.',
        }),
        defineField({
            name: 'upcoming',
            title: 'Upcoming Auction',
            type: 'boolean',
            description: 'Indicates if this is an upcoming auction scheduled for a future date.',
        }),
        defineField({
            name: 'favoritedBy',
            title: 'Favorited By',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'user' }] }],
            description: 'List of users who have marked this auction as a favorite.',
        }),
        defineField({
            name: 'partOfMyAuctions',
            title: 'Part of My Auctions',
            type: 'boolean',
            description: 'Indicates if this auction is managed or listed by the current user.',
        }),
        defineField({
            name: 'buyNowOption',
            title: 'Buy Now Option',
            type: 'boolean',
            description: 'Indicates if the auction allows for immediate purchase at a set price, bypassing the bidding process.',
        }),
        defineField({
            name: 'auctionType',
            title: 'Auction Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Live', value: 'live' },
                    { title: 'Timed', value: 'timed' },
                    { title: 'Buy Now', value: 'buy-now' },
                ],
            },
            description: 'The type of auction (live, timed, or buy now).',
        }),
        defineField({
            name: 'remainingTime',
            title: 'Remaining Time',
            type: 'datetime',
            description: 'The date and time when the auction ends. Used to calculate the remaining time.',
        }),
       
    ],
});
