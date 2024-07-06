type Reference = {
    _ref: string;
    _type: string;
};

export type Bid = {
    _id: string;
    _createdAt: Date;
    amount: number;
    bidder: Reference;
    bidDate: string; // Date in ISO format
    associatedAd: Reference;
    isLive: boolean;
    bidStartTime?: string; // Optional, Date in ISO format
    bidDropOutTime?: string; // Optional, Date in ISO format
    bidStatus: 'bidding' | 'dropped-out';
};
