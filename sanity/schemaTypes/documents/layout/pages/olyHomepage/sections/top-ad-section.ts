import { defineType, defineField } from 'sanity';

export const topAdSection = defineType({
  name: 'topAdSection',
  title: 'Top Ad Section',
  type: 'document',
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Top Ad Section Configuration Title',
      type: 'string',
      initialValue: 'Main Top Ad Section',
      description: 'Internal title for this top ad section configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this top ad section is currently active.',
    }),

    defineField({
      name: 'sectionTitle',
      title: 'Section Display Title',
      type: 'string',
      description: 'Optional title displayed above the top ad section (leave empty to hide).',
    }),

    defineField({
      name: 'adSectionReference',
      title: 'Ad Section Reference',
      type: 'reference',
      to: [{ type: 'adSection' }],
      validation: (Rule) => Rule.required(),
      description: 'Reference to the main ad section configuration to use for this top ad placement.',
    }),

    defineField({
      name: 'positionSettings',
      title: 'Position Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'placement',
          title: 'Placement Position',
          type: 'string',
          options: {
            list: [
              { title: 'Above Header/Navigation', value: 'above-header' },
              { title: 'Below Header/Navigation', value: 'below-header' },
              { title: 'Above Hero Section', value: 'above-hero' },
              { title: 'Below Hero Section', value: 'below-hero' },
              { title: 'Top of Main Content', value: 'top-content' },
            ],
          },
          initialValue: 'below-header',
          description: 'Where to position the top ad section on the page.',
        }),

        defineField({
          name: 'isSticky',
          title: 'Sticky/Fixed Position',
          type: 'boolean',
          initialValue: false,
          description: 'Make the ad section stick to the top when scrolling.',
        }),

        defineField({
          name: 'stickyOffset',
          title: 'Sticky Offset (px)',
          type: 'number',
          initialValue: 0,
          hidden: ({ parent }) => !parent?.isSticky,
          description: 'Offset from top when in sticky position (in pixels).',
        }),

        defineField({
          name: 'zIndex',
          title: 'Z-Index',
          type: 'number',
          initialValue: 100,
          hidden: ({ parent }) => !parent?.isSticky,
          description: 'Z-index for sticky positioning (higher values appear above other elements).',
        }),
      ],
      description: 'Position and placement settings for the top ad section.',
    }),

    defineField({
      name: 'displaySettings',
      title: 'Display Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'showOnPages',
          title: 'Show on Pages',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Homepage', value: 'homepage' },
                  { title: 'Properties Homepage', value: 'properties-homepage' },
                  { title: 'Auto Homepage', value: 'auto-homepage' },
                  { title: 'Hiring Homepage', value: 'hiring-homepage' },
                  { title: 'Services Homepage', value: 'services-homepage' },
                  { title: 'Listing Pages', value: 'listing-pages' },
                  { title: 'Search Results', value: 'search-results' },
                  { title: 'All Pages', value: 'all-pages' },
                ],
              },
            },
          ],
          initialValue: ['homepage'],
          description: 'Select which pages should display this top ad section.',
        }),

        defineField({
          name: 'hideAfterInteraction',
          title: 'Hide After User Interaction',
          type: 'boolean',
          initialValue: false,
          description: 'Hide the ad after user clicks or interacts with it.',
        }),

        defineField({
          name: 'showCloseButton',
          title: 'Show Close Button',
          type: 'boolean',
          initialValue: true,
          description: 'Allow users to close/dismiss the top ad.',
        }),

        defineField({
          name: 'autoHideDelay',
          title: 'Auto-Hide Delay (seconds)',
          type: 'number',
          validation: (Rule) => Rule.min(5).max(60),
          description: 'Automatically hide the ad after specified seconds (leave empty to disable).',
        }),

        defineField({
          name: 'showOnlyOnce',
          title: 'Show Only Once Per Session',
          type: 'boolean',
          initialValue: false,
          description: 'Show the top ad only once per user session.',
        }),
      ],
      description: 'Display behavior and visibility settings.',
    }),

    defineField({
      name: 'topAdStyle',
      title: 'Top Ad Styling',
      type: 'object',
      fields: [
        defineField({
          name: 'width',
          title: 'Ad Width',
          type: 'string',
          options: {
            list: [
              { title: 'Full Width', value: 'full' },
              { title: 'Container Width', value: 'container' },
              { title: 'Custom Width', value: 'custom' },
            ],
          },
          initialValue: 'full',
          description: 'Width of the top ad section.',
        }),

        defineField({
          name: 'customWidth',
          title: 'Custom Width',
          type: 'string',
          hidden: ({ parent }) => parent?.width !== 'custom',
          description: 'Custom width value (e.g., 1200px, 80%, etc.).',
        }),

        defineField({
          name: 'alignment',
          title: 'Ad Alignment',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'center',
          description: 'Horizontal alignment of the ad content.',
        }),

        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'Transparent', value: 'transparent' },
              { title: 'White', value: 'white' },
              { title: 'Light Gray', value: 'light-gray' },
              { title: 'Dark Gray', value: 'dark-gray' },
              { title: 'Brand Color', value: 'brand' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'light-gray',
          description: 'Background color of the top ad section.',
        }),

        defineField({
          name: 'customBackgroundColor',
          title: 'Custom Background Color',
          type: 'string',
          description: 'Hex color code for custom background',
          hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
        }),

        defineField({
          name: 'borderStyle',
          title: 'Border Style',
          type: 'object',
          fields: [
            defineField({
              name: 'showBorder',
              title: 'Show Border',
              type: 'boolean',
              initialValue: false,
              description: 'Add border around the top ad section.',
            }),
            defineField({
              name: 'borderColor',
              title: 'Border Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Light Gray', value: 'light-gray' },
                  { title: 'Dark Gray', value: 'dark-gray' },
                  { title: 'Brand Color', value: 'brand' },
                  { title: 'Custom', value: 'custom' },
                ],
              },
              initialValue: 'light-gray',
              hidden: ({ parent }) => !parent?.showBorder,
              description: 'Color of the border.',
            }),
            defineField({
              name: 'customBorderColor',
              title: 'Custom Border Color',
              type: 'string',
              description: 'Hex color code for custom border',
              hidden: ({ parent }) => !parent?.showBorder || parent?.borderColor !== 'custom',
            }),
            defineField({
              name: 'borderWidth',
              title: 'Border Width',
              type: 'string',
              options: {
                list: [
                  { title: 'Thin (1px)', value: 'thin' },
                  { title: 'Medium (2px)', value: 'medium' },
                  { title: 'Thick (3px)', value: 'thick' },
                ],
              },
              initialValue: 'thin',
              hidden: ({ parent }) => !parent?.showBorder,
              description: 'Width of the border.',
            }),
          ],
          description: 'Border styling options.',
        }),

        defineField({
          name: 'shadow',
          title: 'Drop Shadow',
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
          description: 'Drop shadow for the top ad section.',
        }),

        defineField({
          name: 'padding',
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
          initialValue: 'small',
          description: 'Padding inside the top ad section.',
        }),

        defineField({
          name: 'margin',
          title: 'Section Margin',
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
          description: 'Margin around the top ad section.',
        }),
      ],
      description: 'Visual styling specific to the top ad placement.',
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
          description: 'Hide the top ad section on mobile devices.',
        }),

        defineField({
          name: 'hideOnTablet',
          title: 'Hide on Tablet',
          type: 'boolean',
          initialValue: false,
          description: 'Hide the top ad section on tablet devices.',
        }),

        defineField({
          name: 'mobileHeight',
          title: 'Mobile Height',
          type: 'string',
          options: {
            list: [
              { title: 'Auto', value: 'auto' },
              { title: 'Small (50px)', value: 'small' },
              { title: 'Medium (100px)', value: 'medium' },
              { title: 'Large (150px)', value: 'large' },
            ],
          },
          initialValue: 'auto',
          hidden: ({ parent }) => parent?.hideOnMobile,
          description: 'Height of the top ad on mobile devices.',
        }),

        defineField({
          name: 'disableStickyOnMobile',
          title: 'Disable Sticky on Mobile',
          type: 'boolean',
          initialValue: true,
          description: 'Disable sticky positioning on mobile devices.',
        }),
      ],
      description: 'Responsive behavior settings for different screen sizes.',
    }),

    defineField({
      name: 'performanceSettings',
      title: 'Performance Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'lazyLoad',
          title: 'Lazy Load Ads',
          type: 'boolean',
          initialValue: false,
          description: 'Load ads only when they come into viewport (not recommended for top ads).',
        }),

        defineField({
          name: 'preloadAds',
          title: 'Preload Ads',
          type: 'boolean',
          initialValue: true,
          description: 'Preload ad content for faster display.',
        }),

        defineField({
          name: 'cacheAds',
          title: 'Cache Ads',
          type: 'boolean',
          initialValue: true,
          description: 'Cache ad content for better performance.',
        }),
      ],
      description: 'Performance optimization settings.',
    }),

    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        defineField({
          name: 'trackVisibility',
          title: 'Track Visibility',
          type: 'boolean',
          initialValue: true,
          description: 'Track when the top ad becomes visible to users.',
        }),

        defineField({
          name: 'trackScrollDepth',
          title: 'Track Scroll Depth',
          type: 'boolean',
          initialValue: true,
          description: 'Track how far users scroll past the top ad.',
        }),

        defineField({
          name: 'trackCloseEvents',
          title: 'Track Close Events',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users close or dismiss the top ad.',
        }),

        defineField({
          name: 'customAnalyticsCode',
          title: 'Custom Analytics Code',
          type: 'text',
          rows: 4,
          description: 'Custom analytics code specific to top ad placement.',
        }),
      ],
      description: 'Analytics and tracking specific to top ad placement.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this top ad section configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      placement: 'positionSettings.placement',
      isSticky: 'positionSettings.isSticky',
      adSectionTitle: 'adSectionReference.title',
      showOnPages: 'displaySettings.showOnPages',
    },
    prepare(selection) {
      const { title, isActive, placement, isSticky, adSectionTitle, showOnPages } = selection;
      const pageCount = Array.isArray(showOnPages) ? showOnPages.length : 0;
      
      return {
        title: title || 'Top Ad Section Configuration',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${placement || 'below-header'}${isSticky ? ' (Sticky)' : ''} - ${pageCount} pages - Refs: ${adSectionTitle || 'None'}`,
        media: '🔝',
      };
    },
  },
});