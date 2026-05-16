"use server";

import { client } from "@/server/sanity/lib/client";
import {
  categoriesQuery,
  featuredCategoriesQuery,
  featuredCategoriesSectionQuery,
} from "@/server/sanity/queries/categories";

export const getCategories = async () => {
  try {
    return await client.fetch(categoriesQuery, {}, { next: { tags: ["categories"], revalidate: 3600 } });
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getFeaturedCategories = async () => {
  try {
    return await client.fetch(featuredCategoriesQuery, {}, { next: { tags: ["featured-categories"], revalidate: 3600 } });
  } catch (error) {
    console.error("Error fetching featured categories:", error);
    throw error;
  }
};

export const getFeaturedCategoriesSection = async () => {
  try {
    return await client.fetch(featuredCategoriesSectionQuery, {}, { next: { tags: ["featured-categories-section"], revalidate: 3600 } });
  } catch (error) {
    console.error("Error fetching featured categories section:", error);
    throw error;
  }
};
