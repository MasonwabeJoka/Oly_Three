import { defineType, defineField } from 'sanity';

export const moreFromOlySection = defineType({
  name: 'moreFromOlySection',
  title: 'More from Oly Section',
  type: 'document',
  initialValue: {
    isActive: true,
    displayOrder: 1,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'More from Oly',
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
      initialValue: 1,
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
      name: 'sites',
      title: 'Network Sites',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'networkSite',
          title: 'Network Site',
          fields: [
            defineField({
              name: 'name',
              title: 'Site Name',
              type: 'string',
              description: 'Display name for the site (e.g., "Oly Properties")',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'slug',
              title: 'Site Slug',
              type: 'slug',
              options: {
                source: 'name',
                maxLength: 50,
              },
              description: 'URL-friendly version of the site name.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Brief description of what this site offers.',
              rows: 2,
            }),

            defineField({
              name: 'url',
              title: 'Site URL',
              type: 'url',
              description: 'Full URL to the classified site.',
              validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https']
              }),
            }),

            defineField({
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: true,
              description: 'Whether the link should open in a new browser tab.',
            }),

            defineField({
              name: 'backgroundImage',
              title: 'Background Image',
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
                }),
              ],
              description: 'Background image for the site card.',
              validation: (Rule) => Rule.required(),
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
                      { title: 'Teal', value: 'teal' },
                      { title: 'Gray', value: 'gray' },
                      { title: 'Blue', value: 'blue' },
                      { title: 'Black', value: 'black' },
                      { title: 'Green', value: 'green' },
                      { title: 'Purple', value: 'purple' },
                      { title: 'Red', value: 'red' },
                      { title: 'Custom', value: 'custom' },
                    ],
                  },
                  initialValue: 'teal',
                  description: 'Background color theme for the card.',
                }),

                defineField({
                  name: 'customBackgroundColor',
                  title: 'Custom Background Color',
                  type: 'string',
                  description: 'Hex color code (e.g., #2DD4BF)',
                  hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
                }),

                defineField({
                  name: 'textColor',
                  title: 'Text Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'White', value: 'white' },
                      { title: 'Black', value: 'black' },
                      { title: 'Gray', value: 'gray' },
                    ],
                  },
                  initialValue: 'white',
                  description: 'Color of the text overlay.',
                }),

                defineField({
                  name: 'overlayOpacity',
                  title: 'Overlay Opacity',
                  type: 'number',
                  options: {
                    range: { min: 0, max: 1, step: 0.1 },
                  },
                  initialValue: 0.7,
                  description: 'Opacity of the color overlay on the background image (0 = transparent, 1 = opaque).',
                }),
              ],
              description: 'Visual styling options for the site card.',
            }),

            defineField({
              name: 'icon',
              title: 'Icon',
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
              description: 'Optional icon to display alongside the site name.',
            }),

            defineField({
              name: 'isActive',
              title: 'Is Active',
              type: 'boolean',
              initialValue: true,
              description: 'Whether this site should be displayed in the section.',
            }),

            defineField({
              name: 'sortOrder',
              title: 'Sort Order',
              type: 'number',
              description: 'Order in which this site appears (lower numbers first).',
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
                  name: 'category',
                  title: 'Analytics Category',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Properties', value: 'properties' },
                      { title: 'Automotive', value: 'automotive' },
                      { title: 'Jobs', value: 'jobs' },
                      { title: 'Services', value: 'services' },
                      { title: 'General', value: 'general' },
                    ],
                  },
                  description: 'Category for analytics tracking.',
                }),
              ],
              description: 'Analytics and tracking configuration.',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
              media: 'backgroundImage',
              isActive: 'isActive',
            },
            prepare(selection) {
              const { title, subtitle, media, isActive } = selection;
              return {
                title: title || 'Unnamed Site',
                subtitle: `${isActive ? '✅' : '❌'} ${subtitle || 'No description'}`,
                media: media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(8).warning('Consider limiting to 4-6 sites for optimal display'),
      description: 'The network of classified sites to display in this section.',
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
                ],
              },
              initialValue: 4,
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
              initialValue: 1,
            }),
          ],
          description: 'Number of cards to display per row on different screen sizes.',
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
          initialValue: '3:4',
          description: 'Aspect ratio for the site cards.',
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
          description: 'Spacing between cards.',
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
              { title: 'Dark Gray', value: 'dark-gray' },
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
      sitesCount: 'sites',
    },
    prepare(selection) {
      const { title, isActive, sitesCount } = selection;
      const count = Array.isArray(sitesCount) ? sitesCount.length : 0;
      
      return {
        title: title || 'More from Oly Section',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${count} sites configured`,
        media: '🌐',
      };
    },
  },
});