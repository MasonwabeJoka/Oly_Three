import { z } from 'zod';
import { PortableTextBlockSchema } from "./PortableTextBlock"; // Assuming PortableTextBlockSchema is defined and exported in this file

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// AuctionLot type
const AuctionLotSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  biddingHistory: z.array(ReferenceSchema), // Array of references to 'bid' documents
  auctionStartDate: z.string().date(), // Date in ISO format
  shippingDetails: z.array(PortableTextBlockSchema), // Shipping information in Portable Text format
  returnPolicy: z.array(PortableTextBlockSchema), // Return policy details in Portable Text format
  lotStatus: z.enum(['active', 'closed', 'sold', 'unsold']), // Current status of the lot
  buyer: ReferenceSchema.optional(), // Optional, reference to a 'user' document
  sellerNotes: z.array(PortableTextBlockSchema), // Additional notes from the seller in Portable Text format
  currentHighestBid: ReferenceSchema.optional(), // Optional, reference to a 'bid' document
  auctionEndDate: z.string(), // Date in ISO format
  paymentTerms: z.array(PortableTextBlockSchema), // Payment terms in Portable Text format
  // Include any other fields as needed
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type AuctionLot = z.infer<typeof AuctionLotSchema>;

// Exporting the schemas
export { ReferenceSchema, AuctionLotSchema };
