type Reference = {
    _ref: string;
    _type: string;
};

export type UserLocationPreference = {
    _id: string;
    _createdAt: Date;
    userId: Reference; // Reference to a 'user' document
    preferredLocations: Reference[]; // Array of references to 'location' documents
    // Include any other fields as needed
};
