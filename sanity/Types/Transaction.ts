import { z } from 'zod';
import { PortableTextBlockSchema } from './PortableTextBlock'; // Ensure this is correctly imported

// Define the schema for Reference
const ReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
});

// Define the schema for TaxDetails
const TaxDetailsSchema = z.object({
  amount: z.number().positive(), // Amount must be a positive number
  taxId: z.string(),
});

// Define the schema for ShippingDetails
const ShippingDetailsSchema = z.object({
  shippingAddress: z.string(),
  shippingMethod: z.string(),
  trackingNumber: z.string(),
  // Add other shipping-related fields if needed
});

// Define the schema for the receipt and paymentReceipt fields
const FileSchema = z.object({
  _type: z.literal('file'),
  asset: ReferenceSchema,
});

const TransactionItemSchema = z.object({
    ad: ReferenceSchema, // Reference to an 'ad' document
    quantity: z.number().min(1), // Quantity must be a positive number
    price: z.number().positive(), // Price must be a positive number
  });

// Define the schema for Transaction
const TransactionSchema = z.object({
  _id: z.string(),
  _createdAt: z.string().transform((dateString) => new Date(dateString)), // Transform string to Date object
  transactionId: z.string(),
  user: ReferenceSchema, // Reference to a 'user' document
  items: z.array(TransactionItemSchema), // List of items in the transaction
  totalPrice: z.number().positive(), // Total price must be a positive number
  transactionType: z.enum(['purchase', 'sale', 'refund']),
  amount: z.number().positive(), // Amount must be a positive number
  currency: z.string(),
  paymentMethod: ReferenceSchema, // Reference to a 'paymentMethod' document
  transactionDate: z.string(), // Date in ISO format
  status: z.enum(['pending', 'completed', 'failed', 'cancelled']),
  relatedAd: ReferenceSchema.optional(), // Optional, reference to an 'ad' document
  notes: z.array(PortableTextBlockSchema).optional(), // Additional notes or details in Portable Text format
  receipt: FileSchema, // File type for digital receipt or proof
  category: z.enum(['adPurchase', 'subscriptionFee', 'serviceFee']),
  seller: ReferenceSchema.optional(), // Optional, reference to a 'user' document
  buyer: ReferenceSchema.optional(), // Optional, reference to a 'user' document
  taxDetails: TaxDetailsSchema,
  disputeStatus: z.enum(['none', 'pending', 'resolved']),
  disputeDetails: z.array(PortableTextBlockSchema), // Information about any dispute in Portable Text format
  refundAmount: z.number().optional(), // Optional
  refundDate: z.string().optional(), // Optional, date in ISO format
  transactionAttachments: z.array(FileSchema), // Array of file references
  paymentStatus: z.enum(['paid', 'unpaid', 'partiallyPaid', 'overdue']),
  invoiceNumber: z.string(),
  paymentDueDate: z.string(), // Date in ISO format
  paymentTerms: z.array(PortableTextBlockSchema), // Terms and conditions in Portable Text format
  paymentReceipt: FileSchema, // File type for digital copy of payment receipt
  shippingDetails: ShippingDetailsSchema,
  cancellationReason: z.array(PortableTextBlockSchema), // Reason for cancellation in Portable Text format
  shippingAddress: z.string(),
  billingAddress: z.string(),
  trackingNumber: z.string().optional(), // Optional field
});

// Infer TypeScript types from Zod schema
export type Reference = z.infer<typeof ReferenceSchema>;
export type TaxDetails = z.infer<typeof TaxDetailsSchema>;
export type ShippingDetails = z.infer<typeof ShippingDetailsSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;

// Export schemas
export { ReferenceSchema, TaxDetailsSchema, ShippingDetailsSchema, TransactionSchema };
