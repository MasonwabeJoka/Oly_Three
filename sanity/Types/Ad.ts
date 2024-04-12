import { PortableTextBlock } from "sanity";

type Image = {
    _key: string;
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
    alt?: string;
    hotspot?: any; // Define as per your requirements
    metadata?: {
        blurhash?: string;
        lqip?: string;
        palette?: any; // Define as per your requirements
        exif?: any; // Define as per your requirements
        location?: any; // Define as per your requirements
    };
};

type AdPromotion = {
    platform: string;
    duration: string;
    remainingDays: number;
};

type Location = {
    _type: 'location';
    coordinates: {
        _type: 'geopoint';
        lat: number;
        lng: number;
    };
    address: string;
    city: string;
    region: string;
    country: string;
    postalCode: string;
}

type Reference = {
    _ref: string;
    _type: string;
};

type PostedOn = {
    name: string;
    title: string;
    type: 'datetime';
    options: {
        dateFormat: string;
        timeFormat: string;
    };
    initialValue: string;
}

export type Ad = {
    _id: string;
    _createdAt: Date;
    slug: {
        _type: 'slug';
        current: string;
    };
    adId: string;
    title: string;
    description: PortableTextBlock[];
    location: Location;
    suburb?: string;
    city?: string;
    price: number;
    images: Image[];
    postedOn: PostedOn;
    avatar: Reference;
    details: string[];
    features: string[];
    pricingOption: 'negotiable' | 'free' | 'auction' | 'fixed_price' | 'contact_for_price';
    quantity: number;
    attachment: {
        _type: 'file';
        asset: Reference;
    };
    condition: 'new' | 'like-new' | 'gently-used' | 'used';
    promotions: AdPromotion[];
    bids: Reference[];
    likes: number;
    todaysViews: number;
    totalViews: number;
    unreadMessages: number;
    associatedAuction: Reference;
};
