import { defineType, defineField } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  initialValue: {
    isActive: true,
    showBrandNewBadge: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Hero Section',
      description: 'Internal title for this hero section configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this hero section is currently active on the homepage.',
    }),

    defineField({
      name: 'showBrandNewBadge',
      title: 'Show Brand New Badge',
      type: 'boolean',
      initialValue: true,
      description: 'Display the "BRAND NEW" badge in the top left corner.',
    }),

    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      initialValue: 'BRAND NEW',
      description: 'Text to display in the badge (if badge is enabled).',
      hidden: ({ document }) => !document?.showBrandNewBadge,
    }),

    defineField({
      name: 'badgeColor',
      title: 'Badge Color',
      type: 'string',
      options: {
        list: [
          { title: 'Cyan', value: 'cyan' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Red', value: 'red' },
          { title: 'Purple', value: 'purple' },
        ],
      },
      initialValue: 'cyan',
      description: 'Color theme for the badge.',
      hidden: ({ document }) => !document?.showBrandNewBadge,
    }),

    defineField({
      name: 'mainHeading',
      title: 'Main Heading',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: "Welcome to South Africa's hub for buying and selling. Oly is a modern marketplace. The future of classifieds.",
            },
          ],
        },
      ],
      description: 'The main heading text for the hero section.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      description: 'Optional subheading text below the main heading.',
      rows: 3,
    }),

    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Post Your Listing',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'string',
          initialValue: '/post-listing',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary (Red/Orange)', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
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
      description: 'Primary call-to-action button configuration.',
    }),

    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'See All Categories',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'string',
          initialValue: '/categories',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'style',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary (Light)', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
            ],
          },
          initialValue: 'secondary',
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false,
        }),
      ],
      description: 'Secondary button configuration.',
    }),

    defineField({
      name: 'searchConfiguration',
      title: 'Search Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'showSearch',
          title: 'Show Search Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'searchPlaceholder',
          title: 'Search Placeholder',
          type: 'string',
          initialValue: 'What are you looking for?',
          hidden: ({ parent }) => !parent?.showSearch,
        }),
        defineField({
          name: 'locationPlaceholder',
          title: 'Location Placeholder',
          type: 'string',
          initialValue: 'Search by city, province, town...',
          hidden: ({ parent }) => !parent?.showSearch,
        }),
        defineField({
          name: 'searchButtonText',
          title: 'Search Button Text',
          type: 'string',
          initialValue: 'Search',
          hidden: ({ parent }) => !parent?.showSearch,
        }),
      ],
      description: 'Configuration for the search functionality in the hero section.',
    }),

    defineField({
      name: 'backgroundStyle',
      title: 'Background Style',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'Light Gray', value: 'light-gray' },
              { title: 'Light Blue', value: 'light-blue' },
              { title: 'White', value: 'white' },
              { title: 'Custom', value: 'custom' },
            ],
          },
          initialValue: 'light-gray',
        }),
        defineField({
          name: 'customBackgroundColor',
          title: 'Custom Background Color',
          type: 'string',
          description: 'Hex color code (e.g., #f0f0f0)',
          hidden: ({ parent }) => parent?.backgroundColor !== 'custom',
        }),
        defineField({
          name: 'showCircularElement',
          title: 'Show Circular Design Element',
          type: 'boolean',
          initialValue: true,
          description: 'Display the decorative circular element in the background.',
        }),
        defineField({
          name: 'circularElementColor',
          title: 'Circular Element Color',
          type: 'string',
          options: {
            list: [
              { title: 'Light Blue', value: 'light-blue' },
              { title: 'Light Green', value: 'light-green' },
              { title: 'Light Purple', value: 'light-purple' },
              { title: 'Light Yellow', value: 'light-yellow' },
            ],
          },
          initialValue: 'light-blue',
          hidden: ({ parent }) => !parent?.showCircularElement,
        }),
      ],
      description: 'Background styling options for the hero section.',
    }),

    defineField({
      name: 'layout',
      title: 'Layout Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'textAlignment',
          title: 'Text Alignment',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'left',
        }),
        defineField({
          name: 'contentLayout',
          title: 'Content Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Split (Text Left, Search Right)', value: 'split' },
              { title: 'Centered', value: 'centered' },
              { title: 'Full Width', value: 'full-width' },
            ],
          },
          initialValue: 'split',
        }),
      ],
      description: 'Layout and alignment options for the hero content.',
    }),

    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title for the homepage.',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'SEO description for the homepage.',
          validation: (Rule) => Rule.max(160),
          rows: 3,
        }),
      ],
      description: 'SEO metadata for the homepage hero section.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this hero configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      mainHeading: 'mainHeading',
    },
    prepare(selection) {
      const { title, isActive, mainHeading } = selection;
      const headingText = mainHeading?.[0]?.children?.[0]?.text || 'No heading';
      
      return {
        title: title || 'Hero Section',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${headingText.substring(0, 50)}...`,
        // media: isActive ? '🏠' : '📝',
      };
    },
  },
});