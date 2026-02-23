import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";

// Query
export const featuredServicesSectionQuery = defineQuery(`*[_type == "featuredServicesSection"][0] {
  _id,
    _type,
    title,
    services[]-> {
      title,
      "serviceId": _id,
      cta,
      description,
      features[] {
        "featureId": _key,
        _type,
        featureText,
      },
      layout,
      path,
      "image": image.asset->url   
    }
}`)

// Read
export const getFeaturedServicesSection = async () => {
    try {

        const data = await client.fetch(featuredServicesSectionQuery);
        return data;

    } catch (error) {
        console.error("Error fetching listing featuredServicesSection data:", error);
        throw error;

    }
}