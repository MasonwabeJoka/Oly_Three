type GeoPoint = {
    _type: 'geopoint';
    lat: number;
    lng: number;
    alt?: number; // Include if altitude is relevant
};

export type Location = {
    _id: string;
    _createdAt: Date;
    coordinates: GeoPoint;
    address: string;
    suburb: string;
    city: string;
    region: string;
    country: string;
    postalCode: string;
    // Include any other fields as needed
};
