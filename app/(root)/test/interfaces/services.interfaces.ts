/**
 * Service interfaces for the dynamic price range filter system
 */

import { 
  PriceRange, 
  PriceStatistics, 
  SearchParams, 
  ProductType, 
  Currency,
  Listing,
  SearchResult,
  PriceRangeRequest,
  PriceRangeResponse
} from '../types/price-range.types';

export interface PriceRangeCalculator {
  /**
   * Calculate price ranges based on price distribution
   */
  calculateRanges(prices: number[], productType: ProductType, currency: Currency): Promise<PriceRange[]>;
  
  /**
   * Validate and filter price data
   */
  validatePrices(prices: number[]): number[];
  
  /**
   * Round price according to product type and currency
   */
  roundPrice(price: number, productType: ProductType, currency: Currency): number;
  
  /**
   * Calculate price statistics for a dataset
   */
  calculateStatistics(prices: number[]): PriceStatistics;
  
  /**
   * Generate user-friendly labels for price ranges
   */
  generateRangeLabel(minPrice: number, maxPrice: number, currency: Currency): string;
}

export interface CacheService {
  /**
   * Get cached price ranges
   */
  get(key: string): Promise<PriceRange[] | null>;
  
  /**
   * Set price ranges in cache
   */
  set(key: string, ranges: PriceRange[], ttl: number): Promise<void>;
  
  /**
   * Invalidate cache entries matching pattern
   */
  invalidate(pattern: string): Promise<void>;
  
  /**
   * Generate cache key from search parameters
   */
  generateKey(searchParams: SearchParams, productType: ProductType): string;
  
  /**
   * Check if cache is available
   */
  isAvailable(): Promise<boolean>;
}

export interface DatabaseService {
  /**
   * Get prices for search parameters
   */
  getPricesForSearch(params: SearchParams): Promise<number[]>;
  
  /**
   * Get filtered search results
   */
  getFilteredResults(params: SearchParams, priceRanges?: PriceRange[]): Promise<SearchResult>;
  
  /**
   * Get price statistics for search parameters
   */
  getPriceStatistics(params: SearchParams): Promise<PriceStatistics>;
  
  /**
   * Get listings within price ranges
   */
  getListingsInPriceRanges(params: SearchParams, rangeIds: string[]): Promise<Listing[]>;
  
  /**
   * Check database connection health
   */
  healthCheck(): Promise<boolean>;
}

export interface PriceRangeService {
  /**
   * Get dynamic price ranges for search
   */
  getDynamicRanges(request: PriceRangeRequest): Promise<PriceRangeResponse>;
  
  /**
   * Filter results by selected price ranges
   */
  filterByRanges(searchParams: SearchParams, selectedRangeIds: string[]): Promise<SearchResult>;
  
  /**
   * Invalidate cache for search parameters
   */
  invalidateCache(searchParams: SearchParams): Promise<void>;
  
  /**
   * Precompute ranges for popular searches
   */
  precomputePopularRanges(): Promise<void>;
}

export interface AnalyticsService {
  /**
   * Track price range selection
   */
  trackRangeSelection(rangeId: string, searchParams: SearchParams): Promise<void>;
  
  /**
   * Track filter usage patterns
   */
  trackFilterUsage(filterType: string, value: string): Promise<void>;
  
  /**
   * Get popular price ranges
   */
  getPopularRanges(productType: ProductType, limit?: number): Promise<PriceRange[]>;
  
  /**
   * Track performance metrics
   */
  trackPerformance(operation: string, duration: number, metadata?: Record<string, any>): Promise<void>;
}

export interface CurrencyService {
  /**
   * Format price according to currency and locale
   */
  formatPrice(price: number, currency: Currency): string;
  
  /**
   * Convert price between currencies
   */
  convertPrice(price: number, fromCurrency: Currency, toCurrency: Currency): Promise<number>;
  
  /**
   * Get exchange rate between currencies
   */
  getExchangeRate(fromCurrency: Currency, toCurrency: Currency): Promise<number>;
  
  /**
   * Detect currency from product type and location
   */
  detectCurrency(productType: ProductType, location?: string): Currency;
}

export interface MockDataService {
  /**
   * Generate mock listings for testing
   */
  generateMockListings(productType: ProductType, count: number): Listing[];
  
  /**
   * Generate price distribution for testing
   */
  generatePriceDistribution(type: 'uniform' | 'normal' | 'clustered', min: number, max: number, count: number): number[];
  
  /**
   * Get predefined test datasets
   */
  getTestDataset(name: string): Listing[];
  
  /**
   * Create edge case test data
   */
  createEdgeCaseData(scenario: string): Listing[];
}