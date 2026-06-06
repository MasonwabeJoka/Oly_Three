DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'listing_type') THEN
    CREATE TYPE "public"."listing_type" AS ENUM('sale', 'auction');
  END IF;
END $$;
--> statement-breakpoint

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'listing_site') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid WHERE t.typname = 'listing_site' AND e.enumlabel = 'oly') THEN
      ALTER TYPE "public"."listing_site" ADD VALUE 'oly';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid WHERE t.typname = 'listing_site' AND e.enumlabel = 'oly-properties') THEN
      ALTER TYPE "public"."listing_site" ADD VALUE 'oly-properties';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid WHERE t.typname = 'listing_site' AND e.enumlabel = 'oly-auto') THEN
      ALTER TYPE "public"."listing_site" ADD VALUE 'oly-auto';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid WHERE t.typname = 'listing_site' AND e.enumlabel = 'oly-hiring') THEN
      ALTER TYPE "public"."listing_site" ADD VALUE 'oly-hiring';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid WHERE t.typname = 'listing_site' AND e.enumlabel = 'oly-services') THEN
      ALTER TYPE "public"."listing_site" ADD VALUE 'oly-services';
    END IF;
  END IF;
END $$;
--> statement-breakpoint

ALTER TABLE "listings" RENAME COLUMN "domain" TO "site";--> statement-breakpoint
ALTER TABLE "listings" RENAME COLUMN "price" TO "amount";--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "slug" varchar(160);--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "listing_type" "listing_type" DEFAULT 'sale' NOT NULL;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "category_main" varchar(120);--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "category_subcategory" varchar(120);--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "pricing_option" varchar(40);--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "starting_price" integer;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "buy_now_price" integer;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "auction_start_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "auction_duration" varchar(40);--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "condition" varchar(64);--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "is_featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "expires_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "listings" ALTER COLUMN "published_at" TYPE timestamp with time zone;--> statement-breakpoint

UPDATE "listings" SET "slug" = COALESCE("slug", 'listing-' || substr(md5(random()::text), 1, 12));--> statement-breakpoint
ALTER TABLE "listings" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint

