type Reference = {
    _ref: string;
    _type: string;
};

export type BidderHistory = {
    _id: string;
    _createdAt: Date;
    bidder: Reference;
    bids: Reference[]; // Array of references to 'bid' documents
};
