import { z } from 'zod';
import { PortableTextBlock } from 'sanity';

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Reaction type
const ReactionSchema = z.object({
  type: z.string(),
  user: ReferenceSchema, // Reference to a 'user' document
});

// Upload type (define the structure according to your schema)
const UploadSchema = z.object({
  // Define the upload structure fields here
});

// MessageFlag type (define the structure according to your schema)
const MessageFlagSchema = z.object({
  // Define the message flag structure fields here
});

// Metrics type
const MetricsSchema = z.object({
  views: z.number(),
  interactions: z.number(),
  // Add more metrics fields if needed
});

// Message type
const MessageSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  conversation: ReferenceSchema, // Reference to a 'conversation' document
  sender: ReferenceSchema, // Reference to a 'user' document
  timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date format",
  }), // Date in ISO format
  text: z.array(z.any()), // Assuming text content is in Portable Text format
  reactions: z.array(ReactionSchema),
  replies: z.lazy(() => z.array(MessageSchema)), // Array of 'message' documents for threaded conversations
  uploads: z.array(UploadSchema),
  status: z.enum(['sent', 'delivered', 'read']),
  flags: z.array(ReferenceSchema), // Array of references to 'messageFlag' documents
  metrics: MetricsSchema,
  // Include any other fields as needed
});

// Inferring the TypeScript types from the Zod schemas
export type Reference = z.infer<typeof ReferenceSchema>;
export type Reaction = z.infer<typeof ReactionSchema>;
export type Upload = z.infer<typeof UploadSchema>;
export type MessageFlag = z.infer<typeof MessageFlagSchema>;
export type Metrics = z.infer<typeof MetricsSchema>;
export type Message = z.infer<typeof MessageSchema>;

// Exporting the schemas
export {
  ReferenceSchema,
  ReactionSchema,
  UploadSchema,
  MessageFlagSchema,
  MetricsSchema,
  MessageSchema,
};
