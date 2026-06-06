import { pgTable, varchar, integer, boolean, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { listings } from "./listing";

export const listingJobDetails = pgTable("listing_job_details", {
  id,
  listingId: uuid("listing_id")
    .references(() => listings.id)
    .notNull(),
  company: varchar("company", { length: 180 }),
  companyWebsite: varchar("company_website", { length: 2048 }),
  employmentType: varchar("employment_type", { length: 40 }),
  experienceLevel: varchar("experience_level", { length: 40 }),
  educationLevel: varchar("education_level", { length: 40 }),
  remoteOption: varchar("remote_option", { length: 40 }),
  applicationUrl: varchar("application_url", { length: 2048 }),
  seniorityLevel: varchar("seniority_level", { length: 40 }),
  openPositions: integer("open_positions").default(1).notNull(),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  salaryFrequency: varchar("salary_frequency", { length: 30 }),
  salaryNegotiable: boolean("salary_negotiable").default(false).notNull(),
  ...timestamps,
}, (t) => ({
  listingUnique: uniqueIndex("job_listing_unique").on(t.listingId),
}));
