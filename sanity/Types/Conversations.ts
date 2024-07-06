type Reference = {
    _ref: string;
    _type: string;
};

export type Conversation = {
    _id: string;
    _createdAt: Date;
    participants: Reference[]; // Array of references to 'user' documents
    startedBy: Reference; // Reference to a 'user' document
    createdAt: string; // Date in ISO format
    updatedAt: string; // Date in ISO format
    archived: boolean;
    isGroup: boolean;
    groupName?: string; // Optional, only for group chats
    groupIcon?: {
        _type: 'image';
        asset: Reference;
    }; // Optional, only for group chats
    messages: Reference[]; // Array of references to 'message' documents
};
