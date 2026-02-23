import { PriceRange, SearchParams } from "../types";

/**
 * Interface for caching price range calculations
 */
export interface CacheService {
  /**
   * Retrieve cached price ranges
   * @param key Cache key
   * @returns Cached price ranges or null if not found
   */
  get(key: string): Promise<PriceRange[] | null>;

  /**
   * Store price ranges in cache
   * @param key Cache key
   * @param ranges Price ranges to cache
   * @param ttl Time to live in seconds
   */
  set(key: string, ranges: PriceRange[], ttl: number): Promise<void>;

  /**
   * Invalidate cache entries matching pattern
   * @param pattern Pattern to match for invalidation
   */
  invalidate(pattern: string): Promise<void>;

  /**
   * Generate cache key from search parameters
   * @param searchParams Search parameters to hash
   * @returns Generated cache key
   */
  generateKey(searchParams: SearchParams): string;
}
