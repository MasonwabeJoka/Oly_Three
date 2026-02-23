import {
  SearchParams,
  PriceStatistics,
  SearchResult,
  PriceRange,
} from "../types";

/**
 * Interface for database operations related to price ranges
 */
export interface DatabaseService {
  /**
   * Get all prices for a given search query
   * @param params Search parameters
   * @returns Array of prices matching the search
   */
  getPricesForSearch(params: SearchParams): Promise<number[]>;

  /**
   * Get filtered search results based on price ranges
   * @param params Search parameters
   * @param priceRanges Selected price ranges for filtering
   * @returns Filtered search results
   */
  getFilteredResults(
    params: SearchParams,
    priceRanges: PriceRange[]
  ): Promise<SearchResult[]>;

  /**
   * Get price statistics for a search query
   * @param params Search parameters
   * @returns Statistical data about prices
   */
  getPriceStatistics(params: SearchParams): Promise<PriceStatistics>;
}
