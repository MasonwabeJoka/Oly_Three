import { z } from 'zod';

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// BidderHistory type
const BidderHistorySchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  bidder: ReferenceSchema,
  bids: z.array(ReferenceSchema), // Array of references to 'bid' documents
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type BidderHistory = z.infer<typeof BidderHistorySchema>;

// Exporting the schemas
export { ReferenceSchema, BidderHistorySchema };
