import { z } from 'zod';
import { PortableTextBlockSchema } from './PortableTextBlock'; // Import PortableTextBlock schema

// Define the Reference schema
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Define the ReviewResponse schema
const ReviewResponseSchema = z.object({
  respondent: ReferenceSchema, // Reference to a 'user' document
  responseContent: z.array(PortableTextBlockSchema), // Response content in Portable Text format
  responseDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }), // Date in ISO format
});

// Define the Review schema
const ReviewSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  reviewer: ReferenceSchema, // Reference to a 'user' document
  subject: ReferenceSchema, // Reference to a 'user', 'ad', or 'auctionLot' document
  rating: z.number().min(1).max(5), // Assuming rating is between 1 and 5
  title: z.string(),
  content: z.array(PortableTextBlockSchema), // Detailed review content in Portable Text format
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }), // Date in ISO format
  response: ReviewResponseSchema.optional(), // Optional response to the review
  verifiedPurchase: z.boolean(),
});

// Inferring the TypeScript type from the Zod schema
export type Review = z.infer<typeof ReviewSchema>;

// Exporting the schemas
export { ReviewSchema, ReviewResponseSchema };
