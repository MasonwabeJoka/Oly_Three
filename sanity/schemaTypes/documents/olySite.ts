// ./schemas/olySite.ts
import { defineType, defineField } from "sanity";

export const olySite = defineType({
  name: "olySite",
  title: "Oly Site",
  type: "document",
  description:
    "Represents an Oly sub-site (e.g. Oly Properties, Oly Auto, etc.) displayed on the main site selector or homepage.",

  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      description:
        "The name of the Oly site (e.g. 'Oly Properties', 'Oly Auto', etc.).",
      validation: (Rule) => Rule.required().max(100),
    }),

    defineField({
      name: "image",
      title: "Site Image",
      type: "image",
      description:
        "Background or thumbnail image representing the site. Displayed on the Oly site card.",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "path",
      title: "Site Path",
      type: "string",
      description:
        "URL path to the site. Can be a relative path (e.g. '/properties') or an absolute URL.",
      validation: (Rule) =>
        Rule.required()
          .regex(
            /^(\/[\w\-\/]*)$|^(https?:\/\/[\w\-\.]+(\.[\w\-]+)+([\/\w\-\.\?\=\&\#]*)?)$/,
            { name: "URL or relative path" }
          )
          .error("Must be a valid URL or relative path."),
    }),
  ],

  preview: {
    select: {
      title: "siteName",
      media: "image",
      subtitle: "path",
    },
  },
});
