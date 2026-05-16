import { client } from "@/server/sanity/lib/client";
import { cacheLife, cacheTag } from "next/cache";
import {
  olyHomepageQuery,
  moreFromOlyQuery,
  featuredServicesSectionQuery,
} from "@/server/sanity/queries/homepage";

export const getOlyHomepage = async () => {
  "use cache";
  cacheTag("oly-homepage");
  cacheLife("hours");

  try {
    return await client.fetch(olyHomepageQuery);
  } catch (error) {
    console.error("Error fetching oly homepage:", error);
    throw error;
  }
};

export const getMoreFromOly = async () => {
  "use cache";
  cacheTag("more-from-oly");
  cacheLife("hours");

  try {
    return await client.fetch(moreFromOlyQuery);
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
