"use server";

import { sanityFetch } from "@/server/sanity/lib/live";
import { cacheLife, cacheTag } from "next/cache";
import {
  ALL_SHOP_CATEGORIES_QUERY,
  SHOP_CATEGORY_BY_SLUG_QUERY,
  FEATURED_PRODUCTS_QUERY,
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
} from "@/server/sanity/queries/shops";

export const getShopCategories = async () => {
  "use cache";
  cacheTag("shop-categories");
  cacheLife("hours");

  try {
    const categories = await sanityFetch({ query: ALL_SHOP_CATEGORIES_QUERY });
    return categories.data;
  } catch (error) {
    console.error("Error fetching shop categories:", error);
    throw error;
  }
};

export const getCategoryBySlug = async (slug: string) => {
  try {
    const category = await sanityFetch({ query: SHOP_CATEGORY_BY_SLUG_QUERY, params: { slug } });
    return category;
  } catch (error) {
    console.error("Error fetching shop category:", error);
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  "use cache";
  cacheTag("shop-products-featured");
  cacheLife("minutes");

  const { data } = await sanityFetch({ query: FEATURED_PRODUCTS_QUERY });
  return data;
};

export async function getFilteredProducts(params: {
  searchQuery?: string;
  categorySlug?: string;
  colour?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  inStock?: boolean;
}) {
  "use cache";

  const {
    searchQuery = "",
    categorySlug = "",
    colour = "",
    material = "",
    minPrice = 0,
    maxPrice = 0,
    sort = "name",
    inStock = false,
  } = params;

  cacheTag("shop-products");
  cacheTag(`shop-products:search:${searchQuery || "all"}`);
  cacheTag(`shop-products:category:${categorySlug || "all"}`);
  cacheTag(`shop-products:sort:${sort}`);
  cacheLife("minutes");

  const getQuery = () => {
    if (searchQuery && sort === "relevance") return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
    switch (sort) {
      case "price_asc": return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY;
      case "price_desc": return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY;
      case "relevance": return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
      default: return FILTER_PRODUCTS_BY_NAME_QUERY;
    }
  };

  const { data } = await sanityFetch({
    query: getQuery(),
    params: { searchQuery, categorySlug, colour, material, minPrice, maxPrice, inStock },
  });

  return data;
}
