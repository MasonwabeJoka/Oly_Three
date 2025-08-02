import { z } from 'zod';
import { PortableTextBlockSchema } from "./PortableTextBlock";

// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Auction type
const AuctionSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  startingPrice: z.number(),
  reservePrice: z.number().optional(), 
  buyNowPrice: z.number().optional(), 
  highestBid: ReferenceSchema,
  serviceFeeBidder: z.number(),
  serviceFeeAdvertiser: z.number(),
  liveBiddingStart: z.string().date(), // Date in ISO format
  duration: z.number(),
  timeLeft: z.number(),
  minimumBid: z.number(),
  ending: z.string().date().optional(),
  biddersList: z.array(ReferenceSchema),
  currentLiveBidders: z.array(ReferenceSchema),
  totalBidders: z.number(),
  currentLiveBiddersCount: z.number(),
  lots: z.array(ReferenceSchema),
  upcoming: z.boolean(),
  favoritedBy: z.array(ReferenceSchema),
  partOfMyAuctions: z.boolean(),
  buyNowOption: z.boolean(),
  auctionType: z.enum(['live', 'timed', 'buy-now']),
  remainingTime: z.string().date(), // Date in ISO format
});

// Inferring the TypeScript type from the Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type Auction = z.infer<typeof AuctionSchema>;

// Exporting the schemas
export { ReferenceSchema, AuctionSchema };
