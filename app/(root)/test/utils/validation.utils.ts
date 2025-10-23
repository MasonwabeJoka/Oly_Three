/**
 * Validation utilities for price range filter system
 */

import { SearchParams, ProductType, Currency, PriceRange } from '../types/price-range.types';

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const ValidationUtils = {
  /**
   * Validate price value
   */
  validatePrice(price: number): boolean {
    return typeof price === 'number' && 
           !isNaN(price) && 
           isFinite(price) && 
           price >= 0;
  },

  /**
   * Validate array of prices
   */
  validatePrices(prices: number[]): { valid: number[]; invalid: number[] } {
    const valid: number[] = [];
    const invalid: number[] = [];

    prices.forEach(price => {
      if (this.validatePrice(price)) {
        valid.push(price);
      } else {
        invalid.push(price);
      }
    });

    return { valid, invalid };
  },

  /**
   * Validate search parameters
   */
  validateSearchParams(params: SearchParams): void {
    if (!params.category || typeof params.category !== 'string') {
      throw new ValidationError('Category is required and must be a string', 'category');
    }

    if (params.minPrice !== undefined && !this.validatePrice(params.minPrice)) {
      throw new ValidationError('Invalid minimum price', 'minPrice');
    }

    if (params.maxPrice !== undefined && !this.validatePrice(params.maxPrice)) {
      throw new ValidationError('Invalid maximum price', 'maxPrice');
    }

    if (params.minPrice !== undefined && params.maxPrice !== undefined && params.minPrice > params.maxPrice) {
      throw new ValidationError('Minimum price cannot be greater than maximum price', 'priceRange');
    }
  },

  /**
   * Validate product type
   */
  validateProductType(productType: string): ProductType {
    if (!Object.values(ProductType).includes(productType as ProductType)) {
      throw new ValidationError(`Invalid product type: ${productType}`, 'productType');
    }
    return productType as ProductType;
  },

  /**
   * Validate currency
   */
  validateCurrency(currency: string): Currency {
    if (!Object.values(Currency).includes(currency as Currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
    return currency as Currency;
  },

  /**
   * Validate price range
   */
  validatePriceRange(range: PriceRange): void {
    if (!range.id || typeof range.id !== 'string') {
      throw new ValidationError('Price range ID is required', 'id');
    }

    if (!this.validatePrice(range.minPrice)) {
      throw new ValidationError('Invalid minimum price in range', 'minPrice');
    }

    if (!this.validatePrice(range.maxPrice)) {
      throw new ValidationError('Invalid maximum price in range', 'maxPrice');
    }

    if (range.minPrice >= range.maxPrice) {
      throw new ValidationError('Minimum price must be less than maximum price', 'priceRange');
    }

    if (typeof range.count !== 'number' || range.count < 0) {
      throw new ValidationError('Count must be a non-negative number', 'count');
    }

    if (!range.label || typeof range.label !== 'string') {
      throw new ValidationError('Price range label is required', 'label');
    }
  },

  /**
   * Validate array of price ranges
   */
  validatePriceRanges(ranges: PriceRange[]): void {
    if (!Array.isArray(ranges)) {
      throw new ValidationError('Price ranges must be an array');
    }

    ranges.forEach((range, index) => {
      try {
        this.validatePriceRange(range);
      } catch (error) {
        throw new ValidationError(`Invalid price range at index ${index}: ${error.message}`);
      }
    });

    // Check for overlapping ranges
    const sortedRanges = [...ranges].sort((a, b) => a.minPrice - b.minPrice);
    for (let i = 0; i < sortedRanges.length - 1; i++) {
      if (sortedRanges[i].maxPrice > sortedRanges[i + 1].minPrice) {
        throw new ValidationError(`Overlapping price ranges detected: ${sortedRanges[i].label} and ${sortedRanges[i + 1].label}`);
      }
    }
  },

  /**
   * Sanitize search parameters
   */
  sanitizeSearchParams(params: any): SearchParams {
    const sanitized: SearchParams = {
      category: String(params.category || '').trim(),
    };

    if (params.location) {
      sanitized.location = String(params.location).trim();
    }

    if (params.condition) {
      sanitized.condition = String(params.condition).trim();
    }

    if (params.minPrice !== undefined) {
      const minPrice = Number(params.minPrice);
      if (this.validatePrice(minPrice)) {
        sanitized.minPrice = minPrice;
      }
    }

    if (params.maxPrice !== undefined) {
      const maxPrice = Number(params.maxPrice);
      if (this.validatePrice(maxPrice)) {
        sanitized.maxPrice = maxPrice;
      }
    }

    // Copy other valid parameters
    Object.keys(params).forEach(key => {
      if (!['category', 'location', 'condition', 'minPrice', 'maxPrice'].includes(key)) {
        sanitized[key] = params[key];
      }
    });

    return sanitized;
  },

  /**
   * Validate range selection IDs
   */
  validateRangeIds(rangeIds: string[], availableRanges: PriceRange[]): string[] {
    if (!Array.isArray(rangeIds)) {
      return [];
    }

    const availableIds = new Set(availableRanges.map(r => r.id));
    return rangeIds.filter(id => typeof id === 'string' && availableIds.has(id));
  }
};