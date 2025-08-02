import { z } from 'zod';

// Define the schema for AveragePrice
const AveragePriceSchema = z.object({
  category: z.string(),
  value: z.number().positive(), // Price must be a positive number
});

// Define the schema for SearchVolume
const SearchVolumeSchema = z.object({
  keyword: z.string(),
  count: z.number().nonnegative(), // Count must be a non-negative number
});

// Define the schema for UserEngagement
const UserEngagementSchema = z.object({
  pageViews: z.number().nonnegative(), // Page views must be a non-negative number
  timeSpent: z.number().nonnegative(), // Time spent must be a non-negative number
});

// Define the schema for AdsPerCategory
const AdsPerCategorySchema = z.object({
  category: z.string(),
  count: z.number().nonnegative(), // Count must be a non-negative number
});

// Define the schema for AdPostings
const AdPostingsSchema = z.object({
  totalAds: z.number().nonnegative(), // Total ads must be a non-negative number
  adsPerCategory: AdsPerCategorySchema, // Ads per category breakdown
});

// Define the schema for Demographics
const DemographicsSchema = z.object({
  ageGroups: z.array(z.string()),
  genderRatio: z.string(),
});

// Define the schema for MarketGrowth
const MarketGrowthSchema = z.object({
  yearlyGrowth: z.number().nonnegative(), // Yearly growth must be a non-negative number
  // Add other growth metrics as needed
});

// Define the schema for TrendData
const TrendDataSchema = z.object({
  _id: z.string(),
  _createdAt: z.string().transform((dateString) => new Date(dateString)), // Transform string to Date object
  popularCategories: z.array(z.string()), // Most popular categories
  averagePrice: AveragePriceSchema, // Average price of items within popular categories
  searchVolume: SearchVolumeSchema, // Volume of searches for specific keywords
  userEngagement: UserEngagementSchema, // Metrics indicating user engagement
  adPostings: AdPostingsSchema, // Number of ad postings, including category breakdowns
  demographics: DemographicsSchema, // Demographic information of users
  marketGrowth: MarketGrowthSchema, // Market growth metrics
  // Uncomment and define types for consumerBehavior if needed
});

// Infer TypeScript types from Zod schema
export type AveragePrice = z.infer<typeof AveragePriceSchema>;
export type SearchVolume = z.infer<typeof SearchVolumeSchema>;
export type UserEngagement = z.infer<typeof UserEngagementSchema>;
export type AdsPerCategory = z.infer<typeof AdsPerCategorySchema>;
export type AdPostings = z.infer<typeof AdPostingsSchema>;
export type Demographics = z.infer<typeof DemographicsSchema>;
export type MarketGrowth = z.infer<typeof MarketGrowthSchema>;
export type TrendData = z.infer<typeof TrendDataSchema>;

// Export schemas
export {
  AveragePriceSchema,
  SearchVolumeSchema,
  UserEngagementSchema,
  AdsPerCategorySchema,
  AdPostingsSchema,
  DemographicsSchema,
  MarketGrowthSchema,
  TrendDataSchema
};
