import { defineType, defineField } from "sanity"

export const featuresSection = defineType({
  name: "featuresSection",
  title: "Features Section",
  type: "document",
  initialValue: {
    isActive: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Features Configuration Title",
      type: "string",
      initialValue: "Product Features Section",
      description: "Internal title for this features configuration.",
    }),

    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this features section is currently active.",
    }),

    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      initialValue: "Features",
      description: "Title displayed above the features list.",
    }),

    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          name: "feature",
          title: "Feature",
          fields: [
            defineField({
              name: "title",
              title: "Feature Title",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Short title for the feature.",
            }),

            defineField({
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 2,
              description: "Detailed description of the feature.",
            }),

            defineField({
              name: "category",
              title: "Feature Category",
              type: "string",
              options: {
                list: [
                  { title: "Performance", value: "performance" },
                  { title: "Design", value: "design" },
                  { title: "Functionality", value: "functionality" },
                  { title: "Quality", value: "quality" },
                  { title: "Convenience", value: "convenience" },
                  { title: "Safety", value: "safety" },
                  { title: "Other", value: "other" },
                ],
              },
              initialValue: "functionality",
              description: "Category for grouping features.",
            }),

            defineField({
              name: "priority",
              title: "Priority Level",
              type: "string",
              options: {
                list: [
                  { title: "High", value: "high" },
                  { title: "Medium", value: "medium" },
                  { title: "Low", value: "low" },
                ],
              },
              initialValue: "medium",
              description: "Priority level for this feature.",
            }),

            defineField({
              name: "showIcon",
              title: "Show Icon",
              type: "boolean",
              initialValue: true,
              description: "Display an icon with this feature.",
            }),

            defineField({
              name: "iconType",
              title: "Icon Type",
              type: "string",
              options: {
                list: [
                  { title: "Checkmark", value: "checkmark" },
                  { title: "Star", value: "star" },
                  { title: "Shield", value: "shield" },
                  { title: "Lightning", value: "lightning" },
                  { title: "Heart", value: "heart" },
                  { title: "Thumbs Up", value: "thumbs-up" },
                  { title: "Custom", value: "custom" },
                ],
              },
              initialValue: "checkmark",
              hidden: ({ parent }) => !parent?.showIcon,
              description: "Type of icon to display.",
            }),

            defineField({
              name: "customIcon",
              title: "Custom Icon",
              type: "string",
              hidden: ({ parent }) => parent?.iconType !== "custom" || !parent?.showIcon,
              description: "Custom icon name or SVG.",
            }),

            defineField({
              name: "iconColor",
              title: "Icon Color",
              type: "string",
              options: {
                list: [
                  { title: "Primary", value: "primary" },
                  { title: "Success", value: "success" },
                  { title: "Warning", value: "warning" },
                  { title: "Info", value: "info" },
                  { title: "Custom", value: "custom" },
                ],
              },
              initialValue: "success",
              hidden: ({ parent }) => !parent?.showIcon,
              description: "Color of the feature icon.",
            }),

            defineField({
              name: "customIconColor",
              title: "Custom Icon Color",
              type: "string",
              description: "Hex color code for custom icon color",
              hidden: ({ parent }) => parent?.iconColor !== "custom" || !parent?.showIcon,
            }),

            defineField({
              name: "sortOrder",
              title: "Display Order",
              type: "number",
              description: "Order in which this feature appears.",
            }),

            defineField({
              name: "isHighlighted",
              title: "Highlight Feature",
              type: "boolean",
              initialValue: false,
              description: "Highlight this feature as especially important.",
            }),
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
              category: "category",
              priority: "priority",
              isHighlighted: "isHighlighted",
            },
            prepare(selection) {
              const { title, description, category, priority, isHighlighted } = selection
              return {
                title: title || "Untitled Feature",
                subtitle: `${category} - ${priority} priority ${isHighlighted ? "⭐ Highlighted" : ""}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
      description: "List of product features.",
    }),

    defineField({
      name: "displaySettings",
      title: "Display Settings",
      type: "object",
      fields: [
        defineField({
          name: "layout",
          title: "Layout Style",
          type: "string",
          options: {
            list: [
              { title: "Single Column List", value: "list-1col" },
              { title: "Two Column List", value: "list-2col" },
              { title: "Grid Layout", value: "grid" },
              { title: "Horizontal Cards", value: "cards" },
            ],
          },
          initialValue: "list-2col",
          description: "How features are displayed.",
        }),

        defineField({
          name: "gridColumns",
          title: "Grid Columns",
          type: "number",
          options: {
            list: [
              { title: "2 Columns", value: 2 },
              { title: "3 Columns", value: 3 },
              { title: "4 Columns", value: 4 },
            ],
          },
          initialValue: 2,
          hidden: ({ parent }) => parent?.layout !== "grid",
          description: "Number of columns in grid layout.",
        }),

        defineField({
          name: "groupByCategory",
          title: "Group by Category",
          type: "boolean",
          initialValue: false,
          description: "Group features by their category.",
        }),

        defineField({
          name: "showCategoryHeaders",
          title: "Show Category Headers",
          type: "boolean",
          initialValue: true,
          hidden: ({ parent }) => !parent?.groupByCategory,
          description: "Display category headers when grouping.",
        }),

        defineField({
          name: "sortBy",
          title: "Sort Features By",
          type: "string",
          options: {
            list: [
              { title: "Custom Order", value: "custom" },
              { title: "Priority (High to Low)", value: "priority-desc" },
              { title: "Priority (Low to High)", value: "priority-asc" },
              { title: "Alphabetical", value: "alphabetical" },
              { title: "Category", value: "category" },
            ],
          },
          initialValue: "custom",
          description: "How to sort the features list.",
        }),

        defineField({
          name: "showDescriptions",
          title: "Show Descriptions",
          type: "boolean",
          initialValue: true,
          description: "Display feature descriptions.",
        }),

        defineField({
          name: "compactMode",
          title: "Compact Mode",
          type: "boolean",
          initialValue: false,
          description: "Use smaller spacing for more compact display.",
        }),
      ],
      description: "Visual display configuration.",
    }),

    defineField({
      name: "styling",
      title: "Styling",
      type: "object",
      fields: [
        defineField({
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          options: {
            list: [
              { title: "White", value: "white" },
              { title: "Light Gray", value: "light-gray" },
              { title: "Transparent", value: "transparent" },
              { title: "Custom", value: "custom" },
            ],
          },
          initialValue: "transparent",
          description: "Background color of the features section.",
        }),

        defineField({
          name: "customBackgroundColor",
          title: "Custom Background Color",
          type: "string",
          description: "Hex color code for custom background",
          hidden: ({ parent }) => parent?.backgroundColor !== "custom",
        }),

        defineField({
          name: "borderRadius",
          title: "Border Radius",
          type: "string",
          options: {
            list: [
              { title: "None", value: "none" },
              { title: "Small", value: "small" },
              { title: "Medium", value: "medium" },
              { title: "Large", value: "large" },
            ],
          },
          initialValue: "none",
          description: "Corner rounding for the features section.",
        }),

        defineField({
          name: "padding",
          title: "Section Padding",
          type: "string",
          options: {
            list: [
              { title: "Small", value: "small" },
              { title: "Medium", value: "medium" },
              { title: "Large", value: "large" },
            ],
          },
          initialValue: "medium",
          description: "Padding inside the features section.",
        }),

        defineField({
          name: "featureSpacing",
          title: "Feature Spacing",
          type: "string",
          options: {
            list: [
              { title: "Tight", value: "tight" },
              { title: "Normal", value: "normal" },
              { title: "Relaxed", value: "relaxed" },
            ],
          },
          initialValue: "normal",
          description: "Spacing between individual features.",
        }),
      ],
      description: "Visual styling options.",
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: new Date().toISOString(),
      description: "When this features configuration was published.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      isActive: "isActive",
      sectionTitle: "sectionTitle",
      featuresCount: "features",
      layout: "displaySettings.layout",
    },
    prepare(selection) {
      const { title, isActive, sectionTitle, featuresCount, layout } = selection
      const count = Array.isArray(featuresCount) ? featuresCount.length : 0

      return {
        title: title || "Features Configuration",
        subtitle: `${isActive ? "✅ Active" : "❌ Inactive"} - ${count} features (${layout || "list-2col"})`,
        media: "✨",
      }
    },
  },
})
