type Reference = {
    _ref: string;
    _type: string;
};

export type RegionalTrends = {
    _id: string;
    _createdAt: Date;
    region: string; // The region for which trends are being analyzed
    trendData: Reference; // Reference to a 'trendData' document
    // Include any other fields as needed
};
