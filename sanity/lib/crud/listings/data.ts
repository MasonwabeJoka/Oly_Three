import {client} from "@/sanity/lib/client"
import {defineQuery} from "next-sanity"

// Query
const listingsQuery = defineQuery(`*[_type == "listing" && defined(slug.current)]{
  _id,
  user->{
    _id,
    firstName,
    lastName,
    fullName
  },
  title,
  slug,
  description,
  price,
  priceOption,
  postedOn,
  "images": images[]->{
    "alt": image.alt,
    "id": image.asset->_id,
    "url": image.asset->url,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    "aspectRatio": image.asset->metadata.dimensions.aspectRatio
  }
}`)

// Read

export const getListings = async () => {
    try {
        const listings = await client.fetch(listingsQuery);
        return listings;
    } catch (error) {
        console.error("Error fetching listings:", error);
        throw error;
    }
}