import { z } from 'zod';

// Reference schema
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// UserLocationPreference schema
const UserLocationPreferenceSchema = z.object({
  _id: z.string(),
  _createdAt: z.string().transform(date => new Date(date)), // Transform string to Date object
  userId: ReferenceSchema, // Reference to a 'user' document
  preferredLocations: z.array(ReferenceSchema), // Array of references to 'location' documents
  // Include any other fields as needed
});

// Export the schema and inferred type
export { UserLocationPreferenceSchema };

// Define and export the inferred TypeScript type
type UserLocationPreference = z.infer<typeof UserLocationPreferenceSchema>;
export type { UserLocationPreference };
