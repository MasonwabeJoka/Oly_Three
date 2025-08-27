import { defineType, defineField } from 'sanity';

export const propertyListing = defineType({
  name: 'propertyListing',
  title: 'Property Listing',
  type: 'document',
  initialValue: {
    title: 'New Property Listing',
    site: 'oly-properties',
    featured: false,
    isActive: true,
    propertyType: 'house',
    listingType: 'for-sale',
    currency: 'USD',
    pricingOption: 'fixed_price',
    approvedForSale: 'approved',
    quantity: 1,
    postedOn: () => new Date().toISOString(),
    expiresAt: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 0,
    todaysViews: 0,
    totalViews: 0,
    unreadMessages: 0,
  },
  fields: [
    // Core Metadata
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the property ad, summarizing the listing.',
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
      description: 'A unique, human-readable identifier for the listing URL.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed information about the property being offered.',
      validation: (Rule) =>
        Rule.required().max(1000).warning('Description should ideally be under 1000 characters for readability.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'propertyCategory' }],
      description: 'The category under which this property listing falls (e.g., Residential, Commercial).',
    }),

    // Property-Specific Attributes
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'House', value: 'house' },
          { title: 'Apartment', value: 'apartment' },
          { title: 'Townhouse', value: 'townhouse' },
          { title: 'Condo', value: 'condo' },
          { title: 'Land', value: 'land' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Office Space', value: 'office-space' },
          { title: 'Retail Space', value: 'retail-space' },
          { title: 'Warehouse', value: 'warehouse' },
          { title: 'Farm', value: 'farm' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'The type of property being listed.',
    }),
    defineField({
      name: 'listingType',
      title: 'Listing Type',
      type: 'string',
      options: {
        list: [
          { title: 'For Sale', value: 'for-sale' },
          { title: 'For Rent', value: 'for-rent' },
          { title: 'Auction', value: 'auction' },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Is this property for sale, for rent, or at auction?',
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(99),
      description: 'Number of bedrooms.',
      hidden: ({ document }) => document?.propertyType === 'land',
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(99),
      description: 'Number of bathrooms.',
      hidden: ({ document }) => document?.propertyType === 'land',
    }),
    defineField({
      name: 'garages',
      title: 'Garages',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(99),
      description: 'Number of garage spaces.',
      hidden: ({ document }) => document?.propertyType === 'land',
    }),
    defineField({
      name: 'areaSize',
      title: 'Area Size',
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'number',
          description: 'The numerical value of the area size.',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'unit',
          title: 'Unit',
          type: 'string',
          options: {
            list: ['sqft', 'sqm', 'acres', 'hectares'],
          },
          initialValue: 'sqft',
          description: 'Unit of measurement for the area size.',
        }),
      ],
      description: 'Total area of the property (e.g., floor area, land area).',
    }),
    defineField({
      name: 'landSize',
      title: 'Land Size',
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'number',
          description: 'The numerical value of the land size.',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'unit',
          title: 'Unit',
          type: 'string',
          options: {
            list: ['sqft', 'sqm', 'acres', 'hectares'],
          },
          initialValue: 'sqft',
          description: 'Unit of measurement for the land size.',
        }),
      ],
      description: 'The total land area of the property.',
      hidden: ({ document }) => document?.propertyType === 'apartment',
    }),
    defineField({
      name: 'buildYear',
      title: 'Build Year',
      type: 'number',
      validation: (Rule) => Rule.min(1700).max(new Date().getFullYear() + 5),
      description: 'The year the property was built.',
    }),
    defineField({
      name: 'lotNumber',
      title: 'Lot Number',
      type: 'string',
      description: 'The lot number for land or sub-divisions.',
      hidden: ({ document }) => document?.propertyType !== 'land',
    }),
    defineField({
      name: 'buildingName',
      title: 'Building Name',
      type: 'string',
      description: 'The name of the building, if applicable (e.g., for apartments, condos).',
      hidden: ({ document }) =>
        !['apartment', 'condo', 'office-space', 'retail-space'].includes(document?.propertyType),
    }),
    defineField({
      name: 'floorNumber',
      title: 'Floor Number',
      type: 'number',
      description: 'The floor number where the unit is located.',
      hidden: ({ document }) =>
        !['apartment', 'condo', 'office-space'].includes(document?.propertyType),
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Swimming Pool', value: 'swimming-pool' },
          { title: 'Gym', value: 'gym' },
          { title: 'Balcony', value: 'balcony' },
          { title: 'Garden', value: 'garden' },
          { title: 'Pet Friendly', value: 'pet-friendly' },
          { title: '24/7 Security', value: '24-7-security' },
          { title: 'Parking', value: 'parking' },
          { title: 'Ocean View', value: 'ocean-view' },
          { title: 'City View', value: 'city-view' },
          { title: 'Central Air', value: 'central-air' },
          { title: 'Fireplace', value: 'fireplace' },
          { title: 'Dishwasher', value: 'dishwasher' },
          { title: 'Washer/Dryer', value: 'washer-dryer' },
        ],
        layout: 'tags',
      },
      description: 'List of key amenities included with the property.',
    }),
    defineField({
      name: 'hoaFees',
      title: 'HOA Fees (Monthly)',
      type: 'number',
      description: 'Homeowner Association fees per month, if applicable.',
      hidden: ({ document }) => !['apartment', 'condo', 'townhouse'].includes(document?.propertyType),
    }),
    defineField({
      name: 'propertyTaxes',
      title: 'Property Taxes (Annual)',
      type: 'number',
      description: 'Annual property tax amount.',
    }),
    defineField({
      name: 'zoning',
      title: 'Zoning',
      type: 'string',
      description: 'The zoning classification of the land/property (e.g., Residential, Commercial, Industrial).',
      hidden: ({ document }) =>
        !['land', 'commercial', 'office-space', 'retail-space', 'warehouse'].includes(document?.propertyType),
    }),
    defineField({
      name: 'energyRating',
      title: 'Energy Rating',
      type: 'string',
      options: {
        list: ['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'Not Applicable'],
      },
      description: 'Energy efficiency rating of the property.',
    }),

    // User and Status Information
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user who posted this property ad.',
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: ['oly', 'oly-properties', 'oly-auto', 'oly-hiring', 'oly-services'],
      },
      description: 'The website section this property ad belongs to.',
      initialValue: 'oly-properties',
      readOnly: true,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Is this property listing currently active and visible?',
    }),
    defineField({
      name: 'approvedForSale',
      title: 'Approved For Listing',
      type: 'string',
      description: 'The status indicating whether the property is approved for listing.',
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
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Whether this property ad is featured.',
    }),

    // Pricing and Payment Details
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'The price for the property (for sale or rent).',
      validation: (Rule) => Rule.required().min(0).max(999999999999),
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
      description: 'The currency in which the property is priced.',
    }),
    defineField({
      name: 'pricingOption',
      title: 'Pricing Option',
      type: 'string',
      options: {
        list: [
          { title: 'Negotiable Price', value: 'negotiable' },
          { title: 'Fixed Price', value: 'fixed_price' },
          { title: 'Contact for Price', value: 'contact_for_price' },
          { title: 'Price on Application', value: 'POA' },
        ],
      },
      description: 'The pricing strategy for the property (e.g., fixed, negotiable).',
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
      validation: (Rule) => Rule.max(50).warning('Consider uploading fewer images for optimal performance.'),
      description: 'High-quality images of the property.',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'string',
      description: 'Select the primary image to display for this listing.',
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
      validation: (Rule) => Rule.max(3),
      description: 'Video tours or walkthroughs of the property.',
    }),
    defineField({
      name: 'floorPlans',
      title: 'Floor Plans',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Upload floor plans for the property.',
    }),
    defineField({
      name: 'virtualTourUrl',
      title: 'Virtual Tour URL',
      type: 'url',
      description: 'Link to a virtual tour or 3D walkthrough of the property.',
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
      validation: (Rule) => Rule.max(10),
      description: 'Additional documents like floor plans, energy certificates, or neighborhood guides.',
    }),

    // Location and Condition
    defineField({
      name: 'location',
      title: 'Location',
      type: 'location',
      description: 'The specific geographical location of the property.',
    }),
    defineField({
      name: 'condition',
      title: 'Property Condition',
      type: 'string',
      options: {
        list: [
          { title: 'New Construction', value: 'new-construction' },
          { title: 'Recently Renovated', value: 'recently-renovated' },
          { title: 'Excellent', value: 'excellent' },
          { title: 'Good', value: 'good' },
          { title: 'Needs Renovation', value: 'needs-renovation' },
        ],
      },
      description: 'The overall condition of the property.',
    }),
    defineField({
      name: 'quantity',
      title: 'Available Units',
      type: 'number',
      description: 'For multi-unit developments, the number of units currently available. Defaults to 1 for single properties.',
      initialValue: 1,
      hidden: ({ document }) => document?.propertyType !== 'apartment-complex',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{ type: 'details' }],
      description: 'Key property details e.g., plot size, build year, council rates.',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key features or highlights of the property (e.g., swimming pool, close to amenities, newly renovated).',
    }),

    // Seller Information
    defineField({
      name: 'avatar',
      title: 'Agent/Owner Avatar',
      type: 'reference',
      to: [{ type: 'user' }],
      options: {
        filter: '_type == "user" && defined(profileImage)',
      },
      description: 'An avatar image representing the listing agent or owner.',
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
                  { title: 'Property Portal X', value: 'property-portal-x' },
                ],
              },
              description: 'The platform where the property ad is being promoted.',
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
        },
      ],
      description: 'Information about the promotion of the property ad on various platforms.',
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      description: 'The number of likes the property ad has received.',
      initialValue: 0,
    }),
    defineField({
      name: 'todaysViews',
      title: "Today's Views",
      type: 'number',
      description: 'The number of views the property ad has received in the last 24 hours.',
      initialValue: 0,
    }),
    defineField({
      name: 'totalViews',
      title: 'Total Views',
      type: 'number',
      description: 'The total number of views on this property ad.',
      initialValue: 0,
    }),
    defineField({
      name: 'unreadMessages',
      title: 'Unread Messages',
      type: 'number',
      description: 'The number of unread messages related to this property ad.',
      initialValue: 0,
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
      description: 'The date and time when this property listing was first posted.',
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      initialValue: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'The date and time when this listing will automatically expire.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location.address.city',
      media: 'images.0.asset',
      status: 'approvedForSale',
      price: 'price',
      currency: 'currency',
    },
    prepare(selection) {
      const { title, subtitle, media, status, price, currency } = selection;
      return {
        title: title,
        subtitle: `${subtitle || 'No Location'} - ${
          price ? `${currency || ''} ${price.toLocaleString()}` : 'Price not set'
        } (${status})`,
        media: media,
      };
    },
  },
});