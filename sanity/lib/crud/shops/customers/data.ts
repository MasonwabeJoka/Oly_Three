import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

export const CUSTOMER_BY_EMAIL_QUERY = defineQuery(`*[
  _type == "customer"
  && email == $email
][0]{
  _id,
  email,
  name,
  clerkUserId,
  stripeCustomerId,
  createdAt
}`);

export const CUSTOMER_BY_STRIPE_ID_QUERY = defineQuery(`*[
  _type == "customer"
  && stripeCustomerId == $stripeCustomerId
][0]{
  _id,
  email,
  name,
  clerkUserId,
  stripeCustomerId,
  createdAt
}`);

export const getCustomerByEmail = async (email: string) => {
  const customer = await sanityFetch({
    query: CUSTOMER_BY_EMAIL_QUERY,
    params: { email },
  });
  return customer;
};

export const getCustomerByStripeId = async (stripeCustomerId: string) => {
  const customer = await sanityFetch({
    query: CUSTOMER_BY_STRIPE_ID_QUERY,
    params: { stripeCustomerId },
  });
  return customer;
};
