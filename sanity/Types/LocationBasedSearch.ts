type Reference = {
    _ref: string;
    _type: string;
};

type GeoPoint = {
    _type: 'geopoint';
    lat: number;
    lng: number;
    alt?: number; // Include if altitude is relevant
};

type FilterCriteria = {
    categories: Reference[]; // Array of references to 'category' documents
    // Include additional filter criteria as needed (e.g., price range, item condition, etc.)
};

export type LocationBasedSearch = {
    _id: string;
    _createdAt: Date;
    userId: Reference; // Reference to a 'user' document
    country: string;
    stateOrProvince: string;
    city: string;
    suburb: string;
    searchRadius: number;
    baseLocation: GeoPoint;
    includeNearbyAreas: boolean;
    filterCriteria: FilterCriteria;
    savedSearchName: string;
    lastUsed: string; // Date in ISO format
    // Include any other fields as needed
};
