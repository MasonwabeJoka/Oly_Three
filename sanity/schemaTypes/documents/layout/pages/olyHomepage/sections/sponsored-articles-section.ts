import { defineType, defineField } from 'sanity';

export const sponsoredArticlesSection = defineType({
  name: 'sponsoredArticlesSection',
  title: 'Sponsored Articles Section',
  type: 'document',
  initialValue: {
    isActive: true,
    displayOrder: 6,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Sponsored Articles',
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
      initialValue: 6,
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
      name: 'articleSelection',
      title: 'Sponsored Article Selection',
      type: 'object',
      fields: [
        defineField({
          name: 'selectionMethod',
          title: 'Selection Method',
          type: 'string',
          options: {
            list: [
              { title: 'Manual Selection', value: 'manual' },
              { title: 'Auto: Active Sponsorships', value: 'auto-active' },
              { title: 'Auto: Highest Paying', value: 'auto-highest-paying' },
              { title: 'Auto: Recent Sponsored', value: 'auto-recent' },
              { title: 'Auto: Best Performing', value: 'auto-performing' },
              { title: 'Priority: Premium Sponsors', value: 'priority-premium' },
              { title: 'Mixed: Manual + Auto', value: 'mixed' },
            ],
          },
          initialValue: 'auto-active',
          description: 'How to select which sponsored articles to display.',
        }),

        defineField({
          name: 'manualSponsoredArticles',
          title: 'Manual Sponsored Articles',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'featuredSponsoredArticle',
              title: 'Featured Sponsored Article',
              fields: [
                defineField({
                  name: 'sponsoredArticleReference',
                  title: 'Sponsored Article Reference',
                  type: 'reference',
                  to: [{ type: 'sponsoredArticle' }],
                  description: 'Reference to the actual sponsored article document.',
                  validation: (Rule) => Rule.required(),
                }),

                defineField({
                  name: 'sponsorshipDetails',
                  title: 'Sponsorship Details',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'sponsor',
                      title: 'Sponsor',
                      type: 'reference',
                      to: [{ type: 'sponsor' }],
                      description: 'The company or individual sponsoring this article.',
                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: 'sponsorshipTier',
                      title: 'Sponsorship Tier',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Basic', value: 'basic' },
                          { title: 'Premium', value: 'premium' },
                          { title: 'VIP', value: 'vip' },
                          { title: 'Enterprise', value: 'enterprise' },
                        ],
                      },
                      initialValue: 'basic',
                    }),

                    defineField({
                      name: 'sponsorshipStartDate',
                      title: 'Sponsorship Start Date',
                      type: 'datetime',
                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: 'sponsorshipEndDate',
                      title: 'Sponsorship End Date',
                      type: 'datetime',
                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: 'sponsorshipAmount',
                      title: 'Sponsorship Amount',
                      type: 'number',
                      description: 'Amount paid for this sponsorship.',
                    }),
                  ],
                  description: 'Details about the sponsorship arrangement.',
                }),

                defineField({
                  name: 'customTitle',
                  title: 'Custom Title',
                  type: 'string',
                  description: 'Override the article title for this display (optional).',
                }),

                defineField({
                  name: 'customExcerpt',
                  title: 'Custom Excerpt',
                  type: 'text',
                  rows: 3,
                  description: 'Override the article excerpt for this display (optional).',
                }),

                defineField({
                  name: 'customFeaturedImage',
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
                  description: 'Override the article image for this display (optional).',
                }),

                defineField({
                  name: 'priority',
                  title: 'Display Priority',
                  type: 'number',
                  description: 'Higher numbers appear first in the carousel.',
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
                  title: 'sponsoredArticleReference.title',
                  customTitle: 'customTitle',
                  media: 'sponsoredArticleReference.featuredImage',
                  customMedia: 'customFeaturedImage',
                  sponsor: 'sponsorshipDetails.sponsor.name',
                  tier: 'sponsorshipDetails.sponsorshipTier',
                  isActive: 'isActive',
                },
                prepare(selection) {
                  const { title, customTitle, media, customMedia, sponsor, tier, isActive } = selection;
                  return {
                    title: customTitle || title || 'Unnamed Sponsored Article',
                    subtitle: `${isActive ? '✅' : '❌'} ${sponsor || 'Unknown Sponsor'} (${tier || 'basic'})`,
                    media: customMedia || media,
                  };
                },
              },
            },
          ],
          hidden: ({ parent }) => !['manual', 'mixed'].includes(parent?.selectionMethod),
          description: 'Manually selected sponsored articles to feature.',
        }),

        defineField({
          name: 'autoSelectionCriteria',
          title: 'Auto Selection Criteria',
          type: 'object',
          fields: [
            defineField({
              name: 'maxArticles',
              title: 'Maximum Articles',
              type: 'number',
              initialValue: 10,
              validation: (Rule) => Rule.min(1).max(20),
              description: 'Maximum number of sponsored articles to display.',
            }),

            defineField({
              name: 'sponsorFilter',
              title: 'Filter by Sponsors',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'sponsor' }],
                },
              ],
              description: 'Only include articles from these sponsors (leave empty for all).',
            }),

            defineField({
              name: 'sponsorshipTierFilter',
              title: 'Filter by Sponsorship Tier',
              type: 'array',
              of: [
                {
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Basic', value: 'basic' },
                      { title: 'Premium', value: 'premium' },
                      { title: 'VIP', value: 'vip' },
                      { title: 'Enterprise', value: 'enterprise' },
                    ],
                  },
                },
              ],
              description: 'Only include articles from these sponsorship tiers.',
            }),

            defineField({
              name: 'categoryFilter',
              title: 'Filter by Categories',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'articleCategory' }],
                },
              ],
              description: 'Only include sponsored articles from these categories.',
            }),

            defineField({
              name: 'minSponsorshipAmount',
              title: 'Minimum Sponsorship Amount',
              type: 'number',
              description: 'Only include articles with sponsorship amount above this value.',
            }),

            defineField({
              name: 'activeSponsorsOnly',
              title: 'Active Sponsorships Only',
              type: 'boolean',
              initialValue: true,
              description: 'Only include articles with currently active sponsorships.',
            }),

            defineField({
              name: 'requireFeaturedImage',
              title: 'Require Featured Image',
              type: 'boolean',
              initialValue: true,
              description: 'Only include articles that have featured images.',
            }),

            defineField({
              name: 'approvedOnly',
              title: 'Approved Articles Only',
              type: 'boolean',
              initialValue: true,
              description: 'Only include articles that have been approved for display.',
            }),

            defineField({
              name: 'maxAge',
              title: 'Maximum Age (days)',
              type: 'number',
              initialValue: 60,
              description: 'Only include articles published within this many days.',
            }),
          ],
          hidden: ({ parent }) => parent?.selectionMethod === 'manual',
          description: 'Criteria for automatically selecting sponsored articles.',
        }),
      ],
      description: 'Configuration for how sponsored articles are selected and displayed.',
    }),

    defineField({
      name: 'sponsorshipDisclosure',
      title: 'Sponsorship Disclosure',
      type: 'object',
      fields: [
        defineField({
          name: 'showSponsoredBadge',
          title: 'Show "Sponsored" Badge',
          type: 'boolean',
          initialValue: true,
          description: 'Display a "Sponsored" badge on sponsored articles.',
        }),

        defineField({
          name: 'sponsoredBadgeText',
          title: 'Sponsored Badge Text',
          type: 'string',
          initialValue: 'Sponsored',
          description: 'Text to display on the sponsored badge.',
          hidden: ({ parent }) => !parent?.showSponsoredBadge,
        }),

        defineField({
          name: 'badgeStyle',
          title: 'Badge Style',
          type: 'string',
          options: {
            list: [
              { title: 'Gold', value: 'gold' },
              { title: 'Blue', value: 'blue' },
              { title: 'Green', value: 'green' },
              { title: 'Orange', value: 'orange' },
              { title: 'Gray', value: 'gray' },
            ],
          },
          initialValue: 'gold',
          description: 'Color theme for the sponsored badge.',
          hidden: ({ parent }) => !parent?.showSponsoredBadge,
        }),

        defineField({
          name: 'showSponsorName',
          title: 'Show Sponsor Name',
          type: 'boolean',
          initialValue: false,
          description: 'Display the sponsor name on article cards.',
        }),

        defineField({
          name: 'sponsorNameFormat',
          title: 'Sponsor Name Format',
          type: 'string',
          options: {
            list: [
              { title: 'Sponsored by [Name]', value: 'sponsored-by' },
              { title: 'In partnership with [Name]', value: 'partnership' },
              { title: '[Name] Presents', value: 'presents' },
              { title: 'Just [Name]', value: 'name-only' },
            ],
          },
          initialValue: 'sponsored-by',
          hidden: ({ parent }) => !parent?.showSponsorName,
        }),

        defineField({
          name: 'disclosureText',
          title: 'Disclosure Text',
          type: 'text',
          description: 'Legal disclosure text for sponsored content (displayed in footer or tooltip).',
          rows: 3,
        }),
      ],
      description: 'Configuration for sponsored content disclosure and transparency.',
    }),

    defineField({
      name: 'carouselConfiguration',
      title: 'Carousel Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'autoplay',
          title: 'Autoplay',
          type: 'boolean',
          initialValue: true,
          description: 'Whether the carousel should automatically advance (recommended for sponsored content).',
        }),

        defineField({
          name: 'autoplaySpeed',
          title: 'Autoplay Speed (seconds)',
          type: 'number',
          options: {
            range: { min: 3, max: 15, step: 1 },
          },
          initialValue: 8,
          description: 'How long each article is displayed before advancing.',
          hidden: ({ parent }) => !parent?.autoplay,
        }),

        defineField({
          name: 'showNavigation',
          title: 'Show Navigation Arrows',
          type: 'boolean',
          initialValue: true,
          description: 'Display left/right navigation arrows.',
        }),

        defineField({
          name: 'showDots',
          title: 'Show Dot Indicators',
          type: 'boolean',
          initialValue: false,
          description: 'Display dot indicators below the carousel.',
        }),

        defineField({
          name: 'articlesPerView',
          title: 'Articles Per View',
          type: 'object',
          fields: [
            defineField({
              name: 'desktop',
              title: 'Desktop',
              type: 'number',
              options: {
                list: [
                  { title: '3 Articles', value: 3 },
                  { title: '4 Articles', value: 4 },
                  { title: '5 Articles', value: 5 },
                  { title: '6 Articles', value: 6 },
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
                  { title: '2 Articles', value: 2 },
                  { title: '3 Articles', value: 3 },
                  { title: '4 Articles', value: 4 },
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
                  { title: '1 Article', value: 1 },
                  { title: '2 Articles', value: 2 },
                ],
              },
              initialValue: 1,
            }),
          ],
          description: 'Number of articles visible at once on different screen sizes.',
        }),

        defineField({
          name: 'scrollBehavior',
          title: 'Scroll Behavior',
          type: 'string',
          options: {
            list: [
              { title: 'Scroll One at a Time', value: 'single' },
              { title: 'Scroll by Page', value: 'page' },
              { title: 'Free Scroll', value: 'free' },
            ],
          },
          initialValue: 'single',
          description: 'How articles scroll when navigating.',
        }),

        defineField({
          name: 'pauseOnHover',
          title: 'Pause on Hover',
          type: 'boolean',
          initialValue: true,
          description: 'Pause autoplay when user hovers over the carousel.',
          hidden: ({ parent }) => !parent?.autoplay,
        }),
      ],
      description: 'Configuration options for the sponsored article carousel behavior.',
    }),

    defineField({
      name: 'cardConfiguration',
      title: 'Article Card Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'cardAspectRatio',
          title: 'Card Aspect Ratio',
          type: 'string',
          options: {
            list: [
              { title: 'Square (1:1)', value: '1:1' },
              { title: 'Portrait (3:4)', value: '3:4' },
              { title: 'Landscape (4:3)', value: '4:3' },
              { title: 'Tall (2:3)', value: '2:3' },
            ],
          },
          initialValue: '3:4',
          description: 'Aspect ratio for sponsored article cards.',
        }),

        defineField({
          name: 'imageAspectRatio',
          title: 'Image Aspect Ratio',
          type: 'string',
          options: {
            list: [
              { title: 'Square (1:1)', value: '1:1' },
              { title: 'Landscape (16:9)', value: '16:9' },
              { title: 'Landscape (4:3)', value: '4:3' },
              { title: 'Portrait (3:4)', value: '3:4' },
            ],
          },
          initialValue: '4:3',
          description: 'Aspect ratio for the featured image within each card.',
        }),

        defineField({
          name: 'showExcerpt',
          title: 'Show Article Excerpt',
          type: 'boolean',
          initialValue: true,
          description: 'Display article excerpt/preview text on cards.',
        }),

        defineField({
          name: 'excerptLength',
          title: 'Excerpt Length',
          type: 'number',
          initialValue: 120,
          description: 'Maximum number of characters for article excerpt.',
          hidden: ({ parent }) => !parent?.showExcerpt,
        }),

        defineField({
          name: 'showAuthor',
          title: 'Show Author Information',
          type: 'boolean',
          initialValue: true,
          description: 'Display author name and avatar on cards.',
        }),

        defineField({
          name: 'showPublishDate',
          title: 'Show Publish Date',
          type: 'boolean',
          initialValue: false,
          description: 'Display when the article was published.',
        }),

        defineField({
          name: 'showReadTime',
          title: 'Show Read Time',
          type: 'boolean',
          initialValue: false,
          description: 'Display estimated reading time.',
        }),

        defineField({
          name: 'showCategory',
          title: 'Show Category Badge',
          type: 'boolean',
          initialValue: false,
          description: 'Display article category as a badge.',
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
              { title: 'Image Zoom', value: 'image-zoom' },
              { title: 'Overlay', value: 'overlay' },
              { title: 'Glow (Sponsored)', value: 'glow' },
            ],
          },
          initialValue: 'glow',
          description: 'Effect when hovering over sponsored article cards.',
        }),

        defineField({
          name: 'cardStyle',
          title: 'Card Style',
          type: 'object',
          fields: [
            defineField({
              name: 'backgroundColor',
              title: 'Card Background',
              type: 'string',
              options: {
                list: [
                  { title: 'White', value: 'white' },
                  { title: 'Light Gray', value: 'light-gray' },
                  { title: 'Light Gold (Premium)', value: 'light-gold' },
                  { title: 'Transparent', value: 'transparent' },
                ],
              },
              initialValue: 'white',
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
                  { title: 'Gold Glow', value: 'gold-glow' },
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
                  { title: 'Gold Accent', value: 'gold-accent' },
                ],
              },
              initialValue: 'none',
            }),
          ],
          description: 'Visual styling for sponsored article cards.',
        }),
      ],
      description: 'Configuration for individual sponsored article cards.',
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
              { title: 'Light Gold', value: 'light-gold' },
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
          description: 'Spacing between sponsored article cards.',
        }),
      ],
      description: 'Overall styling for the section.',
    }),

    defineField({
      name: 'sponsorAnalytics',
      title: 'Sponsor Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'trackSponsoredViews',
          title: 'Track Sponsored Article Views',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users view sponsored articles (important for billing).',
        }),

        defineField({
          name: 'trackSponsoredClicks',
          title: 'Track Sponsored Article Clicks',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users click on sponsored articles.',
        }),

        defineField({
          name: 'trackSponsorClicks',
          title: 'Track Sponsor Clicks',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users click on sponsor information.',
        }),

        defineField({
          name: 'trackCarouselEngagement',
          title: 'Track Carousel Engagement',
          type: 'boolean',
          initialValue: true,
          description: 'Track how users interact with the sponsored carousel.',
        }),

        defineField({
          name: 'generateSponsorReports',
          title: 'Generate Sponsor Reports',
          type: 'boolean',
          initialValue: true,
          description: 'Automatically generate performance reports for sponsors.',
        }),
      ],
      description: 'Analytics and reporting configuration for sponsors.',
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
      selectionMethod: 'articleSelection.selectionMethod',
      maxArticles: 'articleSelection.autoSelectionCriteria.maxArticles',
    },
    prepare(selection) {
      const { title, isActive, selectionMethod, maxArticles } = selection;
      const method = selectionMethod === 'manual' ? 'Manual' : 'Auto';
      const count = maxArticles || 'N/A';
      
      return {
        title: title || 'Sponsored Articles Section',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${method} (${count} max)`,
        media: '💰',
      };
    },
  },
});