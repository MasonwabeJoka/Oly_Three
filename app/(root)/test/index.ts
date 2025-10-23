/**
 * Main entry point for the dynamic price range filter system
 * Exports all core types, interfaces, and utilities
 */

// Core types and interfaces
export * from './types/price-range.types';
export * from './interfaces/services.interfaces';

// Constants and configuration
export * from './constants/currency.constants';

// Utilities
export * from './utils/validation.utils';
export * from './utils/error-handling.utils';

// Re-export commonly used types for convenience
export type {
  PriceRange,
  ProductType,
  Currency,
  SearchParams,
  PriceStatistics,
  FilterState,
  FilterActions,
  Listing,
  SearchResult
} from './types/price-range.types';

export type {
  PriceRangeCalculator,
  CacheService,
  DatabaseService,
  PriceRangeService,
  AnalyticsService,
  CurrencyService,
  MockDataService
} from './interfaces/services.interfaces';

// Export utility classes
export { ValidationUtils, ValidationError } from './utils/validation.utils';
export { ErrorHandler, PriceRangeError, ErrorCode } from './utils/error-handling.utils';