import { defineType, defineField } from 'sanity';

export const searchSection = defineType({
  name: 'searchSection',
  title: 'Search Section',
  type: 'document',
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Search Section Configuration Title',
      type: 'string',
      initialValue: 'Listings Search Section',
      description: 'Internal title for this search section configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this search section is currently active.',
    }),

    defineField({
      name: 'resultsHeader',
      title: 'Results Header',
      type: 'object',
      fields: [
        defineField({
          name: 'showResultsHeader',
          title: 'Show Results Header',
          type: 'boolean',
          initialValue: true,
          description: 'Display the "Showing results for..." header.',
        }),

        defineField({
          name: 'headerTemplate',
          title: 'Header Text Template',
          type: 'string',
          initialValue: 'Showing results for {searchTerm} in {location}',
          hidden: ({ parent }) => !parent?.showResultsHeader,
          description: 'Template for results header. Use {searchTerm}, {location}, {category} as placeholders.',
        }),

        defineField({
          name: 'showCloseButton',
          title: 'Show Close Button',
          type: 'boolean',
          initialValue: true,
          hidden: ({ parent }) => !parent?.showResultsHeader,
          description: 'Display X button to close/clear search.',
        }),

        defineField({
          name: 'closeButtonAction',
          title: 'Close Button Action',
          type: 'string',
          options: {
            list: [
              { title: 'Clear All Filters', value: 'clear-all' },
              { title: 'Go to Homepage', value: 'go-home' },
              { title: 'Go Back', value: 'go-back' },
              { title: 'Custom URL', value: 'custom-url' },
            ],
          },
          initialValue: 'clear-all',
          hidden: ({ parent }) => !parent?.showResultsHeader || !parent?.showCloseButton,
          description: 'Action when close button is clicked.',
        }),

        defineField({
          name: 'customCloseUrl',
          title: 'Custom Close URL',
          type: 'string',
          hidden: ({ parent }) => !parent?.showResultsHeader || !parent?.showCloseButton || parent?.closeButtonAction !== 'custom-url',
          description: 'URL to navigate to when close button is clicked.',
        }),
      ],
      description: 'Configuration for the search results header.',
    }),

    defineField({
      name: 'categorySelector',
      title: 'Category Selector',
      type: 'object',
      fields: [
        defineField({
          name: 'showCategorySelector',
          title: 'Show Category Selector',
          type: 'boolean',
          initialValue: true,
          description: 'Display the category dropdown selector.',
        }),

        defineField({
          name: 'defaultCategoryText',
          title: 'Default Category Text',
          type: 'string',
          initialValue: 'All Categories',
          hidden: ({ parent }) => !parent?.showCategorySelector,
          description: 'Text shown when no specific category is selected.',
        }),

        defineField({
          name: 'selectorStyle',
          title: 'Selector Style',
          type: 'string',
          options: {
            list: [
              { title: 'Dropdown', value: 'dropdown' },
              { title: 'Button Group', value: 'button-group' },
              { title: 'Tabs', value: 'tabs' },
            ],
          },
          initialValue: 'dropdown',
          hidden: ({ parent }) => !parent?.showCategorySelector,
          description: 'Visual style of the category selector.',
        }),

        defineField({
          name: 'showCategoryIcon',
          title: 'Show Category Icons',
          type: 'boolean',
          initialValue: false,
          hidden: ({ parent }) => !parent?.showCategorySelector,
          description: 'Display icons alongside category names.',
        }),

        defineField({
          name: 'maxVisibleCategories',
          title: 'Max Visible Categories',
          type: 'number',
          initialValue: 10,
          hidden: ({ parent }) => !parent?.showCategorySelector,
          validation: (Rule) => Rule.min(5).max(20),
          description: 'Maximum number of categories to show before scrolling.',
        }),
      ],
      description: 'Category selection dropdown configuration.',
    }),

    defineField({
      name: 'breadcrumbs',
      title: 'Breadcrumbs',
      type: 'object',
      fields: [
        defineField({
          name: 'showBreadcrumbs',
          title: 'Show Breadcrumbs',
          type: 'boolean',
          initialValue: true,
          description: 'Display breadcrumb navigation.',
        }),

        defineField({
          name: 'breadcrumbTypes',
          title: 'Breadcrumb Types',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Category Breadcrumbs', value: 'category' },
                  { title: 'Location Breadcrumbs', value: 'location' },
                ],
              },
            },
          ],
          initialValue: ['category', 'location'],
          hidden: ({ parent }) => !parent?.showBreadcrumbs,
          description: 'Types of breadcrumbs to display.',
        }),

        defineField({
          name: 'breadcrumbSeparator',
          title: 'Breadcrumb Separator',
          type: 'string',
          options: {
            list: [
              { title: 'Arrow (>)', value: '>' },
              { title: 'Slash (/)', value: '/' },
              { title: 'Pipe (|)', value: '|' },
              { title: 'Dot (•)', value: '•' },
            ],
          },
          initialValue: '>',
          hidden: ({ parent }) => !parent?.showBreadcrumbs,
          description: 'Character used to separate breadcrumb items.',
        }),

        defineField({
          name: 'breadcrumbsClickable',
          title: 'Clickable Breadcrumbs',
          type: 'boolean',
          initialValue: true,
          hidden: ({ parent }) => !parent?.showBreadcrumbs,
          description: 'Allow users to click on breadcrumb items to navigate.',
        }),

        defineField({
          name: 'maxBreadcrumbLength',
          title: 'Max Breadcrumb Length',
          type: 'number',
          initialValue: 5,
          hidden: ({ parent }) => !parent?.showBreadcrumbs,
          validation: (Rule) => Rule.min(3).max(10),
          description: 'Maximum number of breadcrumb items to show.',
        }),
      ],
      description: 'Breadcrumb navigation configuration.',
    }),

    defineField({
      name: 'searchFields',
      title: 'Search Fields',
      type: 'object',
      fields: [
        defineField({
          name: 'searchTermField',
          title: 'Search Term Field',
          type: 'object',
          fields: [
            defineField({
              name: 'showSearchTerm',
              title: 'Show Search Term Field',
              type: 'boolean',
              initialValue: true,
              description: 'Display the main search term input field.',
            }),

            defineField({
              name: 'placeholder',
              title: 'Placeholder Text',
              type: 'string',
              initialValue: 'What are you looking for?',
              hidden: ({ parent }) => !parent?.showSearchTerm,
              description: 'Placeholder text for the search term field.',
            }),

            defineField({
              name: 'showClearButton',
              title: 'Show Clear Button',
              type: 'boolean',
              initialValue: true,
              hidden: ({ parent }) => !parent?.showSearchTerm,
              description: 'Display X button to clear the search term.',
            }),

            defineField({
              name: 'autoComplete',
              title: 'Auto Complete',
              type: 'boolean',
              initialValue: true,
              hidden: ({ parent }) => !parent?.showSearchTerm,
              description: 'Enable search suggestions and auto-completion.',
            }),

            defineField({
              name: 'minCharacters',
              title: 'Minimum Characters for Search',
              type: 'number',
              initialValue: 2,
              hidden: ({ parent }) => !parent?.showSearchTerm,
              validation: (Rule) => Rule.min(1).max(5),
              description: 'Minimum characters required before search suggestions appear.',
            }),
          ],
          description: 'Main search term input configuration.',
        }),

        defineField({
          name: 'locationField',
          title: 'Location Field',
          type: 'object',
          fields: [
            defineField({
              name: 'showLocationField',
              title: 'Show Location Field',
              type: 'boolean',
              initialValue: true,
              description: 'Display the location search field.',
            }),

            defineField({
              name: 'placeholder',
              title: 'Placeholder Text',
              type: 'string',
              initialValue: 'Location',
              hidden: ({ parent }) => !parent?.showLocationField,
              description: 'Placeholder text for the location field.',
            }),

            defineField({
              name: 'showClearButton',
              title: 'Show Clear Button',
              type: 'boolean',
              initialValue: true,
              hidden: ({ parent }) => !parent?.showLocationField,
              description: 'Display X button to clear the location.',
            }),

            defineField({
              name: 'locationAutoComplete',
              title: 'Location Auto Complete',
              type: 'boolean',
              initialValue: true,
              hidden: ({ parent }) => !parent?.showLocationField,
              description: 'Enable location suggestions and auto-completion.',
            }),

            defineField({
              name: 'useCurrentLocation',
              title: 'Use Current Location Button',
              type: 'boolean',
              initialValue: true,
              hidden: ({ parent }) => !parent?.showLocationField,
              description: 'Show button to use user\'s current location.',
            }),

            defineField({
              name: 'defaultLocation',
              title: 'Default Location',
              type: 'string',
              initialValue: 'South Africa',
              hidden: ({ parent }) => !parent?.showLocationField,
              description: 'Default location when none is specified.',
            }),
          ],
          description: 'Location search field configuration.',
        }),

        defineField({
          name: 'fieldLayout',
          title: 'Field Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Stacked (Vertical)', value: 'stacked' },
              { title: 'Side by Side', value: 'horizontal' },
              { title: 'Single Combined Field', value: 'combined' },
            ],
          },
          initialValue: 'stacked',
          description: 'Layout arrangement of search fields.',
        }),
      ],
      description: 'Search input fields configuration.',
    }),

    defineField({
      name: 'searchButton',
      title: 'Search Button',
      type: 'object',
      fields: [
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Search',
          description: 'Text displayed on the search button.',
        }),

        defineField({
          name: 'buttonStyle',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary (Filled)', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
              { title: 'Ghost', value: 'ghost' },
            ],
          },
          initialValue: 'primary',
          description: 'Visual style of the search button.',
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
          description: 'Size of the search button.',
        }),

        defineField({
          name: 'fullWidth',
          title: 'Full Width Button',
          type: 'boolean',
          initialValue: true,
          description: 'Make the search button span the full width.',
        }),

        defineField({
          name: 'showIcon',
          title: 'Show Search Icon',
          type: 'boolean',
          initialValue: false,
          description: 'Display a search icon on the button.',
        }),
      ],
      description: 'Search button configuration.',
    }),

    defineField({
      name: 'advancedFilters',
      title: 'Advanced Filters',
      type: 'object',
      fields: [
        defineField({
          name: 'showAdvancedFilters',
          title: 'Show Advanced Filters',
          type: 'boolean',
          initialValue: false,
          description: 'Display advanced filtering options.',
        }),

        defineField({
          name: 'advancedFiltersToggle',
          title: 'Advanced Filters Toggle',
          type: 'string',
          options: {
            list: [
              { title: 'Collapsible Section', value: 'collapsible' },
              { title: 'Modal/Popup', value: 'modal' },
              { title: 'Separate Page', value: 'page' },
            ],
          },
          initialValue: 'collapsible',
          hidden: ({ parent }) => !parent?.showAdvancedFilters,
          description: 'How advanced filters are displayed.',
        }),

        defineField({
          name: 'advancedFiltersText',
          title: 'Advanced Filters Toggle Text',
          type: 'string',
          initialValue: 'Advanced Filters',
          hidden: ({ parent }) => !parent?.showAdvancedFilters,
          description: 'Text for the advanced filters toggle.',
        }),

        defineField({
          name: 'availableFilters',
          title: 'Available Filters',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Price Range', value: 'price-range' },
                  { title: 'Condition', value: 'condition' },
                  { title: 'Date Posted', value: 'date-posted' },
                  { title: 'Seller Type', value: 'seller-type' },
                  { title: 'Distance', value: 'distance' },
                  { title: 'Brand', value: 'brand' },
                  { title: 'Features', value: 'features' },
                ],
              },
            },
          ],
          hidden: ({ parent }) => !parent?.showAdvancedFilters,
          description: 'Types of advanced filters to make available.',
        }),
      ],
      description: 'Advanced filtering options.',
    }),

    defineField({
      name: 'searchStyle',
      title: 'Search Section Style',
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
              { title: 'Brand Color', value: 'brand' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'light-gray',
          description: 'Background color of the search section.',
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
          description: 'Padding around the search section.',
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
          description: 'Corner rounding of input fields and buttons.',
        }),

        defineField({
          name: 'shadow',
          title: 'Section Shadow',
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
          description: 'Drop shadow for the search section.',
        }),
      ],
      description: 'Visual styling options for the search section.',
    }),

    defineField({
      name: 'behavior',
      title: 'Search Behavior',
      type: 'object',
      fields: [
        defineField({
          name: 'searchOnType',
          title: 'Search as User Types',
          type: 'boolean',
          initialValue: false,
          description: 'Perform search automatically as user types (live search).',
        }),

        defineField({
          name: 'searchDelay',
          title: 'Search Delay (ms)',
          type: 'number',
          initialValue: 500,
          hidden: ({ parent }) => !parent?.searchOnType,
          validation: (Rule) => Rule.min(100).max(2000),
          description: 'Delay in milliseconds before performing live search.',
        }),

        defineField({
          name: 'rememberSearch',
          title: 'Remember Search History',
          type: 'boolean',
          initialValue: true,
          description: 'Save user search history for suggestions.',
        }),

        defineField({
          name: 'maxSearchHistory',
          title: 'Max Search History Items',
          type: 'number',
          initialValue: 10,
          hidden: ({ parent }) => !parent?.rememberSearch,
          validation: (Rule) => Rule.min(5).max(20),
          description: 'Maximum number of search history items to store.',
        }),

        defineField({
          name: 'clearFiltersButton',
          title: 'Show Clear All Filters Button',
          type: 'boolean',
          initialValue: true,
          description: 'Display button to clear all search filters.',
        }),
      ],
      description: 'Search functionality and behavior settings.',
    }),

    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'trackSearchQueries',
          title: 'Track Search Queries',
          type: 'boolean',
          initialValue: true,
          description: 'Track what users are searching for.',
        }),

        defineField({
          name: 'trackFilterUsage',
          title: 'Track Filter Usage',
          type: 'boolean',
          initialValue: true,
          description: 'Track which filters are most commonly used.',
        }),

        defineField({
          name: 'trackSearchResults',
          title: 'Track Search Results',
          type: 'boolean',
          initialValue: true,
          description: 'Track search result counts and performance.',
        }),
      ],
      description: 'Analytics and tracking configuration.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this search section configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      showSearchTerm: 'searchFields.searchTermField.showSearchTerm',
      showLocation: 'searchFields.locationField.showLocationField',
    },
    prepare(selection) {
      const { title, isActive, showSearchTerm, showLocation } = selection;
      const fields = [];
      if (showSearchTerm) fields.push('Search Term');
      if (showLocation) fields.push('Location');
      
      return {
        title: title || 'Search Section Configuration',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - Fields: ${fields.join(', ') || 'None'}`,
        media: '🔍',
      };
    },
  },
});