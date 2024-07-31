import { z } from 'zod';

const DetailsSchema = z.object({
  condition: z.string(),
  accessoriesIncluded: z.array(z.string()).optional(),
  warrantyInformation: z.string().optional(),
  history: z.string().optional(),
  customizations: z.string().optional(),
  maintenanceHistory: z.string().optional(),
  compatibility: z.string().optional(),
  originalPackaging: z.string().optional(),
  usageHistory: z.string().optional(),
  storage: z.string().optional(),
  originalPurchaseDate: z.string().optional(),
  reasonForSelling: z.string().optional(),
  additionalFeatures: z.string().optional(),
  serviceRecords: z.string().optional(),
  userManualAvailability: z.string().optional(),
  manufacturerSupport: z.string().optional(),
  compatibilityWithAccessories: z.string().optional(),
  packagingCondition: z.string().optional(),
  productHistory: z.string().optional(),
  transferability: z.string().optional(),
  petSmokeExposure: z.string().optional(),
  regulatoryCompliance: z.string().optional(),
  specialFeatures: z.string().optional(),
  documentation: z.string().optional(),
  certification: z.string().optional(),
  age: z.string().optional(),
  ownership: z.string().optional(),
  environmentalImpact: z.string().optional(),
  knownIssues: z.string().optional(),
  upgrades: z.string().optional(),
});

export { DetailsSchema };

// Optionally, you can export the inferred type
type Details = z.infer<typeof DetailsSchema>;
export type { Details };
