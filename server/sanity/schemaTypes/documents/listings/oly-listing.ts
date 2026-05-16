import { defineType, defineField } from 'sanity';

export const listing = defineType({
  name: 'listing',
  title: 'Listing',
  type: 'document',
  initialValue: {
    title: 'New Listing',
    site: 'oly',
    isFeatured: false,
    isActive: true,
    currency: 'ZAR',
    pricingOption: 'fixed_price',
    approvedForSale: 'approved',
    postedOn: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the listing, briefly summarizing what is being advertised.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 90,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed information about the item or service being offered.',
      validation: (Rule) => Rule.required().max(400).warning('Description must be under 400 characters'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'The category under which the listing falls.',
    }),

        // Pricing and Payment Details
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price for item advertised.',
      validation: (Rule) => Rule.required().min(0).max(999999999),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      options: {
        list: [
          { title: 'ZAR', value: 'ZAR' },
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
          { title: 'GBP', value: 'GBP' },
        ],
      },
    }),
    defineField({
      name: 'pricingOption',
      title: 'Pricing Option',
      type: 'string',
      options: {
        list: [
          { title: 'Negotiable Price', value: 'negotiable' },
          { title: 'Free', value: 'free' },
          { title: 'Auction', value: 'auction' },
          { title: 'Fixed Price', value: 'fixed_price' },
          { title: 'Contact for Price', value: 'contact_for_price' },
        ],
      },
      description: 'The pricing strategy for the listing (negotiable, free, auction, etc.).',
      initialValue: 'fixed_price',
    }),
    defineField({
      name: 'priceId',
      title: 'Price ID',
      type: 'string',
      description: 'The price ID associated with this product, for Payment Processing services like Paystack.',
    }),
    defineField({
      name: 'paystackId',
      title: 'Paystack ID',
      type: 'string',
      description: 'The paystack ID associated with this product.',
      readOnly: true,
    }),

    // User and Status Information
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user who posted the listing.',
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: ['oly', 'oly-properties', 'oly-auto', 'oly-hiring', 'oly-services'],
      },
      description: 'The website section this listing belongs to.',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured Listing',
      type: 'boolean',
      initialValue: false,
      description: 'Whether this listing is featured.',
    }),
    defineField({
      name: 'approvedForSale',
      title: 'Approved For Sale',
      type: 'string',
      description: 'The status indicating whether the product is approved for sale.',
      options: {
        list: [
          { title: 'Approved', value: 'approved' },
          { title: 'Pending', value: 'pending' },
          { title: 'Denied', value: 'denied' },
        ],
      },
      initialValue: 'approved',
    }),




    // Media Fields
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'imageFile' }],
          options: {
            metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location'],
            filter: ({ context }: any) => {
              const currentUserId = context.currentUser?.id;
              return {
                filter: '_id == $userId',
                params: { userId: currentUserId },
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'string',
      description: 'Select the featured image from the uploaded images',
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'videoFile' }],
          options: {
            metadata: [
              'duration',
              'format',
              'resolution',
              'fileSize',
              'aspectRatio',
              'creationDate',
              'frameRate',
              'bitrate',
              'codec',
              'audioChannels',
              'tags',
            ],
            filter: ({ context }: any) => {
              const currentUserId = context.currentUser?.id;
              return {
                filter: '_id == $userId',
                params: { userId: currentUserId },
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'attachments',
      title: 'Attachments',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'attachment' }],
          options: {
            metadata: ['size', 'format', 'creationDate', 'modifiedDate', 'author', 'pageCount', 'title', 'tags'],
            filter: ({ context }: any) => {
              const currentUserId = context.currentUser?.id;
              return {
                filter: '_id == $userId',
                params: { userId: currentUserId },
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(20),
    }),


    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Like New', value: 'like-new' },
          { title: 'Gently Used', value: 'gently-used' },
          { title: 'Used', value: 'used' },
        ],
      },
      description: 'The condition of the product being offered (New, Like New, Gently Used, Used).',
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      description: 'Available quantity of the item being sold.',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{ type: 'details' }],
      description: 'Key details about the item or service e.g., technical specs, reason for selling, or age of item',
    }),
    defineField({
      name: 'productSpecifications',
      title: 'Product Specifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key specifications  of the product.',
    }),

    // Seller Information
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'reference',
      to: [{ type: 'user' }],
      options: {
        filter: '_type == "user" && defined(profileImage)',
      },
      description: 'An avatar image representing the seller.',
    }),

    // Engagement and Promotion
    defineField({
      name: 'promotions',
      title: 'Promotions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Oly', value: 'oly' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Google Ads', value: 'google-ads' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                ],
              },
              description: 'The platform where the listing is being promoted.',
            }),
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'string',
              options: {
                list: [
                  { title: '1 Day', value: '1day' },
                  { title: '7 Days', value: '7days' },
                  { title: '2 Weeks', value: '2weeks' },
                  { title: '1 Month', value: '1month' },
                  { title: '3 Months', value: '3months' },
                ],
              },
              description: 'Chosen duration for the listing promotion on this platform.',
            }),
            defineField({
              name: 'remainingDays',
              title: 'Remaining Days',
              type: 'number',
              description: 'The number of days remaining for the promotion on this platform.',
            }),
          ],
          description: 'Details of the listing promotion on a specific platform, including the duration and remaining days.',
        },
      ],
      description: 'Information about the promotion of the listing on various platforms.',
    }),
    defineField({
      name: 'bids',
      title: 'Bids',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'bid' }] }],
      description: 'Bids placed on the listing, if it is an auction.',
    }),
    defineField({
      name: 'associatedAuction',
      title: 'Associated Auction',
      type: 'reference',
      to: [{ type: 'auction' }],
      description: 'The auction associated with this classified listing.',
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      description: 'The number of likes the listing has received.',
    }),
    defineField({
      name: 'todaysViews',
      title: "Today's Views",
      type: 'number',
      description: 'The number of views the listing has received in the last 24 hours.',
    }),
    defineField({
      name: 'totalViews',
      title: 'Total Views',
      type: 'number',
      description: 'The total number of views on this listing.',
    }),
    defineField({
      name: 'unreadMessages',
      title: 'Unread Messages',
      type: 'number',
      description: 'The number of unread messages related to this listing.',
    }),

    // Timestamps
    defineField({
      name: 'postedOn',
      title: 'Posted On',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      initialValue: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'images.0.asset',
      alt: 'images.0.alt',
    },
    prepare(selection) {
      const { image, alt, title } = selection;
      return {
        title: title,
        media: image,
        subtitle: alt,
      };
    },
  },
});