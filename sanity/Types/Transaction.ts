import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

type TaxDetails = {
    amount: number;
    taxId: string;
};

type ShippingDetails = {
    shippingAddress: string;
    shippingMethod: string;
    trackingNumber: string;
    // Add other shipping-related fields as needed
};

export type Transaction = {
    _id: string;
    _createdAt: Date;
    transactionId: string;
    user: Reference; // Reference to a 'user' document
    transactionType: 'purchase' | 'sale' | 'refund';
    amount: number;
    currency: string;
    paymentMethod: Reference; // Reference to a 'paymentMethod' document
    transactionDate: string; // Date in ISO format
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    relatedAd?: Reference; // Optional, reference to an 'ad' document
    notes: PortableTextBlock[]; // Additional notes or details in Portable Text format
    receipt: {
        _type: 'file';
        asset: Reference;
    }; // File type for digital receipt or proof
    category: 'adPurchase' | 'subscriptionFee' | 'serviceFee';
    seller?: Reference; // Optional, reference to a 'user' document
    buyer?: Reference; // Optional, reference to a 'user' document
    taxDetails: TaxDetails;
    disputeStatus: 'none' | 'pending' | 'resolved';
    disputeDetails: PortableTextBlock[]; // Information about any dispute in Portable Text format
    refundAmount?: number; // Optional
    refundDate?: string; // Optional, date in ISO format
    transactionAttachments: {
        _type: 'file';
        asset: Reference;
    }[]; // Array of file references
    paymentStatus: 'paid' | 'unpaid' | 'partiallyPaid' | 'overdue';
    invoiceNumber: string;
    paymentDueDate: string; // Date in ISO format
    paymentTerms: PortableTextBlock[]; // Terms and conditions in Portable Text format
    paymentReceipt: {
        _type: 'file';
        asset: Reference;
    }; // File type for digital copy of payment receipt
    shippingDetails: ShippingDetails;
    cancellationReason: PortableTextBlock[]; // Reason for cancellation in Portable Text format
    // Include any other fields as needed
};
