import { defineType, defineField } from 'sanity';

export const adSection = defineType({
  name: 'adSection',
  title: 'Ad Section',
  type: 'document',
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Ad Section Configuration Title',
      type: 'string',
      initialValue: 'Main Ad Section',
      description: 'Internal title for this ad section configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this ad section is currently active.',
    }),

    defineField({
      name: 'sectionTitle',
      title: 'Section Display Title',
      type: 'string',
      description: 'Optional title displayed above the ad section (leave empty to hide).',
    }),

    defineField({
      name: 'adType',
      title: 'Ad Type',
      type: 'string',
      options: {
        list: [
          { title: 'Sponsored Business Ads', value: 'sponsored' },
          { title: 'Third-Party Ad Network (AdSense, etc.)', value: 'network' },
          { title: 'Mixed (Both Types)', value: 'mixed' },
        ],
      },
      initialValue: 'sponsored',
      description: 'Type of advertisements to display in this section.',
    }),

    defineField({
      name: 'sponsoredAds',
      title: 'Sponsored Business Ads',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'sponsoredAd',
          title: 'Sponsored Ad',
          fields: [
            defineField({
              name: 'adTitle',
              title: 'Ad Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Title of the sponsored advertisement.',
            }),

            defineField({
              name: 'businessName',
              title: 'Business Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Name of the sponsoring business.',
            }),

            defineField({
              name: 'adDescription',
              title: 'Ad Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.max(200),
              description: 'Brief description of the ad (max 200 characters).',
            }),

            defineField({
              name: 'adImage',
              title: 'Ad Image',
              type: 'image',
              options: {
                hotspot: true,
                metadata: ['blurhash', 'lqip', 'palette'],
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                  description: 'Alternative text for the ad image.',
                }),
              ],
              validation: (Rule) => Rule.required(),
              description: 'Main image for the sponsored ad.',
            }),

            defineField({
              name: 'adUrl',
              title: 'Ad URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
              description: 'URL where users will be directed when clicking the ad.',
            }),

            defineField({
              name: 'callToAction',
              title: 'Call to Action',
              type: 'string',
              options: {
                list: [
                  { title: 'Learn More', value: 'learn-more' },
                  { title: 'Shop Now', value: 'shop-now' },
                  { title: 'Get Quote', value: 'get-quote' },
                  { title: 'Contact Us', value: 'contact-us' },
                  { title: 'Visit Website', value: 'visit-website' },
                  { title: 'Book Now', value: 'book-now' },
                  { title: 'Custom', value: 'custom' },
                ],
              },
              initialValue: 'learn-more',
              description: 'Call to action button text.',
            }),

            defineField({
              name: 'customCTA',
              title: 'Custom CTA Text',
              type: 'string',
              hidden: ({ parent }) => parent?.callToAction !== 'custom',
              description: 'Custom call to action text.',
            }),

            defineField({
              name: 'adCategory',
              title: 'Ad Category',
              type: 'string',
              options: {
                list: [
                  { title: 'General', value: 'general' },
                  { title: 'Real Estate', value: 'real-estate' },
                  { title: 'Automotive', value: 'automotive' },
                  { title: 'Services', value: 'services' },
                  { title: 'Jobs', value: 'jobs' },
                  { title: 'Technology', value: 'technology' },
                  { title: 'Health & Wellness', value: 'health' },
                  { title: 'Education', value: 'education' },
                  { title: 'Finance', value: 'finance' },
                ],
              },
              initialValue: 'general',
              description: 'Category of the sponsored ad.',
            }),

            defineField({
              name: 'priority',
              title: 'Ad Priority',
              type: 'number',
              initialValue: 1,
              validation: (Rule) => Rule.min(1).max(10),
              description: 'Priority level (1-10, higher numbers show first).',
            }),

            defineField({
              name: 'startDate',
              title: 'Start Date',
              type: 'datetime',
              description: 'When this ad should start displaying.',
            }),

            defineField({
              name: 'endDate',
              title: 'End Date',
              type: 'datetime',
              description: 'When this ad should stop displaying.',
            }),

            defineField({
              name: 'targetAudience',
              title: 'Target Audience',
              type: 'object',
              fields: [
                defineField({
                  name: 'locations',
                  title: 'Target Locations',
                  type: 'array',
                  of: [{ type: 'string' }],
                  options: {
                    layout: 'tags',
                  },
                  description: 'Specific locations to target (cities, regions).',
                }),
                defineField({
                  name: 'ageGroups',
                  title: 'Age Groups',
                  type: 'array',
                  of: [
                    {
                      type: 'string',
                      options: {
                        list: [
                          { title: '18-24', value: '18-24' },
                          { title: '25-34', value: '25-34' },
                          { title: '35-44', value: '35-44' },
                          { title: '45-54', value: '45-54' },
                          { title: '55-64', value: '55-64' },
                          { title: '65+', value: '65+' },
                        ],
                      },
                    },
                  ],
                  description: 'Target age groups for this ad.',
                }),
                defineField({
                  name: 'interests',
                  title: 'Target Interests',
                  type: 'array',
                  of: [{ type: 'string' }],
                  options: {
                    layout: 'tags',
                  },
                  description: 'Target interests and keywords.',
                }),
              ],
              description: 'Targeting options for this sponsored ad.',
            }),

            defineField({
              name: 'isActive',
              title: 'Ad Active',
              type: 'boolean',
              initialValue: true,
              description: 'Whether this individual ad is active.',
            }),
          ],
          preview: {
            select: {
              title: 'adTitle',
              business: 'businessName',
              media: 'adImage',
              isActive: 'isActive',
              priority: 'priority',
            },
            prepare(selection) {
              const { title, business, media, isActive, priority } = selection;
              return {
                title: title || 'Untitled Ad',
                subtitle: `${business} ${isActive ? '✅' : '❌'} (Priority: ${priority || 1})`,
                media: media,
              };
            },
          },
        },
      ],
      hidden: ({ document }) => !['sponsored', 'mixed'].includes(document?.adType),
      validation: (Rule) => Rule.max(10),
      description: 'Sponsored business advertisements.',
    }),

    defineField({
      name: 'networkAds',
      title: 'Third-Party Ad Network Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'adNetwork',
          title: 'Ad Network',
          type: 'string',
          options: {
            list: [
              { title: 'Google AdSense', value: 'adsense' },
              { title: 'Media.net', value: 'media-net' },
              { title: 'Amazon Associates', value: 'amazon' },
              { title: 'Facebook Audience Network', value: 'facebook' },
              { title: 'Custom HTML/JavaScript', value: 'custom' },
            ],
          },
          initialValue: 'adsense',
          description: 'Third-party ad network to use.',
        }),

        defineField({
          name: 'adUnitId',
          title: 'Ad Unit ID',
          type: 'string',
          hidden: ({ parent }) => parent?.adNetwork === 'custom',
          description: 'Ad unit ID from your ad network (e.g., AdSense ad unit ID).',
        }),

        defineField({
          name: 'adSlotId',
          title: 'Ad Slot ID',
          type: 'string',
          hidden: ({ parent }) => !['adsense', 'media-net'].includes(parent?.adNetwork),
          description: 'Ad slot ID for display ads.',
        }),

        defineField({
          name: 'customAdCode',
          title: 'Custom Ad Code',
          type: 'text',
          rows: 8,
          hidden: ({ parent }) => parent?.adNetwork !== 'custom',
          description: 'Custom HTML/JavaScript ad code.',
        }),

        defineField({
          name: 'adSize',
          title: 'Ad Size',
          type: 'string',
          options: {
            list: [
              { title: 'Banner (728x90)', value: 'banner' },
              { title: 'Leaderboard (728x90)', value: 'leaderboard' },
              { title: 'Rectangle (300x250)', value: 'rectangle' },
              { title: 'Large Rectangle (336x280)', value: 'large-rectangle' },
              { title: 'Skyscraper (160x600)', value: 'skyscraper' },
              { title: 'Mobile Banner (320x50)', value: 'mobile-banner' },
              { title: 'Responsive', value: 'responsive' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'responsive',
          description: 'Size of the ad unit.',
        }),

        defineField({
          name: 'customWidth',
          title: 'Custom Width (px)',
          type: 'number',
          hidden: ({ parent }) => parent?.adSize !== 'custom',
          description: 'Custom ad width in pixels.',
        }),

        defineField({
          name: 'customHeight',
          title: 'Custom Height (px)',
          type: 'number',
          hidden: ({ parent }) => parent?.adSize !== 'custom',
          description: 'Custom ad height in pixels.',
        }),

        defineField({
          name: 'adFormat',
          title: 'Ad Format',
          type: 'string',
          options: {
            list: [
              { title: 'Display', value: 'display' },
              { title: 'Text', value: 'text' },
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' },
              { title: 'Native', value: 'native' },
              { title: 'Auto', value: 'auto' },
            ],
          },
          initialValue: 'auto',
          description: 'Format of the ad content.',
        }),
      ],
      hidden: ({ document }) => !['network', 'mixed'].includes(document?.adType),
      description: 'Configuration for third-party ad networks.',
    }),

    defineField({
      name: 'adLayout',
      title: 'Ad Layout',
      type: 'object',
      fields: [
        defineField({
          name: 'displayStyle',
          title: 'Display Style',
          type: 'string',
          options: {
            list: [
              { title: 'Single Ad', value: 'single' },
              { title: 'Carousel/Slider', value: 'carousel' },
              { title: 'Grid Layout', value: 'grid' },
              { title: 'List Layout', value: 'list' },
            ],
          },
          initialValue: 'single',
          description: 'How ads are displayed in the section.',
        }),

        defineField({
          name: 'adsPerRow',
          title: 'Ads Per Row',
          type: 'number',
          options: {
            list: [
              { title: '1', value: 1 },
              { title: '2', value: 2 },
              { title: '3', value: 3 },
              { title: '4', value: 4 },
            ],
          },
          initialValue: 2,
          hidden: ({ parent }) => parent?.displayStyle !== 'grid',
          description: 'Number of ads per row in grid layout.',
        }),

        defineField({
          name: 'maxAdsToShow',
          title: 'Maximum Ads to Show',
          type: 'number',
          initialValue: 3,
          validation: (Rule) => Rule.min(1).max(10),
          description: 'Maximum number of ads to display at once.',
        }),

        defineField({
          name: 'autoRotate',
          title: 'Auto-Rotate Ads',
          type: 'boolean',
          initialValue: false,
          description: 'Automatically rotate through available ads.',
        }),

        defineField({
          name: 'rotationInterval',
          title: 'Rotation Interval (seconds)',
          type: 'number',
          initialValue: 10,
          validation: (Rule) => Rule.min(5).max(60),
          hidden: ({ parent }) => !parent?.autoRotate,
          description: 'Time between ad rotations in seconds.',
        }),
      ],
      description: 'Layout and display options for the ad section.',
    }),

    defineField({
      name: 'adStyle',
      title: 'Ad Styling',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'Transparent', value: 'transparent' },
              { title: 'White', value: 'white' },
              { title: 'Light Gray', value: 'light-gray' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'light-gray',
          description: 'Background color of the ad section.',
        }),

        defineField({
          name: 'customBackgroundColor',
          title: 'Custom Background Color',
          type: 'string',
          description: 'Hex color code for custom background',
          hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
        }),

        defineField({
          name: 'borderRadius',
          title: 'Border Radius',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'medium',
          description: 'Corner rounding for ad containers.',
        }),

        defineField({
          name: 'showAdLabel',
          title: 'Show "Advertisement" Label',
          type: 'boolean',
          initialValue: true,
          description: 'Display "Advertisement" or "Sponsored" label.',
        }),

        defineField({
          name: 'adLabelText',
          title: 'Ad Label Text',
          type: 'string',
          initialValue: 'Advertisement',
          hidden: ({ parent }) => !parent?.showAdLabel,
          description: 'Text for the ad label.',
        }),

        defineField({
          name: 'sectionPadding',
          title: 'Section Padding',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'medium',
          description: 'Padding around the ad section.',
        }),
      ],
      description: 'Visual styling options for the ad section.',
    }),

    defineField({
      name: 'responsiveSettings',
      title: 'Responsive Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'hideOnMobile',
          title: 'Hide on Mobile',
          type: 'boolean',
          initialValue: false,
          description: 'Hide this ad section on mobile devices.',
        }),

        defineField({
          name: 'mobileLayout',
          title: 'Mobile Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Same as Desktop', value: 'desktop' },
              { title: 'Single Column', value: 'single' },
              { title: 'Stacked', value: 'stacked' },
            ],
          },
          initialValue: 'single',
          hidden: ({ parent }) => parent?.hideOnMobile,
          description: 'Layout for mobile devices.',
        }),
      ],
      description: 'Responsive behavior settings.',
    }),

    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        defineField({
          name: 'trackClicks',
          title: 'Track Ad Clicks',
          type: 'boolean',
          initialValue: true,
          description: 'Track clicks on sponsored ads.',
        }),

        defineField({
          name: 'trackImpressions',
          title: 'Track Ad Impressions',
          type: 'boolean',
          initialValue: true,
          description: 'Track ad impressions and views.',
        }),

        defineField({
          name: 'customTrackingCode',
          title: 'Custom Tracking Code',
          type: 'text',
          rows: 4,
          description: 'Custom analytics or tracking code for ads.',
        }),
      ],
      description: 'Analytics and tracking configuration.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this ad section configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      adType: 'adType',
      sponsoredCount: 'sponsoredAds',
      displayStyle: 'adLayout.displayStyle',
    },
    prepare(selection) {
      const { title, isActive, adType, sponsoredCount, displayStyle } = selection;
      const count = Array.isArray(sponsoredCount) ? sponsoredCount.length : 0;
      
      const typeEmoji = {
        sponsored: '💼',
        network: '🌐',
        mixed: '🔄',
      };
      
      return {
        title: title || 'Ad Section Configuration',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${adType} (${count} sponsored ads) - ${displayStyle || 'single'}`,
        media: typeEmoji[adType] || '📢',
      };
    },
  },
});