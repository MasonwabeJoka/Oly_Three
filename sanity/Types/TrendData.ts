type AveragePrice = {
    category: string;
    value: number;
};

type SearchVolume = {
    keyword: string;
    count: number;
};

type UserEngagement = {
    pageViews: number;
    timeSpent: number;
};

type AdsPerCategory = {
    category: string;
    count: number;
};

type AdPostings = {
    totalAds: number;
    adsPerCategory: AdsPerCategory;
};

type Demographics = {
    ageGroups: string[];
    genderRatio: string;
};

type MarketGrowth = {
    yearlyGrowth: number;
    // Add other growth metrics as needed
};

export type TrendData = {
    _id: string;
    _createdAt: Date;
    popularCategories: string[]; // Most popular categories
    averagePrice: AveragePrice; // Average price of items within popular categories
    searchVolume: SearchVolume; // Volume of searches for specific keywords
    userEngagement: UserEngagement; // Metrics indicating user engagement
    adPostings: AdPostings; // Number of ad postings, including category breakdowns
    demographics: Demographics; // Demographic information of users
    marketGrowth: MarketGrowth; // Market growth metrics
    // Uncomment and define types for consumerBehavior if needed
};
