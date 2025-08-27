import {defineQuery } from "next-sanity";


export const tempListing  = defineQuery(`*[_type == "listing" && defined(slug.current)] | order(_createdAt desc) {
  _id,
    user -> {
      _id,
        fullName
    },
    title,
    slug,
    description,
    price,
    priceOption,
    postedOn
}`)