import { defineType, defineField } from "sanity"

export const categoryNavigation = defineType({
  name: "categoryNavigation",
  title: "Category Navigation",
  type: "document", // Can be 'document' if you want to manage multiple navigation configs, or 'object' if always embedded
  fields: [
    defineField({
      name: "title",
      title: "Navigation Title",
      type: "string",
      initialValue: "Article Categories",
      description: "Internal title for this category navigation configuration.",
    }),
    defineField({
      name: "isEnabled",
      title: "Enable Category Navigation",
      type: "boolean",
      initialValue: true,
      description: "Display the category navigation sidebar.",
    }),
    defineField({
      name: "displayMode",
      title: "Display Mode",
      type: "string",
      options: {
        list: [
          { title: "All Categories", value: "all" },
          { title: "Selected Categories", value: "selected" },
        ],
      },
      initialValue: "all",
      hidden: ({ parent }) => !parent?.isEnabled,
      description: "Choose to display all available categories or a specific selection.",
    }),
    defineField({
      name: "selectedCategories",
      title: "Selected Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "articleCategory" }] }], // Reference to your articleCategory schema
      hidden: ({ parent }) => parent?.displayMode !== "selected" || !parent?.isEnabled,
      description: "Manually select categories to display in the navigation.",
    }),
    defineField({
      name: "showAllButton",
      title: "Show 'All' Button",
      type: "boolean",
      initialValue: true,
      hidden: ({ parent }) => !parent?.isEnabled,
      description: "Include an 'All' button to show all articles regardless of category.",
    }),
    defineField({
      name: "styling",
      title: "Styling Options",
      type: "object",
      fields: [
        defineField({
          name: "buttonStyle",
          title: "Button Style",
          type: "string",
          options: {
            list: [
              { title: "Pill", value: "pill" },
              { title: "Underline", value: "underline" },
              { title: "Box", value: "box" },
            ],
          },
          initialValue: "pill",
          description: "Visual style for category buttons.",
        }),
        defineField({
          name: "activeColor",
          title: "Active State Color",
          type: "string",
          description: "Hex color code for the active category button.",
        }),
      ],
      hidden: ({ parent }) => !parent?.isEnabled,
      description: "Visual styling options for the category navigation.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      isEnabled: "isEnabled",
      displayMode: "displayMode",
      selectedCategories: "selectedCategories",
    },
    prepare(selection) {
      const { title, isEnabled, displayMode, selectedCategories } = selection
      let subtitle = isEnabled ? "Enabled" : "Disabled"
      if (isEnabled) {
        subtitle += ` | Mode: ${displayMode === "all" ? "All" : "Selected"}`
        if (displayMode === "selected" && selectedCategories) {
          subtitle += ` (${selectedCategories.length} categories)`
        }
      }
      return {
        title: title || "Category Navigation",
        subtitle: subtitle,
      }
    },
  },
})
