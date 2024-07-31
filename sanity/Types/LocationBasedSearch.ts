import { z } from 'zod';

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// GeoPoint type
const GeoPointSchema = z.object({
  _type: z.literal('geopoint'),
  lat: z.number(),
  lng: z.number(),
  alt: z.number().optional(), // Optional altitude
});

// FilterCriteria type
const FilterCriteriaSchema = z.object({
  categories: z.array(ReferenceSchema), // Array of references to 'category' documents
  // Add any additional filter criteria fields as needed here
});

// LocationBasedSearch type
const LocationBasedSearchSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  userId: ReferenceSchema, // Reference to a 'user' document
  country: z.string(),
  stateOrProvince: z.string(),
  city: z.string(),
  suburb: z.string(),
  searchRadius: z.number(),
  baseLocation: GeoPointSchema,
  includeNearbyAreas: z.boolean(),
  filterCriteria: FilterCriteriaSchema,
  savedSearchName: z.string(),
  lastUsed: z.string(), // Date in ISO format
  // Add any additional fields as needed here
});

// Inferring the TypeScript types from the Zod schemas
export type Reference = z.infer<typeof ReferenceSchema>;
export type GeoPoint = z.infer<typeof GeoPointSchema>;
export type FilterCriteria = z.infer<typeof FilterCriteriaSchema>;
export type LocationBasedSearch = z.infer<typeof LocationBasedSearchSchema>;

// Exporting the schemas
export { ReferenceSchema, GeoPointSchema, FilterCriteriaSchema, LocationBasedSearchSchema };
