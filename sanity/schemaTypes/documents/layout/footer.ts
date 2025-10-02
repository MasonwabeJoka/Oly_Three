import { defineType, defineField } from 'sanity';

export const footerSection = defineType({
  name: 'footerSection',
  title: 'Footer Section',
  type: 'document',
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Footer Configuration Title',
      type: 'string',
      initialValue: 'Main Footer',
      description: 'Internal title for this footer configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this footer is currently displayed on the website.',
    }),

    defineField({
      name: 'brandSection',
      title: 'Brand Section',
      type: 'object',
      fields: [
        defineField({
          name: 'showBrand',
          title: 'Show Brand Section',
          type: 'boolean',
          initialValue: true,
          description: 'Display the brand/logo section in the footer.',
        }),

        defineField({
          name: 'logo',
          title: 'Footer Logo',
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
          hidden: ({ parent }) => !parent?.showBrand,
          description: 'Logo to display in the footer (can be different from header logo).',
        }),

        defineField({
          name: 'brandName',
          title: 'Brand Name',
          type: 'string',
          initialValue: 'Oly',
          hidden: ({ parent }) => !parent?.showBrand,
          description: 'Brand name text (if no logo or alongside logo).',
        }),

        defineField({
          name: 'tagline',
          title: 'Brand Tagline',
          type: 'string',
          initialValue: 'South Africa\'s modern marketplace',
          hidden: ({ parent }) => !parent?.showBrand,
          description: 'Short tagline or slogan below the brand.',
        }),

        defineField({
          name: 'description',
          title: 'Brand Description',
          type: 'text',
          rows: 3,
          hidden: ({ parent }) => !parent?.showBrand,
          description: 'Longer description of your platform/service.',
        }),
      ],
      description: 'Brand/logo section configuration.',
    }),

    defineField({
      name: 'linkColumns',
      title: 'Link Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'linkColumn',
          title: 'Link Column',
          fields: [
            defineField({
              name: 'columnTitle',
              title: 'Column Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Heading for this column of links.',
            }),

            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'footerLink',
                  title: 'Footer Link',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Link Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'url',
                      title: 'Link URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'openInNewTab',
                      title: 'Open in New Tab',
                      type: 'boolean',
                      initialValue: false,
                    }),
                    defineField({
                      name: 'isHighlighted',
                      title: 'Highlight Link',
                      type: 'boolean',
                      initialValue: false,
                      description: 'Make this link stand out (different color/style).',
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
              validation: (Rule) => Rule.min(1).max(10),
              description: 'Links to display in this column.',
            }),

            defineField({
              name: 'sortOrder',
              title: 'Column Order',
              type: 'number',
              description: 'Order of this column (lower numbers appear first).',
            }),
          ],
          preview: {
            select: {
              title: 'columnTitle',
              linksCount: 'links',
            },
            prepare(selection) {
              const { title, linksCount } = selection;
              const count = Array.isArray(linksCount) ? linksCount.length : 0;
              return {
                title: title || 'Unnamed Column',
                subtitle: `${count} links`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
      description: 'Columns of navigation links (e.g., About, Support, Legal, etc.).',
    }),

    defineField({
      name: 'contactInformation',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'showContact',
          title: 'Show Contact Section',
          type: 'boolean',
          initialValue: true,
          description: 'Display contact information in the footer.',
        }),

        defineField({
          name: 'sectionTitle',
          title: 'Contact Section Title',
          type: 'string',
          initialValue: 'Contact Us',
          hidden: ({ parent }) => !parent?.showContact,
        }),

        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.email(),
          hidden: ({ parent }) => !parent?.showContact,
        }),

        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          hidden: ({ parent }) => !parent?.showContact,
        }),

        defineField({
          name: 'address',
          title: 'Physical Address',
          type: 'text',
          rows: 3,
          hidden: ({ parent }) => !parent?.showContact,
        }),

        defineField({
          name: 'businessHours',
          title: 'Business Hours',
          type: 'text',
          rows: 2,
          hidden: ({ parent }) => !parent?.showContact,
          description: 'Operating hours or availability information.',
        }),
      ],
      description: 'Contact information section.',
    }),

    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'showSocialMedia',
          title: 'Show Social Media Links',
          type: 'boolean',
          initialValue: true,
          description: 'Display social media icons/links in the footer.',
        }),

        defineField({
          name: 'sectionTitle',
          title: 'Social Media Section Title',
          type: 'string',
          initialValue: 'Follow Us',
          hidden: ({ parent }) => !parent?.showSocialMedia,
        }),

        defineField({
          name: 'socialLinks',
          title: 'Social Media Links',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'socialLink',
              title: 'Social Media Link',
              fields: [
                defineField({
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Facebook', value: 'facebook' },
                      { title: 'Twitter/X', value: 'twitter' },
                      { title: 'Instagram', value: 'instagram' },
                      { title: 'LinkedIn', value: 'linkedin' },
                      { title: 'YouTube', value: 'youtube' },
                      { title: 'TikTok', value: 'tiktok' },
                      { title: 'WhatsApp', value: 'whatsapp' },
                      { title: 'Telegram', value: 'telegram' },
                      { title: 'Other', value: 'other' },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'customPlatformName',
                  title: 'Custom Platform Name',
                  type: 'string',
                  hidden: ({ parent }) => parent?.platform !== 'other',
                }),
                defineField({
                  name: 'url',
                  title: 'Profile URL',
                  type: 'url',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'customIcon',
                  title: 'Custom Icon',
                  type: 'image',
                  options: {
                    metadata: ['blurhash', 'lqip'],
                  },
                  hidden: ({ parent }) => parent?.platform !== 'other',
                  description: 'Custom icon for non-standard platforms.',
                }),
              ],
              preview: {
                select: {
                  title: 'platform',
                  customName: 'customPlatformName',
                  subtitle: 'url',
                },
                prepare(selection) {
                  const { title, customName, subtitle } = selection;
                  return {
                    title: customName || title || 'Social Link',
                    subtitle: subtitle,
                  };
                },
              },
            },
          ],
          hidden: ({ parent }) => !parent?.showSocialMedia,
          validation: (Rule) => Rule.max(8),
          description: 'Social media platform links.',
        }),
      ],
      description: 'Social media links section.',
    }),

    defineField({
      name: 'newsletter',
      title: 'Newsletter Signup',
      type: 'object',
      fields: [
        defineField({
          name: 'showNewsletter',
          title: 'Show Newsletter Signup',
          type: 'boolean',
          initialValue: false,
          description: 'Display newsletter signup form in the footer.',
        }),

        defineField({
          name: 'title',
          title: 'Newsletter Title',
          type: 'string',
          initialValue: 'Stay Updated',
          hidden: ({ parent }) => !parent?.showNewsletter,
        }),

        defineField({
          name: 'description',
          title: 'Newsletter Description',
          type: 'text',
          rows: 2,
          initialValue: 'Get the latest listings and updates delivered to your inbox.',
          hidden: ({ parent }) => !parent?.showNewsletter,
        }),

        defineField({
          name: 'placeholderText',
          title: 'Email Placeholder Text',
          type: 'string',
          initialValue: 'Enter your email address',
          hidden: ({ parent }) => !parent?.showNewsletter,
        }),

        defineField({
          name: 'buttonText',
          title: 'Subscribe Button Text',
          type: 'string',
          initialValue: 'Subscribe',
          hidden: ({ parent }) => !parent?.showNewsletter,
        }),

        defineField({
          name: 'privacyText',
          title: 'Privacy Notice',
          type: 'string',
          initialValue: 'We respect your privacy. Unsubscribe at any time.',
          hidden: ({ parent }) => !parent?.showNewsletter,
        }),
      ],
      description: 'Newsletter signup section.',
    }),

    defineField({
      name: 'appDownload',
      title: 'App Download',
      type: 'object',
      fields: [
        defineField({
          name: 'showAppDownload',
          title: 'Show App Download Section',
          type: 'boolean',
          initialValue: false,
          description: 'Display mobile app download links.',
        }),

        defineField({
          name: 'title',
          title: 'App Download Title',
          type: 'string',
          initialValue: 'Download Our App',
          hidden: ({ parent }) => !parent?.showAppDownload,
        }),

        defineField({
          name: 'description',
          title: 'App Download Description',
          type: 'string',
          initialValue: 'Get the best experience on mobile',
          hidden: ({ parent }) => !parent?.showAppDownload,
        }),

        defineField({
          name: 'appStoreUrl',
          title: 'App Store URL',
          type: 'url',
          hidden: ({ parent }) => !parent?.showAppDownload,
        }),

        defineField({
          name: 'playStoreUrl',
          title: 'Google Play Store URL',
          type: 'url',
          hidden: ({ parent }) => !parent?.showAppDownload,
        }),
      ],
      description: 'Mobile app download section.',
    }),

    defineField({
      name: 'bottomBar',
      title: 'Bottom Bar',
      type: 'object',
      fields: [
        defineField({
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2024 Oly. All rights reserved.',
          description: 'Copyright notice text.',
        }),

        defineField({
          name: 'legalLinks',
          title: 'Legal Links',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'legalLink',
              title: 'Legal Link',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Link Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'Link URL',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
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
          validation: (Rule) => Rule.max(5),
          description: 'Legal links (Privacy Policy, Terms of Service, etc.).',
        }),

        defineField({
          name: 'additionalText',
          title: 'Additional Text',
          type: 'string',
          description: 'Additional text to display in the bottom bar.',
        }),

        defineField({
          name: 'showBackToTop',
          title: 'Show Back to Top Button',
          type: 'boolean',
          initialValue: true,
          description: 'Display a "Back to Top" button.',
        }),
      ],
      description: 'Bottom bar with copyright and legal links.',
    }),

    defineField({
      name: 'footerStyle',
      title: 'Footer Style',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'Dark Gray', value: 'dark-gray' },
              { title: 'Black', value: 'black' },
              { title: 'White', value: 'white' },
              { title: 'Light Gray', value: 'light-gray' },
              { title: 'Brand Color', value: 'brand' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'dark-gray',
          description: 'Background color for the footer.',
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
              { title: 'White', value: 'white' },
              { title: 'Light Gray', value: 'light-gray' },
              { title: 'Dark Gray', value: 'dark-gray' },
              { title: 'Black', value: 'black' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'white',
          description: 'Text color for footer content.',
        }),

        defineField({
          name: 'customTextColor',
          title: 'Custom Text Color',
          type: 'string',
          description: 'Hex color code for custom text color',
          hidden: ({ parent }) => parent?.textColor !== 'custom',
        }),

        defineField({
          name: 'linkColor',
          title: 'Link Color',
          type: 'string',
          options: {
            list: [
              { title: 'Light Blue', value: 'light-blue' },
              { title: 'White', value: 'white' },
              { title: 'Light Gray', value: 'light-gray' },
              { title: 'Brand Color', value: 'brand' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'light-blue',
          description: 'Color for footer links.',
        }),

        defineField({
          name: 'customLinkColor',
          title: 'Custom Link Color',
          type: 'string',
          description: 'Hex color code for custom link color',
          hidden: ({ parent }) => parent?.linkColor !== 'custom',
        }),

        defineField({
          name: 'layout',
          title: 'Footer Layout',
          type: 'string',
          options: {
            list: [
              { title: '4 Columns', value: '4-column' },
              { title: '3 Columns', value: '3-column' },
              { title: '2 Columns', value: '2-column' },
              { title: 'Stacked', value: 'stacked' },
              { title: 'Centered', value: 'centered' },
            ],
          },
          initialValue: '4-column',
          description: 'Overall layout structure for the footer.',
        }),

        defineField({
        name: 'feedbackButton',
        title: 'Feedback Button',
        type: 'object',
        fields: [
            defineField({
            name: 'showFeedbackButton',
            title: 'Show Feedback Button',
            type: 'boolean',
            initialValue: true,
            description: 'Display the prominent feedback button in the footer.',
            }),

            defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            initialValue: 'Please give us your feedback',
            description: 'Text displayed on the feedback button.',
            hidden: ({ parent }) => !parent?.showFeedbackButton,
            validation: (Rule) => Rule.custom((value, context) => {
                const parent = context.parent as any;
                if (parent?.showFeedbackButton && !value) {
                return 'Button text is required when feedback button is enabled';
                }
                return true;
            }),
            }),

            defineField({
            name: 'buttonUrl',
            title: 'Button URL',
            type: 'string',
            initialValue: '/feedback',
            description: 'URL the feedback button links to.',
            hidden: ({ parent }) => !parent?.showFeedbackButton,
            validation: (Rule) => Rule.custom((value, context) => {
                const parent = context.parent as any;
                if (parent?.showFeedbackButton && !value) {
                return 'Button URL is required when feedback button is enabled';
                }
                return true;
            }),
            }),  
        ],
        description: 'Configuration for the prominent feedback button in the footer.',
        }),

                defineField({
                name: 'padding',
                title: 'Footer Padding',
                type: 'string',
                options: {
                    list: [
                    { title: 'Small', value: 'small' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Large', value: 'large' },
                    ],
                },
                initialValue: 'medium',
                description: 'Padding around footer content.',
                }),

                defineField({
                name: 'borderTop',
                title: 'Top Border',
                type: 'boolean',
                initialValue: false,
                description: 'Add a border at the top of the footer.',
                }),
            ],
            description: 'Visual styling options for the footer.',
            }),

    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'includeInSitemap',
          title: 'Include Footer Links in Sitemap',
          type: 'boolean',
          initialValue: true,
          description: 'Whether footer links should be included in the XML sitemap.',
        }),

        defineField({
          name: 'noFollowExternalLinks',
          title: 'No-Follow External Links',
          type: 'boolean',
          initialValue: true,
          description: 'Add rel="nofollow" to external links in the footer.',
        }),
      ],
      description: 'SEO-related settings for the footer.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this footer configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      columnsCount: 'linkColumns',
    },
    prepare(selection) {
      const { title, isActive, columnsCount } = selection;
      const count = Array.isArray(columnsCount) ? columnsCount.length : 0;
      
      return {
        title: title || 'Footer Configuration',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${count} link columns`,
        media: '🦶',
      };
    },
  },
});