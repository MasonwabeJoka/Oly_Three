import { defineType, defineField } from 'sanity';

export const servicesListing = defineType({
  name: 'servicesListing',
  title: 'Services Listing',
  type: 'document',
  initialValue: {
    title: 'New Service Offering',
    site: 'oly-services',
    isFeatured: false,
    isActive: true,
    serviceType: 'consulting',
    currency: 'USD',
    pricingOption: 'contact_for_quote',
    approvedForListing: 'approved',
    postedOn: () => new Date().toISOString(),
    expiresAt: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 0,
    todaysViews: 0,
    totalViews: 0,
    unreadMessages: 0,
    reviewsCount: 0,
  },
  fields: [
    // Core Metadata
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      description: 'A concise title for the service offered (e.g., "Custom Website Design", "Emergency Plumbing").',
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 90,
      },
      description: 'A unique, human-readable identifier for the service listing URL.',
    }),
    defineField({
      name: 'description',
      title: 'Service Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed information about the service, what it includes, and benefits.',
      validation: (Rule) =>
        Rule.required().min(100).max(2000).warning('Service description should ideally be between 100 and 2000 characters.'),
    }),
    defineField({
      name: 'category',
      title: 'Service Category',
      type: 'reference',
      to: [{ type: 'servicesCategory' }],
      description: 'The category under which this service listing falls (e.g., Web Design, Plumbing, Tutoring).',
    }),

    // Service-Specific Attributes
    defineField({
      name: 'serviceType',
      title: 'Type of Service',
      type: 'string',
      options: {
        list: [
          { title: 'Consulting', value: 'consulting' },
          { title: 'Web Development', value: 'web-development' },
          { title: 'Graphic Design', value: 'graphic-design' },
          { title: 'Photography', value: 'photography' },
          { title: 'Home Repair', value: 'home-repair' },
          { title: 'Cleaning', value: 'cleaning' },
          { title: 'Tutoring', value: 'tutoring' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Fitness Training', value: 'fitness-training' },
          { title: 'Pet Care', value: 'pet-care' },
          { title: 'Legal Services', value: 'legal-services' },
          { title: 'Financial Services', value: 'financial-services' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'The broad type of service being offered.',
    }),
    defineField({
      name: 'providerName',
      title: 'Provider Name/Business Name',
      type: 'string',
      description: 'The name of the individual or business providing the service.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'providerWebsite',
      title: 'Provider Website',
      type: 'url',
      description: 'The official website or portfolio of the service provider.',
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service Area',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Local (Specific City)', value: 'local' },
          { title: 'Regional (State/Province)', value: 'regional' },
          { title: 'National', value: 'national' },
          { title: 'International', value: 'international' },
          { title: 'Online/Remote', value: 'online-remote' },
        ],
        layout: 'tags',
      },
      description: 'Where the service is available (e.g., local, national, online).',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          { title: 'Immediate', value: 'immediate' },
          { title: 'Within 24 Hours', value: 'within-24-hours' },
          { title: 'Within 3-5 Days', value: 'within-3-5-days' },
          { title: 'Custom Schedule', value: 'custom-schedule' },
        ],
      },
      description: 'How quickly the service can typically be started or provided.',
    }),
    defineField({
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'English', value: 'english' },
          { title: 'Spanish', value: 'spanish' },
          { title: 'French', value: 'french' },
          { title: 'German', value: 'german' },
          { title: 'Mandarin', value: 'mandarin' },
        ],
        layout: 'tags',
      },
      description: 'Languages the service provider is proficient in for communication.',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text' }),
            defineField({ name: 'author', title: 'Author', type: 'string' }),
            defineField({ name: 'authorTitle', title: 'Author Title', type: 'string' }),
          ],
        },
      ],
      description: 'Client testimonials for the service.',
    }),
    defineField({
      name: 'bookingLink',
      title: 'Booking Link',
      type: 'url',
      description: 'A direct link to book the service or schedule a consultation.',
    }),
    defineField({
      name: 'portfolioUrl',
      title: 'Portfolio URL',
      type: 'url',
      description: 'Link to an external portfolio or gallery of work.',
      hidden: ({ document }: { document: any }) => ['consulting', 'financial-services', 'legal-services'].includes(document?.serviceType),
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications/Qualifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Relevant professional certifications or qualifications.',
    }),
    defineField({
      name: 'averageRating',
      title: 'Average Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      description: 'The average rating received from clients (e.g., 4.5/5 stars).',
    }),
    defineField({
      name: 'reviewsCount',
      title: 'Number of Reviews',
      type: 'number',
      description: 'The total number of reviews received.',
      initialValue: 0,
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords/Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Relevant keywords to help users find your service (e.g., "SEO", "logo design", "home repair").',
    }),
    defineField({
      name: 'details',
      title: 'Service Inclusions/Packages',
      type: 'array',
      of: [{ type: 'details' }],
      description: "Specific details about what's included in the service or different package options.",
    }),

    // User and Status Information
    defineField({
      name: 'user',
      title: 'Service Provider',
      type: 'reference',
      to: [{ type: 'user' }],
      description: 'The user who posted this service ad (e.g., freelancer, business owner).',
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      options: {
        list: ['oly', 'oly-properties', 'oly-auto', 'oly-hiring', 'oly-services'],
      },
      description: 'The website section this service ad belongs to.',
      initialValue: 'oly-services',
      readOnly: true,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Is this service listing currently active and visible?',
    }),
    defineField({
      name: 'approvedForListing',
      title: 'Approved For Listing',
      type: 'string',
      description: 'The status indicating whether the service is approved for listing.',
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
      name: 'isFeatured',
      title: 'Featured Listing',
      type: 'boolean',
      initialValue: false,
      description: 'Whether this listing is featured.',
    }),

    // Pricing and Payment Details
    defineField({
      name: 'price',
      title: 'Starting Price / Rate',
      type: 'number',
      description: 'The starting price for the service or an hourly rate.',
      validation: (Rule) => Rule.min(0).max(999999),
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
      description: 'The currency in which the service is priced.',
    }),
    defineField({
      name: 'pricingOption',
      title: 'Pricing Model',
      type: 'string',
      options: {
        list: [
          { title: 'Fixed Price', value: 'fixed_price' },
          { title: 'Hourly Rate', value: 'hourly_rate' },
          { title: 'By Project', value: 'by_project' },
          { title: 'Contact for Quote', value: 'contact_for_quote' },
          { title: 'Negotiable', value: 'negotiable' },
        ],
      },
      description: 'How the service is typically priced (e.g., fixed, hourly, custom quote).',
      initialValue: 'contact_for_quote',
    }),
    defineField({
      name: 'priceId',
      title: 'Price ID',
      type: 'string',
      description: 'The price ID associated with this service listing (if there is a fee to list).',
      hidden: true,
    }),
    defineField({
      name: 'paystackId',
      title: 'Paystack ID',
      type: 'string',
      description: 'The Paystack ID associated with this listing (if a payment was made).',
      readOnly: true,
      hidden: true,
    }),

    // Media Fields
    defineField({
      name: 'avatar',
      title: 'Provider Profile Picture/Logo',
      type: 'reference',
      to: [{ type: 'imageFile' }],
      options: {
        filter: '_type == "imageFile"',
      },
      description: 'A profile picture of the service provider or a company logo.',
    }),
    defineField({
      name: 'images',
      title: 'Portfolio/Service Images',
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
      validation: (Rule) => Rule.max(20).warning('Consider fewer images for faster loading.'),
      description: 'Images showcasing your work, results, or process (e.g., portfolio shots).',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'string',
      description: 'Select the main image to represent your service listing.',
    }),
    defineField({
      name: 'videos',
      title: 'Service Videos',
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
      description: 'Videos explaining your service, client testimonials, or process demos.',
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
      description: 'Additional documents like brochures, case studies, or detailed price lists.',
    }),

    // Location
    defineField({
      name: 'location',
      title: 'Service Area / Location',
      type: 'location',
      description: 'The primary location where the service is offered, or "Remote/Online".',
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
                  { title: 'Facebook Ads', value: 'facebook-ads' },
                  { title: 'Google Ads', value: 'google-ads' },
                  { title: 'Instagram Ads', value: 'instagram-ads' },
                  { title: 'Thumbtack', value: 'thumbtack' },
                  { title: 'Yelp', value: 'yelp' },
                ],
              },
              description: 'The platform where the service ad is being promoted.',
            }),
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'string',
              options: {
                list: [
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
      description: 'Information about the promotion of the service ad on various platforms.',
    }),
    defineField({
      name: 'likes',
      title: 'Likes/Saves',
      type: 'number',
      description: 'The number of times the service ad has been liked or saved by users.',
      initialValue: 0,
    }),
    defineField({
      name: 'todaysViews',
      title: "Today's Views",
      type: 'number',
      description: 'The number of views the service ad has received in the last 24 hours.',
      initialValue: 0,
    }),
    defineField({
      name: 'totalViews',
      title: 'Total Views',
      type: 'number',
      description: 'The total number of views on this service ad.',
      initialValue: 0,
    }),
    defineField({
      name: 'unreadMessages',
      title: 'Unread Messages',
      type: 'number',
      description: 'The number of unread messages related to this service ad (e.g., inquiries, booking requests).',
      initialValue: 0,
    }),

    // Irrelevant Fields (Hidden)
    defineField({
      name: 'condition',
      title: 'Irrelevant Field (Condition)',
      type: 'string',
      description: 'This field is not relevant for a service ad.',
      hidden: true,
    }),
    defineField({
      name: 'quantity',
      title: 'Irrelevant Field (Quantity)',
      type: 'number',
      description: 'This field is not relevant for a service ad.',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      providerName: 'providerName',
      location: 'location.address.city',
      pricingOption: 'pricingOption',
      price: 'price',
      currency: 'currency',
      media: 'avatar',
      status: 'approvedForListing',
      serviceType: 'serviceType',
    },
    prepare(selection) {
      const {
        title,
        providerName,
        location,
        pricingOption,
        price,
        currency,
        media,
        status,
        serviceType,
      } = selection;

      const subtitleParts = [];
      if (providerName) subtitleParts.push(providerName);
      if (location) subtitleParts.push(location);

      let priceInfo = '';
      if (price !== undefined && pricingOption !== 'contact_for_quote') {
        priceInfo = `${currency || ''} ${price.toLocaleString()}`;
        if (pricingOption === 'hourly_rate') priceInfo += '/hr';
        priceInfo += ` (${pricingOption.replace(/_/g, ' ')})`;
      } else if (pricingOption === 'contact_for_quote') {
        priceInfo = 'Contact for Quote';
      }

      if (priceInfo) subtitleParts.push(priceInfo);
      if (serviceType) subtitleParts.push(serviceType.replace(/-/g, ' '));

      return {
        title: title || 'Untitled Service Ad',
        subtitle: `${subtitleParts.filter(Boolean).join(' | ')} (${status || 'N/A'})`,
        media: media,
      };
    },
  },
});