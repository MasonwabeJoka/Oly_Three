"use client"

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"

import { apiVersion, dataset, projectId } from "./server/sanity/env"
import { schema } from "./server/sanity/schemaTypes"
import { structure } from "./server/sanity/structure-config"
import { initialValueTemplates } from "./server/sanity/initialValueTemplates"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,

  plugins: [
    deskTool({
      structure: structure as any,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  // Register templates globally
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      // Filter templates based on context if needed
      return prev
    },
    actions: (prev, { schemaType }) => prev,
  },

  // Add templates here
  templates: initialValueTemplates,
})
