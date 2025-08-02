import { defineType, defineField } from 'sanity';

export const olyHomepage = defineType({
  name: 'olyHomepage',
  title: 'Oly Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Homepage Configuration Title',
      type: 'string',
      initialValue: 'Main Homepage Configuration',
      description: 'Internal title for this homepage configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: false,
      description: 'Whether this homepage configuration is currently active.',
    }),

    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable Hero Section',
          type: 'boolean',
          initialValue: false,
          description: 'Display the hero section on the homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Hero Section',
          description: 'Display title for this section.',
        }),
        defineField({
          name: 'reference',
          title: 'Hero Section Reference',
          type: 'reference',
          to: [{ type: 'heroSection' }],
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Reference to the hero section configuration.',
        }),
        defineField({
          name: 'sortOrder',
          title: 'Display Order',
          type: 'number',
          initialValue: 1,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the homepage.',
        }),
      ],
      description: 'Hero section configuration and reference.',
    }),

    defineField({
      name: 'moreFromOlySection',
      title: 'More from Oly Section',
      type: 'object',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable More from Oly Section',
          type: 'boolean',
          initialValue: false,
          description: 'Display the More from Oly section on the homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'More from Oly',
          description: 'Display title for this section.',
        }),
        defineField({
          name: 'reference',
          title: 'More from Oly Section Reference',
          type: 'reference',
          to: [{ type: 'moreFromOlySection' }],
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Reference to the More from Oly section configuration.',
        }),
        defineField({
          name: 'sortOrder',
          title: 'Display Order',
          type: 'number',
          initialValue: 2,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the homepage.',
        }),
      ],
      description: 'More from Oly section configuration and reference.',
    }),

    defineField({
      name: 'featuredServicesSection',
      title: 'Featured Services Section',
      type: 'object',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable Featured Services Section',
          type: 'boolean',
          initialValue: false,
          description: 'Display the Featured Services section on the homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Featured Services',
          description: 'Display title for this section.',
        }),
        defineField({
          name: 'reference',
          title: 'Featured Services Section Reference',
          type: 'reference',
          to: [{ type: 'featuredServicesSection' }],
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Reference to the Featured Services section configuration.',
        }),
        defineField({
          name: 'sortOrder',
          title: 'Display Order',
          type: 'number',
          initialValue: 3,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the homepage.',
        }),
      ],
      description: 'Featured Services section configuration and reference.',
    }),

    defineField({
      name: 'featuredCategoriesSection',
      title: 'Featured Categories Section',
      type: 'object',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable Featured Categories Section',
          type: 'boolean',
          initialValue: false,
          description: 'Display the Featured Categories section on the homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Featured Categories',
          description: 'Display title for this section.',
        }),
        defineField({
          name: 'reference',
          title: 'Featured Categories Section Reference',
          type: 'reference',
          to: [{ type: 'featuredCategoriesSection' }],
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Reference to the Featured Categories section configuration.',
        }),
        defineField({
          name: 'sortOrder',
          title: 'Display Order',
          type: 'number',
          initialValue: 4,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the homepage.',
        }),
      ],
      description: 'Featured Categories section configuration and reference.',
    }),

    defineField({
      name: 'featuredListingsSection',
      title: 'Featured Listings Section',
      type: 'object',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable Featured Listings Section',
          type: 'boolean',
          initialValue: false,
          description: 'Display the Featured Listings section on the homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Featured Listings',
          description: 'Display title for this section.',
        }),
        defineField({
          name: 'reference',
          title: 'Featured Listings Section Reference',
          type: 'reference',
          to: [{ type: 'featuredListingsSection' }],
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Reference to the Featured Listings section configuration.',
        }),
        defineField({
          name: 'sortOrder',
          title: 'Display Order',
          type: 'number',
          initialValue: 5,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the homepage.',
        }),
      ],
      description: 'Featured Listings section configuration and reference.',
    }),

    defineField({
      name: 'adSection',
      title: 'Ad Section',
      type: 'object',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable Ad Section',
          type: 'boolean',
          initialValue: false,
          description: 'Display the Ad section on the homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Advertisement',
          description: 'Display title for this section.',
        }),
        defineField({
          name: 'reference',
          title: 'Ad Section Reference',
          type: 'reference',
          to: [{ type: 'adSection' }],
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Reference to the Ad section configuration.',
        }),
        defineField({
          name: 'sortOrder',
          title: 'Display Order',
          type: 'number',
          initialValue: 6,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the homepage.',
        }),
      ],
      description: 'Ad section configuration and reference.',
    }),

    defineField({
      name: 'topAdSection',
      title: 'Top Ad Section',
      type: 'object',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable Top Ad Section',
          type: 'boolean',
          initialValue: false,
          description: 'Display the Top Ad section on the homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Top Advertisement',
          description: 'Display title for this section.',
        }),
        defineField({
          name: 'reference',
          title: 'Top Ad Section Reference',
          type: 'reference',
          to: [{ type: 'topAdSection' }],
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Reference to the Top Ad section configuration.',
        }),
        defineField({
          name: 'sortOrder',
          title: 'Display Order',
          type: 'number',
          initialValue: 0,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the homepage.',
        }),
      ],
      description: 'Top Ad section configuration and reference.',
    }),

    defineField({
      name: 'bottomAdSection',
      title: 'Bottom Ad Section',
      type: 'object',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable Bottom Ad Section',
          type: 'boolean',
          initialValue: false,
          description: 'Display the Bottom Ad section on the homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Bottom Advertisement',
          description: 'Display title for this section.',
        }),
        defineField({
          name: 'reference',
          title: 'Bottom Ad Section Reference',
          type: 'reference',
          to: [{ type: 'bottomAdSection' }],
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Reference to the Bottom Ad section configuration.',
        }),
        defineField({
          name: 'sortOrder',
          title: 'Display Order',
          type: 'number',
          initialValue: 7,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the homepage.',
        }),
      ],
      description: 'Bottom Ad section configuration and reference.',
    }),

    defineField({
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
          description: 'SEO title for the homepage (max 60 characters).',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
          description: 'SEO description for the homepage (max 160 characters).',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
          description: 'SEO keywords for the homepage.',
        }),
      ],
      description: 'SEO settings for the homepage.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this homepage configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      heroEnabled: 'heroSection.isEnabled',
      moreFromOlyEnabled: 'moreFromOlySection.isEnabled',
      featuredServicesEnabled: 'featuredServicesSection.isEnabled',
      featuredCategoriesEnabled: 'featuredCategoriesSection.isEnabled',
      featuredListingsEnabled: 'featuredListingsSection.isEnabled',
    },
    prepare(selection) {
      const { 
        title, 
        isActive, 
        heroEnabled, 
        moreFromOlyEnabled, 
        featuredServicesEnabled, 
        featuredCategoriesEnabled, 
        featuredListingsEnabled 
      } = selection;
      
      const enabledSections = [
        heroEnabled,
        moreFromOlyEnabled,
        featuredServicesEnabled,
        featuredCategoriesEnabled,
        featuredListingsEnabled,
      ].filter(Boolean).length;
      
      return {
        title: title || "Homepage Configuration",
        subtitle: `${isActive ? "Active" : "Inactive"} - ${enabledSections} sections enabled`,
      };
    },
  },
});