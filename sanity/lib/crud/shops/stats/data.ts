import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";

/**
 * Get total product count
 */
export const PRODUCT_COUNT_QUERY = defineQuery(`count(*[_type == "product"])`);

/**
 * Get total order count
 */
export const ORDER_COUNT_QUERY = defineQuery(`count(*[_type == "order"])`);

/**
 * Get total revenue from completed orders
 */
export const TOTAL_REVENUE_QUERY = defineQuery(`math::sum(*[
  _type == "order"
  && status in ["paid", "shipped", "delivered"]
].total)`);

// ============================================
// AI Insights Analytics Queries
// ============================================

/**
 * Get orders from the last 7 days with details
 * Excludes draft documents
 */
export const ORDERS_LAST_7_DAYS_QUERY = defineQuery(`*[
  _type == "order"
  && createdAt >= $startDate
  && !(_id in path("drafts.**"))
] | order(createdAt desc) {
  _id,
  orderNumber,
  total,
  status,
  createdAt,
  "itemCount": count(items),
  items[]{
    quantity,
    priceAtPurchase,
    "productName": product->name,
    "productId": product->_id
  }
}`);

/**
 * Get order status distribution
 * Excludes draft documents to get accurate counts
 */
export const ORDER_STATUS_DISTRIBUTION_QUERY = defineQuery(`{
  "paid": count(*[_type == "order" && status == "paid" && !(_id in path("drafts.**"))]),
  "shipped": count(*[_type == "order" && status == "shipped" && !(_id in path("drafts.**"))]),
  "delivered": count(*[_type == "order" && status == "delivered" && !(_id in path("drafts.**"))]),
  "cancelled": count(*[_type == "order" && status == "cancelled" && !(_id in path("drafts.**"))])
}`);

/**
 * Get top selling products by quantity sold
 * Excludes draft documents
 */
export const TOP_SELLING_PRODUCTS_QUERY = defineQuery(`*[
  _type == "order"
  && status in ["paid", "shipped", "delivered"]
  && !(_id in path("drafts.**"))
] {
  items[]{
    "productId": product->_id,
    "productName": product->name,
    "productPrice": product->price,
    quantity
  }
}.items[]`);

/**
 * Get all products with stock and sales data for inventory analysis
 */
export const PRODUCTS_INVENTORY_QUERY = defineQuery(`*[_type == "product"] {
  _id,
  name,
  price,
  stock,
  "category": category->title
}`);

/**
 * Get unfulfilled orders (paid but not yet shipped)
 * Excludes draft documents to get accurate counts
 */
export const UNFULFILLED_ORDERS_QUERY = defineQuery(`*[
  _type == "order"
  && status == "paid"
  && !(_id in path("drafts.**"))
] | order(createdAt asc) {
  _id,
  orderNumber,
  total,
  createdAt,
  email,
  "itemCount": count(items)
}`);

/**
 * Get revenue comparison data (current vs previous period)
 * Excludes draft documents
 */
export const REVENUE_BY_PERIOD_QUERY = defineQuery(`{
  "currentPeriod": math::sum(*[
    _type == "order"
    && status in ["paid", "shipped", "delivered"]
    && createdAt >= $currentStart
    && !(_id in path("drafts.**"))
  ].total),
  "previousPeriod": math::sum(*[
    _type == "order"
    && status in ["paid", "shipped", "delivered"]
    && createdAt >= $previousStart
    && createdAt < $currentStart
    && !(_id in path("drafts.**"))
  ].total),
  "currentOrderCount": count(*[
    _type == "order"
    && createdAt >= $currentStart
    && !(_id in path("drafts.**"))
  ]),
  "previousOrderCount": count(*[
    _type == "order"
    && createdAt >= $previousStart
    && createdAt < $currentStart
    && !(_id in path("drafts.**"))
  ])
}`);

// READ
export const getProductCount = async () => {
  return await client.fetch(PRODUCT_COUNT_QUERY);
};

export const getOrderCount = async () => {
  return await client.fetch(ORDER_COUNT_QUERY);
};

export const getTotalRevenue = async () => {    
  return await client.fetch(TOTAL_REVENUE_QUERY);
};

export const getOrdersLast7Days = async (startDate: string) => {  
  return await client.fetch(ORDERS_LAST_7_DAYS_QUERY, { startDate }); 
};

export const getOrderStatusDistribution = async () => {  
  return await client.fetch(ORDER_STATUS_DISTRIBUTION_QUERY); 
};

export const getTopSellingProducts = async () => {  
  return await client.fetch(TOP_SELLING_PRODUCTS_QUERY); 
};

export const getProductsInventory = async () => {  
  return await client.fetch(PRODUCTS_INVENTORY_QUERY); 
};

export const getUnfulfilledOrders = async () => {  
  return await client.fetch(UNFULFILLED_ORDERS_QUERY); 
};

export const getRevenueByPeriod = async (currentStart: string, previousStart: string) => {  
  return await client.fetch(REVENUE_BY_PERIOD_QUERY, { currentStart, previousStart }); 
};
