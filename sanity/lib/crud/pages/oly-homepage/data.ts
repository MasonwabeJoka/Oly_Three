
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";


// query
export const olyHomepageQuery = defineQuery(`*[_type == "olyHomepage" && isActive == true][0] {
  _id,
  _type,
  title,
  publishedAt,
  isActive,
  adSection,
  topAdSection,
  bottomAdSection,
  featuredCategoriesSection,
  featuredListingsSection,
  featuredServicesSection,
  heroSection,
  moreFromOlySection,
  olyArticlesSection,
  sponsoredArticlesSection,
}`);

// read

export const getOlyHomepage = async () => {
  try {
    const homepage = await client.fetch(olyHomepageQuery);
    return homepage;
  } catch (error) {
    console.error("Error fetching olyHomepage:", error);
    throw error;
  }
}

// create

// update

// delete

