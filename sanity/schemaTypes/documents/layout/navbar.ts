import { defineType, defineField } from 'sanity';

export const navbarSection = defineType({
  name: 'navbarSection',
  title: 'Navigation Bar',
  type: 'document',
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Navbar Configuration Title',
      type: 'string',
      initialValue: 'Main Navigation',
      description: 'Internal title for this navbar configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this navbar is currently displayed on the website.',
    }),

    defineField({
      name: 'brandSection',
      title: 'Brand Section',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo',
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
          description: 'Logo to display in the navbar.',
        }),

        defineField({
          name: 'brandName',
          title: 'Brand Name',
          type: 'string',
          initialValue: 'Oly',
          description: 'Brand name text (if no logo or alongside logo).',
        }),

        defineField({
          name: 'homeUrl',
          title: 'Home URL',
          type: 'string',
          initialValue: '/',
          description: 'URL when logo/brand is clicked.',
        }),

        defineField({
          name: 'showBrandText',
          title: 'Show Brand Text',
          type: 'boolean',
          initialValue: true,
          description: 'Display brand name alongside or instead of logo.',
        }),
      ],
      description: 'Brand/logo section configuration.',
    }),

    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navigationItem',
          title: 'Navigation Item',
          fields: [
            defineField({
              name: 'type',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Simple Link', value: 'simple' },
                  { title: 'Dropdown Menu', value: 'dropdown' },
                  { title: 'Mega Menu', value: 'mega' },
                  { title: 'Button', value: 'button' },
                ],
              },
              initialValue: 'simple',
              description: 'Type of navigation item.',
            }),

            defineField({
              name: 'text',
              title: 'Link Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Text displayed for this navigation item.',
            }),

            defineField({
              name: 'url',
              title: 'Link URL',
              type: 'string',
              description: 'URL for simple links or main dropdown link.',
              hidden: ({ parent }) => parent?.type === 'mega',
            }),

            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name or class (optional).',
            }),

            defineField({
              name: 'badge',
              title: 'Badge',
              type: 'object',
              fields: [
                defineField({
                  name: 'showBadge',
                  title: 'Show Badge',
                  type: 'boolean',
                  initialValue: false,
                }),
                defineField({
                  name: 'badgeText',
                  title: 'Badge Text',
                  type: 'string',
                  hidden: ({ parent }) => !parent?.showBadge,
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
                      { title: 'Yellow', value: 'yellow' },
                      { title: 'Purple', value: 'purple' },
                    ],
                  },
                  initialValue: 'red',
                  hidden: ({ parent }) => !parent?.showBadge,
                }),
              ],
              description: 'Optional badge/notification indicator.',
            }),

            defineField({
              name: 'dropdownItems',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'dropdownItem',
                  title: 'Dropdown Item',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Item Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'url',
                      title: 'Item URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Item Description',
                      type: 'string',
                      description: 'Optional description for mega menu items.',
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Item Icon',
                      type: 'string',
                    }),
                    defineField({
                      name: 'isHighlighted',
                      title: 'Highlight Item',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'text',
                      subtitle: 'url',
                    },
                  },
                },
              ],
              hidden: ({ parent }) => !['dropdown', 'mega'].includes(parent?.type),
              validation: (Rule) => Rule.max(10),
              description: 'Items to display in dropdown/mega menu.',
            }),

            defineField({
              name: 'megaMenuColumns',
              title: 'Mega Menu Columns',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'megaColumn',
                  title: 'Mega Menu Column',
                  fields: [
                    defineField({
                      name: 'columnTitle',
                      title: 'Column Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'columnItems',
                      title: 'Column Items',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          name: 'megaItem',
                          title: 'Mega Menu Item',
                          fields: [
                            defineField({
                              name: 'text',
                              title: 'Item Text',
                              type: 'string',
                              validation: (Rule) => Rule.required(),
                            }),
                            defineField({
                              name: 'url',
                              title: 'Item URL',
                              type: 'string',
                              validation: (Rule) => Rule.required(),
                            }),
                            defineField({
                              name: 'description',
                              title: 'Item Description',
                              type: 'string',
                            }),
                          ],
                          preview: {
                            select: {
                              title: 'text',
                              subtitle: 'url',
                            },
                          },
                        },
                      ],
                      validation: (Rule) => Rule.max(8),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'columnTitle',
                      itemsCount: 'columnItems',
                    },
                    prepare(selection) {
                      const { title, itemsCount } = selection;
                      const count = Array.isArray(itemsCount) ? itemsCount.length : 0;
                      return {
                        title: title || 'Unnamed Column',
                        subtitle: `${count} items`,
                      };
                    },
                  },
                },
              ],
              hidden: ({ parent }) => parent?.type !== 'mega',
              validation: (Rule) => Rule.max(4),
              description: 'Columns for mega menu layout.',
            }),

            defineField({
              name: 'buttonStyle',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                  { title: 'Ghost', value: 'ghost' },
                ],
              },
              initialValue: 'primary',
              hidden: ({ parent }) => parent?.type !== 'button',
              description: 'Style for button-type navigation items.',
            }),

            defineField({
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: false,
              description: 'Open link in new browser tab.',
            }),

            defineField({
              name: 'requireAuth',
              title: 'Require Authentication',
              type: 'boolean',
              initialValue: false,
              description: 'Only show this item to authenticated users.',
            }),

            defineField({
              name: 'hideOnMobile',
              title: 'Hide on Mobile',
              type: 'boolean',
              initialValue: false,
              description: 'Hide this item on mobile devices.',
            }),

            defineField({
              name: 'sortOrder',
              title: 'Sort Order',
              type: 'number',
              description: 'Order of this item (lower numbers appear first).',
            }),

            defineField({
              name: 'isActive',
              title: 'Is Active',
              type: 'boolean',
              initialValue: true,
              description: 'Whether this navigation item is currently active.',
            }),
          ],
          preview: {
            select: {
              title: 'text',
              type: 'type',
              url: 'url',
              isActive: 'isActive',
            },
            prepare(selection) {
              const { title, type, url, isActive } = selection;
              const typeEmoji = {
                simple: '🔗',
                dropdown: '📋',
                mega: '📊',
                button: '🔘',
              };
              return {
                title: title || 'Unnamed Item',
                subtitle: `${isActive ? '✅' : '❌'} ${type} - ${url || 'No URL'}`,
                media: typeEmoji[type] || '🔗',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(8),
      description: 'Main navigation menu items.',
    }),

    defineField({
      name: 'searchBar',
      title: 'Search Bar',
      type: 'object',
      fields: [
        defineField({
          name: 'showSearchBar',
          title: 'Show Search Bar',
          type: 'boolean',
          initialValue: true,
          description: 'Display search functionality in the navbar.',
        }),

        defineField({
          name: 'searchPlaceholder',
          title: 'Search Placeholder',
          type: 'string',
          initialValue: 'Search listings...',
          hidden: ({ parent }) => !parent?.showSearchBar,
          description: 'Placeholder text in the search input.',
        }),

        defineField({
          name: 'searchAction',
          title: 'Search Action URL',
          type: 'string',
          initialValue: '/search',
          hidden: ({ parent }) => !parent?.showSearchBar,
          description: 'URL to submit search queries to.',
        }),

        defineField({
          name: 'showLocationFilter',
          title: 'Show Location Filter',
          type: 'boolean',
          initialValue: false,
          hidden: ({ parent }) => !parent?.showSearchBar,
          description: 'Include location filtering in search bar.',
        }),

        defineField({
          name: 'showCategoryFilter',
          title: 'Show Category Filter',
          type: 'boolean',
          initialValue: false,
          hidden: ({ parent }) => !parent?.showSearchBar,
          description: 'Include category filtering in search bar.',
        }),

        defineField({
          name: 'searchButtonText',
          title: 'Search Button Text',
          type: 'string',
          initialValue: 'Search',
          hidden: ({ parent }) => !parent?.showSearchBar,
        }),
      ],
      description: 'Search bar configuration.',
    }),

    defineField({
      name: 'userActions',
      title: 'User Actions',
      type: 'object',
      fields: [
        defineField({
          name: 'showUserActions',
          title: 'Show User Actions',
          type: 'boolean',
          initialValue: true,
          description: 'Display user-related actions (login, profile, etc.).',
        }),

        defineField({
          name: 'loginButton',
          title: 'Login Button',
          type: 'object',
          fields: [
            defineField({
              name: 'showLogin',
              title: 'Show Login Button',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'loginText',
              title: 'Login Button Text',
              type: 'string',
              initialValue: 'Sign In',
              hidden: ({ parent }) => !parent?.showLogin,
            }),
            defineField({
              name: 'loginUrl',
              title: 'Login URL',
              type: 'string',
              initialValue: '/login',
              hidden: ({ parent }) => !parent?.showLogin,
            }),
          ],
          hidden: ({ parent }) => !parent?.showUserActions,
        }),

        defineField({
          name: 'registerButton',
          title: 'Register Button',
          type: 'object',
          fields: [
            defineField({
              name: 'showRegister',
              title: 'Show Register Button',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'registerText',
              title: 'Register Button Text',
              type: 'string',
              initialValue: 'Sign Up',
              hidden: ({ parent }) => !parent?.showRegister,
            }),
            defineField({
              name: 'registerUrl',
              title: 'Register URL',
              type: 'string',
              initialValue: '/register',
              hidden: ({ parent }) => !parent?.showRegister,
            }),
          ],
          hidden: ({ parent }) => !parent?.showUserActions,
        }),

        defineField({
          name: 'postAdButton',
          title: 'Post Ad Button',
          type: 'object',
          fields: [
            defineField({
              name: 'showPostAd',
              title: 'Show Post Ad Button',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'postAdText',
              title: 'Post Ad Button Text',
              type: 'string',
              initialValue: 'Post Your Ad',
              hidden: ({ parent }) => !parent?.showPostAd,
            }),
            defineField({
              name: 'postAdUrl',
              title: 'Post Ad URL',
              type: 'string',
              initialValue: '/post-ad',
              hidden: ({ parent }) => !parent?.showPostAd,
            }),
            defineField({
              name: 'buttonStyle',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary (Prominent)', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
              initialValue: 'primary',
              hidden: ({ parent }) => !parent?.showPostAd,
            }),
          ],
          hidden: ({ parent }) => !parent?.showUserActions,
        }),

        defineField({
          name: 'userMenu',
          title: 'Authenticated User Menu',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'userMenuItem',
              title: 'User Menu Item',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Menu Item Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'Menu Item URL',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'icon',
                  title: 'Menu Item Icon',
                  type: 'string',
                }),
              ],
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'url',
                },
              },
            },
          ],
          hidden: ({ parent }) => !parent?.showUserActions,
          validation: (Rule) => Rule.max(8),
          description: 'Menu items shown when user is logged in.',
        }),
      ],
      description: 'User authentication and action buttons.',
    }),

    defineField({
      name: 'mobileMenu',
      title: 'Mobile Menu',
      type: 'object',
      fields: [
        defineField({
          name: 'hamburgerStyle',
          title: 'Hamburger Menu Style',
          type: 'string',
          options: {
            list: [
              { title: 'Standard Lines', value: 'lines' },
              { title: 'Dots', value: 'dots' },
              { title: 'Custom Icon', value: 'custom' },
            ],
          },
          initialValue: 'lines',
          description: 'Style of the mobile menu trigger.',
        }),

        defineField({
          name: 'mobileMenuPosition',
          title: 'Mobile Menu Position',
          type: 'string',
          options: {
            list: [
              { title: 'Slide from Left', value: 'left' },
              { title: 'Slide from Right', value: 'right' },
              { title: 'Full Screen Overlay', value: 'overlay' },
              { title: 'Dropdown', value: 'dropdown' },
            ],
          },
          initialValue: 'right',
          description: 'How the mobile menu appears.',
        }),

        defineField({
          name: 'showSearchInMobile',
          title: 'Show Search in Mobile Menu',
          type: 'boolean',
          initialValue: true,
          description: 'Include search bar in mobile menu.',
        }),
      ],
      description: 'Mobile menu configuration.',
    }),

    defineField({
      name: 'navbarStyle',
      title: 'Navbar Style',
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
              { title: 'Brand Color', value: 'brand' },
              { title: 'Transparent', value: 'transparent' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'white',
          description: 'Background color for the navbar.',
        }),

        defineField({
          name: 'customBackgroundColor',
          title: 'Custom Background Color',
          type: 'string',
          description: 'Hex color code for custom background',
          hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
        }),

        defineField({
          name: 'textColor',
          title: 'Text Color',
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
          initialValue: 'black',
          description: 'Text color for navbar items.',
        }),

        defineField({
          name: 'customTextColor',
          title: 'Custom Text Color',
          type: 'string',
          description: 'Hex color code for custom text color',
          hidden: ({ parent }) => parent?.textColor !== 'custom',
        }),

        defineField({
          name: 'height',
          title: 'Navbar Height',
          type: 'string',
          options: {
            list: [
              { title: 'Compact', value: 'compact' },
              { title: 'Standard', value: 'standard' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'standard',
          description: 'Height of the navigation bar.',
        }),

        defineField({
          name: 'shadow',
          title: 'Navbar Shadow',
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
          description: 'Drop shadow for the navbar.',
        }),

        defineField({
          name: 'borderBottom',
          title: 'Bottom Border',
          type: 'boolean',
          initialValue: false,
          description: 'Add a border at the bottom of the navbar.',
        }),

        defineField({
          name: 'sticky',
          title: 'Sticky Navigation',
          type: 'boolean',
          initialValue: true,
          description: 'Keep navbar visible when scrolling.',
        }),
      ],
      description: 'Visual styling options for the navbar.',
    }),

    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'trackNavClicks',
          title: 'Track Navigation Clicks',
          type: 'boolean',
          initialValue: true,
          description: 'Track clicks on navigation items.',
        }),

        defineField({
          name: 'trackSearchUsage',
          title: 'Track Search Usage',
          type: 'boolean',
          initialValue: true,
          description: 'Track search bar usage and queries.',
        }),

        defineField({
          name: 'trackUserActions',
          title: 'Track User Actions',
          type: 'boolean',
          initialValue: true,
          description: 'Track login, register, and post ad button clicks.',
        }),
      ],
      description: 'Analytics and tracking configuration.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this navbar configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      navItemsCount: 'navigationLinks',
    },
    prepare(selection) {
      const { title, isActive, navItemsCount } = selection;
      const count = Array.isArray(navItemsCount) ? navItemsCount.length : 0;
      
      return {
        title: title || 'Navbar Configuration',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${count} nav items`,
        media: '🧭',
      };
    },
  },
});