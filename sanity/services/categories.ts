import { client } from "@/server/sanity/lib/client";
import { cacheLife, cacheTag } from "next/cache";
import {
  categoriesQuery,
  featuredCategoriesQuery,
  featuredCategoriesSectionQuery,
} from "@/server/sanity/queries/categories";

export const getCategories = async () => {
  "use cache";
  cacheTag("categories");
  cacheLife("hours");

  return fetchFromSanity(categoriesQuery, "categories");
};

export const getFeaturedCategories = async () => {
  "use cache";
  cacheTag("featured-categories");
  cacheLife("hours");

  return fetchFromSanity(featuredCategoriesQuery, "featured-categories");
};

export const getFeaturedCategoriesSection = async () => {
  "use cache";
  cacheTag("featured-categories-section");
  cacheLife("hours");

  return fetchFromSanity(featuredCategoriesSectionQuery, "featured-categories-section");
};

// Private helper
const fetchFromSanity = async (query: string, tag: string) => {
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error(`Error fetching ${tag}:`, error);
    throw error;
  }
};