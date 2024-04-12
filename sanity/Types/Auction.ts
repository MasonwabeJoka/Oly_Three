type Reference = {
    _ref: string;
    _type: string;
};

export type Auction = {
    _id: string;
    _createdAt: Date;
    startingPrice: number;
    estimatedPrice: number;
    highestBid: Reference;
    serviceFeeBidder: number;
    serviceFeeAdvertiser: number;
    liveBiddingStart: string; // Date in ISO format
    duration: number;
    timeLeft: number;
    minimumBid: number;
    biddersList: Reference[];
    currentLiveBidders: Reference[];
    totalBidders: number;
    currentLiveBiddersCount: number;
    lots: Reference[];
    upcoming: boolean;
    favoritedBy: Reference[];
    partOfMyAuctions: boolean;
    buyNowOption: boolean;
    auctionType: 'live' | 'timed' | 'buy-now';
    remainingTime: string; // Date in ISO format
};
