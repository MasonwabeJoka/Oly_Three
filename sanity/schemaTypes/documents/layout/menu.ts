import { defineType, defineField } from 'sanity';

export const menuModalSection = defineType({
  name: 'menuModalSection',
  title: 'Menu Modal',
  type: 'document',
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Modal Configuration Title',
      type: 'string',
      initialValue: 'Main Menu Modal',
      description: 'Internal title for this menu modal configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this menu modal is currently active on the website.',
    }),

    defineField({
      name: 'modalSettings',
      title: 'Modal Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'showCloseButton',
          title: 'Show Close Button',
          type: 'boolean',
          initialValue: true,
          description: 'Display the X close button in the top right corner.',
        }),

        defineField({
          name: 'closeOnBackdropClick',
          title: 'Close on Backdrop Click',
          type: 'boolean',
          initialValue: true,
          description: 'Allow users to close the modal by clicking outside of it.',
        }),

        defineField({
          name: 'closeOnEscapeKey',
          title: 'Close on Escape Key',
          type: 'boolean',
          initialValue: true,
          description: 'Allow users to close the modal by pressing the Escape key.',
        }),

        defineField({
          name: 'animationType',
          title: 'Animation Type',
          type: 'string',
          options: {
            list: [
              { title: 'Fade In', value: 'fade' },
              { title: 'Scale Up', value: 'scale' },
              { title: 'Slide Down', value: 'slide-down' },
              { title: 'Slide Up', value: 'slide-up' },
            ],
          },
          initialValue: 'fade',
          description: 'Animation when the modal appears.',
        }),
      ],
      description: 'General modal behavior and appearance settings.',
    }),

    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            defineField({
              name: 'id',
              title: 'Item ID',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Unique identifier for this menu item.',
            }),

            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Text displayed below the icon.',
            }),

            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Link destination when item is clicked.',
            }),

            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'object',
              fields: [
                defineField({
                  name: 'iconType',
                  title: 'Icon Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Predefined Icon', value: 'predefined' },
                      { title: 'Custom Image', value: 'custom' },
                      { title: 'Text/Emoji', value: 'text' },
                    ],
                  },
                  initialValue: 'predefined',
                  description: 'Type of icon to display.',
                }),

                defineField({
                  name: 'predefinedIcon',
                  title: 'Predefined Icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Post Listing (LISTING)', value: 'post-listing' },
                      { title: 'Dashboard (Chart)', value: 'dashboard' },
                      { title: 'My Listings (Tag)', value: 'my-listings' },
                      { title: 'Liked Listings (Heart)', value: 'liked-listings' },
                      { title: 'Notifications (Bell)', value: 'notifications' },
                      { title: 'Messages (Chat)', value: 'messages' },
                      { title: 'Help (Question)', value: 'help' },
                      { title: 'Settings (Gear)', value: 'settings' },
                      { title: 'Logout (Exit)', value: 'logout' },
                      { title: 'Profile (User)', value: 'profile' },
                      { title: 'Favorites (Star)', value: 'favorites' },
                      { title: 'Search (Magnifying Glass)', value: 'search' },
                      { title: 'Home (House)', value: 'home' },
                      { title: 'Categories (Grid)', value: 'categories' },
                    ],
                  },
                  hidden: ({ parent }) => parent?.iconType !== 'predefined',
                  validation: (Rule) => Rule.custom((value, context) => {
                    const parent = context.parent as any;
                    if (parent?.iconType === 'predefined' && !value) {
                      return 'Predefined icon is required when icon type is predefined';
                    }
                    return true;
                  }),
                }),

                defineField({
                  name: 'customIcon',
                  title: 'Custom Icon Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                    metadata: ['blurhash', 'lqip'],
                  },
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  hidden: ({ parent }) => parent?.iconType !== 'custom',
                  validation: (Rule) => Rule.custom((value, context) => {
                    const parent = context.parent as any;
                    if (parent?.iconType === 'custom' && !value) {
                      return 'Custom icon image is required when icon type is custom';
                    }
                    return true;
                  }),
                }),

                defineField({
                  name: 'textIcon',
                  title: 'Text/Emoji Icon',
                  type: 'string',
                  hidden: ({ parent }) => parent?.iconType !== 'text',
                  validation: (Rule) => Rule.custom((value, context) => {
                    const parent = context.parent as any;
                    if (parent?.iconType === 'text' && !value) {
                      return 'Text/emoji is required when icon type is text';
                    }
                    return true;
                  }),
                  description: 'Text or emoji to display as icon (e.g., 📱, LISTING, etc.)',
                }),
              ],
              validation: (Rule) => Rule.required(),
              description: 'Icon configuration for this menu item.',
            }),

            defineField({
              name: 'badge',
              title: 'Badge/Notification',
              type: 'object',
              fields: [
                defineField({
                  name: 'showBadge',
                  title: 'Show Badge',
                  type: 'boolean',
                  initialValue: false,
                  description: 'Display a notification badge on this item.',
                }),

                defineField({
                  name: 'badgeType',
                  title: 'Badge Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Number Count', value: 'count' },
                      { title: 'Dot Indicator', value: 'dot' },
                      { title: 'Text Badge', value: 'text' },
                    ],
                  },
                  initialValue: 'count',
                  hidden: ({ parent }) => !parent?.showBadge,
                }),

                defineField({
                  name: 'badgeText',
                  title: 'Badge Text',
                  type: 'string',
                  hidden: ({ parent }) => !parent?.showBadge || parent?.badgeType !== 'text',
                  description: 'Custom text for the badge (e.g., "NEW", "!").',
                }),

                defineField({
                  name: 'badgeColor',
                  title: 'Badge Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Red', value: 'red' },
                      { title: 'Blue', value: 'blue' },
                      { title: 'Green', value: 'green' },
                      { title: 'Orange', value: 'orange' },
                      { title: 'Purple', value: 'purple' },
                    ],
                  },
                  initialValue: 'red',
                  hidden: ({ parent }) => !parent?.showBadge,
                }),
              ],
              description: 'Notification badge configuration.',
            }),

            defineField({
              name: 'requireAuth',
              title: 'Require Authentication',
              type: 'boolean',
              initialValue: false,
              description: 'Only show this item to authenticated users.',
            }),

            defineField({
              name: 'showForGuestUsers',
              title: 'Show for Guest Users',
              type: 'boolean',
              initialValue: false,
              description: 'Show this item to non-authenticated users.',
            }),

            defineField({
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: false,
              description: 'Open the link in a new browser tab.',
            }),

            defineField({
              name: 'isActive',
              title: 'Is Active',
              type: 'boolean',
              initialValue: true,
              description: 'Whether this menu item is currently active.',
            }),

            defineField({
              name: 'sortOrder',
              title: 'Sort Order',
              type: 'number',
              description: 'Order of this item in the grid (1-9 for 3x3 grid).',
              validation: (Rule) => Rule.min(1).max(12),
            }),

            defineField({
              name: 'gridPosition',
              title: 'Grid Position',
              type: 'object',
              fields: [
                defineField({
                  name: 'row',
                  title: 'Row',
                  type: 'number',
                  options: {
                    list: [
                      { title: 'Row 1', value: 1 },
                      { title: 'Row 2', value: 2 },
                      { title: 'Row 3', value: 3 },
                      { title: 'Row 4', value: 4 },
                    ],
                  },
                  initialValue: 1,
                  validation: (Rule) => Rule.min(1).max(4),
                }),
                defineField({
                  name: 'column',
                  title: 'Column',
                  type: 'number',
                  options: {
                    list: [
                      { title: 'Column 1', value: 1 },
                      { title: 'Column 2', value: 2 },
                      { title: 'Column 3', value: 3 },
                    ],
                  },
                  initialValue: 1,
                  validation: (Rule) => Rule.min(1).max(3),
                }),
              ],
              description: 'Specific grid position for this item.',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              url: 'url',
              isActive: 'isActive',
              iconType: 'icon.iconType',
              predefinedIcon: 'icon.predefinedIcon',
            },
            prepare(selection) {
              const { title, url, isActive, iconType, predefinedIcon } = selection;
              const iconEmoji = {
                'post-listing': '📝',
                'dashboard': '📊',
                'my-listings': '🏷️',
                'liked-listings': '❤️',
                'notifications': '🔔',
                'messages': '💬',
                'help': '❓',
                'settings': '⚙️',
                'logout': '🚪',
                'profile': '👤',
                'favorites': '⭐',
                'search': '🔍',
                'home': '🏠',
                'categories': '📋',
              };
              
              return {
                title: title || 'Unnamed Item',
                subtitle: `${isActive ? '✅' : '❌'} ${url || 'No URL'}`,
                media: iconEmoji[predefinedIcon] || '🔘',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(12),
      description: 'Items to display in the menu modal grid.',
    }),

    defineField({
      name: 'layoutSettings',
      title: 'Layout Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'gridColumns',
          title: 'Grid Columns',
          type: 'number',
          options: {
            list: [
              { title: '2 Columns', value: 2 },
              { title: '3 Columns', value: 3 },
              { title: '4 Columns', value: 4 },
            ],
          },
          initialValue: 3,
          description: 'Number of columns in the menu grid.',
        }),

        defineField({
          name: 'itemSpacing',
          title: 'Item Spacing',
          type: 'string',
          options: {
            list: [
              { title: 'Compact', value: 'compact' },
              { title: 'Normal', value: 'normal' },
              { title: 'Spacious', value: 'spacious' },
            ],
          },
          initialValue: 'normal',
          description: 'Spacing between menu items.',
        }),

        defineField({
          name: 'iconSize',
          title: 'Icon Size',
          type: 'string',
          options: {
            list: [
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'medium',
          description: 'Size of the menu item icons.',
        }),

        defineField({
          name: 'showLabels',
          title: 'Show Labels',
          type: 'boolean',
          initialValue: true,
          description: 'Display text labels below icons.',
        }),
      ],
      description: 'Grid layout and spacing configuration.',
    }),

    defineField({
      name: 'modalStyle',
      title: 'Modal Style',
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
              { title: 'Dark Gray', value: 'dark-gray' },
              { title: 'Black', value: 'black' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'white',
          description: 'Background color of the modal content.',
        }),

        defineField({
          name: 'customBackgroundColor',
          title: 'Custom Background Color',
          type: 'string',
          description: 'Hex color code for custom background',
          hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
        }),

        defineField({
          name: 'overlayColor',
          title: 'Overlay Color',
          type: 'string',
          options: {
            list: [
              { title: 'Dark Semi-transparent', value: 'dark-overlay' },
              { title: 'Light Semi-transparent', value: 'light-overlay' },
              { title: 'Blur Effect', value: 'blur-overlay' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'dark-overlay',
          description: 'Background overlay behind the modal.',
        }),

        defineField({
          name: 'customOverlayColor',
          title: 'Custom Overlay Color',
          type: 'string',
          description: 'Hex color code with opacity (e.g., rgba(0,0,0,0.5))',
          hidden: ({ parent }) => parent?.overlayColor !== 'custom',
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
          description: 'Corner rounding of the modal.',
        }),

        defineField({
          name: 'shadow',
          title: 'Modal Shadow',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'large',
          description: 'Drop shadow for the modal.',
        }),

        defineField({
          name: 'maxWidth',
          title: 'Maximum Width',
          type: 'string',
          options: {
            list: [
              { title: 'Small (320px)', value: 'small' },
              { title: 'Medium (480px)', value: 'medium' },
              { title: 'Large (640px)', value: 'large' },
              { title: 'Extra Large (800px)', value: 'xl' },
            ],
          },
          initialValue: 'medium',
          description: 'Maximum width of the modal on larger screens.',
        }),
      ],
      description: 'Visual styling options for the modal.',
    }),

    defineField({
      name: 'itemStyle',
      title: 'Menu Item Style',
      type: 'object',
      fields: [
        defineField({
          name: 'itemBackgroundColor',
          title: 'Item Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'Transparent', value: 'transparent' },
              { title: 'Light Gray', value: 'light-gray' },
              { title: 'White', value: 'white' },
              { title: 'Brand Color', value: 'brand' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'light-gray',
          description: 'Background color for individual menu items.',
        }),

        defineField({
          name: 'customItemBackgroundColor',
          title: 'Custom Item Background Color',
          type: 'string',
          description: 'Hex color code for custom item background',
          hidden: ({ parent }) => parent?.itemBackgroundColor !== 'custom',
        }),

        defineField({
          name: 'itemTextColor',
          title: 'Item Text Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'black' },
              { title: 'Dark Gray', value: 'dark-gray' },
              { title: 'White', value: 'white' },
              { title: 'Brand Color', value: 'brand' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'dark-gray',
          description: 'Text color for menu item labels.',
        }),

        defineField({
          name: 'customItemTextColor',
          title: 'Custom Item Text Color',
          type: 'string',
          description: 'Hex color code for custom text color',
          hidden: ({ parent }) => parent?.itemTextColor !== 'custom',
        }),

        defineField({
          name: 'itemBorderRadius',
          title: 'Item Border Radius',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
              { title: 'Full (Circle)', value: 'full' },
            ],
          },
          initialValue: 'full',
          description: 'Corner rounding for menu items.',
        }),

        defineField({
          name: 'hoverEffect',
          title: 'Hover Effect',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Darken', value: 'darken' },
              { title: 'Lighten', value: 'lighten' },
              { title: 'Scale Up', value: 'scale' },
              { title: 'Glow', value: 'glow' },
            ],
          },
          initialValue: 'darken',
          description: 'Effect when hovering over menu items.',
        }),
      ],
      description: 'Styling for individual menu items.',
    }),

    defineField({
      name: 'accessibility',
      title: 'Accessibility',
      type: 'object',
      fields: [
        defineField({
          name: 'modalTitle',
          title: 'Modal Title (Screen Readers)',
          type: 'string',
          initialValue: 'User Menu',
          description: 'Title announced to screen readers when modal opens.',
        }),

        defineField({
          name: 'modalDescription',
          title: 'Modal Description (Screen Readers)',
          type: 'string',
          initialValue: 'Navigation menu with user account options',
          description: 'Description announced to screen readers.',
        }),

        defineField({
          name: 'focusTrap',
          title: 'Focus Trap',
          type: 'boolean',
          initialValue: true,
          description: 'Keep keyboard focus within the modal when open.',
        }),
      ],
      description: 'Accessibility and screen reader settings.',
    }),

    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'trackModalOpen',
          title: 'Track Modal Opens',
          type: 'boolean',
          initialValue: true,
          description: 'Track when the menu modal is opened.',
        }),

        defineField({
          name: 'trackItemClicks',
          title: 'Track Item Clicks',
          type: 'boolean',
          initialValue: true,
          description: 'Track clicks on individual menu items.',
        }),

        defineField({
          name: 'trackModalClose',
          title: 'Track Modal Closes',
          type: 'boolean',
          initialValue: false,
          description: 'Track when the menu modal is closed.',
        }),
      ],
      description: 'Analytics and tracking configuration.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this menu modal configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      itemsCount: 'menuItems',
      gridColumns: 'layoutSettings.gridColumns',
    },
    prepare(selection) {
      const { title, isActive, itemsCount, gridColumns } = selection;
      const count = Array.isArray(itemsCount) ? itemsCount.length : 0;
      
      return {
        title: title || 'Menu Modal Configuration',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${count} items (${gridColumns || 3} columns)`,
        media: '📱',
      };
    },
  },
});