"use server";

import { client } from "@/server/sanity/lib/client";
import {
  olyHomepageQuery,
  moreFromOlyQuery,
  featuredServicesSectionQuery,
} from "@/server/sanity/queries/homepage";

export const getOlyHomepage = async () => {
  try {
    return await client.fetch(olyHomepageQuery, {}, { next: { tags: ["oly-homepage"], revalidate: 3600 } });
  } catch (error) {
    console.error("Error fetching oly homepage:", error);
    throw error;
  }
};

export const getMoreFromOly = async () => {
  try {
    return await client.fetch(moreFromOlyQuery, {}, { next: { tags: ["more-from-oly"], revalidate: 3600 } });
  } catch (error) {
    console.error("Error fetching more from oly:", error);
    throw error;
  }
};

export const getFeaturedServicesSection = async () => {
  try {
    return await client.fetch(featuredServicesSectionQuery);
  } catch (error) {
    console.error("Error fetching featured services section:", error);
    throw error;
  }
};
