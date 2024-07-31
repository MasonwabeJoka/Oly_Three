import { z } from 'zod';

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// LocationBasedAdTargeting type
const LocationBasedAdTargetingSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  adId: ReferenceSchema, // Reference to an 'ad' document
  targetLocations: z.array(ReferenceSchema), // Array of references to 'location' documents
  exclusionZones: z.array(ReferenceSchema), // Array of references to 'location' documents for exclusion
  // Add any additional fields as needed here
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type LocationBasedAdTargeting = z.infer<typeof LocationBasedAdTargetingSchema>;

// Exporting the schemas
export { ReferenceSchema, LocationBasedAdTargetingSchema };
