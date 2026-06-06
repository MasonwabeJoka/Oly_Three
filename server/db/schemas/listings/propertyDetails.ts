import { pgTable, varchar, integer, boolean, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { listings } from "./listing";

export const listingPropertyDetails = pgTable("listing_property_details", {
  id,
  listingId: uuid("listing_id")
    .references(() => listings.id)
    .notNull(),
  propertyType: varchar("property_type", { length: 60 }),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  garages: integer("garages"),
  areaSizeValue: integer("area_size_value"),
  areaSizeUnit: varchar("area_size_unit", { length: 20 }),
  landSizeValue: integer("land_size_value"),
  landSizeUnit: varchar("land_size_unit", { length: 20 }),
  buildYear: integer("build_year"),
  lotNumber: varchar("lot_number", { length: 80 }),
  buildingName: varchar("building_name", { length: 120 }),
  floorNumber: integer("floor_number"),
  hoaFees: integer("hoa_fees"),
  propertyTaxes: integer("property_taxes"),
  zoning: varchar("zoning", { length: 80 }),
  energyRating: varchar("energy_rating", { length: 20 }),
  virtualTourUrl: varchar("virtual_tour_url", { length: 2048 }),
  hasFloorPlans: boolean("has_floor_plans").default(false).notNull(),
  ...timestamps,
}, (t) => ({
  listingUnique: uniqueIndex("property_listing_unique").on(t.listingId),
}));
