type Reference = {
    _ref: string;
    _type: string;
};

type LocationEntry = {
    location: Reference; // Reference to a 'location' document
    timestamp: string; // Date in ISO format
};

export type LocationHistory = {
    _id: string;
    _createdAt: Date;
    userId: Reference; // Reference to a 'user' document
    locations: LocationEntry[]; // Array of location entries
    // Include any other fields as needed
};
