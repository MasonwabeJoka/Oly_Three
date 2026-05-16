import { defineField, defineType } from "sanity"

export const jobCategory = defineType({
  name: "jobCategory",
  title: "Job Category",
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
      description: 'The complete hierarchical path (e.g., "Jobs/Tech/Engineering")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "jobCategory" }],
      description: "Parent category in the job hierarchy",
    }),
    defineField({
      name: "subcategories",
      title: "Subcategories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "jobCategory" }] }],
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
      description: "Whether this is a top-level job category",
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
      description: "Small icon representing the job category",
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

    // Job-specific configuration fields
    defineField({
      name: "jobTypes",
      title: "Job Types",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Full-time", value: "full_time" },
          { title: "Part-time", value: "part_time" },
          { title: "Contract", value: "contract" },
          { title: "Internship", value: "internship" },
          { title: "Temporary", value: "temporary" },
          { title: "Freelance", value: "freelance" },
        ],
      },
      description: "Allowed job types for listings in this category",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "seniorityLevels",
      title: "Seniority Levels",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Entry", value: "entry" },
          { title: "Mid", value: "mid" },
          { title: "Senior", value: "senior" },
          { title: "Lead / Manager", value: "lead_manager" },
          { title: "Director / Executive", value: "director_executive" },
        ],
      },
      description: "Suggested seniority / experience levels",
    }),
    defineField({
      name: "industries",
      title: "Industries",
      type: "array",
      of: [{ type: "string" }],
      description: "Industries applicable to this category (e.g., Tech, Finance)",
    }),
    defineField({
      name: "employmentType",
      title: "Employment Terms",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Permanent", value: "permanent" },
          { title: "Fixed-term", value: "fixed_term" },
          { title: "Zero-hours", value: "zero_hours" },
        ],
      },
      description: "Employment terms to suggest for listings",
    }),
    defineField({
      name: "remoteOptions",
      title: "Remote Options",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "On-site", value: "on_site" },
          { title: "Hybrid", value: "hybrid" },
          { title: "Remote", value: "remote" },
        ],
      },
      description: "Remote / location options for jobs",
    }),
    defineField({
      name: "salaryRange",
      title: "Salary Range",
      type: "object",
      fields: [
        defineField({
          name: "minSalary",
          title: "Minimum Salary",
          type: "number",
        }),
        defineField({
          name: "maxSalary",
          title: "Maximum Salary",
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
      description: "Suggested salary bounds for listings in this category",
    }),
    defineField({
      name: "experienceYears",
      title: "Experience Years",
      type: "object",
      fields: [
        defineField({
          name: "minYears",
          title: "Minimum Years",
          type: "number",
        }),
        defineField({
          name: "maxYears",
          title: "Maximum Years",
          type: "number",
        }),
      ],
      description: "Optional experience range for this category",
    }),
    defineField({
      name: "qualifications",
      title: "Typical Qualifications",
      type: "array",
      of: [{ type: "string" }],
      description: "Common qualifications to suggest (e.g., Bachelor's, Certs)",
    }),
    defineField({
      name: "skills",
      title: "Common Skills",
      type: "array",
      of: [{ type: "string" }],
      description: "Skills to suggest for job listings in this category",
    }),
    defineField({
      name: "benefits",
      title: "Common Benefits",
      type: "array",
      of: [{ type: "string" }],
      description: "Typical benefits (e.g., Health insurance, Paid leave)",
    }),

    // Filters for UI
    defineField({
      name: "filters",
      title: "Search / Filter Options",
      type: "object",
      fields: [
        defineField({
          name: "salary",
          title: "Salary Filter Enabled",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "jobType",
          title: "Job Type Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "seniority",
          title: "Seniority Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "remote",
          title: "Remote Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "experience",
          title: "Experience Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "skills",
          title: "Skills Filter",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "industry",
          title: "Industry Filter",
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
      description: "Guidance shown to users when creating a job listing",
    }),

    // Category-level constraints & defaults
    defineField({
      name: "minSalaryAllowed",
      title: "Minimum Allowed Salary",
      type: "number",
      description: "Optional minimum salary validation for listings in this category",
    }),
    defineField({
      name: "maxSalaryAllowed",
      title: "Maximum Allowed Salary",
      type: "number",
      description: "Optional maximum salary validation for listings in this category",
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