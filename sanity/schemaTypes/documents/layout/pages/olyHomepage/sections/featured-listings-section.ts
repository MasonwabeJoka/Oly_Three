import { defineType, defineField } from 'sanity';

export const featuredListingsSection = defineType({
  name: 'featuredListingsSection',
  title: 'Featured Listings Section',
  type: 'document',
  initialValue: {
    isActive: true,
    displayOrder: 4,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Featured Listings',
      description: 'The main heading for this section.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this section is currently displayed on the homepage.',
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 4,
      description: 'Order in which this section appears on the homepage (lower numbers appear first).',
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Optional subtitle or description text below the main title.',
      rows: 2,
    }),

    defineField({
      name: 'filterConfiguration',
      title: 'Filter Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'showCategoryFilter',
          title: 'Show Category Filter',
          type: 'boolean',
          initialValue: true,
          description: 'Display the category dropdown filter.',
        }),

        defineField({
          name: 'defaultFilterText',
          title: 'Default Filter Text',
          type: 'string',
          initialValue: 'All Categories',
          description: 'Text shown when no specific category is selected.',
          hidden: ({ parent }) => !parent?.showCategoryFilter,
        }),

        defineField({
          name: 'filterCategories',
          title: 'Filter Categories',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'category' }],
            },
          ],
          description: 'Categories to include in the filter dropdown (leave empty to show all categories).',
          hidden: ({ parent }) => !parent?.showCategoryFilter,
        }),

        defineField({
          name: 'showLocationFilter',
          title: 'Show Location Filter',
          type: 'boolean',
          initialValue: false,
          description: 'Display an additional location filter.',
        }),

        defineField({
          name: 'showPriceFilter',
          title: 'Show Price Range Filter',
          type: 'boolean',
          initialValue: false,
          description: 'Display price range filter options.',
        }),
      ],
      description: 'Configuration for filtering options above the listings.',
    }),

    defineField({
      name: 'listingSelection',
      title: 'Listing Selection',
      type: 'object',
      fields: [
        defineField({
          name: 'selectionMethod',
          title: 'Selection Method',
          type: 'string',
          options: {
            list: [
              { title: 'Manual Selection', value: 'manual' },
              { title: 'Auto: Featured Ads', value: 'auto-featured' },
              { title: 'Auto: Recent Premium', value: 'auto-recent-premium' },
              { title: 'Auto: Most Viewed', value: 'auto-most-viewed' },
              { title: 'Auto: Highest Priced', value: 'auto-highest-priced' },
              { title: 'Mixed: Manual + Auto', value: 'mixed' },
            ],
          },
          initialValue: 'auto-featured',
          description: 'How to select which listings to display.',
        }),

        defineField({
          name: 'manualListings',
          title: 'Manual Listings',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'featuredListing',
              title: 'Featured Listing',
              fields: [
                defineField({
                  name: 'adReference',
                  title: 'Ad Reference',
                  type: 'reference',
                  to: [{ type: 'ad' }],
                  description: 'Reference to the actual ad document.',
                }),

                defineField({
                  name: 'customTitle',
                  title: 'Custom Title',
                  type: 'string',
                  description: 'Override the ad title for this featured display (optional).',
                }),

                defineField({
                  name: 'customImage',
                  title: 'Custom Featured Image',
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
                    }),
                  ],
                  description: 'Override the ad image for this featured display (optional).',
                }),

                defineField({
                  name: 'cardSize',
                  title: 'Card Size',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Small', value: 'small' },
                      { title: 'Medium', value: 'medium' },
                      { title: 'Large', value: 'large' },
                      { title: 'Extra Large', value: 'xl' },
                    ],
                  },
                  initialValue: 'medium',
                  description: 'Size of this listing card in the grid.',
                }),

                defineField({
                  name: 'priority',
                  title: 'Display Priority',
                  type: 'number',
                  description: 'Higher numbers appear first (for manual selection).',
                }),

                defineField({
                  name: 'isActive',
                  title: 'Is Active',
                  type: 'boolean',
                  initialValue: true,
                }),
              ],
              preview: {
                select: {
                  title: 'adReference.title',
                  customTitle: 'customTitle',
                  media: 'adReference.featuredImage',
                  customMedia: 'customImage',
                  price: 'adReference.price',
                  isActive: 'isActive',
                },
                prepare(selection) {
                  const { title, customTitle, media, customMedia, price, isActive } = selection;
                  return {
                    title: customTitle || title || 'Unnamed Listing',
                    subtitle: `${isActive ? '✅' : '❌'} ${price ? `$${price}` : 'No price'}`,
                    media: customMedia || media,
                  };
                },
              },
            },
          ],
          hidden: ({ parent }) => !['manual', 'mixed'].includes(parent?.selectionMethod),
          description: 'Manually selected listings to feature.',
        }),

        defineField({
          name: 'autoSelectionCriteria',
          title: 'Auto Selection Criteria',
          type: 'object',
          fields: [
            defineField({
              name: 'maxListings',
              title: 'Maximum Listings',
              type: 'number',
              initialValue: 12,
              validation: (Rule) => Rule.min(1).max(50),
              description: 'Maximum number of listings to display.',
            }),

            defineField({
              name: 'excludeCategories',
              title: 'Exclude Categories',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'category' }],
                },
              ],
              description: 'Categories to exclude from auto-selection.',
            }),

            defineField({
              name: 'minPrice',
              title: 'Minimum Price',
              type: 'number',
              description: 'Only include listings above this price (optional).',
            }),

            defineField({
              name: 'maxAge',
              title: 'Maximum Age (days)',
              type: 'number',
              initialValue: 30,
              description: 'Only include listings posted within this many days.',
            }),

            defineField({
              name: 'requireImages',
              title: 'Require Images',
              type: 'boolean',
              initialValue: true,
              description: 'Only include listings that have images.',
            }),
          ],
          hidden: ({ parent }) => parent?.selectionMethod === 'manual',
          description: 'Criteria for automatically selecting listings.',
        }),
      ],
      description: 'Configuration for how listings are selected and displayed.',
    }),

    defineField({
      name: 'layoutConfiguration',
      title: 'Layout Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'layoutStyle',
          title: 'Layout Style',
          type: 'string',
          options: {
            list: [
              { title: 'Masonry Grid', value: 'masonry' },
              { title: 'Regular Grid', value: 'grid' },
              { title: 'List View', value: 'list' },
            ],
          },
          initialValue: 'masonry',
          description: 'Overall layout style for the listings.',
        }),

        defineField({
          name: 'columnsPerRow',
          title: 'Columns Per Row',
          type: 'object',
          fields: [
            defineField({
              name: 'desktop',
              title: 'Desktop',
              type: 'number',
              options: {
                list: [
                  { title: '3 Columns', value: 3 },
                  { title: '4 Columns', value: 4 },
                  { title: '5 Columns', value: 5 },
                  { title: '6 Columns', value: 6 },
                ],
              },
              initialValue: 5,
            }),
            defineField({
              name: 'tablet',
              title: 'Tablet',
              type: 'number',
              options: {
                list: [
                  { title: '2 Columns', value: 2 },
                  { title: '3 Columns', value: 3 },
                  { title: '4 Columns', value: 4 },
                ],
              },
              initialValue: 3,
            }),
            defineField({
              name: 'mobile',
              title: 'Mobile',
              type: 'number',
              options: {
                list: [
                  { title: '1 Column', value: 1 },
                  { title: '2 Columns', value: 2 },
                ],
              },
              initialValue: 2,
            }),
          ],
          description: 'Number of columns on different screen sizes.',
        }),

        defineField({
          name: 'cardSpacing',
          title: 'Card Spacing',
          type: 'string',
          options: {
            list: [
              { title: 'Tight', value: 'tight' },
              { title: 'Normal', value: 'normal' },
              { title: 'Loose', value: 'loose' },
            ],
          },
          initialValue: 'normal',
          description: 'Spacing between listing cards.',
        }),

        defineField({
          name: 'cardAspectRatios',
          title: 'Card Aspect Ratios',
          type: 'object',
          fields: [
            defineField({
              name: 'small',
              title: 'Small Cards',
              type: 'string',
              options: {
                list: [
                  { title: 'Square (1:1)', value: '1:1' },
                  { title: 'Portrait (3:4)', value: '3:4' },
                  { title: 'Landscape (4:3)', value: '4:3' },
                ],
              },
              initialValue: '1:1',
            }),
            defineField({
              name: 'medium',
              title: 'Medium Cards',
              type: 'string',
              options: {
                list: [
                  { title: 'Square (1:1)', value: '1:1' },
                  { title: 'Portrait (3:4)', value: '3:4' },
                  { title: 'Landscape (4:3)', value: '4:3' },
                ],
              },
              initialValue: '3:4',
            }),
            defineField({
              name: 'large',
              title: 'Large Cards',
              type: 'string',
              options: {
                list: [
                  { title: 'Square (1:1)', value: '1:1' },
                  { title: 'Portrait (3:4)', value: '3:4' },
                  { title: 'Landscape (4:3)', value: '4:3' },
                  { title: 'Wide (16:9)', value: '16:9' },
                ],
              },
              initialValue: '4:3',
            }),
          ],
          description: 'Aspect ratios for different card sizes.',
        }),
      ],
      description: 'Layout and display options for the listings grid.',
    }),

    defineField({
      name: 'cardConfiguration',
      title: 'Card Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'showPrice',
          title: 'Show Price',
          type: 'boolean',
          initialValue: true,
          description: 'Display the price on listing cards.',
        }),

        defineField({
          name: 'priceFormat',
          title: 'Price Format',
          type: 'string',
          options: {
            list: [
              { title: 'Full Price (R 50,000)', value: 'full' },
              { title: 'Abbreviated (50K)', value: 'abbreviated' },
              { title: 'Compact (50k)', value: 'compact' },
            ],
          },
          initialValue: 'abbreviated',
          hidden: ({ parent }) => !parent?.showPrice,
        }),

        defineField({
          name: 'showLocation',
          title: 'Show Location',
          type: 'boolean',
          initialValue: false,
          description: 'Display location information on cards.',
        }),

        defineField({
          name: 'showCategory',
          title: 'Show Category',
          type: 'boolean',
          initialValue: false,
          description: 'Display category badge on cards.',
        }),

        defineField({
          name: 'showFeaturedBadge',
          title: 'Show Featured Badge',
          type: 'boolean',
          initialValue: true,
          description: 'Display a "Featured" badge on premium listings.',
        }),

        defineField({
          name: 'hoverEffect',
          title: 'Hover Effect',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Scale Up', value: 'scale' },
              { title: 'Lift (Shadow)', value: 'lift' },
              { title: 'Overlay', value: 'overlay' },
            ],
          },
          initialValue: 'lift',
          description: 'Effect when hovering over listing cards.',
        }),

        defineField({
          name: 'cardStyle',
          title: 'Card Style',
          type: 'object',
          fields: [
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
            }),

            defineField({
              name: 'shadow',
              title: 'Card Shadow',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: 'none' },
                  { title: 'Small', value: 'small' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Large', value: 'large' },
                ],
              },
              initialValue: 'small',
            }),

            defineField({
              name: 'border',
              title: 'Card Border',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: 'none' },
                  { title: 'Light', value: 'light' },
                  { title: 'Medium', value: 'medium' },
                ],
              },
              initialValue: 'none',
            }),
          ],
          description: 'Visual styling for listing cards.',
        }),
      ],
      description: 'Configuration for individual listing cards.',
    }),

    defineField({
      name: 'sectionStyle',
      title: 'Section Style',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Section Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'White', value: 'white' },
              { title: 'Light Gray', value: 'light-gray' },
              { title: 'Off White', value: 'off-white' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'white',
        }),

        defineField({
          name: 'customBackgroundColor',
          title: 'Custom Background Color',
          type: 'string',
          description: 'Hex color code for custom background',
          hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
        }),

        defineField({
          name: 'padding',
          title: 'Section Padding',
          type: 'string',
          options: {
            list: [
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'medium',
        }),

        defineField({
          name: 'titleAlignment',
          title: 'Title Alignment',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'center',
        }),
      ],
      description: 'Overall styling for the section.',
    }),

    defineField({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'showviewAllListingsButton',
          title: 'Show "View All Listings" Button',
          type: 'boolean',
          initialValue: true,
        }),

        defineField({
          name: 'viewAllListingsButtonText',
          title: 'View All Listings Button Text',
          type: 'string',
          initialValue: 'View All Listings',
          hidden: ({ parent }) => !parent?.showviewAllListingsButton,
        }),

        defineField({
          name: 'viewAllListingsButtonUrl',
          title: 'View All Listings Button URL',
          type: 'string',
          initialValue: '/listings',
          hidden: ({ parent }) => !parent?.showviewAllListingsButton,
        }),

        defineField({
          name: 'buttonStyle',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
            ],
          },
          initialValue: 'outline',
          hidden: ({ parent }) => !parent?.showviewAllListingsButton,
        }),
      ],
      description: 'Call-to-action button configuration.',
    }),

    defineField({
      name: 'analytics',
      title: 'Analytics Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'trackListingViews',
          title: 'Track Listing Views',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users view listings in this section.',
        }),

        defineField({
          name: 'trackListingClicks',
          title: 'Track Listing Clicks',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users click on listings.',
        }),

        defineField({
          name: 'trackFilterUsage',
          title: 'Track Filter Usage',
          type: 'boolean',
          initialValue: true,
          description: 'Track which filters users apply.',
        }),
      ],
      description: 'Analytics and tracking configuration.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this section configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      selectionMethod: 'listingSelection.selectionMethod',
      maxListings: 'listingSelection.autoSelectionCriteria.maxListings',
    },
    prepare(selection) {
      const { title, isActive, selectionMethod, maxListings } = selection;
      const method = selectionMethod === 'manual' ? 'Manual' : 'Auto';
      const count = maxListings || 'N/A';
      
      return {
        title: title || 'Featured Listings Section',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${method} (${count} max)`,
        media: '🏠',
      };
    },
  },
});