import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

export type AuditEntry = {
    actionDate: string; // Date in ISO format
    action: string;
    actionBy: Reference;
    comments: PortableTextBlock[]; // Assuming the comments are in Portable Text format
};
