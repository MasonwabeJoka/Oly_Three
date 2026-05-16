import { defineQuery } from "next-sanity";

export const listingsQuery = defineQuery(`
  *[_type == "listing" && defined(slug.current)
    && ($searchTerm == "" || title match $searchTerm || description match $searchTerm)
    && ($locationSearch == "" || user->address->city match $locationSearch 
                              || user->address->suburb match $locationSearch 
                              || user->address->cityAbbreviation match $locationSearch)
  ] | order(postedOn desc) [$offset...$limit]{
    _id,
    user->{
      _id,
      firstName,
      lastName,
      fullName,
      "profileImage": profileImage.asset->url,
      "city": address->city,
      "suburb": address->suburb,
      "cityAbbr": address->cityAbbreviation,
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
  }
`);

export const listingsCountQuery = defineQuery(`
  count(*[_type == "listing" && defined(slug.current)
    && ($searchTerm == "" || title match $searchTerm || description match $searchTerm)
    && ($locationSearch == "" || user->address->city match $locationSearch 
                              || user->address->suburb match $locationSearch 
                              || user->address->cityAbbreviation match $locationSearch)
  ])
`);

export const listingQuery = defineQuery(`*[_type == "listing" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    price,
    pricingOption,
    description,
    site,
    postedOn,
    expiresAt,
    location,
    details,
    category->{
      _id,
      title,
      slug
    },
    user->{
      _id,
      firstName,
      lastName,
      fullName,
      "profileImage": profileImage.asset->url,
      "city": address->city,
      "suburb": address->suburb,
      "cityAbbr": address->cityAbbreviation
    },
    "images": images[]->{
      "alt": image.alt,
      "id": image.asset->_id,
      "url": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "aspectRatio": image.asset->metadata.dimensions.aspectRatio
    },
  }`);

export const featuredListingsQuery = defineQuery(`
  *[_type == "listing" && defined(slug.current) && isFeatured == true]
  | order(postedOn desc) [$offset...$limit]{
    _id,
    user->{
      _id,
      firstName,
      lastName,
      fullName,
      "profileImage": profileImage.asset->url,
      "city": address->city,
      "suburb": address->suburb,
      "cityAbbr": address->cityAbbreviation,
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
    },
  }
`);

export const featuredListingsCountQuery = defineQuery(`
  count(*[_type == "listing" && defined(slug.current) && isFeatured == true])
`);

export const similarListingsQuery = defineQuery(`
  *[_type == "listing" && 
    defined(slug.current) && 
    isActive == true && 
    approvedForSale == "approved" &&
    _id != $currentListingId &&
    (
      category._ref == $categoryRef ||
      (price >= $minPrice && price <= $maxPrice) ||
      user->address->city == $userCity
    )
  ] | order(postedOn desc) [0...$limit]{
    _id,
    user->{
      _id,
      firstName,
      lastName,
      fullName,
      "profileImage": profileImage.asset->url,
      "city": address->city,
      "suburb": address->suburb,
      "cityAbbr": address->cityAbbreviation,
    },
    title,
    slug,
    description,
    price,
    priceOption,
    postedOn,
    category->{
      _id,
      title,
      slug
    },
    "images": images[]->{
      "alt": image.alt,
      "id": image.asset->_id,
      "url": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "aspectRatio": image.asset->metadata.dimensions.aspectRatio
    },
  }
`);

export const listingViewsQuery = defineQuery(`*[_type == "listing" && _id == $id][0]{
    _id,
  views,
}`);
