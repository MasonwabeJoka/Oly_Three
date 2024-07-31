import { z } from 'zod';

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Conversation type
const ConversationSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  participants: z.array(ReferenceSchema), // Array of references to 'user' documents
  startedBy: ReferenceSchema, // Reference to a 'user' document
  createdAt: z.string().date(), // Date in ISO format
  updatedAt: z.string().date(), // Date in ISO format
  archived: z.boolean(),
  isGroup: z.boolean(),
  groupName: z.string().optional(), // Optional, only for group chats
  groupIcon: z.object({
    _type: z.literal('image'),
    asset: ReferenceSchema,
  }).optional(), // Optional, only for group chats
  messages: z.array(ReferenceSchema), // Array of references to 'message' documents
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;

// Exporting the schemas
export { ReferenceSchema, ConversationSchema };
