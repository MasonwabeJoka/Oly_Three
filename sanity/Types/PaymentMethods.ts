import { z } from 'zod';


// Reference type
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// PaymentMethodDetails type
const PaymentMethodDetailsSchema = z.object({
  cardNumber: z.string().optional(),
  cardHolderName: z.string().optional(),
  expiryDate: z.string().optional().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date format",
  }), // Date in ISO format if applicable
  securityCode: z.string().optional(),
  // Add additional fields for PayPal, Bank Transfer, etc.
});

// AdditionalSettings type
const AdditionalSettingsSchema = z.object({
  autoPay: z.boolean(),
  // Include additional settings specific to the payment method
});

// SecurityFeatures type
const SecurityFeaturesSchema = z.object({
  fingerprint: z.boolean(),
  twoFactorAuth: z.boolean(),
  // Other security-related features
});

// TransactionLimits type
const TransactionLimitsSchema = z.object({
  dailyLimit: z.number(),
  transactionLimit: z.number(),
  // Other limit-related fields
});

// CustomizationOptions type
const CustomizationOptionsSchema = z.object({
  transactionNotifications: z.boolean(),
  paymentReminders: z.boolean(),
  securityAlerts: z.boolean(),
  balanceUpdates: z.boolean(),
  emailNotifications: z.boolean(),
  // Other customization options
});

// PaymentMethod type
const PaymentMethodSchema = z.object({
  _id: z.string(),
  _createdAt: z.date(),
  userId: ReferenceSchema, // Reference to a 'user' document
  methodType: z.enum(['creditCard', 'debitCard', 'paypal', 'bankTransfer']),
  details: PaymentMethodDetailsSchema,
  billingAddress: ReferenceSchema, // Reference to an 'address' document
  isDefault: z.boolean(),
  verificationStatus: z.enum(['verified', 'pending', 'unverified']),
  currency: z.string(),
  transactionHistory: z.array(ReferenceSchema), // Array of references to 'transaction' documents
  paymentGateway: z.string(),
  isActive: z.boolean(),
  addedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid ISO date format",
  }), // Date in ISO format
  additionalSettings: AdditionalSettingsSchema,
  notes: z.array(z.any()), // Assuming notes are in Portable Text format
  securityFeatures: SecurityFeaturesSchema,
  limits: TransactionLimitsSchema,
  rewards: z.array(z.any()), // Assuming rewards details are in Portable Text format
  expiryNotification: z.boolean(),
  supportContact: z.string(),
  customizationOptions: CustomizationOptionsSchema,
  // Include any other fields as needed
});

// Inferring the TypeScript types from the Zod schemas
export type Reference = z.infer<typeof ReferenceSchema>;
export type PaymentMethodDetails = z.infer<typeof PaymentMethodDetailsSchema>;
export type AdditionalSettings = z.infer<typeof AdditionalSettingsSchema>;
export type SecurityFeatures = z.infer<typeof SecurityFeaturesSchema>;
export type TransactionLimits = z.infer<typeof TransactionLimitsSchema>;
export type CustomizationOptions = z.infer<typeof CustomizationOptionsSchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

// Exporting the schemas
export { 
  ReferenceSchema, 
  PaymentMethodDetailsSchema, 
  AdditionalSettingsSchema, 
  SecurityFeaturesSchema, 
  TransactionLimitsSchema, 
  CustomizationOptionsSchema, 
  PaymentMethodSchema 
};
