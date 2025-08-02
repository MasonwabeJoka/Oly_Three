import { z } from 'zod';

// Define the Reference schema
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Define the RegionalTrends schema
const RegionalTrendsSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  region: z.string(),
  trendData: ReferenceSchema, // Reference to a 'trendData' document
});

// Inferring the TypeScript type from the Zod schema
export type RegionalTrends = z.infer<typeof RegionalTrendsSchema>;

// Exporting the schemas
export { RegionalTrendsSchema, ReferenceSchema };
