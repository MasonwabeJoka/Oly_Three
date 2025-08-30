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
      name: 'featuredCategories',
      title: 'Featured Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featuredCategory',
          title: 'Featured Category',
          fields: [
            defineField({
              name: 'categoryRef',
              title: 'Category',
              type: 'reference',
              to: [{ type: 'category' }],
              description: 'Reference the canonical category document.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'isActive',
              title: 'Is Active',
              type: 'boolean',
              initialValue: true,
              description: 'Show this referenced category in the featured section.',
            }),

            defineField({
              name: 'sortOrder',
              title: 'Sort Order',
              type: 'number',
              description: 'Manual order for featured categories (lower numbers appear first).',
              validation: (Rule) => Rule.integer().min(0),
              initialValue: 0,
            }),

            defineField({
              name: 'overrideTitle',
              title: 'Override Title',
              type: 'string',
              description: 'Optional display title (falls back to referenced category title).',
            }),

            defineField({
              name: 'overrideUrl',
              title: 'Override URL',
              type: 'string',
              description: 'Optional URL (falls back to referenced category slug/path).',
            }),

            defineField({
              name: 'overrideImage',
              title: 'Override Image',
              type: 'image',
              options: { hotspot: true, metadata: ['blurhash', 'lqip', 'palette'] },
              description: 'Optional image used only for this section (falls back to category image).',
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),

            defineField({
              name: 'featuredPriority',
              title: 'Featured Priority',
              type: 'string',
              options: {
                list: [
                  { title: 'Normal', value: 'normal' },
                  { title: 'High', value: 'high' },
                  { title: 'Premium', value: 'premium' },
                ],
              },
              initialValue: 'normal',
              description: 'Editorial priority label (useful for styling/placement).',
            }),

            defineField({
              name: 'notes',
              title: 'Editor Notes',
              type: 'text',
              rows: 2,
              description: 'Optional notes for editors/marketing about this entry.',
            }),
          ],

        
        },
      ],
      validation: (Rule) =>
        Rule.min(1)
          .max(12)
          .warning('Consider limiting to 6-9 categories for optimal display'),
      description:
        'Select categories to feature. Use overrides to change title/image/url for this section. ' +
        'Use sortOrder for manual ordering of featured items.',
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
        // subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${count} categories configured`,
        // media: '📂',
      };
    },
  },
});