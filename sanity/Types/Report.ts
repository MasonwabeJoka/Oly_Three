import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

export type Report = {
    _id: string;
    _createdAt: Date;
    reportedBy: Reference; // Reference to a 'user' document (user who created the report)
    reportedUser: Reference; // Reference to a 'user' document (user who is being reported)
    reason: PortableTextBlock[]; // Reason for the report, in Portable Text format
    details: PortableTextBlock[]; // Additional details, in Portable Text format
    createdAt: string; // Date in ISO format
    // Include any other fields as needed
};
