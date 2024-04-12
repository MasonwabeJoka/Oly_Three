import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

type UsageStatistics = {
    lastAccess: string; // Date in ISO format
    frequencyOfUse: number;
};

export type Subscription = {
    _id: string;
    _createdAt: Date;
    userId: Reference; // Reference to a 'user' document
    subscriptionType: 'basic' | 'premium';
    startDate: string; // Date in ISO format
    endDate: string; // Date in ISO format
    paymentMethod: Reference; // Reference to a 'paymentMethod' document
    status: 'active' | 'expired' | 'cancelled';
    renewalReminder: boolean;
    features: string[]; // List of features or services
    billingCycle: string;
    amount: number;
    notes: PortableTextBlock[]; // Additional notes or details in Portable Text format
    autoRenewal: boolean;
    usageStatistics: UsageStatistics;
    supportTier: string;
    additionalBenefits: string[];
    feedback: PortableTextBlock[]; // User feedback in Portable Text format
    upgradeOptions: string[]; // Options for upgrading the subscription
    // Include any other fields as needed
};
