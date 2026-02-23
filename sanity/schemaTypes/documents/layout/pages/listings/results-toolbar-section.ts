import { defineType, defineField } from 'sanity';

export const resultsToolbarSection = defineType({
  name: 'resultsToolbarSection',
  title: 'Results Toolbar',
  type: 'document',
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Results Toolbar Configuration Title',
      type: 'string',
      initialValue: 'Main Results Toolbar',
      description: 'Internal title for this results toolbar configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this results toolbar is currently active.',
    }),

    defineField({
      name: 'toolbarItems',
      title: 'Toolbar Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'toolbarItem',
          title: 'Toolbar Item',
          fields: [
            defineField({
              name: 'id',
              title: 'Item ID',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Unique identifier for this toolbar item.',
            }),

            defineField({
              name: 'label',
              title: 'Item Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Text displayed on the toolbar button.',
            }),

            defineField({
              name: 'itemType',
              title: 'Item Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Sort Dropdown', value: 'sort-dropdown' },
                  { title: 'Filter Dropdown', value: 'filter-dropdown' },
                  { title: 'View Toggle', value: 'view-toggle' },
                  { title: 'Action Button', value: 'action-button' },
                  { title: 'Multi-Select Dropdown', value: 'multi-select' },
                  { title: 'Range Selector', value: 'range-selector' },
                ],
              },
              initialValue: 'sort-dropdown',
              description: 'Type of toolbar item functionality.',
            }),

            defineField({
              name: 'icon',
              title: 'Item Icon',
              type: 'string',
              description: 'Optional icon for the toolbar item (icon name or emoji).',
            }),

            defineField({
              name: 'sortOptions',
              title: 'Sort Options',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'sortOption',
                  title: 'Sort Option',
                  fields: [
                    defineField({
                      name: 'value',
                      title: 'Sort Value',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'Internal value for this sort option.',
                    }),
                    defineField({
                      name: 'label',
                      title: 'Sort Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'Display text for this sort option.',
                    }),
                    defineField({
                      name: 'direction',
                      title: 'Sort Direction',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Ascending', value: 'asc' },
                          { title: 'Descending', value: 'desc' },
                        ],
                      },
                      initialValue: 'asc',
                      description: 'Sort direction for this option.',
                    }),
                    defineField({
                      name: 'isDefault',
                      title: 'Default Option',
                      type: 'boolean',
                      initialValue: false,
                      description: 'Whether this is the default sort option.',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'value',
                      direction: 'direction',
                      isDefault: 'isDefault',
                    },
                    prepare(selection) {
                      const { title, subtitle, direction, isDefault } = selection;
                      return {
                        title: title || 'Unnamed Sort',
                        subtitle: `${subtitle} (${direction}) ${isDefault ? '- Default' : ''}`,
                      };
                    },
                  },
                },
              ],
              hidden: ({ parent }) => parent?.itemType !== 'sort-dropdown',
              validation: (Rule) => Rule.max(10),
              description: 'Available sorting options for sort dropdown.',
            }),

            defineField({
              name: 'filterOptions',
              title: 'Filter Options',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'filterOption',
                  title: 'Filter Option',
                  fields: [
                    defineField({
                      name: 'value',
                      title: 'Filter Value',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'Internal value for this filter option.',
                    }),
                    defineField({
                      name: 'label',
                      title: 'Filter Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'Display text for this filter option.',
                    }),
                    defineField({
                      name: 'rangeMin',
                      title: 'Range Minimum',
                      type: 'number',
                      description: 'Minimum value for range options (e.g., price ranges).',
                    }),
                    defineField({
                      name: 'rangeMax',
                      title: 'Range Maximum',
                      type: 'number',
                      description: 'Maximum value for range options (e.g., price ranges).',
                    }),
                    defineField({
                      name: 'currency',
                      title: 'Currency Symbol',
                      type: 'string',
                      description: 'Currency symbol for price ranges (e.g., R, $, €).',
                    }),
                    defineField({
                      name: 'isPopular',
                      title: 'Popular Option',
                      type: 'boolean',
                      initialValue: false,
                      description: 'Mark this as a popular/featured option.',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      value: 'value',
                      rangeMin: 'rangeMin',
                      rangeMax: 'rangeMax',
                      currency: 'currency',
                    },
                    prepare(selection) {
                      const { title, value, rangeMin, rangeMax, currency } = selection;
                      let subtitle = value;
                      if (rangeMin !== undefined && rangeMax !== undefined) {
                        subtitle = `${currency || ''}${rangeMin} - ${currency || ''}${rangeMax}`;
                      }
                      return {
                        title: title || 'Unnamed Filter',
                        subtitle: subtitle,
                      };
                    },
                  },
                },
              ],
              hidden: ({ parent }) => !['filter-dropdown', 'multi-select'].includes(parent?.itemType),
              validation: (Rule) => Rule.max(15),
              description: 'Available filter options for filter dropdown.',
            }),

            defineField({
              name: 'toggleOptions',
              title: 'Toggle Options',
              type: 'object',
              fields: [
                defineField({
                  name: 'activeLabel',
                  title: 'Active State Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                  description: 'Label when toggle is active/on.',
                }),
                defineField({
                  name: 'inactiveLabel',
                  title: 'Inactive State Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                  description: 'Label when toggle is inactive/off.',
                }),
                defineField({
                  name: 'defaultState',
                  title: 'Default State',
                  type: 'boolean',
                  initialValue: false,
                  description: 'Default state of the toggle (true = active, false = inactive).',
                }),
                defineField({
                  name: 'activeIcon',
                  title: 'Active State Icon',
                  type: 'string',
                  description: 'Icon to show when toggle is active.',
                }),
                defineField({
                  name: 'inactiveIcon',
                  title: 'Inactive State Icon',
                  type: 'string',
                  description: 'Icon to show when toggle is inactive.',
                }),
              ],
              hidden: ({ parent }) => parent?.itemType !== 'view-toggle',
              description: 'Configuration for toggle-type toolbar items.',
            }),

            defineField({
              name: 'actionSettings',
              title: 'Action Settings',
              type: 'object',
              fields: [
                defineField({
                  name: 'actionType',
                  title: 'Action Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Open Modal', value: 'modal' },
                      { title: 'Navigate to URL', value: 'navigate' },
                      { title: 'Trigger Function', value: 'function' },
                      { title: 'Download/Export', value: 'download' },
                    ],
                  },
                  initialValue: 'modal',
                  description: 'Type of action when button is clicked.',
                }),
                defineField({
                  name: 'actionUrl',
                  title: 'Action URL',
                  type: 'string',
                  hidden: ({ parent }) => parent?.actionType !== 'navigate',
                  description: 'URL to navigate to when button is clicked.',
                }),
                defineField({
                  name: 'functionName',
                  title: 'Function Name',
                  type: 'string',
                  hidden: ({ parent }) => parent?.actionType !== 'function',
                  description: 'Name of JavaScript function to call.',
                }),
              ],
              hidden: ({ parent }) => parent?.itemType !== 'action-button',
              description: 'Configuration for action button items.',
            }),

            defineField({
              name: 'dropdownSettings',
              title: 'Dropdown Settings',
              type: 'object',
              fields: [
                defineField({
                  name: 'maxHeight',
                  title: 'Max Dropdown Height',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Small (200px)', value: 'small' },
                      { title: 'Medium (300px)', value: 'medium' },
                      { title: 'Large (400px)', value: 'large' },
                      { title: 'Auto', value: 'auto' },
                    ],
                  },
                  initialValue: 'medium',
                  description: 'Maximum height of the dropdown menu.',
                }),
                defineField({
                  name: 'showSearch',
                  title: 'Show Search in Dropdown',
                  type: 'boolean',
                  initialValue: false,
                  description: 'Add search functionality within the dropdown.',
                }),
                defineField({
                  name: 'closeOnSelect',
                  title: 'Close on Select',
                  type: 'boolean',
                  initialValue: true,
                  description: 'Close dropdown when an option is selected.',
                }),
                defineField({
                  name: 'showSelectedCount',
                  title: 'Show Selected Count',
                  type: 'boolean',
                  initialValue: false,
                  description: 'Show number of selected items for multi-select.',
                }),
              ],
              hidden: ({ parent }) => !['sort-dropdown', 'filter-dropdown', 'multi-select'].includes(parent?.itemType),
              description: 'Dropdown behavior settings.',
            }),

            defineField({
              name: 'isVisible',
              title: 'Visible by Default',
              type: 'boolean',
              initialValue: true,
              description: 'Whether this item is visible in the toolbar.',
            }),

            defineField({
              name: 'sortOrder',
              title: 'Sort Order',
              type: 'number',
              description: 'Order of this item in the toolbar (lower numbers appear first).',
            }),

            defineField({
              name: 'responsiveBehavior',
              title: 'Mobile Behavior',
              type: 'string',
              options: {
                list: [
                  { title: 'Always Visible', value: 'visible' },
                  { title: 'Hide on Mobile', value: 'hidden' },
                  { title: 'Move to Overflow Menu', value: 'overflow' },
                  { title: 'Collapse to Icon Only', value: 'icon-only' },
                ],
              },
              initialValue: 'visible',
              description: 'How this item behaves on mobile devices.',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              type: 'itemType',
              isVisible: 'isVisible',
              sortOrder: 'sortOrder',
            },
            prepare(selection) {
              const { title, type, isVisible, sortOrder } = selection;
              const typeEmoji = {
                'sort-dropdown': '🔄',
                'filter-dropdown': '🔍',
                'view-toggle': '👁️',
                'action-button': '🔘',
                'multi-select': '☑️',
                'range-selector': '📊',
              };

              return {
                title: title || 'Unnamed Item',
                subtitle: `${isVisible ? '👁️' : '👁️‍🗨️'} ${type} ${sortOrder ? `(#${sortOrder})` : ''}`,
                media: (typeEmoji as any)[type] || '🔘',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(8),
      description: 'Items to display in the results toolbar.',
    }),

    defineField({
      name: 'toolbarLayout',
      title: 'Toolbar Layout',
      type: 'object',
      fields: [
        defineField({
          name: 'alignment',
          title: 'Toolbar Alignment',
          type: 'string',
          options: {
            list: [
              { title: 'Left Aligned', value: 'left' },
              { title: 'Center Aligned', value: 'center' },
              { title: 'Right Aligned', value: 'right' },
              { title: 'Space Between', value: 'space-between' },
              { title: 'Space Around', value: 'space-around' },
            ],
          },
          initialValue: 'left',
          description: 'Horizontal alignment of toolbar items.',
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
          description: 'Spacing between toolbar items.',
        }),

        defineField({
          name: 'wrapItems',
          title: 'Wrap Items on Small Screens',
          type: 'boolean',
          initialValue: true,
          description: 'Allow toolbar items to wrap to multiple lines on small screens.',
        }),

        defineField({
          name: 'showDividers',
          title: 'Show Dividers',
          type: 'boolean',
          initialValue: false,
          description: 'Show dividers between toolbar items.',
        }),
      ],
      description: 'Layout and spacing configuration for the toolbar.',
    }),

    defineField({
      name: 'toolbarStyle',
      title: 'Toolbar Style',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'Transparent', value: 'transparent' },
              { title: 'White', value: 'white' },
              { title: 'Light Gray', value: 'light-gray' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'transparent',
          description: 'Background color of the toolbar.',
        }),

        defineField({
          name: 'customBackgroundColor',
          title: 'Custom Background Color',
          type: 'string',
          description: 'Hex color code for custom background',
          hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
        }),

        defineField({
          name: 'itemStyle',
          title: 'Item Style',
          type: 'object',
          fields: [
            defineField({
              name: 'buttonShape',
              title: 'Button Shape',
              type: 'string',
              options: {
                list: [
                  { title: 'Rounded Pills', value: 'pill' },
                  { title: 'Rounded Rectangles', value: 'rounded' },
                  { title: 'Sharp Rectangles', value: 'sharp' },
                ],
              },
              initialValue: 'pill',
              description: 'Shape of toolbar buttons.',
            }),

            defineField({
              name: 'buttonSize',
              title: 'Button Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: 'small' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Large', value: 'large' },
                ],
              },
              initialValue: 'medium',
              description: 'Size of toolbar buttons.',
            }),

            defineField({
              name: 'inactiveButtonColor',
              title: 'Inactive Button Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Light Gray', value: 'light-gray' },
                  { title: 'White', value: 'white' },
                  { title: 'Transparent', value: 'transparent' },
                  { title: 'Custom', value: 'custom' },
                ],
              },
              initialValue: 'light-gray',
              description: 'Color of inactive toolbar buttons.',
            }),

            defineField({
              name: 'customInactiveColor',
              title: 'Custom Inactive Color',
              type: 'string',
              description: 'Hex color code for custom inactive button color',
              hidden: ({ parent }) => parent?.inactiveButtonColor !== 'custom',
            }),

            defineField({
              name: 'activeButtonColor',
              title: 'Active Button Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Brand Color', value: 'brand' },
                  { title: 'Blue', value: 'blue' },
                  { title: 'Light Blue', value: 'light-blue' },
                  { title: 'Green', value: 'green' },
                  { title: 'Custom', value: 'custom' },
                ],
              },
              initialValue: 'light-blue',
              description: 'Color of active/selected toolbar buttons.',
            }),

            defineField({
              name: 'customActiveColor',
              title: 'Custom Active Color',
              type: 'string',
              description: 'Hex color code for custom active button color',
              hidden: ({ parent }) => parent?.activeButtonColor !== 'custom',
            }),

            defineField({
              name: 'textColor',
              title: 'Button Text Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark Gray', value: 'dark-gray' },
                  { title: 'Black', value: 'black' },
                  { title: 'White', value: 'white' },
                  { title: 'Brand Color', value: 'brand' },
                  { title: 'Custom', value: 'custom' },
                ],
              },
              initialValue: 'dark-gray',
              description: 'Text color for toolbar buttons.',
            }),

            defineField({
              name: 'customTextColor',
              title: 'Custom Text Color',
              type: 'string',
              description: 'Hex color code for custom text color',
              hidden: ({ parent }) => parent?.textColor !== 'custom',
            }),
          ],
          description: 'Visual styling for toolbar items.',
        }),

        defineField({
          name: 'dropdownStyle',
          title: 'Dropdown Style',
          type: 'object',
          fields: [
            defineField({
              name: 'dropdownBackground',
              title: 'Dropdown Background',
              type: 'string',
              options: {
                list: [
                  { title: 'White', value: 'white' },
                  { title: 'Light Gray', value: 'light-gray' },
                  { title: 'Custom', value: 'custom' },
                ],
              },
              initialValue: 'white',
              description: 'Background color of dropdown menus.',
            }),

            defineField({
              name: 'customDropdownBackground',
              title: 'Custom Dropdown Background',
              type: 'string',
              description: 'Hex color code for custom dropdown background',
              hidden: ({ parent }) => parent?.dropdownBackground !== 'custom',
            }),

            defineField({
              name: 'dropdownShadow',
              title: 'Dropdown Shadow',
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
              description: 'Drop shadow for dropdown menus.',
            }),

            defineField({
              name: 'dropdownBorderRadius',
              title: 'Dropdown Border Radius',
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
              description: 'Corner rounding of dropdown menus.',
            }),
          ],
          description: 'Styling for dropdown menus.',
        }),

        defineField({
          name: 'toolbarPadding',
          title: 'Toolbar Padding',
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
          description: 'Padding around the entire toolbar.',
        }),
      ],
      description: 'Visual styling options for the toolbar.',
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
              { title: 'Horizontal Scroll', value: 'scroll' },
              { title: 'Vertical Stack', value: 'stack' },
              { title: 'Collapsible Menu', value: 'collapsible' },
              { title: 'Bottom Sheet', value: 'bottom-sheet' },
            ],
          },
          initialValue: 'scroll',
          description: 'How toolbar is displayed on mobile devices.',
        }),

        defineField({
          name: 'tabletLayout',
          title: 'Tablet Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Same as Desktop', value: 'desktop' },
              { title: 'Same as Mobile', value: 'mobile' },
              { title: 'Wrap Items', value: 'wrap' },
            ],
          },
          initialValue: 'wrap',
          description: 'How toolbar is displayed on tablet devices.',
        }),

        defineField({
          name: 'maxVisibleMobile',
          title: 'Max Visible Items on Mobile',
          type: 'number',
          initialValue: 3,
          validation: (Rule) => Rule.min(2).max(6),
          description: 'Maximum number of toolbar items visible on mobile before overflow.',
        }),
      ],
      description: 'Responsive behavior settings.',
    }),

    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'trackToolbarUsage',
          title: 'Track Toolbar Usage',
          type: 'boolean',
          initialValue: true,
          description: 'Track which toolbar items are most used.',
        }),

        defineField({
          name: 'trackSortPreferences',
          title: 'Track Sort Preferences',
          type: 'boolean',
          initialValue: true,
          description: 'Track user sorting preferences.',
        }),

        defineField({
          name: 'trackViewToggles',
          title: 'Track View Toggles',
          type: 'boolean',
          initialValue: true,
          description: 'Track usage of view toggle buttons.',
        }),
      ],
      description: 'Analytics and tracking configuration.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this results toolbar configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      itemsCount: 'toolbarItems',
      alignment: 'toolbarLayout.alignment',
    },
    prepare(selection) {
      const { title, isActive, itemsCount, alignment } = selection;
      const count = Array.isArray(itemsCount) ? itemsCount.length : 0;

      return {
        title: title || 'Results Toolbar Configuration',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${count} items (${alignment || 'left'} aligned)`,
        media: '🛠️',
      };
    },
  },
});