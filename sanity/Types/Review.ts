import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

type ReviewResponse = {
    respondent: Reference; // Reference to a 'user' document
    responseContent: PortableTextBlock[]; // Response content in Portable Text format
    responseDate: string; // Date in ISO format
};

export type Review = {
    _id: string;
    _createdAt: Date;
    reviewer: Reference; // Reference to a 'user' document
    subject: Reference; // Reference to a 'user', 'ad', or 'auctionLot' document
    rating: number;
    title: string;
    content: PortableTextBlock[]; // Detailed review content in Portable Text format
    date: string; // Date in ISO format
    response?: ReviewResponse; // Optional response to the review
    verifiedPurchase: boolean;
    // Include any other fields as needed
};
