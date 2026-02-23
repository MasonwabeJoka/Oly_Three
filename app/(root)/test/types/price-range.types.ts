/**
 * Core TypeScript interfaces and types for the dynamic price range filter system
 */

export interface PriceRange {
  id: string;
  minPrice: number;
  maxPrice: number;
  count: number;
  label: string;
}

export enum ProductType {
  HOUSE = 'house',
  TOY = 'toy',
  ELECTRONICS = 'electronics',
  GENERAL = 'general'
}

export enum Currency {
  ZAR = 'ZAR',
  USD = 'USD'
}

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  locale: string;
  roundingIncrement: number;
}

export interface SearchParams {
  category: string;
  location?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  [key: string]: any;
}

export interface PriceStatistics {
  min: number;
  max: number;
  median: number;
  count: number;
  percentiles: number[];
  mean: number;
  standardDeviation: number;
}

export interface PriceRangeRequest {
  searchParams: SearchParams;
  productType: ProductType;
  currency: Currency;
  forceRecalculate?: boolean;
}

export interface PriceRangeResponse {
  ranges: PriceRange[];
  statistics: PriceStatistics;
  cacheKey: string;
  calculatedAt: Date;
  productType: ProductType;
  currency: Currency;
}

export interface FilterState {
  selectedPriceRanges: string[];
  availableRanges: PriceRange[];
  isLoading: boolean;
  error: string | null;
  searchParams: SearchParams;
}

export interface FilterActions {
  selectRange: (rangeId: string) => void;
  deselectRange: (rangeId: string) => void;
  clearAllRanges: () => void;
  updateAvailableRanges: (ranges: PriceRange[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface Listing {
  id: string;
  price: number;
  category: string;
  location: string;
  currency: Currency;
  title: string;
  condition?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResult {
  listings: Listing[];
  totalCount: number;
  priceRanges: PriceRange[];
  appliedFilters: SearchParams;
}