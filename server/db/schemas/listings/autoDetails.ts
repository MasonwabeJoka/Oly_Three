import { pgTable, varchar, integer, boolean, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { listings } from "./listing";

export const listingAutoDetails = pgTable("listing_auto_details", {
  id,
  listingId: uuid("listing_id")
    .references(() => listings.id)
    .notNull(),
  make: varchar("make", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  mileage: integer("mileage"),
  mileageUnit: varchar("mileage_unit", { length: 10 }),
  transmission: varchar("transmission", { length: 20 }),
  fuelType: varchar("fuel_type", { length: 20 }),
  vehicleType: varchar("vehicle_type", { length: 40 }),
  engineSize: varchar("engine_size", { length: 40 }),
  colorExterior: varchar("color_exterior", { length: 60 }),
  colorInterior: varchar("color_interior", { length: 60 }),
  doors: integer("doors"),
  vin: varchar("vin", { length: 40 }),
  driveType: varchar("drive_type", { length: 20 }),
  bodyStyle: varchar("body_style", { length: 40 }),
  seatingCapacity: integer("seating_capacity"),
  serviceHistoryAvailable: boolean("service_history_available").default(false).notNull(),
  warranty: varchar("warranty", { length: 80 }),
  carfaxReportUrl: varchar("carfax_report_url", { length: 2048 }),
  ...timestamps,
}, (t) => ({
  listingUnique: uniqueIndex("auto_listing_unique").on(t.listingId),
}));

