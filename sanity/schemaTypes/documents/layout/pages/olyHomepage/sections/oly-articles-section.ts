import { defineType, defineField } from 'sanity';

export const olyArticlesSection = defineType({
  name: 'olyArticlesSection',
  title: 'Oly Articles Section',
  type: 'document',
  initialValue: {
    isActive: true,
    displayOrder: 5,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Oly Articles',
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
      initialValue: 5,
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
      title: 'Article Selection',
      type: 'object',
      fields: [
        defineField({
          name: 'selectionMethod',
          title: 'Selection Method',
          type: 'string',
          options: {
            list: [
              { title: 'Manual Selection', value: 'manual' },
              { title: 'Auto: Recent Articles', value: 'auto-recent' },
              { title: 'Auto: Most Popular', value: 'auto-popular' },
              { title: 'Auto: Featured Articles', value: 'auto-featured' },
              { title: 'Auto: By Category', value: 'auto-category' },
              { title: 'Mixed: Manual + Auto', value: 'mixed' },
            ],
          },
          initialValue: 'auto-recent',
          description: 'How to select which articles to display.',
        }),

        defineField({
          name: 'manualArticles',
          title: 'Manual Articles',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'featuredArticle',
              title: 'Featured Article',
              fields: [
                defineField({
                  name: 'articleReference',
                  title: 'Article Reference',
                  type: 'reference',
                  to: [{ type: 'articlePage' }],
                  description: 'Reference to the actual article document.',
                  validation: (Rule) => Rule.required(),
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
                  title: 'articleReference.title',
                  customTitle: 'customTitle',
                  media: 'articleReference.featuredImage',
                  customMedia: 'customFeaturedImage',
                  author: 'articleReference.author.name',
                  isActive: 'isActive',
                },
                prepare(selection) {
                  const { title, customTitle, media, customMedia, author, isActive } = selection;
                  return {
                    title: customTitle || title || 'Unnamed Article',
                    subtitle: `${isActive ? '✅' : '❌'} by ${author || 'Unknown Author'}`,
                    media: customMedia || media,
                  };
                },
              },
            },
          ],
          hidden: ({ parent }) => !['manual', 'mixed'].includes(parent?.selectionMethod),
          description: 'Manually selected articles to feature.',
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
              description: 'Maximum number of articles to display in the carousel.',
            }),

            defineField({
              name: 'authorFilter',
              title: 'Filter by Authors',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'author' }],
                },
              ],
              description: 'Only include articles by these authors (leave empty for all staff).',
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
              description: 'Only include articles from these categories (leave empty for all).',
            }),

            defineField({
              name: 'excludeCategories',
              title: 'Exclude Categories',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'articleCategory' }],
                },
              ],
              description: 'Exclude articles from these categories.',
            }),

            defineField({
              name: 'maxAge',
              title: 'Maximum Age (days)',
              type: 'number',
              initialValue: 90,
              description: 'Only include articles published within this many days.',
            }),

            defineField({
              name: 'requireFeaturedImage',
              title: 'Require Featured Image',
              type: 'boolean',
              initialValue: true,
              description: 'Only include articles that have featured images.',
            }),

            defineField({
              name: 'minReadTime',
              title: 'Minimum Read Time (minutes)',
              type: 'number',
              description: 'Only include articles with at least this read time.',
            }),

            defineField({
              name: 'staffOnly',
              title: 'Staff Authors Only',
              type: 'boolean',
              initialValue: true,
              description: 'Only include articles written by verified staff members.',
            }),
          ],
          hidden: ({ parent }) => parent?.selectionMethod === 'manual',
          description: 'Criteria for automatically selecting articles.',
        }),
      ],
      description: 'Configuration for how articles are selected and displayed.',
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
          initialValue: false,
          description: 'Whether the carousel should automatically advance.',
        }),

        defineField({
          name: 'autoplaySpeed',
          title: 'Autoplay Speed (seconds)',
          type: 'number',
          options: {
            range: { min: 3, max: 15, step: 1 },
          },
          initialValue: 6,
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
      description: 'Configuration options for the article carousel behavior.',
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
          description: 'Aspect ratio for article cards.',
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
            ],
          },
          initialValue: 'lift',
          description: 'Effect when hovering over article cards.',
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
          description: 'Visual styling for article cards.',
        }),
      ],
      description: 'Configuration for individual article cards.',
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
          initialValue: 'light-gray',
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
          initialValue: 'right',
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
          description: 'Spacing between article cards.',
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
          name: 'showMoreArticlesButton',
          title: 'Show "More Articles" Button',
          type: 'boolean',
          initialValue: true,
        }),

        defineField({
          name: 'moreArticlesButtonText',
          title: 'More Articles Button Text',
          type: 'string',
          initialValue: 'More articles...',
          hidden: ({ parent }) => !parent?.showMoreArticlesButton,
        }),

        defineField({
          name: 'moreArticlesButtonUrl',
          title: 'More Articles Button URL',
          type: 'string',
          initialValue: '/articles',
          hidden: ({ parent }) => !parent?.showMoreArticlesButton,
        }),

        defineField({
          name: 'showForumButton',
          title: 'Show "Forum" Button',
          type: 'boolean',
          initialValue: true,
        }),

        defineField({
          name: 'forumButtonText',
          title: 'Forum Button Text',
          type: 'string',
          initialValue: 'Forum',
          hidden: ({ parent }) => !parent?.showForumButton,
        }),

        defineField({
          name: 'forumButtonUrl',
          title: 'Forum Button URL',
          type: 'string',
          initialValue: '/forum',
          hidden: ({ parent }) => !parent?.showForumButton,
        }),

        defineField({
          name: 'buttonStyle',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Light (Default)', value: 'light' },
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
            ],
          },
          initialValue: 'light',
        }),

        defineField({
          name: 'buttonAlignment',
          title: 'Button Alignment',
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
      description: 'Call-to-action buttons configuration.',
    }),

    defineField({
      name: 'analytics',
      title: 'Analytics Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'trackArticleViews',
          title: 'Track Article Views',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users view articles in this section.',
        }),

        defineField({
          name: 'trackArticleClicks',
          title: 'Track Article Clicks',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users click on articles.',
        }),

        defineField({
          name: 'trackAuthorClicks',
          title: 'Track Author Clicks',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users click on author information.',
        }),

        defineField({
          name: 'trackCarouselNavigation',
          title: 'Track Carousel Navigation',
          type: 'boolean',
          initialValue: true,
          description: 'Track how users navigate through the carousel.',
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
      selectionMethod: 'articleSelection.selectionMethod',
      maxArticles: 'articleSelection.autoSelectionCriteria.maxArticles',
    },
    prepare(selection) {
      const { title, isActive, selectionMethod, maxArticles } = selection;
      const method = selectionMethod === 'manual' ? 'Manual' : 'Auto';
      const count = maxArticles || 'N/A';
      
      return {
        title: title || 'Oly Articles Section',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${method} (${count} max)`,
        media: '📰',
      };
    },
  },
});