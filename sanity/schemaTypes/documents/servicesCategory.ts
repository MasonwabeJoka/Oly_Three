import { defineField, defineType } from "sanity"

export const servicesCategory = defineType({
  name: "servicesCategory",
  title: "Services Category",
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
        'The complete hierarchical path (e.g., "Services/Home/Plumbing")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "servicesCategory" }],
      description: "Parent category in the services hierarchy",
    }),
    defineField({
      name: "subcategories",
      title: "Subcategories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "servicesCategory" }] }],
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
      description: "Whether this is a top-level services category",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short description shown in category listings",
    }),
    defineField({
      name: "icon",
      title: "Category Icon",
      type: "image",
      options: { hotspot: true },
      description: "Small icon representing the service category",
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

    // Service-specific configuration fields
    defineField({
      name: "serviceTypes",
      title: "Service Types",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "One-time", value: "one_time" },
          { title: "Recurring", value: "recurring" },
          { title: "On-demand", value: "on_demand" },
          { title: "Subscription", value: "subscription" },
        ],
      },
      description: "Types of service offerings in this category",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "pricingModels",
      title: "Pricing Models",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Fixed Price", value: "fixed" },
          { title: "Hourly Rate", value: "hourly" },
          { title: "Per Project", value: "per_project" },
          { title: "Per Day", value: "per_day" },
        ],
      },
      description: "Common pricing models to show for listings",
    }),
    defineField({
      name: "hourlyRateRange",
      title: "Hourly Rate Range",
      type: "object",
      fields: [
        defineField({
          name: "min",
          title: "Min Hourly Rate",
          type: "number",
        }),
        defineField({
          name: "max",
          title: "Max Hourly Rate",
          type: "number",
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
      ],
      description: "Suggested hourly pricing bounds for this category",
    }),
    defineField({
      name: "packages",
      title: "Predefined Packages",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Package Title",
              type: "string",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "number",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "duration",
              title: "Estimated Duration (hours)",
              type: "number",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "price",
            },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle ? `${subtitle}` : "" }
            },
          },
        },
      ],
      description: "Suggested packages to offer for services",
    }),
    defineField({
      name: "bookingRequired",
      title: "Booking Required",
      type: "boolean",
      initialValue: false,
      description: "Whether bookings/appointments are typical for this service",
    }),
    defineField({
      name: "durationOptions",
      title: "Duration Options",
      type: "array",
      of: [{ type: "string" }],
      description: "Common durations (e.g., 30min, 1hr, 2hr)",
    }),
    defineField({
      name: "skills",
      title: "Common Skills",
      type: "array",
      of: [{ type: "string" }],
      description: "Skills to suggest when creating a service listing",
    }),
    defineField({
      name: "certifications",
      title: "Common Certifications",
      type: "array",
      of: [{ type: "string" }],
      description: "Certifications to suggest for providers (e.g., licensed)",
    }),
    defineField({
      name: "areasServed",
      title: "Areas Served",
      type: "array",
      of: [{ type: "string" }],
      description: "Geographic areas or neighborhoods typically served",
    }),
    defineField({
      name: "responseTime",
      title: "Typical Response Time",
      type: "string",
      description: "Suggested response time shown to users (e.g., '24h')",
    }),

    // Filters for UI
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
          name: "rating",
          title: "Provider Rating Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "availability",
          title: "Availability / Booking Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "distance",
          title: "Distance / Location Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "certification",
          title: "Certification Filter",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "remote",
          title: "Remote / On-site Filter",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),

    defineField({
      name: "listingHints",
      title: "Listing Hints / Tips",
      type: "text",
      rows: 3,
      description:
        "Guidance shown to users when creating a service listing in this category",
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

    // Analytics & management
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