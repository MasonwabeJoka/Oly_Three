import { defineType, defineField } from 'sanity';

export const olyPropertiesHomepage = defineType({
  name: 'olyPropertiesHomepage',
  title: 'Oly Properties Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Properties Homepage Configuration Title',
      type: 'string',
      initialValue: 'Main Properties Homepage Configuration',
      description: 'Internal title for this properties homepage configuration.',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this properties homepage configuration is currently active.',
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
          initialValue: true,
          description: 'Display the hero section on the properties homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Properties Hero Section',
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
          description: 'Order in which this section appears on the properties homepage.',
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
          initialValue: true,
          description: 'Display the More from Oly section on the properties homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'More from Oly Properties',
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
          description: 'Order in which this section appears on the properties homepage.',
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
          initialValue: true,
          description: 'Display the Featured Services section on the properties homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Featured Property Services',
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
          description: 'Order in which this section appears on the properties homepage.',
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
          initialValue: true,
          description: 'Display the Featured Categories section on the properties homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Featured Property Categories',
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
          description: 'Order in which this section appears on the properties homepage.',
        }),
      ],
      description: 'Featured Categories section configuration and reference.',
    }),

    defineField({
      name: 'featuredPropertiesSection',
      title: 'Featured Properties Section',
      type: 'object',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable Featured Properties Section',
          type: 'boolean',
          initialValue: true,
          description: 'Display the Featured Properties section on the properties homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Featured Properties',
          description: 'Display title for this section.',
        }),
        defineField({
          name: 'reference',
          title: 'Featured Properties Section Reference',
          type: 'reference',
          to: [{ type: 'featuredPropertiesSection' }],
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Reference to the Featured Properties section configuration.',
        }),
        defineField({
          name: 'sortOrder',
          title: 'Display Order',
          type: 'number',
          initialValue: 5,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the properties homepage.',
        }),
      ],
      description: 'Featured Properties section configuration and reference.',
    }),

    defineField({
      name: 'calculatorsSection',
      title: 'Calculators Section',
      type: 'object',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable Calculators Section',
          type: 'boolean',
          initialValue: true,
          description: 'Display the Calculators section on the properties homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Property Calculators',
          description: 'Display title for this section.',
        }),
        defineField({
          name: 'reference',
          title: 'Calculators Section Reference',
          type: 'reference',
          to: [{ type: 'calculatorsSection' }],
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Reference to the Calculators section configuration.',
        }),
        defineField({
          name: 'sortOrder',
          title: 'Display Order',
          type: 'number',
          initialValue: 6,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the properties homepage.',
        }),
      ],
      description: 'Calculators section configuration and reference.',
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
          description: 'Display the Ad section on the properties homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Property Advertisement',
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
          initialValue: 7,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the properties homepage.',
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
          description: 'Display the Top Ad section on the properties homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Top Property Advertisement',
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
          description: 'Order in which this section appears on the properties homepage.',
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
          description: 'Display the Bottom Ad section on the properties homepage.',
        }),
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Bottom Property Advertisement',
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
          initialValue: 8,
          hidden: ({ parent }) => !parent?.isEnabled,
          description: 'Order in which this section appears on the properties homepage.',
        }),
      ],
      description: 'Bottom Ad section configuration and reference.',
    }),

    defineField({
      name: 'propertySettings',
      title: 'Property-Specific Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'defaultPropertyType',
          title: 'Default Property Type',
          type: 'string',
          options: {
            list: [
              { title: 'All Properties', value: 'all' },
              { title: 'Residential', value: 'residential' },
              { title: 'Commercial', value: 'commercial' },
              { title: 'Land', value: 'land' },
              { title: 'Rental', value: 'rental' },
            ],
          },
          initialValue: 'all',
          description: 'Default property type filter for the homepage.',
        }),
        defineField({
          name: 'showPriceRanges',
          title: 'Show Price Ranges',
          type: 'boolean',
          initialValue: true,
          description: 'Display price range filters on the properties homepage.',
        }),
        defineField({
          name: 'showLocationFilters',
          title: 'Show Location Filters',
          type: 'boolean',
          initialValue: true,
          description: 'Display location-based filters on the properties homepage.',
        }),
        defineField({
          name: 'enableCalculatorIntegration',
          title: 'Enable Calculator Integration',
          type: 'boolean',
          initialValue: true,
          description: 'Enable integration between property listings and calculators.',
        }),
      ],
      description: 'Settings specific to the properties homepage.',
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
          description: 'SEO title for the properties homepage (max 60 characters).',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
          description: 'SEO description for the properties homepage (max 160 characters).',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
          description: 'SEO keywords for the properties homepage.',
        }),
      ],
      description: 'SEO settings for the properties homepage.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      description: 'When this properties homepage configuration was published.',
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
      featuredPropertiesEnabled: 'featuredPropertiesSection.isEnabled',
      calculatorsEnabled: 'calculatorsSection.isEnabled',
      defaultPropertyType: 'propertySettings.defaultPropertyType',
    },
    prepare(selection) {
      const { 
        title, 
        isActive, 
        heroEnabled, 
        moreFromOlyEnabled, 
        featuredServicesEnabled, 
        featuredCategoriesEnabled, 
        featuredPropertiesEnabled,
        calculatorsEnabled,
        defaultPropertyType 
      } = selection;
      
      const enabledSections = [
        heroEnabled,
        moreFromOlyEnabled,
        featuredServicesEnabled,
        featuredCategoriesEnabled,
        featuredPropertiesEnabled,
        calculatorsEnabled,
      ].filter(Boolean).length;
      
      return {
        title: title || 'Properties Homepage Configuration',
        subtitle: `${isActive ? '✅ Active' : '❌ Inactive'} - ${enabledSections} sections enabled (${defaultPropertyType || 'all'} properties)${calculatorsEnabled ? ' + Calculators' : ''}`,
        media: '🏘️',
      };
    },
  },
});