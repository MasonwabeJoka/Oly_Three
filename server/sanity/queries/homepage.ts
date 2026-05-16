import { defineQuery } from "next-sanity";

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
  heroSection {
    ...,
    reference-> {
      ...,
      displayOptions
    }
  },
  moreFromOlySection,
  olyArticlesSection,
  sponsoredArticlesSection,
} `);

export const moreFromOlyQuery = defineQuery(`*[_type == "moreFromOlySection"][0] {
  title,
  sites[] -> {
    _id,
    _type,
    path,
    siteName,
    "imageUrl": image.asset->url
  }
}`);

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
}`);
