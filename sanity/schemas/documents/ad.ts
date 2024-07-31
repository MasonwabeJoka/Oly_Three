
import { defineType, defineField } from 'sanity';

export const ad = defineType({
    name: 'ad',
    title: 'Ad',
    type: 'document',
    fields: [
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
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{ type: 'user' }],
            description: 'The user who posted the ad.',
        }),

        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            description: 'The category under which the ad falls.',
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The title of the ad, briefly summarizing what is being advertised.',
            validation: (Rule) => Rule.required().max(300),
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
            description: 'Detailed information about the item or service being offered.',
            validation: (Rule) => Rule.required().max(400).warning('Description must be under 400 characters'),

        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            description: 'Price for item advertised.',
            validation: (Rule) => Rule.required().min(0).max(999999999),
        }),

        defineField({
            name: 'priceId',
            title: 'Price ID',
            type: 'string',
            description: 'The  price ID associated with this product, for Payment Processing services like Stripe.',
            readOnly: true, 
        }),
        defineField({
            name: 'stripeId',
            title: 'Stripe ID',
            type: 'string',
            description: 'The  stripe ID associated with this product.',
            readOnly: true, 
        }),
        

        defineField({
            name: 'pricingOption',
            title: 'Pricing Option',
            type: 'string',
            options: {
                list: [
                    { title: 'Negotiable', value: 'negotiable' },
                    { title: 'Free', value: 'free' },
                    { title: 'Auction', value: 'auction' },
                    { title: 'Fixed Price', value: 'fixed_price' },
                    { title: 'Contact for Price', value: 'contact_for_price' },
                ],
            },
            description: 'The pricing strategy for the ad (negotiable, free, auction, etc.).',
            initialValue: 'fixed_price',
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

        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
              {
                type: 'reference',
                to: [{ type: 'imageFile' }],
                options: {
                    metadata: [
                        'blurhash',   
                        'lqip',      
                        'palette',   
                        'exif',       
                        'location',   
                      ],
                    filter: ({ context }: any) => {
    
                        const currentUserId = context.currentUser?.id;
          
                        return {
                          filter: '_id == $userId',
                          params: {
                            userId: currentUserId,
                          },
                        };
              },
            },
        }
            ],
            validation: (Rule) => Rule.max(30),
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
                    'duration',       // Length of the video in seconds
                    'format',         // File format or codec used
                    'resolution',     // Dimensions of the video (width x height)
                    'fileSize',       // Size of the video file
                    'aspectRatio',    // Ratio of width to height (e.g., 16:9, 4:3)
                    'creationDate',   // When the video was created or last modified
                    'frameRate',      // Number of frames per second (fps)
                    'bitrate',        // Bitrate of the video (kbps or Mbps)
                    'codec',          // Encoding method used (e.g., H.264, HEVC)
                    'audioChannels',  // Number of audio channels (e.g., stereo, 5.1 surround)
                    'tags'            // Any additional metadata tags
                  ],
                  filter: ({ context }: any) => {
                    const currentUserId = context.currentUser?.id;
                    return {
                      filter: '_id == $userId',
                      params: {
                        userId: currentUserId,
                      },
                    };
                  },
                },
              },
            ],
            validation: (Rule) => Rule.max(1), // adjust validation as needed
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
                  metadata: [
                    'size',            // Size of the file
                    'format',          // File format or type (e.g., PDF, DOCX)
                    'creationDate',    // When the file was created or last modified
                    'modifiedDate',    // Last modified date
                    'author',          // Author or creator of the file
                    'pageCount',       // Number of pages (for documents)
                    'title',           // Title of the document (if applicable)
                    'tags'             // Any additional metadata tags
                  ],
                  filter: ({ context }: any) => {
                    const currentUserId = context.currentUser?.id;
                    return {
                      filter: '_id == $userId',
                      params: {
                        userId: currentUserId,
                      },
                    };
                  },
                },
              },
            ],
            validation: (Rule) => Rule.max(20), // adjust validation as needed
          }),

   
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'string',    // store the image's key 
            description:'Select the featured image from the uploaded images',
        }),

        defineField({
            name: 'postedOn',
            title: 'Posted On',
            type: 'datetime',
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
            },
            initialValue: new Date().toISOString() // Sets the default to the current date and time, but allows manual editing
        }),
    
      

        defineField({
            name: 'details',
            title: 'Details',
            type: 'array',
            of: [{ type: 'details' }],
            description: 'Key details about the item or service e.g., technical specs, reason for selling, or age of item',
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Key features or highlights of the item or service.',
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
            name: 'avatar',
            title: 'Avatar',
            type: 'reference',
            to: [{ type: 'user' }],
            options: {
                filter: '_type == "user" && defined(profileImage)',
            },
            description: 'An avatar image representing the seller.',
        }),

        defineField({
            name: 'location',
            title: 'Location',
            type: 'location',
            description: 'The location of the ad.',
        }),

        defineField({
            name: 'attachment',
            title: 'Attachment',
            type: 'file',
            description: 'An attachment related to the ad, such as a PDF document.',
        }),
    
        defineField({
            name: 'promotions',
            title: 'Promotions',
            type: 'array',
            of: [{
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
                        description: 'The platform where the ad is being promoted.',
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
                        description: 'Chosen duration for the ad promotion on this platform.',
                    }),
                    defineField({
                        name: 'remainingDays',
                        title: 'Remaining Days',
                        type: 'number',
                        description: 'The number of days remaining for the promotion on this platform.',
                    }),
                ],
                description: 'Details of the ad promotion on a specific platform, including the duration and remaining days.',
            }],
            description: 'Information about the promotion of the ad on various platforms.',
        }),
        defineField({
            name: 'bids',
            title: 'Bids',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'bid' }] }],
            description: 'Bids placed on the ad, if it is an auction.',
        }),
        defineField({
            name: 'likes',
            title: 'Likes',
            type: 'number',
            description: 'The number of likes the ad has received.',
        }),
        defineField({
            name: 'todaysViews',
            title: 'Today\'s Views',
            type: 'number',
            description: 'The number of views the ad has received in the last 24 hours.',
        }),
        defineField({
            name: 'totalViews',
            title: 'Total Views',
            type: 'number',
            description: 'The total number of views on this ad.',
        }),
        defineField({
            name: 'unreadMessages',
            title: 'Unread Messages',
            type: 'number',
            description: 'The number of unread messages related to this ad.',
        }),
        defineField({
            name: 'associatedAuction',
            title: 'Associated Auction',
            type: 'reference',
            to: [{ type: 'auction' }],
            description: 'The auction associated with this classified ad.',
        }),
    ],

preview: {
    select: {
        title: 'title',
      image: 'images.0.asset', // Select the first image in the images array
      alt: 'images.0.alt' // Select the alt text of the first image
    },
    prepare(selection) {
      const {image, alt, title} = selection;

      return {
        title:title, 
        media: image,
        subtitle: alt // Using the alt text as subtitle
      }
    }
  }
})
