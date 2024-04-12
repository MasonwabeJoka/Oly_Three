import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

export type Group = {
    _id: string;
    _createdAt: Date;
    title: string;
    description: PortableTextBlock[]; // Assuming the description is in Portable Text format
    category: string;
    members: Reference[]; // Array of references to 'user' documents
    createdBy: Reference; // Reference to a 'user' document
    createdAt: string; // Date in ISO format
    updatedAt: string; // Date in ISO format
    isActive: boolean;
};
