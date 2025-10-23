import { PriceRange, ProductType } from "../types";

/**
 * Interface for the price range calculation service
 */
export interface PriceRangeCalculator {
  /**
   * Calculate 8 dynamic price ranges based on price distribution
   * @param prices Array of prices to analyze
   * @param productType Type of product for appropriate rounding
   * @returns Array of calculated price ranges
   */
  calculateRanges(prices: number[], productType: ProductType): PriceRange[];

  /**
   * Validate and filter price data
   * @param prices Raw price array that may contain invalid values
   * @returns Cleaned array of valid prices
   */
  validatePrices(prices: number[]): number[];

  /**
   * Round price to appropriate increment based on product type
   * @param price Price to round
   * @param productType Type of product for rounding rules
   * @returns Rounded price
   */
  roundPrice(price: number, productType: ProductType): number;
}
