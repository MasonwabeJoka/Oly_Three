import { PortableTextBlock } from "sanity";

type Reference = {
    _ref: string;
    _type: string;
};

type Image = {
    _type: 'image';
    asset: Reference;
    // Include other image properties as needed
};

type NotificationSettings = {
    emailNotifications: boolean;
    pushNotifications: boolean;
    // ... other notification settings
};

type PrivacySettings = {
    showEmail: boolean;
    showPhoneNumber: boolean;
    allowMessaging: boolean;
    profileVisibility: 'public' | 'private';
    currentLocation?: Reference; // Optional, reference to a 'location' document
    locationPreferences?: Reference; // Optional, reference to a 'userLocationPreference' document
    locationAlerts?: Reference; // Optional, reference to a 'locationAlertSettings' document
    languagePreference: string;
    paymentMethods: Reference[]; // Array of references to 'paymentMethod' documents
    watchList: Reference[]; // Array of references to 'ad' documents
    userRating: number;
    recentlyViewedAds: Reference[]; // Array of references to 'ad' documents
    accountCreationDate: string; // Date in ISO format
    lastLogin: string; // Date in ISO format
    newsletterSubscription: boolean;
    marketingPreferences: MarketingPreferences;
    securitySettings: SecuritySettings;
    customPreferences: CustomPreferences;
    // ... other fields as needed
};

type MarketingPreferences = {
    receivePromotionalOffers: boolean;
    preferredCategories: string[];
    // ... other marketing preferences
};

type SecuritySettings = {
    twoFactorAuthentication: boolean;
    // ... other security settings
};

type CustomPreferences = {
    displayMode: 'light' | 'dark';
    notificationSound: boolean;
    // ... other custom preferences
};

export type User = {
    _id: string;
    _createdAt: Date;
    name: string;
    lastname: string;
    username: string;
    email: string;
    userType: 'buyer' | 'seller' | 'professional_seller' | 'service_provider' | 'job_seeker' | 'employer' | 'casual_browser' | 'community_member' | 'administrator' | 'advertiser';
    postedAds: Reference[]; // Array of references to 'ad' documents
    participatedAuctions: Reference[]; // Array of references to 'auction' documents
    bids: Reference[]; // Array of references to 'bid' documents
    favourites: Reference[]; // Array of references to 'ad' documents
    profileImage?: Image; // Optional, profile image
    bio: PortableTextBlock[]; // Biography in Portable Text format
    transactionHistory: Reference[]; // Array of references to 'transaction' documents
    reviews: Reference[]; // Array of references to 'review' documents
    messages: Reference[]; // Array of references to 'message' documents
    isChatGroupAdmin: boolean;
    notificationSettings: NotificationSettings;
    privacySettings: PrivacySettings;
    
};
