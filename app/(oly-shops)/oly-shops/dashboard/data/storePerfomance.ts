
export type StorePerformance = {
  storeId: string;
  storeName: string;
  totalRevenue: number;
  activeListings: number;
  ordersThisMonth: number;
  bestCategory: string;
  storeRating: number;
};

export const storePerformance: StorePerformance[] = [
  {
    storeId: "STORE-001",
    storeName: "GadgetWorld",
    totalRevenue: 48000.0,
    activeListings: 120,
    ordersThisMonth: 480,
    bestCategory: "Electronics",
    storeRating: 4.7,
  },
  {
    storeId: "STORE-002",
    storeName: "HomeComforts",
    totalRevenue: 22300.0,
    activeListings: 85,
    ordersThisMonth: 190,
    bestCategory: "Furniture",
    storeRating: 4.3,
  },
  {
    storeId: "STORE-003",
    storeName: "QuickServices",
    totalRevenue: 7800.0,
    activeListings: 12,
    ordersThisMonth: 95,
    bestCategory: "Car Wash",
    storeRating: 4.8,
  },
];
