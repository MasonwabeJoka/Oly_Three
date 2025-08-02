import { defineType, defineField } from 'sanity';

export const auctionTest = defineType({
  name: 'auctionTest',
  title: 'AuctionTest',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'datetime',
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'datetime',
    }),
    defineField({
      name: 'currentBid',
      title: 'Current Bid',
      type: 'number',
    }),
    defineField({
      name: 'highestBidder',
      title: 'Highest Bidder',
      type: 'string',
    }),
  ],
});
