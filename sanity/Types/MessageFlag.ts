import { z } from 'zod';
import { PortableTextBlock } from 'sanity';

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// UserFeedback type
const UserFeedbackSchema = z.object({
  satisfied: z.boolean(),
  feedbackComments: z.array(z.any()), // Assuming Portable Text format
});

// MessageFlag type
const MessageFlagSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  message: ReferenceSchema, // Reference to a 'message' document
  flaggedBy: ReferenceSchema, // Reference to a 'user' document
  reason: z.string(),
  details: z.array(z.any()), // Assuming Portable Text format
  flaggedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date format",
  }), // Date in ISO format
  status: z.enum(['pending', 'reviewed', 'action_taken', 'dismissed']),
  violationType: z.enum(['harassment', 'spam', 'inappropriate_content', 'hate_speech', 'other']),
  reviewedBy: ReferenceSchema.optional(), // Optional, reference to a 'user' document
  reviewedAt: z.string().optional().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date format",
  }), // Optional, date in ISO format
  actionTaken: z.array(z.any()), // Assuming Portable Text format
  systemFlagged: z.boolean(),
  userFeedback: UserFeedbackSchema,
  auditTrail: z.array(ReferenceSchema), // Array of references to 'auditEntry' documents
  // Add any additional fields as needed
});

// Inferring the TypeScript types from the Zod schemas
export type Reference = z.infer<typeof ReferenceSchema>;
export type UserFeedback = z.infer<typeof UserFeedbackSchema>;
export type MessageFlag = z.infer<typeof MessageFlagSchema>;

// Exporting the schemas
export { ReferenceSchema, UserFeedbackSchema, MessageFlagSchema };
