import { z } from 'zod';
import { UserSchema } from "./User";
import { DetailsSchema } from "./Details";
import {PortableTextBlockSchema} from "./PortableTextBlock";
import { CategorySchema } from './Category';
import { AuctionSchema } from './Auction';



const ImageSchema = z.object({
  _key: z.string(),
  _ref: z.string(),
  url: z.string().optional(),
  aspectRatio: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  alt: z.string().optional(),

});

const VideoSchema = z.object({
  _key: z.string(),
  _ref: z.string(),
  url: z.string().optional(),
  duration: z.number().optional(),
  format: z.string().optional(),
  resolution: z.string().optional(),
  frameRate: z.number().optional(),
  bitrate: z.number().optional(),
  codec: z.string().optional(),
  audioChannels: z.number().optional(),
  aspectRatio: z.number().optional(),
  fileSize: z.number().optional(),
  creationDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const AttachmentSchema = z.object({
  _key: z.string(),
  _ref: z.string(),
  url: z.string().optional(),
  size: z.number().optional(),
  format: z.string().optional(),
  creationDate: z.string().optional(),
  modifiedDate: z.string().optional(),
  author: z.string().optional(),
  pageCount: z.number().optional(),
  title: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const AdSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  user: z.lazy(() => UserSchema),
  category: z.lazy(() => CategorySchema),
  userId: z.string(),
  title: z.string(),
  description: z.array(PortableTextBlockSchema).optional().nullable(),
  price: z.number(),
  priceId: z.string(),
  paystackId: z.string(),
  pricingOption: z.enum(['Fixed Price', 'Auction', 'Negotiable Price', 'Free', 'Contact For Price']),
  approvedForSale: z.enum(['approved', 'pending', 'denied']),
  bankName: z.string().min(1, "Bank name is required"), 
  accountHolder: z.string().min(1, "Account holder name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  videos: z.array(VideoSchema).optional(),
  attachments: z.array(AttachmentSchema).optional(),
  featuredImage: ImageSchema,
  postedOn: z.string(),
  details: z.array(DetailsSchema).optional(),
  features: z.array(z.string()).optional(),
  condition: z.enum(['New', 'Like New', 'Gently Used', 'Used']),
  quantity: z.number().optional(),
  avatar: z.object({
    _ref: z.string(),
    _type: z.string(),
  }),
  location: z.object({
    province: z.string(),
    suburb: z.string(),
    city: z.string(),
  }),
  province: z.string(),
  city: z.string(),
  suburb: z.string(),
  customLocation: z.string(),
  attachment: z.object({
    _type: z.string(),
    asset: z.object({
      _ref: z.string(),
      _type: z.string(),
    }),
  }).optional(),
  promotions: z.array(z.object({
    platform: z.enum(['Oly', 'Facebook', 'Google Ads', 'Instagram', 'Linkedin']),
    duration: z.enum(['1 Day', '7 Days', '2 Weeks', '1 Month', '3 Months']),
    remainingDays: z.number(),
  })).optional(),
  bids: z.array(z.object({
    _ref: z.string(),
    _type: z.string(),
  })).optional(),
  likes: z.number().optional(),
  todaysViews: z.number().optional(),
  totalViews: z.number().optional(),
  unreadMessages: z.number().optional(),
  startingPrice: z.number().optional(),
  reservePrice: z.number().optional(),
  buyNowPrice: z.number().optional(),
  ending: z.date().optional(),
  associatedAuction: AuctionSchema.optional(),
});

// Automatically inferred TypeScript types
type Image = z.infer<typeof ImageSchema>;
type Video = z.infer<typeof VideoSchema>;
type Attachment = z.infer<typeof AttachmentSchema>;
type Ad = z.infer<typeof AdSchema>;

export type { Image, Video, Attachment, Ad };
