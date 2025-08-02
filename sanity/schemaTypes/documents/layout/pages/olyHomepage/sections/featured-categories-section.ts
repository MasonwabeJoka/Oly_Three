import { defineType, defineField } from 'sanity';

export const featuredCategoriesSection = defineType({
  name: 'featuredCategoriesSection',
  title: 'Featured Categories Section',
  type: 'document',
  initialValue: {
    isActive: true,
    displayOrder: 2,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Featured Categories',
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
      initialValue: 2,
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
      name: 'categories',
      title: 'Featured Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featuredCategory',
          title: 'Featured Category',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              description: 'Display name for the category (e.g., "Cars And Vehicles")',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'slug',
              title: 'Category Slug',
              type: 'slug',
              options: {
                source: 'name',
                maxLength: 50,
              },
              description: 'URL-friendly version of the category name.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Brief description of what this category includes.',
              rows: 2,
            }),

            defineField({
              name: 'categoryReference',
              title: 'Category Reference',
              type: 'reference',
              to: [{ type: 'category' }],
              description: 'Reference to the actual category document (if using category references).',
            }),

            defineField({
              name: 'url',
              title: 'Category URL',
              type: 'string',
              description: 'URL path to the category page (e.g., "/categories/cars-and-vehicles")',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'image',
              title: 'Category Image',
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
                  description: 'Alternative text for accessibility.',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              description: 'Representative image for the category.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'icon',
              title: 'Category Icon',
              type: 'image',
              options: {
                metadata: ['blurhash', 'lqip'],
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
              description: 'Optional icon to display alongside or instead of the main image.',
            }),

            defineField({
              name: 'cardStyle',
              title: 'Card Style',
              type: 'object',
              fields: [
                defineField({
                  name: 'backgroundColor',
                  title: 'Background Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'White', value: 'white' },
                      { title: 'Light Gray', value: 'light-gray' },
                      { title: 'Light Blue', value: 'light-blue' },
                      { title: 'Light Green', value: 'light-green' },
                      { title: 'Light Purple', value: 'light-purple' },
                      { title: 'Custom', value: 'custom' },
                    ],
                  },
                  initialValue: 'white',
                  description: 'Background color for the category card.',
                }),

                defineField({
                  name: 'customBackgroundColor',
                  title: 'Custom Background Color',
                  type: 'string',
                  description: 'Hex color code (e.g., #F8F9FA)',
                  hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
                }),

                defineField({
                  name: 'borderStyle',
                  title: 'Border Style',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'None', value: 'none' },
                      { title: 'Light Border', value: 'light' },
                      { title: 'Medium Border', value: 'medium' },
                      { title: 'Thick Border', value: 'thick' },
                    ],
                  },
                  initialValue: 'light',
                  description: 'Border style for the category card.',
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
                      { title: 'Full', value: 'full' },
                    ],
                  },
                  initialValue: 'medium',
                  description: 'Corner rounding for the category card.',
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
                  description: 'Drop shadow for the category card.',
                }),
              ],
              description: 'Visual styling options for the category card.',
            }),

            defineField({
              name: 'hoverEffect',
              title: 'Hover Effect',
              type: 'object',
              fields: [
                defineField({
                  name: 'enabled',
                  title: 'Enable Hover Effects',
                  type: 'boolean',
                  initialValue: true,
                }),

                defineField({
                  name: 'scaleOnHover',
                  title: 'Scale on Hover',
                  type: 'boolean',
                  initialValue: true,
                  hidden: ({ parent }) => !parent?.enabled,
                }),

                defineField({
                  name: 'shadowOnHover',
                  title: 'Enhanced Shadow on Hover',
                  type: 'boolean',
                  initialValue: true,
                  hidden: ({ parent }) => !parent?.enabled,
                }),
              ],
              description: 'Hover interaction effects for the category card.',
            }),

            defineField({
              name: 'statistics',
              title: 'Category Statistics',
              type: 'object',
              fields: [
                defineField({
                  name: 'showAdCount',
                  title: 'Show Ad Count',
                  type: 'boolean',
                  initialValue: false,
                  description: 'Display the number of ads in this category.',
                }),

                defineField({
                  name: 'adCount',
                  title: 'Ad Count',
                  type: 'number',
                  description: 'Number of ads in this category (can be auto-populated).',
                  hidden: ({ parent }) => !parent?.showAdCount,
                }),

                defineField({
                  name: 'adCountLabel',
                  title: 'Ad Count Label',
                  type: 'string',
                  initialValue: 'ads',
                  description: 'Label to display after the ad count (e.g., "ads", "listings").',
                  hidden: ({ parent }) => !parent?.showAdCount,
                }),
              ],
              description: 'Optional statistics to display on the category card.',
            }),

            defineField({
              name: 'isActive',
              title: 'Is Active',
              type: 'boolean',
              initialValue: true,
              description: 'Whether this category should be displayed in the section.',
            }),

            defineField({
              name: 'sortOrder',
              title: 'Sort Order',
              type: 'number',
              description: 'Order in which this category appears (lower numbers first).',
            }),

            defineField({
              name: 'featured',
              title: 'Featured Priority',
              type: 'string',
              options: {
                list: [
                  { title: 'Normal', value: 'normal' },
                  { title: 'High Priority', value: 'high' },
                  { title: 'Premium', value: 'premium' },
                ],
              },
              initialValue: 'normal',
              description: 'Priority level for featuring this category.',
            }),

            defineField({
              name: 'analytics',
              title: 'Analytics',
              type: 'object',
              fields: [
                defineField({
                  name: 'trackingId',
                  title: 'Tracking ID',
                  type: 'string',
                  description: 'Custom tracking identifier for analytics.',
                }),

                defineField({
                  name: 'conversionGoal',
                  title: 'Conversion Goal',
                  type: 'string',
                  description: 'What action constitutes a conversion for this category.',
                }),
              ],
              description: 'Analytics and tracking configuration.',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
              media: 'image',
              isActive: 'isActive',
              adCount: 'statistics.adCount',
              showAdCount: 'statistics.showAdCount',
            },
            prepare(selection) {
              const { title, subtitle, media, isActive, adCount, showAdCount } = selection;
              const statusIcon = isActive ? '✅' : '❌';
              const countText = showAdCount && adCount ? ` (${adCount} ads)` : '';
              
              return {
                title: title || 'Unnamed Category',
                subtitle: `${statusIcon} ${subtitle || 'No description'}${countText}`,
                media: media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(12).warning('Consider limiting to 6-9 categories for optimal display'),
      description: 'The categories to feature in this section.',
    }),

    defineField({
      name: 'layoutConfiguration',
      title: 'Layout Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'cardsPerRow',
          title: 'Cards Per Row',
          type: 'object',
          fields: [
            defineField({
              name: 'desktop',
              title: 'Desktop',
              type: 'number',
              options: {
                list: [
                  { title: '2 Cards', value: 2 },
                  { title: '3 Cards', value: 3 },
                  { title: '4 Cards', value: 4 },
                  { title: '5 Cards', value: 5 },
                  { title: '6 Cards', value: 6 },
                ],
              },
              initialValue: 3,
            }),
            defineField({
              name: 'tablet',
              title: 'Tablet',
              type: 'number',
              options: {
                list: [
                  { title: '2 Cards', value: 2 },
                  { title: '3 Cards', value: 3 },
                ],
              },
              initialValue: 2,
            }),
            defineField({
              name: 'mobile',
              title: 'Mobile',
              type: 'number',
              options: {
                list: [
                  { title: '1 Card', value: 1 },
                  { title: '2 Cards', value: 2 },
                ],
              },
              initialValue: 2,
            }),
          ],
          description: 'Number of category cards to display per row on different screen sizes.',
        }),

        defineField({
          name: 'cardAspectRatio',
          title: 'Card Aspect Ratio',
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
          description: 'Aspect ratio for the category cards.',
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
          description: 'Spacing between category cards.',
        }),

        defineField({
          name: 'imagePosition',
          title: 'Image Position',
          type: 'string',
          options: {
            list: [
              { title: 'Top', value: 'top' },
              { title: 'Center', value: 'center' },
              { title: 'Bottom', value: 'bottom' },
            ],
          },
          initialValue: 'center',
          description: 'Position of the image within each card.',
        }),
      ],
      description: 'Layout and display options for the section.',
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
          name: 'showViewAllButton',
          title: 'Show "View All Categories" Button',
          type: 'boolean',
          initialValue: false,
        }),

        defineField({
          name: 'viewAllButtonText',
          title: 'View All Button Text',
          type: 'string',
          initialValue: 'View All Categories',
          hidden: ({ parent }) => !parent?.showViewAllButton,
        }),

        defineField({
          name: 'viewAllButtonUrl',
          title: 'View All Button URL',
          type: 'string',
          initialValue: '/categories',
          hidden: ({ parent }) => !parent?.showViewAllButton,
        }),
      ],
      description: 'Optional call-to-action button for the section.',
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
      categoriesCount: 'categories',
    },
    prepare(selection) {
      const { title, isActive, categoriesCount } = selection;
      const count = Array.isArray(categoriesCount) ? categoriesCount.length : 0;
      
      return {
        title: title || 'Featured Categories Section',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${count} categories configured`,
        media: '📂',
      };
    },
  },
});