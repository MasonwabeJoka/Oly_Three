import { pgTable, varchar, integer, boolean, index, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "../common";
import { mediaTypeEnum } from "../enums";
import { listings } from "./listing";

export const listingMedia = pgTable("listing_media", {
  id,
  listingId: uuid("listing_id")
    .references(() => listings.id)
    .notNull(),
  mediaType: mediaTypeEnum("media_type").notNull(),
  position: integer("position").default(0).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  provider: varchar("provider", { length: 40 }),
  providerFileId: varchar("provider_file_id", { length: 255 }),
  url: varchar("url", { length: 2048 }),
  thumbnailUrl: varchar("thumbnail_url", { length: 2048 }),
  mimeType: varchar("mime_type", { length: 120 }),
  bytes: integer("bytes"),
  width: integer("width"),
  height: integer("height"),
  durationSeconds: integer("duration_seconds"),
  muxAssetId: varchar("mux_asset_id", { length: 255 }),
  muxPlaybackId: varchar("mux_playback_id", { length: 255 }),
  muxUploadId: varchar("mux_upload_id", { length: 255 }),
  ...timestamps,
}, (t) => ({
  listingIdx: index("listing_media_listing_idx").on(t.listingId),
  typeIdx: index("listing_media_type_idx").on(t.mediaType),
}));
