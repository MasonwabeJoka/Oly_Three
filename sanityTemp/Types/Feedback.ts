import { z } from 'zod';
import { PortableTextBlockSchema } from "./PortableTextBlock"; // Assuming PortableTextBlockSchema is defined and exported in this file

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Feedback type
const FeedbackSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  submittedBy: ReferenceSchema, // Reference to a 'user' document
  message: z.array(PortableTextBlockSchema), // Assuming the message is in Portable Text format
  rating: z.number(),
  createdAt: z.string(), // Date in ISO format
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type Feedback = z.infer<typeof FeedbackSchema>;

// Exporting the schemas
export { ReferenceSchema, FeedbackSchema };
