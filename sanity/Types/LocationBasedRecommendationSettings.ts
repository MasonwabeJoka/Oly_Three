import { z } from 'zod';

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// LocationBasedRecommendationSettings type
const LocationBasedRecommendationSettingsSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  userId: ReferenceSchema, // Reference to a 'user' document
  enableRecommendations: z.boolean(), // Indicates if the user has opted to receive location-based recommendations
  // Add any additional fields as needed here
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type LocationBasedRecommendationSettings = z.infer<typeof LocationBasedRecommendationSettingsSchema>;

// Exporting the schemas
export { ReferenceSchema, LocationBasedRecommendationSettingsSchema };
