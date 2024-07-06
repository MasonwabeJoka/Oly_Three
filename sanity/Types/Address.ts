type Reference = {
    _ref: string;
    _type: string;
};

type GeoPoint = {
    _type: 'geopoint';
    lat: number;
    lng: number;
    alt?: number;
    // Include additional fields if needed
};

type PortableTextBlock = {
    // Define this type according to your Portable Text specification
};

export type Address = {
    _id: string;
    _createdAt: Date;
    addressLine1: string;
    addressLine2?: string; // Optional field
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isBillingAddress: boolean;
    isShippingAddress: boolean;
    userId: Reference;
    additionalInfo?: PortableTextBlock[]; // Optional field
    location?: GeoPoint; // Optional field
    contactPhone?: string; // Optional field
    contactEmail?: string; // Optional field
    // Add any other relevant fields as needed
};
