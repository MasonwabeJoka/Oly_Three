import { defineField, defineType } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor TEMP",
  type: "document", 
  fields: [
    defineField({
      name: "sponsorTemp",
      title: "Sponsor TEMP",
      type: "string",

      description: "TEMP",
    }),
],
})