ALTER TABLE "listings" ALTER COLUMN "owner_id" TYPE uuid USING "owner_id"::uuid;--> statement-breakpoint
ALTER TABLE "listings" DROP CONSTRAINT IF EXISTS "listings_owner_id_users_id_fk";--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "listings_slug_idx" ON "listings" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_site_idx" ON "listings" USING btree ("site");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listings_type_idx" ON "listings" USING btree ("listing_type");--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "listing_locations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "listing_id" uuid NOT NULL,
  "province" varchar(120),
  "city" varchar(120),
  "suburb" varchar(120),
  "custom_location" varchar(255),
  "latitude" double precision,
  "longitude" double precision,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listing_locations" ADD CONSTRAINT "listing_locations_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "listing_locations_listing_unique" ON "listing_locations" USING btree ("listing_id");--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "listing_stats" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "listing_id" uuid NOT NULL,
  "likes_count" integer DEFAULT 0 NOT NULL,
  "views_total" integer DEFAULT 0 NOT NULL,
  "views_today" integer DEFAULT 0 NOT NULL,
  "unread_messages" integer DEFAULT 0 NOT NULL,
  "bids_count" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listing_stats" ADD CONSTRAINT "listing_stats_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "listing_stats_listing_unique" ON "listing_stats" USING btree ("listing_id");--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "listing_details" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "listing_id" uuid NOT NULL,
  "value" text NOT NULL,
  "position" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listing_details" ADD CONSTRAINT "listing_details_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listing_details_listing_idx" ON "listing_details" USING btree ("listing_id");--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "listing_specifications" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "listing_id" uuid NOT NULL,
  "key" varchar(120) NOT NULL,
  "value" text NOT NULL,
  "position" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listing_specifications" ADD CONSTRAINT "listing_specifications_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listing_specifications_listing_idx" ON "listing_specifications" USING btree ("listing_id");--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "listing_media" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "listing_id" uuid NOT NULL,
  "media_type" "media_type" NOT NULL,
  "position" integer DEFAULT 0 NOT NULL,
  "is_featured" boolean DEFAULT false NOT NULL,
  "provider" varchar(40),
  "provider_file_id" varchar(255),
  "url" varchar(2048),
  "thumbnail_url" varchar(2048),
  "mime_type" varchar(120),
  "bytes" integer,
  "width" integer,
  "height" integer,
  "duration_seconds" integer,
  "mux_asset_id" varchar(255),
  "mux_playback_id" varchar(255),
  "mux_upload_id" varchar(255),
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listing_media" ADD CONSTRAINT "listing_media_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listing_media_listing_idx" ON "listing_media" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listing_media_type_idx" ON "listing_media" USING btree ("media_type");--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "listing_promotions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "listing_id" uuid NOT NULL,
  "platform" varchar(80) NOT NULL,
  "duration" varchar(40),
  "remaining_days" integer,
  "status" varchar(40),
  "starts_at" timestamp with time zone,
  "ends_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listing_promotions" ADD CONSTRAINT "listing_promotions_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "listing_promotions_listing_idx" ON "listing_promotions" USING btree ("listing_id");--> statement-breakpoint

ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "mileage_unit" varchar(10);--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "vehicle_type" varchar(40);--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "engine_size" varchar(40);--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "color_exterior" varchar(60);--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "color_interior" varchar(60);--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "doors" integer;--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "vin" varchar(40);--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "drive_type" varchar(20);--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "body_style" varchar(40);--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "seating_capacity" integer;--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "service_history_available" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "warranty" varchar(80);--> statement-breakpoint
ALTER TABLE "listing_auto_details" ADD COLUMN IF NOT EXISTS "carfax_report_url" varchar(2048);--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "listing_property_details" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "listing_id" uuid NOT NULL,
  "property_type" varchar(60),
  "bedrooms" integer,
  "bathrooms" integer,
  "garages" integer,
  "area_size_value" integer,
  "area_size_unit" varchar(20),
  "land_size_value" integer,
  "land_size_unit" varchar(20),
  "build_year" integer,
  "lot_number" varchar(80),
  "building_name" varchar(120),
  "floor_number" integer,
  "hoa_fees" integer,
  "property_taxes" integer,
  "zoning" varchar(80),
  "energy_rating" varchar(20),
  "virtual_tour_url" varchar(2048),
  "has_floor_plans" boolean DEFAULT false NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listing_property_details" ADD CONSTRAINT "listing_property_details_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "property_listing_unique" ON "listing_property_details" USING btree ("listing_id");--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "listing_job_details" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "listing_id" uuid NOT NULL,
  "company" varchar(180),
  "company_website" varchar(2048),
  "employment_type" varchar(40),
  "experience_level" varchar(40),
  "education_level" varchar(40),
  "remote_option" varchar(40),
  "application_url" varchar(2048),
  "seniority_level" varchar(40),
  "open_positions" integer DEFAULT 1 NOT NULL,
  "salary_min" integer,
  "salary_max" integer,
  "salary_frequency" varchar(30),
  "salary_negotiable" boolean DEFAULT false NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listing_job_details" ADD CONSTRAINT "listing_job_details_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "job_listing_unique" ON "listing_job_details" USING btree ("listing_id");--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "listing_service_details" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "listing_id" uuid NOT NULL,
  "service_type" varchar(80),
  "provider_name" varchar(180),
  "provider_website" varchar(2048),
  "availability" varchar(60),
  "booking_link" varchar(2048),
  "portfolio_url" varchar(2048),
  "average_rating" integer,
  "reviews_count" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listing_service_details" ADD CONSTRAINT "listing_service_details_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "service_listing_unique" ON "listing_service_details" USING btree ("listing_id");
