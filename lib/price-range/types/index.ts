// Core types and interfaces for the dynamic price range filter system

export interface PriceRange {
  id: string;
  minPrice: number;
  maxPrice: number;
  count: number;
  label: string;
}

export enum ProductType {
  HOUSE = "house",
  TOY = "toy",
  ELECTRONICS = "electronics",
  GENERAL = "general",
}

export enum ErrorCode {
  CALCULATION_FAILED = "CALCULATION_FAILED",
  INVALID_DATA = "INVALID_DATA",
  CACHE_ERROR = "CACHE_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  NO_RESULTS = "NO_RESULTS",
}

export interface SearchParams {
  category: string;
  location?: string;
  condition?: string;
  [key: string]: any;
}

export interface Currency {
  code: string; // 'ZAR', 'USD'
  symbol: string; // 'R', '$'
  locale: string; // 'en-ZA', 'en-US'
}

export interface PriceStatistics {
  min: number;
  max: number;
  median: number;
  count: number;
  percentiles: number[];
}

export interface PriceRangeRequest {
  searchParams: SearchParams;
  productType: ProductType;
  forceRecalculate?: boolean;
}

export interface PriceRangeResponse {
  ranges: PriceRange[];
  statistics: PriceStatistics;
  cacheKey: string;
  calculatedAt: Date;
}

export interface Listing {
  id: string;
  price: number;
  category: string;
  location: string;
  currency: string;
  title: string;
  // Additional fields can be added as needed
}

export interface SearchResult extends Listing {
  // Extended listing with search-specific metadata
  relevanceScore?: number;
  matchedFilters?: string[];
}
