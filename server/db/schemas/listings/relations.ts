import { relations } from "drizzle-orm";
import { listings } from "./listing";
import { listingLocations } from "./location";
import { listingStats } from "./stats";
import { listingDetails } from "./details";
import { listingSpecifications } from "./specifications";
import { listingMedia } from "./media";
import { listingPromotions } from "./promotions";
import { listingAutoDetails } from "./autoDetails";
import { listingPropertyDetails } from "./propertyDetails";
import { listingJobDetails } from "./jobDetails";
import { listingServiceDetails } from "./serviceDetails";

export const listingsRelations = relations(listings, ({ one, many }) => ({
  location: one(listingLocations, {
    fields: [listings.id],
    references: [listingLocations.listingId],
  }),
  stats: one(listingStats, {
    fields: [listings.id],
    references: [listingStats.listingId],
  }),
  autoDetails: one(listingAutoDetails, {
    fields: [listings.id],
    references: [listingAutoDetails.listingId],
  }),
  propertyDetails: one(listingPropertyDetails, {
    fields: [listings.id],
    references: [listingPropertyDetails.listingId],
  }),
  jobDetails: one(listingJobDetails, {
    fields: [listings.id],
    references: [listingJobDetails.listingId],
  }),
  serviceDetails: one(listingServiceDetails, {
    fields: [listings.id],
    references: [listingServiceDetails.listingId],
  }),
  details: many(listingDetails),
  specifications: many(listingSpecifications),
  media: many(listingMedia),
  promotions: many(listingPromotions),
}));
