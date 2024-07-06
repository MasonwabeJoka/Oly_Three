type Reference = {
    _ref: string;
    _type: string;
};

export type LocationBasedRecommendationSettings = {
    _id: string;
    _createdAt: Date;
    userId: Reference; // Reference to a 'user' document
    enableRecommendations: boolean; // Indicates if the user has opted to receive location-based recommendations
    // Include any other fields as needed
};
