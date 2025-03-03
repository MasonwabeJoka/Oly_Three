export interface Auction {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    startTime: Date;
    endTime: Date;
    currentBid: number;
    highestBidder: string;
  }