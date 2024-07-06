import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

type Reaction = {
    type: string;
    user: Reference; // Reference to a 'user' document
};

type Upload = {
    // Define the upload structure as per your schema
};

type MessageFlag = {
    // Define the message flag structure as per your schema
};

type Metrics = {
    views: number;
    interactions: number;
    // Add more metrics fields if needed
};

export type Message = {
    _id: string;
    _createdAt: Date;
    conversation: Reference; // Reference to a 'conversation' document
    sender: Reference; // Reference to a 'user' document
    timestamp: string; // Date in ISO format
    text: PortableTextBlock[]; // Assuming text content is in Portable Text format
    reactions: Reaction[];
    replies: Message[]; // Array of 'message' documents for threaded conversations
    uploads: Upload[];
    status: 'sent' | 'delivered' | 'read';
    flags: Reference[]; // Array of references to 'messageFlag' documents
    metrics: Metrics;
    // Include any other fields as needed
};
