/**
 * Currency configuration constants for different product types and regions
 */

import { Currency, CurrencyConfig, ProductType } from '../types/price-range.types';

export const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  [Currency.ZAR]: {
    code: Currency.ZAR,
    symbol: 'R',
    locale: 'en-ZA',
    roundingIncrement: 10000, // Default for houses
  },
  [Currency.USD]: {
    code: Currency.USD,
    symbol: '$',
    locale: 'en-US',
    roundingIncrement: 100, // Default for electronics
  },
};

export const PRODUCT_TYPE_ROUNDING: Record<ProductType, Record<Currency, number>> = {
  [ProductType.HOUSE]: {
    [Currency.ZAR]: 10000, // R10,000
    [Currency.USD]: 5000,  // $5,000
  },
  [ProductType.TOY]: {
    [Currency.ZAR]: 10,    // R10
    [Currency.USD]: 10,    // $10
  },
  [ProductType.ELECTRONICS]: {
    [Currency.ZAR]: 100,   // R100
    [Currency.USD]: 100,   // $100
  },
  [ProductType.GENERAL]: {
    [Currency.ZAR]: 50,    // R50
    [Currency.USD]: 50,    // $50
  },
};

export const DEFAULT_CURRENCY_BY_PRODUCT: Record<ProductType, Currency> = {
  [ProductType.HOUSE]: Currency.ZAR,
  [ProductType.TOY]: Currency.USD,
  [ProductType.ELECTRONICS]: Currency.USD,
  [ProductType.GENERAL]: Currency.USD,
};

export const CACHE_TTL = {
  PRICE_RANGES: 3600, // 1 hour
  STATIC_RANGES: 86400, // 24 hours
  PRICE_STATISTICS: 1800, // 30 minutes
} as const;

export const PERFORMANCE_TARGETS = {
  MAX_CALCULATION_TIME: 500, // milliseconds
  MAX_QUERY_TIME: 200, // milliseconds
  MIN_CACHE_HIT_RATIO: 0.8, // 80%
  MAX_MEMORY_USAGE: 50 * 1024 * 1024, // 50MB
} as const;

export const ALGORITHM_CONSTANTS = {
  TARGET_RANGE_COUNT: 8,
  MIN_ITEMS_PER_RANGE: 1,
  MAX_DATASET_SIZE: 100000,
  QUANTILE_DIVISIONS: 8,
} as const;