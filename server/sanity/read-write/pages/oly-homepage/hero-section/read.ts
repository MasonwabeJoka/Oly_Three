
import {client} from "@/server/sanity/client"
import { defineQuery } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";

// query

export const heroSectionQuery = defineQuery(`*[_type == "heroSection"][0] {
   "olyMainTitle": mainHeading[0].children[0].text,
    showBrandNewBadge
}`)



// read
export const getHeroSectionData = async () => {
    "use cache";
    cacheTag("hero-section-data")
    cacheLife("hours")

    try {
        const heroSectionData = await client.fetch(heroSectionQuery)
        return heroSectionData
    } catch(error) {
        console.error("Error fetching hero section data:", error)
    }
}

