import { defineType, defineField } from 'sanity';

export const featuredServicesSection = defineType({
  name: 'featuredServicesSection',
  title: 'Featured Services Section',
  type: 'document',
  initialValue: {
    isActive: true,
    displayOrder: 3,
    title: 'Featured Services',
    showSectionTitle: false,
    services: [],
    publishedAt: () => new Date().toISOString(),
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Featured Services',
      description: 'The main heading for this section (can be hidden if not needed).',
    }),

    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this section is currently displayed on the homepage.',
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 3,
      description: 'Order in which this section appears on the homepage (lower numbers appear first).',
    }),

    defineField({
      name: 'showSectionTitle',
      title: 'Show Section Title',
      type: 'boolean',
      initialValue: false,
      description: 'Whether to display the section title above the slider.',
    }),

    defineField({
      name: 'services',
      title: 'Featured Services',
      type: 'array',
      initialValue: [],
      of: [
        { type: 'reference', to: [{ type: 'featuredService' }] },
      ],
      validation: (Rule) => Rule.min(1).max(4).warning('Consider limiting to 3-4 services for optimal user experience'),
      description: 'The services to feature in the slider.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'When this section configuration was published.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      servicesCount: 'services',
    },
    prepare(selection) {
      const { title, isActive, servicesCount } = selection;
      const count = Array.isArray(servicesCount) ? servicesCount.length : 0;

      return {
        title: title || 'Featured Services Section',
        subtitle: `${isActive ? 'Active' : 'Inactive'} - ${count} services configured`,
        media: 'Featured', 
      };
    },
  },
});