import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

type UserFeedback = {
    satisfied: boolean;
    feedbackComments: PortableTextBlock[]; // Assuming feedback comments are in Portable Text format
};

export type MessageFlag = {
    _id: string;
    _createdAt: Date;
    message: Reference; // Reference to a 'message' document
    flaggedBy: Reference; // Reference to a 'user' document
    reason: string;
    details: PortableTextBlock[]; // Assuming details are in Portable Text format
    flaggedAt: string; // Date in ISO format
    status: 'pending' | 'reviewed' | 'action_taken' | 'dismissed';
    violationType: 'harassment' | 'spam' | 'inappropriate_content' | 'hate_speech' | 'other';
    reviewedBy?: Reference; // Optional, reference to a 'user' document
    reviewedAt?: string; // Optional, date in ISO format
    actionTaken: PortableTextBlock[]; // Assuming action taken details are in Portable Text format
    systemFlagged: boolean;
    userFeedback: UserFeedback;
    auditTrail: Reference[]; // Array of references to 'auditEntry' documents
    // Include any other fields as needed
};
