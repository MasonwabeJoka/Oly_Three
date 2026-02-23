import { defineType, defineField } from "sanity"

export const sortOptions = defineType({
  name: "sortOptions",
  title: "Sort Options Configuration",
  type: "document", // Can be 'document' if you want to manage multiple sort configs, or 'object' if always embedded
  fields: [
    defineField({
      name: "title",
      title: "Configuration Title",
      type: "string",
      initialValue: "Default Sort Options",
      description: "Internal title for this sort options configuration.",
    }),
    defineField({
      name: "defaultSortOption",
      title: "Default Sort Option",
      type: "string",
      options: {
        list: [
          { title: "Newest First", value: "newest" },
          { title: "Oldest First", value: "oldest" },
          { title: "Most Popular", value: "popular" },
          { title: "Alphabetical A-Z", value: "alphabetical-asc" },
          { title: "Alphabetical Z-A", value: "alphabetical-desc" },
          { title: "Reading Time (Short to Long)", value: "reading-time-asc" },
          { title: "Reading Time (Long to Short)", value: "reading-time-desc" },
        ],
      },
      initialValue: "newest",
      description: "The default sorting option when the page loads.",
    }),
    defineField({
      name: "availableSortOptions",
      title: "Available Sort Options",
      type: "array",
      of: [
        defineField({
          name: "sortOption",
          title: "Sort Option",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Display Label",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Text displayed in the dropdown for this option.",
            }),
            defineField({
              name: "value",
              title: "Sort Value",
              type: "string",
              options: {
                list: [
                  { title: "Newest First", value: "newest" },
                  { title: "Oldest First", value: "oldest" },
                  { title: "Most Popular", value: "popular" },
                  { title: "Alphabetical A-Z", value: "alphabetical-asc" },
                  { title: "Alphabetical Z-A", value: "alphabetical-desc" },
                  { title: "Reading Time (Short to Long)", value: "reading-time-asc" },
                  { title: "Reading Time (Long to Short)", value: "reading-time-desc" },
                ],
              },
              validation: (Rule) => Rule.required(),
              description: "The sorting criteria for this option.",
            }),
            defineField({
              name: "isEnabled",
              title: "Enable This Option",
              type: "boolean",
              initialValue: true,
              description: "Whether this sort option is available to users.",
            }),
          ],
          preview: {
            select: {
              label: "label",
              value: "value",
              isEnabled: "isEnabled",
            },
            prepare(selection) {
              const { label, value, isEnabled } = selection
              return {
                title: label || "Untitled Sort Option",
                subtitle: `${value} ${isEnabled ? "(Enabled)" : "(Disabled)"}`,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
      description: "List of sorting options available in the dropdown.",
    }),
    defineField({
      name: "showSortDropdown",
      title: "Show Sort Dropdown",
      type: "boolean",
      initialValue: true,
      description: "Display the sort dropdown on the articles page.",
    }),
    defineField({
      name: "dropdownLabel",
      title: "Dropdown Label",
      type: "string",
      initialValue: "Sort Articles",
      hidden: ({ parent }) => !parent?.showSortDropdown,
      description: "Label text for the sort dropdown.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      defaultSort: "defaultSortOption",
      showDropdown: "showSortDropdown",
      availableOptions: "availableSortOptions",
    },
    prepare(selection) {
      const { title, defaultSort, showDropdown, availableOptions } = selection
      const optionsCount = availableOptions ? availableOptions.length : 0
      return {
        title: title || "Sort Options Configuration",
        subtitle: `${showDropdown ? "Enabled" : "Disabled"} | Default: ${defaultSort} | ${optionsCount} options`,
      }
    },
  },
})
