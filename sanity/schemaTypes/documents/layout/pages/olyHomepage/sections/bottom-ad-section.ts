import { defineType, defineField } from 'sanity';

export const bottomAdSection = defineType({
  name: 'bottomAdSection',
  title: 'Bottom Ad Section',
  type: 'document',
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Bottom Ad Section Configuration Title',
      type: 'string',
      initialValue: 'Main Bottom Ad Section',
      description: 'Internal title for this bottom ad section configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this bottom ad section is currently active.',
    }),

    defineField({
      name: 'sectionTitle',
      title: 'Section Display Title',
      type: 'string',
      description: 'Optional title displayed above the bottom ad section (leave empty to hide).',
    }),

    defineField({
      name: 'adSectionReference',
      title: 'Ad Section Reference',
      type: 'reference',
      to: [{ type: 'adSection' }],
      validation: (Rule) => Rule.required(),
      description: 'Reference to the main ad section configuration to use for this bottom ad placement.',
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
              { title: 'Above Footer', value: 'above-footer' },
              { title: 'Below Main Content', value: 'below-content' },
              { title: 'Bottom of Page', value: 'bottom-page' },
              { title: 'Before Related Content', value: 'before-related' },
              { title: 'After Related Content', value: 'after-related' },
            ],
          },
          initialValue: 'above-footer',
          description: 'Where to position the bottom ad section on the page.',
        }),

        defineField({
          name: 'isSticky',
          title: 'Sticky/Fixed Position',
          type: 'boolean',
          initialValue: false,
          description: 'Make the ad section stick to the bottom when scrolling.',
        }),

        defineField({
          name: 'stickyOffset',
          title: 'Sticky Offset (px)',
          type: 'number',
          initialValue: 0,
          hidden: ({ parent }) => !parent?.isSticky,
          description: 'Offset from bottom when in sticky position (in pixels).',
        }),

        defineField({
          name: 'zIndex',
          title: 'Z-Index',
          type: 'number',
          initialValue: 100,
          hidden: ({ parent }) => !parent?.isSticky,
          description: 'Z-index for sticky positioning (higher values appear above other elements).',
        }),

        defineField({
          name: 'showOnScrollUp',
          title: 'Show Only on Scroll Up',
          type: 'boolean',
          initialValue: false,
          hidden: ({ parent }) => !parent?.isSticky,
          description: 'Show sticky bottom ad only when user scrolls up.',
        }),
      ],
      description: 'Position and placement settings for the bottom ad section.',
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
                  { title: 'Article Pages', value: 'article-pages' },
                  { title: 'All Pages', value: 'all-pages' },
                ],
              },
            },
          ],
          initialValue: ['homepage'],
          description: 'Select which pages should display this bottom ad section.',
        }),

        defineField({
          name: 'showAfterScrollPercentage',
          title: 'Show After Scroll Percentage',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
          description: 'Show the bottom ad only after user has scrolled this percentage of the page (0-100).',
        }),

        defineField({
          name: 'showAfterTimeOnPage',
          title: 'Show After Time on Page (seconds)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(300),
          description: 'Show the bottom ad only after user has spent this many seconds on the page.',
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
          description: 'Allow users to close/dismiss the bottom ad.',
        }),

        defineField({
          name: 'showMinimizeButton',
          title: 'Show Minimize Button',
          type: 'boolean',
          initialValue: false,
          description: 'Allow users to minimize the bottom ad (especially useful for sticky ads).',
        }),

        defineField({
          name: 'autoHideDelay',
          title: 'Auto-Hide Delay (seconds)',
          type: 'number',
          validation: (Rule) => Rule.min(5).max(300),
          description: 'Automatically hide the ad after specified seconds (leave empty to disable).',
        }),

        defineField({
          name: 'showOnlyOnce',
          title: 'Show Only Once Per Session',
          type: 'boolean',
          initialValue: false,
          description: 'Show the bottom ad only once per user session.',
        }),

        defineField({
          name: 'respectDoNotTrack',
          title: 'Respect Do Not Track',
          type: 'boolean',
          initialValue: true,
          description: 'Hide ads for users with Do Not Track enabled.',
        }),
      ],
      description: 'Display behavior and visibility settings.',
    }),

    defineField({
      name: 'bottomAdStyle',
      title: 'Bottom Ad Styling',
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
          description: 'Width of the bottom ad section.',
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
          description: 'Background color of the bottom ad section.',
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
              description: 'Add border around the bottom ad section.',
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
            defineField({
              name: 'borderPosition',
              title: 'Border Position',
              type: 'string',
              options: {
                list: [
                  { title: 'All Sides', value: 'all' },
                  { title: 'Top Only', value: 'top' },
                  { title: 'Top and Bottom', value: 'top-bottom' },
                ],
              },
              initialValue: 'top',
              hidden: ({ parent }) => !parent?.showBorder,
              description: 'Which sides should have borders.',
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
              { title: 'Top Shadow Only', value: 'top-only' },
            ],
          },
          initialValue: 'small',
          description: 'Drop shadow for the bottom ad section.',
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
          initialValue: 'medium',
          description: 'Padding inside the bottom ad section.',
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
          initialValue: 'medium',
          description: 'Margin around the bottom ad section.',
        }),

        defineField({
          name: 'animationStyle',
          title: 'Animation Style',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Slide Up', value: 'slide-up' },
              { title: 'Fade In', value: 'fade-in' },
              { title: 'Scale In', value: 'scale-in' },
              { title: 'Bounce In', value: 'bounce-in' },
            ],
          },
          initialValue: 'slide-up',
          description: 'Animation when the bottom ad appears.',
        }),
      ],
      description: 'Visual styling specific to the bottom ad placement.',
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
          description: 'Hide the bottom ad section on mobile devices.',
        }),

        defineField({
          name: 'hideOnTablet',
          title: 'Hide on Tablet',
          type: 'boolean',
          initialValue: false,
          description: 'Hide the bottom ad section on tablet devices.',
        }),

        defineField({
          name: 'mobileHeight',
          title: 'Mobile Height',
          type: 'string',
          options: {
            list: [
              { title: 'Auto', value: 'auto' },
              { title: 'Small (60px)', value: 'small' },
              { title: 'Medium (100px)', value: 'medium' },
              { title: 'Large (150px)', value: 'large' },
            ],
          },
          initialValue: 'auto',
          hidden: ({ parent }) => parent?.hideOnMobile,
          description: 'Height of the bottom ad on mobile devices.',
        }),

        defineField({
          name: 'disableStickyOnMobile',
          title: 'Disable Sticky on Mobile',
          type: 'boolean',
          initialValue: false,
          description: 'Disable sticky positioning on mobile devices.',
        }),

        defineField({
          name: 'mobileOnlySticky',
          title: 'Sticky Only on Mobile',
          type: 'boolean',
          initialValue: false,
          description: 'Enable sticky positioning only on mobile devices.',
        }),

        defineField({
          name: 'tabletBehavior',
          title: 'Tablet Behavior',
          type: 'string',
          options: {
            list: [
              { title: 'Same as Desktop', value: 'desktop' },
              { title: 'Same as Mobile', value: 'mobile' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'desktop',
          description: 'How the bottom ad behaves on tablet devices.',
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
          initialValue: true,
          description: 'Load ads only when they come into viewport (recommended for bottom ads).',
        }),

        defineField({
          name: 'preloadAds',
          title: 'Preload Ads',
          type: 'boolean',
          initialValue: false,
          description: 'Preload ad content for faster display.',
        }),

        defineField({
          name: 'cacheAds',
          title: 'Cache Ads',
          type: 'boolean',
          initialValue: true,
          description: 'Cache ad content for better performance.',
        }),

        defineField({
          name: 'loadPriority',
          title: 'Load Priority',
          type: 'string',
          options: {
            list: [
              { title: 'High', value: 'high' },
              { title: 'Normal', value: 'normal' },
              { title: 'Low', value: 'low' },
            ],
          },
          initialValue: 'low',
          description: 'Loading priority for bottom ads.',
        }),

        defineField({
          name: 'intersectionThreshold',
          title: 'Intersection Threshold',
          type: 'number',
          initialValue: 0.1,
          validation: (Rule) => Rule.min(0).max(1),
          description: 'Threshold for intersection observer (0-1, lower values load earlier).',
        }),
      ],
      description: 'Performance optimization settings.',
    }),

    defineField({
      name: 'userExperienceSettings',
      title: 'User Experience Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'respectReducedMotion',
          title: 'Respect Reduced Motion',
          type: 'boolean',
          initialValue: true,
          description: 'Disable animations for users who prefer reduced motion.',
        }),

        defineField({
          name: 'keyboardAccessible',
          title: 'Keyboard Accessible',
          type: 'boolean',
          initialValue: true,
          description: 'Make the ad section keyboard accessible.',
        }),

        defineField({
          name: 'screenReaderFriendly',
          title: 'Screen Reader Friendly',
          type: 'boolean',
          initialValue: true,
          description: 'Add appropriate ARIA labels and descriptions.',
        }),

        defineField({
          name: 'respectBatteryLevel',
          title: 'Respect Low Battery',
          type: 'boolean',
          initialValue: false,
          description: 'Reduce animations and effects when device battery is low.',
        }),
      ],
      description: 'User experience and accessibility settings.',
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
          description: 'Track when the bottom ad becomes visible to users.',
        }),

        defineField({
          name: 'trackScrollToAd',
          title: 'Track Scroll to Ad',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users scroll to the bottom ad section.',
        }),

        defineField({
          name: 'trackTimeInView',
          title: 'Track Time in View',
          type: 'boolean',
          initialValue: true,
          description: 'Track how long the bottom ad is visible to users.',
        }),

        defineField({
          name: 'trackCloseEvents',
          title: 'Track Close Events',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users close or dismiss the bottom ad.',
        }),

        defineField({
          name: 'trackMinimizeEvents',
          title: 'Track Minimize Events',
          type: 'boolean',
          initialValue: true,
          description: 'Track when users minimize the bottom ad.',
        }),

        defineField({
          name: 'customAnalyticsCode',
          title: 'Custom Analytics Code',
          type: 'text',
          rows: 4,
          description: 'Custom analytics code specific to bottom ad placement.',
        }),
      ],
      description: 'Analytics and tracking specific to bottom ad placement.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this bottom ad section configuration was published.',
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
      animation: 'bottomAdStyle.animationStyle',
    },
    prepare(selection) {
      const { title, isActive, placement, isSticky, adSectionTitle, showOnPages, animation } = selection;
      const pageCount = Array.isArray(showOnPages) ? showOnPages.length : 0;
      
      return {
        title: title || 'Bottom Ad Section Configuration',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${placement || 'above-footer'}${isSticky ? ' (Sticky)' : ''} - ${pageCount} pages - ${animation || 'slide-up'} - Refs: ${adSectionTitle || 'None'}`,
        media: '🔻',
      };
    },
  },
});