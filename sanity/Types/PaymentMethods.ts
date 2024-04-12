import { PortableTextBlock } from "sanity";
type Reference = {
    _ref: string;
    _type: string;
};

type PaymentMethodDetails = {
    cardNumber?: string;
    cardHolderName?: string;
    expiryDate?: string; // Date in ISO format if applicable
    securityCode?: string;
    // Add additional fields for PayPal, Bank Transfer, etc.
};

type AdditionalSettings = {
    autoPay: boolean;
    // Include additional settings specific to the payment method
};

type SecurityFeatures = {
    fingerprint: boolean;
    twoFactorAuth: boolean;
    // Other security-related features
};

type TransactionLimits = {
    dailyLimit: number;
    transactionLimit: number;
    // Other limit-related fields
};

type CustomizationOptions = {
    transactionNotifications: boolean;
    paymentReminders: boolean;
    securityAlerts: boolean;
    balanceUpdates: boolean;
    emailNotifications: boolean;
    // Other customization options
};

export type PaymentMethod = {
    _id: string;
    _createdAt: Date;
    userId: Reference; // Reference to a 'user' document
    methodType: 'creditCard' | 'debitCard' | 'paypal' | 'bankTransfer';
    details: PaymentMethodDetails;
    billingAddress: Reference; // Reference to an 'address' document
    isDefault: boolean;
    verificationStatus: 'verified' | 'pending' | 'unverified';
    currency: string;
    transactionHistory: Reference[]; // Array of references to 'transaction' documents
    paymentGateway: string;
    isActive: boolean;
    addedDate: string; // Date in ISO format
    additionalSettings: AdditionalSettings;
    notes: PortableTextBlock[]; // Assuming notes are in Portable Text format
    securityFeatures: SecurityFeatures;
    limits: TransactionLimits;
    rewards: PortableTextBlock[]; // Assuming rewards details are in Portable Text format
    expiryNotification: boolean;
    supportContact: string;
    customizationOptions: CustomizationOptions;
    // Include any other fields as needed
};
