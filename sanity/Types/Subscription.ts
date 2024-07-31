import { z } from 'zod';
import { PortableTextBlockSchema } from './PortableTextBlock'; // Ensure this is correctly imported

// Define the schema for Reference
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Define the schema for UsageStatistics
const UsageStatisticsSchema = z.object({
  lastAccess: z.string(), // Date in ISO format
  frequencyOfUse: z.number().nonnegative(), // Frequency of use must be a non-negative number
});

// Define the schema for Subscription
const SubscriptionSchema = z.object({
  _id: z.string(),
  _createdAt: z.string().transform((dateString) => new Date(dateString)), // Transform string to Date object
  userId: ReferenceSchema, // Reference to a 'user' document
  subscriptionType: z.enum(['basic', 'premium']),
  startDate: z.string(), // Date in ISO format
  endDate: z.string(), // Date in ISO format
  paymentMethod: ReferenceSchema, // Reference to a 'paymentMethod' document
  status: z.enum(['active', 'expired', 'cancelled']),
  renewalReminder: z.boolean(),
  features: z.array(z.string()), // List of features or services
  billingCycle: z.string(),
  amount: z.number().positive(), // Amount must be a positive number
  notes: z.array(PortableTextBlockSchema), // Additional notes or details in Portable Text format
  autoRenewal: z.boolean(),
  usageStatistics: UsageStatisticsSchema,
  supportTier: z.string(),
  additionalBenefits: z.array(z.string()), // List of additional benefits
  feedback: z.array(PortableTextBlockSchema), // User feedback in Portable Text format
  upgradeOptions: z.array(z.string()), // Options for upgrading the subscription
});

// Infer TypeScript types from Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type UsageStatistics = z.infer<typeof UsageStatisticsSchema>;
export type Subscription = z.infer<typeof SubscriptionSchema>;

// Export schemas
export { ReferenceSchema, UsageStatisticsSchema, SubscriptionSchema };
