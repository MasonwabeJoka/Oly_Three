import { defineType, defineField } from 'sanity';

export const autoListing = defineType({
  name: 'autoListing',
  title: 'Auto Listing',
  type: 'document',
  initialValue: {
    title: 'New Vehicle Listing',
    site: 'oly-auto',
    featured: false,
    isActive: true,
    vehicleType: 'car',
    listingType: 'for-sale',
    currency: 'USD',
    pricingOption: 'fixed_price',
    approvedForListing: 'approved',
    condition: 'used-good',
    quantity: 1,
    year: () => new Date().getFullYear(),
    postedOn: () => new Date().toISOString(),
    expiresAt: () => new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 0,
    todaysViews: 0,
    totalViews: 0,
    unreadMessages: 0,
    serviceHistoryAvailable: false,
  },
  fields: [
    // Core Metadata
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the vehicle ad, summarizing the listing (e.g., "2020 Toyota Camry XSE").',
      validation: (Rule) => Rule.required().max(200),
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
      description: 'Detailed information about the vehicle being offered.',
      validation: (Rule) =>
        Rule.required().max(1000).warning('Description should ideally be under 1000 characters for readability.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'vehicleCategory' }],
      description: 'The category under which this vehicle listing falls (e.g., Cars, Motorcycles, Trucks).',
    }),

    // Vehicle-Specific Attributes
    defineField({
      name: 'vehicleType',
      title: 'Vehicle Type',
      type: 'string',
      options: {
        list: [
          { title: 'Car', value: 'car' },
          { title: 'Motorcycle', value: 'motorcycle' },
          { title: 'Truck', value: 'truck' },
          { title: 'Van', value: 'van' },
          { title: 'SUV', value: 'suv' },
          { title: 'Boat', value: 'boat' },
          { title: 'RV/Camper', value: 'rv-camper' },
          { title: 'Heavy Equipment', value: 'heavy-equipment' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'The type of vehicle being listed.',
    }),
    defineField({
      name: 'listingType',
      title: 'Listing Type',
      type: 'string',
      options: {
        list: [
          { title: 'For Sale', value: 'for-sale' },
          { title: 'For Rent', value: 'for-rent' },
          { title: 'Lease Transfer', value: 'lease-transfer' },
          { title: 'Auction', value: 'auction' },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Is this vehicle for sale, for rent, or lease transfer?',
    }),
    defineField({
      name: 'make',
      title: 'Make',
      type: 'string',
      description: 'The manufacturer of the vehicle (e.g., Toyota, Ford, BMW).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      description: 'The specific model of the vehicle (e.g., Camry, F-150, X5).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 2),
      description: 'The model year of the vehicle.',
      initialValue: () => new Date().getFullYear(),
    }),
    defineField({
      name: 'mileage',
      title: 'Mileage',
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'number',
          description: 'The numerical value of the mileage.',
          validation: (Rule) => Rule.min(0),
        }),
        defineField({
          name: 'unit',
          title: 'Unit',
          type: 'string',
          options: {
            list: ['miles', 'km'],
          },
          initialValue: 'miles',
          description: 'Unit of measurement for the mileage.',
        }),
      ],
      description: 'The total distance the vehicle has traveled.',
      hidden: ({ document }) => document?.condition === 'new',
    }),
    defineField({
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: [
          { title: 'Petrol', value: 'petrol' },
          { title: 'Diesel', value: 'diesel' },
          { title: 'Electric', value: 'electric' },
          { title: 'Hybrid', value: 'hybrid' },
          { title: 'LPG', value: 'lpg' },
          { title: 'Other', value: 'other' },
        ],
      },
      description: 'The type of fuel the vehicle uses.',
    }),
    defineField({
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: {
        list: [
          { title: 'Automatic', value: 'automatic' },
          { title: 'Manual', value: 'manual' },
          { title: 'Semi-Automatic', value: 'semi-automatic' },
        ],
      },
      description: 'The transmission type of the vehicle.',
    }),
    defineField({
      name: 'engineSize',
      title: 'Engine Size',
      type: 'string',
      description: 'The size or displacement of the engine (e.g., "2.0L", "V6", "1.5L Turbo").',
    }),
    defineField({
      name: 'colorExterior',
      title: 'Exterior Color',
      type: 'string',
      description: 'The exterior color of the vehicle.',
    }),
    defineField({
      name: 'colorInterior',
      title: 'Interior Color',
      type: 'string',
      description: 'The interior color of the vehicle.',
    }),
    defineField({
      name: 'doors',
      title: 'Doors',
      type: 'number',
      options: {
        list: [2, 3, 4, 5, 6],
      },
      description: 'Number of doors on the vehicle.',
      hidden: ({ document }) => !['car', 'suv', 'truck', 'van'].includes(document?.vehicleType),
    }),
    defineField({
      name: 'vin',
      title: 'VIN',
      type: 'string',
      description: 'Vehicle Identification Number.',
      validation: (Rule) =>
        Rule.regex(/^[A-HJ-NPR-Z0-9]{17}$/i, { name: 'VIN', invert: false }).warning(
          'VIN must be 17 alphanumeric characters (excluding I, O, Q).',
        ),
    }),
    defineField({
      name: 'driveType',
      title: 'Drive Type',
      type: 'string',
      options: {
        list: ['FWD', 'RWD', 'AWD', '4WD'],
      },
      description: 'Front-Wheel Drive (FWD), Rear-Wheel Drive (RWD), All-Wheel Drive (AWD), or Four-Wheel Drive (4WD).',
      hidden: ({ document }) => !['car', 'suv', 'truck', 'van'].includes(document?.vehicleType),
    }),
    defineField({
      name: 'bodyStyle',
      title: 'Body Style',
      type: 'string',
      options: {
        list: [
          { title: 'Sedan', value: 'sedan' },
          { title: 'Hatchback', value: 'hatchback' },
          { title: 'Coupe', value: 'coupe' },
          { title: 'Convertible', value: 'convertible' },
          { title: 'SUV', value: 'suv' },
          { title: 'Truck', value: 'truck' },
          { title: 'Minivan', value: 'minivan' },
          { title: 'Wagon', value: 'wagon' },
          { title: 'Sports Car', value: 'sports-car' },
          { title: 'Electric', value: 'electric' },
          { title: 'Other', value: 'other' },
        ],
      },
      description: 'The body style of the vehicle.',
      hidden: ({ document }) => !['car', 'suv', 'truck', 'van'].includes(document?.vehicleType),
    }),
    defineField({
      name: 'seatingCapacity',
      title: 'Seating Capacity',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(30),
      description: 'The maximum number of occupants the vehicle can carry.',
      hidden: ({ document }) => document?.vehicleType === 'heavy-equipment',
    }),
    defineField({
      name: 'serviceHistoryAvailable',
      title: 'Service History Available',
      type: 'boolean',
      description: 'Indicates if comprehensive service records are available for the vehicle.',
      initialValue: false,
      hidden: ({ document }) => document?.condition === 'new',
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty',
      type: 'string',
      options: {
        list: [
          { title: 'Manufacturer Warranty', value: 'manufacturer-warranty' },
          { title: 'Dealer Warranty', value: 'dealer-warranty' },
          { title: 'Aftermarket Warranty', value: 'aftermarket-warranty' },
          { title: 'No Warranty', value: 'no-warranty' },
        ],
      },
      description: 'Information about any existing warranty.',
    }),
    defineField({
      name: 'carfaxReportUrl',
      title: 'Carfax Report URL',
      type: 'url',
      description: 'Link to a Carfax or similar vehicle history report.',
    }),

    // User and Status Information
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user who posted this vehicle ad.',
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: ['oly', 'oly-properties', 'oly-auto', 'oly-hiring', 'oly-services'],
      },
      description: 'The website section this vehicle ad belongs to.',
      initialValue: 'oly-auto',
      readOnly: true,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Is this vehicle listing currently active and visible?',
    }),
    defineField({
      name: 'approvedForListing',
      title: 'Approved For Listing',
      type: 'string',
      description: 'The status indicating whether the vehicle is approved for listing.',
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
      description: 'Whether this vehicle ad is featured.',
    }),

    // Pricing and Payment Details
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'The price for the vehicle.',
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
      description: 'The currency in which the vehicle is priced.',
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
        ],
      },
      description: 'The pricing strategy for the vehicle (e.g., fixed, negotiable).',
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
      description: 'The Paystack ID associated with this product.',
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
      validation: (Rule) => Rule.max(30).warning('Consider uploading fewer images for optimal performance.'),
      description: 'High-quality images of the vehicle.',
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
      description: 'Video tours or walk-arounds of the vehicle.',
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
      validation: (Rule) => Rule.max(5),
      description: 'Additional documents like service history or vehicle reports.',
    }),

    // Location and Condition
    defineField({
      name: 'location',
      title: 'Location',
      type: 'location',
      description: 'The specific geographical location where the vehicle is located.',
    }),
    defineField({
      name: 'condition',
      title: 'Vehicle Condition',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Used - Excellent', value: 'used-excellent' },
          { title: 'Used - Good', value: 'used-good' },
          { title: 'Used - Fair', value: 'used-fair' },
          { title: 'Salvage/Rebuilt', value: 'salvage' },
        ],
      },
      description: 'The overall condition of the vehicle.',
      initialValue: 'used-good',
    }),
    defineField({
      name: 'quantity',
      title: 'Available Units',
      type: 'number',
      description: 'The number of identical vehicles available (e.g., a dealership with multiple new cars). Defaults to 1 for unique vehicles.',
      initialValue: 1,
      hidden: ({ document }) => document?.listingType === 'used',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{ type: 'details' }],
      description: 'Key vehicle details e.g., engine size, fuel type.',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key features or highlights of the vehicle (e.g., sunroof, leather seats, navigation).',
    }),

    // Seller Information
    defineField({
      name: 'avatar',
      title: 'Seller Avatar',
      type: 'reference',
      to: [{ type: 'user' }],
      options: {
        filter: '_type == "user" && defined(profileImage)',
      },
      description: 'An avatar image representing the vehicle seller.',
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
                  { title: 'Auto Trader', value: 'auto-trader' },
                  { title: 'Cars.com', value: 'cars-com' },
                ],
              },
              description: 'The platform where the vehicle ad is being promoted.',
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
      description: 'Information about the promotion of the vehicle ad on various platforms.',
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      description: 'The number of likes the vehicle ad has received.',
      initialValue: 0,
    }),
    defineField({
      name: 'todaysViews',
      title: "Today's Views",
      type: 'number',
      description: 'The number of views the vehicle ad has received in the last 24 hours.',
      initialValue: 0,
    }),
    defineField({
      name: 'totalViews',
      title: 'Total Views',
      type: 'number',
      description: 'The total number of views on this vehicle ad.',
      initialValue: 0,
    }),
    defineField({
      name: 'unreadMessages',
      title: 'Unread Messages',
      type: 'number',
      description: 'The number of unread messages related to this vehicle ad.',
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
      description: 'The date and time when this vehicle listing was first posted.',
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      initialValue: () => new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'The date and time when this listing will automatically expire.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      make: 'make',
      model: 'model',
      year: 'year',
      media: 'images.0.asset',
      status: 'approvedForListing',
      price: 'price',
      currency: 'currency',
      mileage: 'mileage.value',
      mileageUnit: 'mileage.unit',
    },
    prepare(selection) {
      const { title, make, model, year, media, status, price, currency, mileage, mileageUnit } = selection;
      const subtitleParts = [];
      if (year && make && model) {
        subtitleParts.push(`${year} ${make} ${model}`);
      } else if (title) {
        subtitleParts.push(title);
      }
      if (mileage && mileageUnit) {
        subtitleParts.push(`${mileage.toLocaleString()} ${mileageUnit}`);
      }
      if (price) {
        subtitleParts.push(`${currency || ''} ${price.toLocaleString()}`);
      }
      const finalSubtitle = subtitleParts.filter(Boolean).join(' | ');
      return {
        title: title || 'Untitled Vehicle Ad',
        subtitle: `${finalSubtitle} (${status || 'N/A'})`,
        media: media,
      };
    },
  },
});