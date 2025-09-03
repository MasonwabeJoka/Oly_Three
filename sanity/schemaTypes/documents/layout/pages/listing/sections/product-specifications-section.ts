import { defineType, defineField } from "sanity"

export const productSpecificationsSection = defineType({
  name: "productSpecificationsSection",
  title: "Product Specifications Section",
  type: "document",
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Specifications Configuration Title",
      type: "string",
      initialValue: "Product Specifications Section",
      description: "Internal title for this specifications configuration.",
    }),

    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this specifications section is currently active.",
    }),

    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      initialValue: "Product Specifications",
      description: "Title displayed above the specifications.",
    }),

    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          name: "specification",
          title: "Specification",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: 'Specification label (e.g., "Brand", "Color", "Size").',
            }),

            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: 'Specification value (e.g., "Apple", "Red", "Large").',
            }),

            defineField({
              name: "sortOrder",
              title: "Display Order",
              type: "number",
              description: "Order in which this specification appears.",
            }),

            defineField({
              name: "showIcon",
              title: "Show Icon",
              type: "boolean",
              initialValue: false,
              description: "Display an icon next to this specification.",
            }),

            defineField({
              name: "iconName",
              title: "Icon Name",
              type: "string",
              hidden: ({ parent }) => !parent?.showIcon,
              description: "Name of the icon to display.",
            }),
          ],
          preview: {
            select: {
              label: "label",
              value: "value",
              category: "category",
              isHighlighted: "isHighlighted",
            },
            prepare(selection) {
              const { label, value, category, isHighlighted } = selection
              return {
                title: `${label}: ${value}`,
                subtitle: `${category} ${isHighlighted ? "⭐ Highlighted" : ""}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
      description: "List of product specifications.",
    }),



 


    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: new Date().toISOString(),
      description: "When this specifications configuration was published.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      isActive: "isActive",
      sectionTitle: "sectionTitle",
      specsCount: "specifications",
      layout: "displaySettings.layout",
    },
    prepare(selection) {
      const { title, isActive, sectionTitle, specsCount, layout } = selection
      const count = Array.isArray(specsCount) ? specsCount.length : 0

      return {
        title: title || "Specifications Configuration",
        subtitle: `${isActive ? "✅ Active" : "❌ Inactive"} - ${count} specs (${layout || "table-2col"})`,
        media: "📋",
      }
    },
  },
})
