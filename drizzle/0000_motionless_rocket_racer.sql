CREATE TYPE "public"."role" AS ENUM('buyer', 'seller', 'admin', 'moderator');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'suspended', 'deleted');--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" text,
	"phone" text,
	"role" "role" NOT NULL,
	"status" "status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
