import { defineType, defineField } from 'sanity';

export const featuredServicesSection = defineType({
  name: 'featuredServicesSection',
  title: 'Featured Services Section',
  type: 'document',
  initialValue: {
    isActive: true,
    displayOrder: 3,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Featured Services',
      description: 'The main heading for this section (can be hidden if not needed).',
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
      initialValue: 3,
      description: 'Order in which this section appears on the homepage (lower numbers appear first).',
    }),

    defineField({
      name: 'showSectionTitle',
      title: 'Show Section Title',
      type: 'boolean',
      initialValue: false,
      description: 'Whether to display the section title above the slider.',
    }),

    defineField({
      name: 'services',
      title: 'Featured Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featuredService',
          title: 'Featured Service',
          fields: [
            defineField({
              name: 'title',
              title: 'Service Title',
              type: 'string',
              description: 'Main title for the service (e.g., "Property Valuation")',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'slug',
              title: 'Service Slug',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 50,
              },
              description: 'URL-friendly version of the service title.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'description',
              title: 'Service Description',
              type: 'text',
              description: 'Detailed description of the service and its benefits.',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'features',
              title: 'Service Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'feature',
                  title: 'Feature',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Feature Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Feature Icon',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Checkmark', value: 'checkmark' },
                          { title: 'Star', value: 'star' },
                          { title: 'Arrow', value: 'arrow' },
                          { title: 'Shield', value: 'shield' },
                          { title: 'Clock', value: 'clock' },
                          { title: 'Custom', value: 'custom' },
                        ],
                      },
                      initialValue: 'checkmark',
                    }),
                    defineField({
                      name: 'customIcon',
                      title: 'Custom Icon',
                      type: 'image',
                      options: {
                        metadata: ['blurhash', 'lqip'],
                      },
                      hidden: ({ parent }) => parent?.icon !== 'custom',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'text',
                      icon: 'icon',
                    },
                    prepare(selection) {
                      const { title, icon } = selection;
                      const iconEmoji = {
                        checkmark: '✅',
                        star: '⭐',
                        arrow: '➡️',
                        shield: '🛡️',
                        clock: '⏰',
                        custom: '🖼️',
                      };
                      return {
                        title: title || 'Feature',
                        media: iconEmoji[icon] || '✅',
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1).max(5),
              description: 'Key features or benefits of this service (3-5 recommended).',
            }),

            defineField({
              name: 'callToAction',
              title: 'Call to Action',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'Button URL',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'style',
                  title: 'Button Style',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Primary (Light Blue)', value: 'primary' },
                      { title: 'Secondary', value: 'secondary' },
                      { title: 'Outline', value: 'outline' },
                      { title: 'Ghost', value: 'ghost' },
                    ],
                  },
                  initialValue: 'primary',
                }),
                defineField({
                  name: 'openInNewTab',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
              validation: (Rule) => Rule.required(),
              description: 'Call-to-action button configuration.',
            }),

            defineField({
              name: 'image',
              title: 'Service Image',
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
              description: 'Hero image for the service slide.',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'slideStyle',
              title: 'Slide Style',
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
                      { title: 'Custom', value: 'custom' },
                    ],
                  },
                  initialValue: 'light-gray',
                  description: 'Background color for this slide.',
                }),

                defineField({
                  name: 'customBackgroundColor',
                  title: 'Custom Background Color',
                  type: 'string',
                  description: 'Hex color code (e.g., #F8F9FA)',
                  hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
                }),

                defineField({
                  name: 'textColor',
                  title: 'Text Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Dark Gray', value: 'dark-gray' },
                      { title: 'Black', value: 'black' },
                      { title: 'White', value: 'white' },
                      { title: 'Custom', value: 'custom' },
                    ],
                  },
                  initialValue: 'dark-gray',
                }),

                defineField({
                  name: 'customTextColor',
                  title: 'Custom Text Color',
                  type: 'string',
                  description: 'Hex color code for custom text color',
                  hidden: ({ parent }) => parent?.textColor !== 'custom',
                }),
              ],
              description: 'Visual styling options for this slide.',
            }),

            defineField({
              name: 'layout',
              title: 'Slide Layout',
              type: 'object',
              fields: [
                defineField({
                  name: 'contentPosition',
                  title: 'Content Position',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Left Content, Right Image', value: 'left-content' },
                      { title: 'Right Content, Left Image', value: 'right-content' },
                      { title: 'Center Content, Background Image', value: 'center-content' },
                    ],
                  },
                  initialValue: 'left-content',
                  description: 'Layout arrangement for content and image.',
                }),

                defineField({
                  name: 'contentWidth',
                  title: 'Content Width',
                  type: 'string',
                  options: {
                    list: [
                      { title: '40% Content, 60% Image', value: '40-60' },
                      { title: '50% Content, 50% Image', value: '50-50' },
                      { title: '60% Content, 40% Image', value: '60-40' },
                    ],
                  },
                  initialValue: '50-50',
                  description: 'Width distribution between content and image.',
                }),
              ],
              description: 'Layout configuration for this slide.',
            }),

            defineField({
              name: 'isActive',
              title: 'Is Active',
              type: 'boolean',
              initialValue: true,
              description: 'Whether this service should be displayed in the slider.',
            }),

            defineField({
              name: 'sortOrder',
              title: 'Sort Order',
              type: 'number',
              description: 'Order in which this service appears in the slider (lower numbers first).',
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
                  description: 'What action constitutes a conversion for this service.',
                }),
              ],
              description: 'Analytics and tracking configuration.',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
              isActive: 'isActive',
            },
            prepare(selection) {
              const { title, subtitle, media, isActive } = selection;
              return {
                title: title || 'Unnamed Service',
                subtitle: `${isActive ? '✅' : '❌'} ${subtitle?.substring(0, 60) || 'No description'}...`,
                media: media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(8).warning('Consider limiting to 3-5 services for optimal user experience'),
      description: 'The services to feature in the slider.',
    }),

    defineField({
      name: 'sliderConfiguration',
      title: 'Slider Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'autoplay',
          title: 'Autoplay',
          type: 'boolean',
          initialValue: true,
          description: 'Whether the slider should automatically advance.',
        }),

        defineField({
          name: 'autoplaySpeed',
          title: 'Autoplay Speed (seconds)',
          type: 'number',
          options: {
            range: { min: 3, max: 15, step: 1 },
          },
          initialValue: 8,
          description: 'How long each slide is displayed before advancing.',
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
          description: 'Display dot indicators at the bottom of the slider.',
        }),

        defineField({
          name: 'pauseOnHover',
          title: 'Pause on Hover',
          type: 'boolean',
          initialValue: true,
          description: 'Pause autoplay when user hovers over the slider.',
          hidden: ({ parent }) => !parent?.autoplay,
        }),

        defineField({
          name: 'transitionEffect',
          title: 'Transition Effect',
          type: 'string',
          options: {
            list: [
              { title: 'Slide', value: 'slide' },
              { title: 'Fade', value: 'fade' },
              { title: 'Zoom', value: 'zoom' },
            ],
          },
          initialValue: 'slide',
          description: 'Animation effect between slides.',
        }),

        defineField({
          name: 'transitionSpeed',
          title: 'Transition Speed (ms)',
          type: 'number',
          options: {
            range: { min: 200, max: 1000, step: 100 },
          },
          initialValue: 500,
          description: 'Speed of the transition animation.',
        }),
      ],
      description: 'Configuration options for the slider behavior.',
    }),

    defineField({
      name: 'sectionStyle',
      title: 'Section Style',
      type: 'object',
      fields: [
        defineField({
          name: 'containerMaxWidth',
          title: 'Container Max Width',
          type: 'string',
          options: {
            list: [
              { title: 'Full Width', value: 'full' },
              { title: 'Extra Large (1280px)', value: 'xl' },
              { title: 'Large (1024px)', value: 'lg' },
              { title: 'Medium (768px)', value: 'md' },
            ],
          },
          initialValue: 'xl',
          description: 'Maximum width of the slider container.',
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
          name: 'borderRadius',
          title: 'Slider Border Radius',
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
          description: 'Corner rounding for the slider container.',
        }),

        defineField({
          name: 'shadow',
          title: 'Slider Shadow',
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
          description: 'Drop shadow for the slider container.',
        }),
      ],
      description: 'Overall styling for the section.',
    }),

    defineField({
      name: 'responsiveSettings',
      title: 'Responsive Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'mobileLayout',
          title: 'Mobile Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Stack (Content above Image)', value: 'stack' },
              { title: 'Keep Side by Side', value: 'side-by-side' },
            ],
          },
          initialValue: 'stack',
          description: 'How to display content on mobile devices.',
        }),

        defineField({
          name: 'hideOnMobile',
          title: 'Hide on Mobile',
          type: 'boolean',
          initialValue: false,
          description: 'Hide this entire section on mobile devices.',
        }),
      ],
      description: 'Settings for different screen sizes.',
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
      servicesCount: 'services',
    },
    prepare(selection) {
      const { title, isActive, servicesCount } = selection;
      const count = Array.isArray(servicesCount) ? servicesCount.length : 0;
      
      return {
        title: title || 'Featured Services Section',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${count} services configured`,
        media: '🎯',
      };
    },
  },
});