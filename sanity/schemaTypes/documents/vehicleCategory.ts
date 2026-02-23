import { defineField, defineType } from "sanity"

export const vehicleCategory = defineType({
  name: "vehicleCategory",
  title: "Vehicle Category",
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
        'The complete hierarchical path (e.g., "Vehicles/Cars/SUVs")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "vehicleCategory" }],
      description: "Parent category in the vehicle hierarchy",
    }),
    defineField({
      name: "subcategories",
      title: "Subcategories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "vehicleCategory" }] }],
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
      description: "Whether this is a top-level vehicle category",
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
      description: "Small icon representing the vehicle category",
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

    // Vehicle-specific configuration fields
    defineField({
      name: "listingTypes",
      title: "Allowed Listing Types",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "For Sale", value: "sale" },
          { title: "For Rent / Lease", value: "rent" },
          { title: "Wanted", value: "wanted" },
        ],
      },
      description: "Allowed listing types for this vehicle category",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "vehicleTypes",
      title: "Vehicle Types",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Car", value: "car" },
          { title: "Motorcycle", value: "motorcycle" },
          { title: "Truck", value: "truck" },
          { title: "SUV", value: "suv" },
          { title: "Van", value: "van" },
          { title: "Bus", value: "bus" },
          { title: "ATV / Offroad", value: "atv" },
        ],
      },
      description: "Sub-types relevant to this category",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "bodyTypes",
      title: "Body Types",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Sedan", value: "sedan" },
          { title: "Hatchback", value: "hatchback" },
          { title: "Coupe", value: "coupe" },
          { title: "Convertible", value: "convertible" },
          { title: "Wagon", value: "wagon" },
          { title: "Pickup", value: "pickup" },
        ],
      },
      description: "Common body styles for this category",
    }),
    defineField({
      name: "fuelTypes",
      title: "Fuel Types",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Petrol / Gasoline", value: "petrol" },
          { title: "Diesel", value: "diesel" },
          { title: "Hybrid", value: "hybrid" },
          { title: "Electric", value: "electric" },
          { title: "CNG / LPG", value: "cng_lpg" },
        ],
      },
      description: "Fuel / powertrain options suggested for listings",
    }),
    defineField({
      name: "transmissions",
      title: "Transmissions",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Manual", value: "manual" },
          { title: "Automatic", value: "automatic" },
          { title: "CVT", value: "cvt" },
          { title: "Semi-automatic", value: "semi_auto" },
        ],
      },
      description: "Transmission choices",
    }),
    defineField({
      name: "engineCapacityOptions",
      title: "Engine Capacity Options (cc)",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Suggested engine capacity ranges or buckets (e.g., '0-1000', '1001-2000')",
    }),
    defineField({
      name: "yearRange",
      title: "Year Range",
      type: "object",
      fields: [
        defineField({
          name: "minYear",
          title: "Minimum Year",
          type: "number",
        }),
        defineField({
          name: "maxYear",
          title: "Maximum Year",
          type: "number",
        }),
      ],
      description: "Optional year range filter for this category",
    }),
    defineField({
      name: "mileage",
      title: "Mileage Options (km)",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enable Mileage Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "buckets",
          title: "Mileage Buckets",
          type: "array",
          of: [{ type: "string" }],
          description: "Suggested buckets (e.g., '0-20k', '20k-50k')",
        }),
      ],
    }),
    defineField({
      name: "seatingCapacity",
      title: "Seating Capacity Options",
      type: "array",
      of: [{ type: "number" }],
      description: "Suggested seating capacities (e.g., 2, 4, 5, 7)",
    }),
    defineField({
      name: "drivetrain",
      title: "Drivetrain Options",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "FWD", value: "fwd" },
          { title: "RWD", value: "rwd" },
          { title: "AWD / 4WD", value: "awd_4wd" },
        ],
      },
    }),
    defineField({
      name: "colorOptions",
      title: "Color Options",
      type: "array",
      of: [{ type: "string" }],
      description: "Common colors to show in listings",
    }),
    defineField({
      name: "emissions",
      title: "Emissions / ECO",
      type: "object",
      fields: [
        defineField({
          name: "co2Enabled",
          title: "CO2 Filter Enabled",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "euroStandard",
          title: "Euro Standard / Emission Class",
          type: "boolean",
          initialValue: false,
        }),
      ],
      description: "Emission-related filters",
    }),

    defineField({
      name: "features",
      title: "Common Features",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Typical features to suggest for listings (e.g., ABS, Airbags, Sunroof)",
    }),

    // Filter configuration for UI
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
          name: "makeModel",
          title: "Make / Model Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "year",
          title: "Year Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "mileage",
          title: "Mileage Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "fuelType",
          title: "Fuel Type Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "transmission",
          title: "Transmission Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "seats",
          title: "Seats Filter",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "features",
          title: "Features Filter",
          type: "boolean",
          initialValue: true,
        }),
      ],
    }),

    // Listing hints and constraints
    defineField({
      name: "listingHints",
      title: "Listing Hints / Tips",
      type: "text",
      rows: 3,
      description:
        "Guidance shown to users when creating a listing in this category",
    }),
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