import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

export type UserLocationConsent = {
    _id: string;
    _createdAt: Date;
    userId: Reference; // Reference to a 'user' document
    consentGiven: boolean; // Indicates if the user has given consent
    consentTimestamp: string; // Date in ISO format
    consentDetails: PortableTextBlock[]; // Details about the consent in Portable Text format
    // Include any other fields as needed
};
