type Reference = {
    _ref: string;
    _type: string;
};

export type LocationAlertSettings = {
    _id: string;
    _createdAt: Date;
    userId: Reference; // Reference to a 'user' document
    alertLocations: Reference[]; // Array of references to 'location' documents
    alertTypes: string[]; // Array of strings representing alert types
    // Include any other fields as needed
};
