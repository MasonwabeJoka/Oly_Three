import { defineType, defineField } from 'sanity';

export const filtersSection = defineType({
  name: 'filtersSection',
  title: 'Filters Section',
  type: 'document',
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Filters Section Configuration Title',
      type: 'string',
      initialValue: 'Listings Filters Section',
      description: 'Internal title for this filters section configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this filters section is currently active.',
    }),

    defineField({
      name: 'filterItems',
      title: 'Filter Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'filterItem',
          title: 'Filter Item',
          fields: [
            defineField({
              name: 'id',
              title: 'Filter ID',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Unique identifier for this filter.',
            }),

            defineField({
              name: 'label',
              title: 'Filter Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Text displayed on the filter button.',
            }),

            defineField({
              name: 'filterType',
              title: 'Filter Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Dropdown Select', value: 'dropdown' },
                  { title: 'Multi-Select', value: 'multi-select' },
                  { title: 'Range Slider', value: 'range' },
                  { title: 'Text Input', value: 'text' },
                  { title: 'Date Range', value: 'date-range' },
                  { title: 'Checkbox List', value: 'checkbox' },
                  { title: 'Radio Buttons', value: 'radio' },
                  { title: 'Toggle Switch', value: 'toggle' },
                ],
              },
              initialValue: 'dropdown',
              description: 'Type of filter interface.',
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
                      title: 'Option Value',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'Internal value for this option.',
                    }),
                    defineField({
                      name: 'label',
                      title: 'Option Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'Display text for this option.',
                    }),
                    defineField({
                      name: 'count',
                      title: 'Result Count',
                      type: 'number',
                      description: 'Number of results for this option (optional).',
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
                      subtitle: 'value',
                      count: 'count',
                    },
                    prepare(selection) {
                      const { title, subtitle, count } = selection;
                      return {
                        title: title || 'Unnamed Option',
                        subtitle: `${subtitle}${count ? ` (${count})` : ''}`,
                      };
                    },
                  },
                },
              ],
              hidden: ({ parent }) => ['range', 'text', 'date-range', 'toggle'].includes(parent?.filterType),
              validation: (Rule) => Rule.max(50),
              description: 'Available options for this filter.',
            }),

            defineField({
              name: 'rangeSettings',
              title: 'Range Settings',
              type: 'object',
              fields: [
                defineField({
                  name: 'minValue',
                  title: 'Minimum Value',
                  type: 'number',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'maxValue',
                  title: 'Maximum Value',
                  type: 'number',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'step',
                  title: 'Step Size',
                  type: 'number',
                  initialValue: 1,
                }),
                defineField({
                  name: 'prefix',
                  title: 'Value Prefix',
                  type: 'string',
                  description: 'Prefix for values (e.g., "$", "R")',
                }),
                defineField({
                  name: 'suffix',
                  title: 'Value Suffix',
                  type: 'string',
                  description: 'Suffix for values (e.g., "km", "years")',
                }),
              ],
              hidden: ({ parent }) => parent?.filterType !== 'range',
              description: 'Settings for range slider filters.',
            }),

            defineField({
              name: 'placeholder',
              title: 'Placeholder Text',
              type: 'string',
              hidden: ({ parent }) => parent?.filterType !== 'text',
              description: 'Placeholder text for text input filters.',
            }),

            defineField({
              name: 'allowMultiple',
              title: 'Allow Multiple Selections',
              type: 'boolean',
              initialValue: false,
              hidden: ({ parent }) => !['dropdown', 'checkbox'].includes(parent?.filterType),
              description: 'Allow users to select multiple options.',
            }),

            defineField({
              name: 'showSearch',
              title: 'Show Search in Dropdown',
              type: 'boolean',
              initialValue: false,
              hidden: ({ parent }) => !['dropdown', 'multi-select'].includes(parent?.filterType),
              description: 'Add search functionality within the dropdown.',
            }),

            defineField({
              name: 'defaultValue',
              title: 'Default Value',
              type: 'string',
              description: 'Default selected value for this filter.',
            }),

            defineField({
              name: 'isRequired',
              title: 'Required Filter',
              type: 'boolean',
              initialValue: false,
              description: 'Whether this filter must have a value selected.',
            }),

            defineField({
              name: 'showCount',
              title: 'Show Result Count',
              type: 'boolean',
              initialValue: false,
              description: 'Display the number of results for each option.',
            }),

            defineField({
              name: 'sortOrder',
              title: 'Sort Order',
              type: 'number',
              description: 'Order of this filter (lower numbers appear first).',
            }),

            defineField({
              name: 'isVisible',
              title: 'Visible by Default',
              type: 'boolean',
              initialValue: true,
              description: 'Whether this filter is visible in the main filter bar.',
            }),

            defineField({
              name: 'responsiveBehavior',
              title: 'Mobile Behavior',
              type: 'string',
              options: {
                list: [
                  { title: 'Always Visible', value: 'visible' },
                  { title: 'Hide on Mobile', value: 'hidden' },
                  { title: 'Move to More Filters', value: 'more-filters' },
                ],
              },
              initialValue: 'visible',
              description: 'How this filter behaves on mobile devices.',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              type: 'filterType',
              isVisible: 'isVisible',
              sortOrder: 'sortOrder',
            },
            prepare(selection) {
              const { title, type, isVisible, sortOrder } = selection;
              const typeEmoji = {
                dropdown: '📋',
                'multi-select': '☑️',
                range: '📊',
                text: '📝',
                'date-range': '📅',
                checkbox: '✅',
                radio: '🔘',
                toggle: '🔄',
              };
              
              return {
                title: title || 'Unnamed Filter',
                subtitle: `${isVisible ? '👁️' : '👁️‍🗨️'} ${type} ${sortOrder ? `(#${sortOrder})` : ''}`,
                media: typeEmoji[type] || '🔘',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(15),
      description: 'Individual filter items in the filters section.',
    }),

    defineField({
      name: 'moreFiltersButton',
      title: 'More Filters Button',
      type: 'object',
      fields: [
        defineField({
          name: 'showMoreFilters',
          title: 'Show More Filters Button',
          type: 'boolean',
          initialValue: true,
          description: 'Display a "More Filters" button for additional options.',
        }),

        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'More Filters+',
          hidden: ({ parent }) => !parent?.showMoreFilters,
          description: 'Text displayed on the more filters button.',
        }),

        defineField({
          name: 'buttonStyle',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Highlighted (Different Color)', value: 'highlighted' },
              { title: 'Same as Other Filters', value: 'normal' },
              { title: 'Outline Style', value: 'outline' },
            ],
          },
          initialValue: 'highlighted',
          hidden: ({ parent }) => !parent?.showMoreFilters,
          description: 'Visual style of the more filters button.',
        }),

        defineField({
          name: 'expandBehavior',
          title: 'Expand Behavior',
          type: 'string',
          options: {
            list: [
              { title: 'Expand Inline', value: 'inline' },
              { title: 'Open Modal/Popup', value: 'modal' },
              { title: 'Navigate to Filters Page', value: 'page' },
              { title: 'Slide Down Panel', value: 'panel' },
            ],
          },
          initialValue: 'modal',
          hidden: ({ parent }) => !parent?.showMoreFilters,
          description: 'How additional filters are revealed.',
        }),

        defineField({
          name: 'maxVisibleFilters',
          title: 'Max Visible Filters',
          type: 'number',
          initialValue: 4,
          hidden: ({ parent }) => !parent?.showMoreFilters,
          validation: (Rule) => Rule.min(2).max(8),
          description: 'Maximum number of filters to show before "More Filters" button.',
        }),
      ],
      description: 'Configuration for the "More Filters" functionality.',
    }),

    defineField({
      name: 'filterBehavior',
      title: 'Filter Behavior',
      type: 'object',
      fields: [
        defineField({
          name: 'autoApply',
          title: 'Auto Apply Filters',
          type: 'boolean',
          initialValue: true,
          description: 'Apply filters automatically when changed (vs. requiring Apply button).',
        }),

        defineField({
          name: 'showApplyButton',
          title: 'Show Apply Button',
          type: 'boolean',
          initialValue: false,
          hidden: ({ parent }) => parent?.autoApply,
          description: 'Show an Apply button when auto-apply is disabled.',
        }),

        defineField({
          name: 'showClearAll',
          title: 'Show Clear All Button',
          type: 'boolean',
          initialValue: true,
          description: 'Display a button to clear all active filters.',
        }),

        defineField({
          name: 'clearAllText',
          title: 'Clear All Button Text',
          type: 'string',
          initialValue: 'Clear All',
          hidden: ({ parent }) => !parent?.showClearAll,
          description: 'Text for the clear all filters button.',
        }),

        defineField({
          name: 'showActiveCount',
          title: 'Show Active Filter Count',
          type: 'boolean',
          initialValue: true,
          description: 'Display the number of active filters.',
        }),

        defineField({
          name: 'persistFilters',
          title: 'Persist Filters in URL',
          type: 'boolean',
          initialValue: true,
          description: 'Save filter state in URL for sharing and bookmarking.',
        }),

        defineField({
          name: 'rememberFilters',
          title: 'Remember User Filters',
          type: 'boolean',
          initialValue: false,
          description: 'Remember user filter preferences across sessions.',
        }),
      ],
      description: 'Filter functionality and behavior settings.',
    }),

    defineField({
      name: 'filtersStyle',
      title: 'Filters Style',
      type: 'object',
      fields: [
        defineField({
          name: 'layout',
          title: 'Filter Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Horizontal Row', value: 'horizontal' },
              { title: 'Vertical Stack', value: 'vertical' },
              { title: 'Grid Layout', value: 'grid' },
              { title: 'Wrap to Multiple Rows', value: 'wrap' },
            ],
          },
          initialValue: 'horizontal',
          description: 'Layout arrangement of filter buttons.',
        }),

        defineField({
          name: 'filterSpacing',
          title: 'Filter Spacing',
          type: 'string',
          options: {
            list: [
              { title: 'Compact', value: 'compact' },
              { title: 'Normal', value: 'normal' },
              { title: 'Spacious', value: 'spacious' },
            ],
          },
          initialValue: 'normal',
          description: 'Spacing between filter buttons.',
        }),

        defineField({
          name: 'buttonStyle',
          title: 'Filter Button Style',
          type: 'object',
          fields: [
            defineField({
              name: 'shape',
              title: 'Button Shape',
              type: 'string',
              options: {
                list: [
                  { title: 'Rounded Pills', value: 'pill' },
                  { title: 'Rounded Rectangles', value: 'rounded' },
                  { title: 'Sharp Rectangles', value: 'sharp' },
                  { title: 'Circular', value: 'circle' },
                ],
              },
              initialValue: 'pill',
              description: 'Shape of filter buttons.',
            }),

            defineField({
              name: 'size',
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
              description: 'Size of filter buttons.',
            }),

            defineField({
              name: 'inactiveColor',
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
              description: 'Color of inactive filter buttons.',
            }),

            defineField({
              name: 'customInactiveColor',
              title: 'Custom Inactive Color',
              type: 'string',
              description: 'Hex color code for custom inactive button color',
              hidden: ({ parent }) => parent?.inactiveColor !== 'custom',
            }),

            defineField({
              name: 'activeColor',
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
              description: 'Color of active/selected filter buttons.',
            }),

            defineField({
              name: 'customActiveColor',
              title: 'Custom Active Color',
              type: 'string',
              description: 'Hex color code for custom active button color',
              hidden: ({ parent }) => parent?.activeColor !== 'custom',
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
              description: 'Text color for filter buttons.',
            }),

            defineField({
              name: 'customTextColor',
              title: 'Custom Text Color',
              type: 'string',
              description: 'Hex color code for custom text color',
              hidden: ({ parent }) => parent?.textColor !== 'custom',
            }),
          ],
          description: 'Visual styling for filter buttons.',
        }),

        defineField({
          name: 'sectionBackground',
          title: 'Section Background',
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
          description: 'Background color of the entire filters section.',
        }),

        defineField({
          name: 'customSectionBackground',
          title: 'Custom Section Background',
          type: 'string',
          description: 'Hex color code for custom section background',
          hidden: ({ parent }) => parent?.sectionBackground !== 'custom',
        }),

        defineField({
          name: 'sectionPadding',
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
          description: 'Padding around the filters section.',
        }),
      ],
      description: 'Visual styling options for the filters section.',
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
              { title: 'Collapsible Drawer', value: 'drawer' },
              { title: 'Modal Popup', value: 'modal' },
            ],
          },
          initialValue: 'scroll',
          description: 'How filters are displayed on mobile devices.',
        }),

        defineField({
          name: 'tabletLayout',
          title: 'Tablet Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Same as Desktop', value: 'desktop' },
              { title: 'Same as Mobile', value: 'mobile' },
              { title: 'Wrap to Multiple Rows', value: 'wrap' },
            ],
          },
          initialValue: 'wrap',
          description: 'How filters are displayed on tablet devices.',
        }),

        defineField({
          name: 'hideOnMobile',
          title: 'Filters to Hide on Mobile',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Filter IDs to hide on mobile devices.',
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
          name: 'trackFilterUsage',
          title: 'Track Filter Usage',
          type: 'boolean',
          initialValue: true,
          description: 'Track which filters are most commonly used.',
        }),

        defineField({
          name: 'trackFilterCombinations',
          title: 'Track Filter Combinations',
          type: 'boolean',
          initialValue: true,
          description: 'Track which filter combinations are popular.',
        }),

        defineField({
          name: 'trackClearActions',
          title: 'Track Clear Actions',
          type: 'boolean',
          initialValue: false,
          description: 'Track when users clear filters.',
        }),
      ],
      description: 'Analytics and tracking configuration.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this filters section configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      filtersCount: 'filterItems',
      layout: 'filtersStyle.layout',
    },
    prepare(selection) {
      const { title, isActive, filtersCount, layout } = selection;
      const count = Array.isArray(filtersCount) ? filtersCount.length : 0;
      
      return {
        title: title || 'Filters Section Configuration',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${count} filters (${layout || 'horizontal'})`,
        media: '🔍',
      };
    },
  },
});