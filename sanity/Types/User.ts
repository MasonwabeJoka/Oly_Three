import { z } from 'zod';
import { PortableTextBlockSchema } from './PortableTextBlock'; // Assuming you have this schema

// Reference schema
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Image schema
const ImageSchema = z.object({
  _type: z.literal('image'),
  asset: ReferenceSchema,
  // Include other image properties as needed
});

// NotificationSettings schema
const NotificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  // Include other notification settings
});

// MarketingPreferences schema
const MarketingPreferencesSchema = z.object({
  receivePromotionalOffers: z.boolean(),
  preferredCategories: z.array(z.string()),
  // Include other marketing preferences
});

// SecuritySettings schema
const SecuritySettingsSchema = z.object({
  twoFactorAuthentication: z.boolean(),
  // Include other security settings
});

// CustomPreferences schema
const CustomPreferencesSchema = z.object({
  displayMode: z.enum(['light', 'dark']),
  notificationSound: z.boolean(),
  // Include other custom preferences
});

// PrivacySettings schema
const PrivacySettingsSchema = z.object({
  showEmail: z.boolean(),
  showPhoneNumber: z.boolean(),
  allowMessaging: z.boolean(),
  profileVisibility: z.enum(['public', 'private']),
  currentLocation: ReferenceSchema.optional(),
  locationPreferences: ReferenceSchema.optional(),
  locationAlerts: ReferenceSchema.optional(),
  languagePreference: z.string(),
  paymentMethods: z.array(ReferenceSchema),
  watchList: z.array(ReferenceSchema),
  userRating: z.number(),
  recentlyViewedAds: z.array(ReferenceSchema),
  accountCreationDate: z.string(), // Date in ISO format
  lastLogin: z.string(), // Date in ISO format
  newsletterSubscription: z.boolean(),
  marketingPreferences: MarketingPreferencesSchema,
  securitySettings: SecuritySettingsSchema,
  customPreferences: CustomPreferencesSchema,
  // Include other fields as needed
});

// User schema
const UserSchema = z.object({
  _id: z.string(),
  _createdAt: z.string().transform(date => new Date(date)), // Transform string to Date object
  name: z.string(),
  lastname: z.string(),
  username: z.string(),
  email: z.string(),
  userType: z.enum([
    'buyer', 'seller', 'professional_seller', 'service_provider', 
    'job_seeker', 'employer', 'casual_browser', 'community_member', 
    'administrator', 'advertiser'
  ]),
  postedAds: z.array(ReferenceSchema),
  participatedAuctions: z.array(ReferenceSchema),
  bids: z.array(ReferenceSchema),
  favourites: z.array(ReferenceSchema),
  profileImage: ImageSchema.optional(),
  bio: z.array(PortableTextBlockSchema), // Use specific schema if available
  transactionHistory: z.array(ReferenceSchema),
  reviews: z.array(ReferenceSchema),
  messages: z.array(ReferenceSchema),
  isChatGroupAdmin: z.boolean(),
  notificationSettings: NotificationSettingsSchema,
  privacySettings: PrivacySettingsSchema,
});

export { UserSchema };

// Export inferred type
type User = z.infer<typeof UserSchema>;
export type { User };
