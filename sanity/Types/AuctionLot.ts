import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

export type AuctionLot = {
    _id: string;
    _createdAt: Date;
    biddingHistory: Reference[]; // Array of references to 'bid' documents
    auctionStartDate: string; // Date in ISO format
    shippingDetails: PortableTextBlock[]; // Shipping information in Portable Text format
    returnPolicy: PortableTextBlock[]; // Return policy details in Portable Text format
    lotStatus: 'active' | 'closed' | 'sold' | 'unsold'; // Current status of the lot
    buyer?: Reference; // Optional, reference to a 'user' document
    sellerNotes: PortableTextBlock[]; // Additional notes from the seller in Portable Text format
    currentHighestBid?: Reference; // Optional, reference to a 'bid' document
    auctionEndDate: string; // Date in ISO format
    paymentTerms: PortableTextBlock[]; // Payment terms in Portable Text format
    // Include any other fields as needed
};
