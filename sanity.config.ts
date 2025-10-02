"use client"

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"

import { apiVersion, dataset, projectId } from "./sanity/env"
import { schema } from "./sanity/schemaTypes"
import { structure } from "./sanity/structure"
import { initialValueTemplates } from "./sanity/initialValueTemplates"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  
  plugins: [
    deskTool({ 
      structure,
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