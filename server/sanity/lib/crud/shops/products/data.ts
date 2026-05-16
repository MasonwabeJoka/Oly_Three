// Moved to sanity/services/shops/products.ts
export {
  getShopCategories,
  getCategoryBySlug,
  getFeaturedProducts,
  getFilteredProducts,
} from "@/server/sanity/services/shops/products";

// Query constants re-exported from sanity/queries/shops.ts
export {
  ALL_PRODUCTS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  SEARCH_PRODUCTS_QUERY,
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
  PRODUCTS_BY_IDS_QUERY,
  LOW_STOCK_PRODUCTS_QUERY,
  OUT_OF_STOCK_PRODUCTS_QUERY,
  AI_SEARCH_PRODUCTS_QUERY,
} from "@/server/sanity/queries/shops";
