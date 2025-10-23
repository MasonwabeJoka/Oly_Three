/**
 * Error handling utilities for price range filter system
 */

import { PriceRange, ProductType, Currency } from "../types/price-range.types";

export enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  CACHE_ERROR = "CACHE_ERROR",
  CALCULATION_ERROR = "CALCULATION_ERROR",
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  INSUFFICIENT_DATA = "INSUFFICIENT_DATA",
  INVALID_CONFIGURATION = "INVALID_CONFIGURATION",
}

export class PriceRangeError extends Error {
  constructor(
    message: string,
    public code: ErrorCode,
    public context?: Record<string, any>,
    public recoverable: boolean = true
  ) {
    super(message);
    this.name = "PriceRangeError";
  }
}

export interface ErrorContext {
  operation: string;
  timestamp: Date;
  searchParams?: any;
  productType?: ProductType;
  currency?: Currency;
  stackTrace?: string;
}

export const ErrorHandler = {
  /**
   * Create standardized error with context
   */
  createError(
    message: string,
    code: ErrorCode,
    context?: Partial<ErrorContext>,
    recoverable: boolean = true
  ): PriceRangeError {
    const fullContext: ErrorContext = {
      operation: "unknown",
      timestamp: new Date(),
      ...context,
    };

    return new PriceRangeError(message, code, fullContext, recoverable);
  },

  /**
   * Handle database errors
   */
  handleDatabaseError(error: Error, operation: string): PriceRangeError {
    return this.createError(
      `Database operation failed: ${error.message}`,
      ErrorCode.DATABASE_ERROR,
      { operation, stackTrace: error.stack },
      true
    );
  },

  /**
   * Handle cache errors
   */
  handleCacheError(error: Error, operation: string): PriceRangeError {
    return this.createError(
      `Cache operation failed: ${error.message}`,
      ErrorCode.CACHE_ERROR,
      { operation, stackTrace: error.stack },
      true
    );
  },

  /**
   * Handle calculation errors
   */
  handleCalculationError(
    error: Error,
    prices: number[],
    productType: ProductType
  ): PriceRangeError {
    return this.createError(
      `Price range calculation failed: ${error.message}`,
      ErrorCode.CALCULATION_ERROR,
      {
        operation: "calculateRanges",
        productType,
        priceCount: prices.length,
        stackTrace: error.stack,
      },
      true
    );
  },

  /**
   * Handle insufficient data scenarios
   */
  handleInsufficientData(
    dataCount: number,
    minRequired: number = 1
  ): PriceRangeError {
    return this.createError(
      `Insufficient data for price range calculation. Found ${dataCount} items, minimum ${minRequired} required.`,
      ErrorCode.INSUFFICIENT_DATA,
      {
        operation: "validateData",
        dataCount,
        minRequired,
      },
      false
    );
  },

  /**
   * Handle timeout errors
   */
  handleTimeout(operation: string, timeoutMs: number): PriceRangeError {
    return this.createError(
      `Operation timed out after ${timeoutMs}ms`,
      ErrorCode.TIMEOUT_ERROR,
      { operation, timeoutMs },
      true
    );
  },

  /**
   * Generate fallback price ranges for error scenarios
   */
  generateFallbackRanges(
    minPrice: number = 0,
    maxPrice: number = 1000,
    currency: Currency = Currency.USD
  ): PriceRange[] {
    const rangeCount = 5; // Fewer ranges for fallback
    const step = (maxPrice - minPrice) / rangeCount;

    return Array.from({ length: rangeCount }, (_, index) => ({
      id: `fallback-${index}`,
      minPrice: Math.round(minPrice + step * index),
      maxPrice: Math.round(minPrice + step * (index + 1)),
      count: 0,
      label: `Fallback Range ${index + 1}`,
    }));
  },

  /**
   * Log error with structured format
   */
  logError(error: PriceRangeError): void {
    const logData = {
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        code: error.code,
        recoverable: error.recoverable,
        context: error.context,
      },
    };

    console.error("[PriceRangeFilter]", JSON.stringify(logData, null, 2));
  },

  /**
   * Determine if error is recoverable
   */
  isRecoverable(error: Error): boolean {
    if (error instanceof PriceRangeError) {
      return error.recoverable;
    }

    // Network and timeout errors are usually recoverable
    if (error.name === "NetworkError" || error.name === "TimeoutError") {
      return true;
    }

    // Validation errors are usually not recoverable without fixing input
    if (error.name === "ValidationError") {
      return false;
    }

    // Default to recoverable for unknown errors
    return true;
  },

  /**
   * Get user-friendly error message
   */
  getUserFriendlyMessage(error: PriceRangeError): string {
    switch (error.code) {
      case ErrorCode.INSUFFICIENT_DATA:
        return "Not enough data to generate price ranges. Try broadening your search criteria.";

      case ErrorCode.DATABASE_ERROR:
        return "Unable to load price data. Please try again in a moment.";

      case ErrorCode.CACHE_ERROR:
        return "Loading price ranges... This may take a moment.";

      case ErrorCode.CALCULATION_ERROR:
        return "Unable to calculate price ranges. Using default ranges instead.";

      case ErrorCode.NETWORK_ERROR:
        return "Network connection issue. Please check your connection and try again.";

      case ErrorCode.TIMEOUT_ERROR:
        return "Request timed out. Please try again.";

      case ErrorCode.VALIDATION_ERROR:
        return "Invalid search parameters. Please check your filters and try again.";

      default:
        return "An unexpected error occurred. Please try again.";
    }
  },

  /**
   * Retry logic for recoverable errors
   */
  async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        if (!this.isRecoverable(lastError) || attempt === maxRetries) {
          throw lastError;
        }

        // Exponential backoff
        const delay = delayMs * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  },
};
