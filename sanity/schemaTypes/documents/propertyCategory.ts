import { defineField, defineType } from "sanity"

export const propertyCategory = defineType({
  name: "propertyCategory",
  title: "Property Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "path",
      title: "Full Path",
      type: "string",
      description:
        'The complete hierarchical path (e.g., "Real Estate/Residential/Apartments")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "propertyCategory" }],
      description: "Parent category in the property hierarchy",
    }),
    defineField({
      name: "subcategories",
      title: "Subcategories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "propertyCategory" }] }],
      description: "Direct child categories (auto populated)",
      readOnly: true,
    }),
    defineField({
      name: "level",
      title: "Hierarchy Level",
      type: "number",
      description: "Depth level in the hierarchy (0 for top-level)",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "isRoot",
      title: "Is Root Category",
      type: "boolean",
      description: "Whether this is a top-level property category",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short description used in category listings",
    }),
    defineField({
      name: "icon",
      title: "Category Icon",
      type: "image",
      options: { hotspot: true },
      description: "Small icon representing the property category",
    }),
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      options: { hotspot: true },
      description: "Hero image for category pages",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this category is visible to users",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Category",
      type: "boolean",
      initialValue: false,
      description: "Feature this category on the homepage or promos",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Numeric sort order among siblings",
    }),

    // Property-specific configuration fields
    defineField({
      name: "listingTypes",
      title: "Allowed Listing Types",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "For Sale", value: "sale" },
          { title: "For Rent", value: "rent" },
          { title: "Short Term", value: "short_term" },
          { title: "Wanted", value: "wanted" },
        ],
      },
      description:
        "Which listing types are allowed for this category (sale, rent, etc.)",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "propertyTypes",
      title: "Property Types",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Apartment / Flat", value: "apartment" },
          { title: "House / Villa", value: "house" },
          { title: "Studio", value: "studio" },
          { title: "Plot / Land", value: "land" },
          { title: "Commercial", value: "commercial" },
          { title: "Garage / Parking", value: "parking" },
        ],
      },
      description: "Sub-types relevant to this category",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "defaultFields",
      title: "Default Listing Fields",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Field Key",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "type",
              title: "Field Type",
              type: "string",
              options: {
                list: [
                  { title: "Text", value: "text" },
                  { title: "Number", value: "number" },
                  { title: "Boolean", value: "boolean" },
                  { title: "Select", value: "select" },
                  { title: "Date", value: "date" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "required",
              title: "Required",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "options",
              title: "Options",
              type: "array",
              of: [{ type: "string" }],
              description: "Options for select fields",
              hidden: ({ parent }) => parent?.type !== "select",
            }),
          ],
          preview: {
            select: {
              label: "label",
              type: "type",
              required: "required",
            },
            prepare({ label, type, required }) {
              return {
                title: label,
                subtitle: `${type}${required ? " (required)" : ""}`,
              }
            },
          },
        },
      ],
      description:
        "Pre-defined listing fields that appear for listings in this category",
    }),

    // Common property filter attributes to show on category pages / filters
    defineField({
      name: "filters",
      title: "Search / Filter Options",
      type: "object",
      fields: [
        defineField({
          name: "price",
          title: "Price Filter Enabled",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "bedrooms",
          title: "Bedrooms Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "bathrooms",
          title: "Bathrooms Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "area",
          title: "Area Filter (sqm)",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "furnished",
          title: "Furnished Filter",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "parking",
          title: "Parking Filter",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "amenities",
          title: "Amenities Filter",
          type: "boolean",
          initialValue: true,
        }),
      ],
    }),

    // Listing suggestions / hints for users creating listings
    defineField({
      name: "listingHints",
      title: "Listing Hints / Tips",
      type: "text",
      rows: 3,
      description:
        "Guidance shown to users when creating a listing in this category",
    }),

    defineField({
      name: "amenities",
      title: "Common Amenities",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Typical amenities to suggest for listings (e.g., pool, elevator)",
    }),

    // Category-level constraints & defaults
    defineField({
      name: "minPrice",
      title: "Minimum Allowed Price",
      type: "number",
      description: "Optional minimum price validation for listings in this cat",
    }),
    defineField({
      name: "maxPrice",
      title: "Maximum Allowed Price",
      type: "number",
      description: "Optional maximum price validation for listings in this cat",
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      options: {
        list: [
          { title: "USD", value: "USD" },
          { title: "EUR", value: "EUR" },
          { title: "Local", value: "LOCAL" },
        ],
      },
      initialValue: "LOCAL",
    }),
    defineField({
      name: "availabilityOptions",
      title: "Availability Options",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Immediate", value: "immediate" },
          { title: "Within 1 Month", value: "1_month" },
          { title: "Within 3 Months", value: "3_months" },
        ],
      },
      description: "Suggested availability choices for listings",
    }),

    // Analytics & management fields
    defineField({
      name: "itemCount",
      title: "Item Count",
      type: "number",
      description: "Number of active listings in this category (auto-calculated)",
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: "lastIndexedAt",
      title: "Last Indexed At",
      type: "datetime",
      description: "When this category was last indexed for search",
      readOnly: true,
    }),

    // SEO block
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      path: "path",
      level: "level",
      isActive: "isActive",
      isFeatured: "isFeatured",
      media: "icon",
      image: "image",
    },
    prepare(selection) {
      const { title, path, level, isActive, isFeatured, media, image } =
        selection
      const indent = "  ".repeat(level || 0)
      const status = !isActive ? " (Inactive)" : isFeatured ? " ⭐" : ""
      return {
        title: `${indent}${title}${status}`,
        subtitle: path,
        media: media || image,
      }
    },
  },

  orderings: [
    {
      title: "Hierarchy Order",
      name: "hierarchyOrder",
      by: [
        { field: "level", direction: "asc" },
        { field: "order", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
})