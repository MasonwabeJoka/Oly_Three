import { defineQuery } from "next-sanity";

/**
 * Get orders by Clerk user ID
 * Used on orders list page
 */
export const ORDERS_BY_USER_QUERY = defineQuery(`*[
  _type == "order"
  && clerkUserId == $clerkUserId
] | order(createdAt desc) {
  _id,
  orderNumber,
  total,
  status,
  createdAt,
  "itemCount": count(items),
  "itemNames": items[].product->name,
  "itemImages": items[].product->images[0].asset->url
}`);

/**
 * Get single order by ID with full details
 * Used on order detail page
 */
export const ORDER_BY_ID_QUERY = defineQuery(`*[
  _type == "order"
  && _id == $id
][0] {
  _id,
  orderNumber,
  clerkUserId,
  email,
  items[]{
    _key,
    quantity,
    priceAtPurchase,
    product->{
      _id,
      name,
      "slug": slug.current,
      "image": images[0]{
        asset->{
          _id,
          url
        }
      }
    }
  },
  total,
  status,
  address{
    name,
    line1,
    line2,
    city,
    postcode,
    country
  },
  stripePaymentId,
  createdAt
}`);

/**
 * Get recent orders (for admin dashboard)
 */
export const RECENT_ORDERS_QUERY = defineQuery(`*[
  _type == "order"
] | order(createdAt desc) [0...$limit] {
  _id,
  orderNumber,
  email,
  total,
  status,
  createdAt
}`);

/**
 * Check if order exists by Stripe payment ID
 * Used for webhook idempotency check
 */
export const ORDER_BY_STRIPE_PAYMENT_ID_QUERY = defineQuery(`*[
  _type == "order"
  && stripePaymentId == $stripePaymentId
][0]{ _id }`);


// Read
export const getOrdersByUser = async (workosUserId: string) => {
  const orders = await client.fetch(ORDERS_BY_USER_QUERY, { workosUserId });
  return orders;
};  

export const getOrderById = async (id: string) => {
  const order = await client.fetch(ORDER_BY_ID_QUERY, { id });
  return order;
};

export const getRecentOrders = async (limit: number) => {   
  const orders = await client.fetch(RECENT_ORDERS_QUERY, { limit });  
  return orders;
};

export const getOrderByStripePaymentId = async (stripePaymentId: string) => {
  const order = await client.fetch(ORDER_BY_STRIPE_PAYMENT_ID_QUERY, { stripePaymentId });
  return order;
};