import { z } from 'zod';

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Bid type
const BidSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  amount: z.number(),
  bidder: ReferenceSchema,
  bidDate: z.string().date(), // Date in ISO format
  associatedAd: ReferenceSchema,
  isLive: z.boolean(),
  bidStartTime: z.string().date().optional(), // Optional, Date in ISO format
  bidDropOutTime: z.string().date().optional(), // Optional, Date in ISO format
  bidStatus: z.enum(['bidding', 'dropped-out']),
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type Bid = z.infer<typeof BidSchema>;

// Exporting the schemas
export { ReferenceSchema, BidSchema };
