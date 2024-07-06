type Reference = {
    _ref: string;
    _type: string;
};

export type LocationBasedAdTargeting = {
    _id: string;
    _createdAt: Date;
    adId: Reference; // Reference to an 'ad' document
    targetLocations: Reference[]; // Array of references to 'location' documents
    exclusionZones: Reference[]; // Array of references to 'location' documents for exclusion
    // Include any other fields as needed
};
