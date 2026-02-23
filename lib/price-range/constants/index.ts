import { ProductType, Currency } from "../types";

/**
 * Rounding increments for different product types
 */
export const ROUNDING_INCREMENTS: Record<ProductType, number> = {
  [ProductType.HOUSE]: 10000, // R10,000 for houses
  [ProductType.TOY]: 10, // $10 for toys
  [ProductType.ELECTRONICS]: 100, // $100 for electronics
  [ProductType.GENERAL]: 50, // $50 for general items
};

/**
 * Default currencies for different product types
 */
export const DEFAULT_CURRENCIES: Record<ProductType, Currency> = {
  [ProductType.HOUSE]: {
    code: "ZAR",
    symbol: "R",
    locale: "en-ZA",
  },
  [ProductType.TOY]: {
    code: "USD",
    symbol: "$",
    locale: "en-US",
  },
  [ProductType.ELECTRONICS]: {
    code: "USD",
    symbol: "$",
    locale: "en-US",
  },
  [ProductType.GENERAL]: {
    code: "USD",
    symbol: "$",
    locale: "en-US",
  },
};

/**
 * Cache TTL values in seconds
 */
export const CACHE_TTL = {
  DYNAMIC_RANGES: 3600, // 1 hour for dynamic ranges
  STATIC_CATEGORIES: 86400, // 24 hours for static categories
  PRICE_STATISTICS: 1800, // 30 minutes for statistics
} as const;

/**
 * Performance targets
 */
export const PERFORMANCE_TARGETS = {
  MAX_CALCULATION_TIME: 500, // 500ms max for range calculation
  MAX_DB_QUERY_TIME: 200, // 200ms max for database queries
  MAX_UI_RESPONSE_TIME: 100, // 100ms max for UI interactions
  TARGET_CACHE_HIT_RATIO: 0.8, // 80% cache hit ratio target
} as const;

/**
 * Algorithm configuration
 */
export const ALGORITHM_CONFIG = {
  TARGET_RANGE_COUNT: 8, // Always aim for 8 ranges
  MIN_RANGE_COUNT: 3, // Minimum ranges when data is limited
  MIN_ITEMS_PER_RANGE: 1, // Minimum items per range
  CLUSTERING_FALLBACK_THRESHOLD: 0.1, // Use clustering if quantiles create ranges with <10% variance
} as const;
