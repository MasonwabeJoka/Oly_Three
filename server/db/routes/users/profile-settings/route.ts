<<<<<<<< HEAD:db/routes/users/profile-settings/route.ts
// Moved to db/services/users.ts — Elysia route removed in favour of direct service calls.
// This file is kept for backwards compatibility.
export { getProfileSettingsForCurrentUser } from "@/server/db/services/users";
export type { ProfileSettingsDto } from "@/server/db/services/users";
========

import { Elysia } from "elysia";
import { eq, sql } from "drizzle-orm";
import { db } from "@/server/db/db";
import { users } from "@/server/db/schemas/users/users";
import { userProfiles } from "@/server/db/schemas/users/user_profiles";
import { withAuth } from "@workos-inc/authkit-nextjs";

export type ProfileSettingsDto = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
  status: string;
  displayName: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  bio: string | null;
  socialMediaName: string | null;
  socialMediaUrl: string | null;
};

const requiredUserProfileColumns = new Set([
  "user_id",
  "display_name",
  "avatar_url",
  "phone",
  "bio",
  "social_media_name",
  "social_media_url",
]);

let userProfilesSchemaReadyPromise: Promise<boolean> | null = null;
let hasWarnedAboutUserProfilesSchema = false;

async function isUserProfilesSchemaReady(): Promise<boolean> {
  if (!userProfilesSchemaReadyPromise) {
    userProfilesSchemaReadyPromise = (async () => {
      const rows = await db.execute<{ column_name: string }>(sql`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'user_profiles'
      `);

      const existingColumns = new Set(
        rows.rows.map((row) => row.column_name)
      );
      for (const column of requiredUserProfileColumns) {
        if (!existingColumns.has(column)) {
          return false;
        }
      }
      return true;
    })().catch(() => false);
  }

  const isReady = await userProfilesSchemaReadyPromise;

  // Do not permanently cache a failed/old-schema result.
  // This allows the app to recover without a server restart after migrations.
  if (!isReady) {
    userProfilesSchemaReadyPromise = null;
  }

  return isReady;
}

export async function getProfileSettingsForCurrentUser(): Promise<ProfileSettingsDto> {
  const { user } = await withAuth({
    ensureSignedIn: true,
  });

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  const userdata = await db.query.users.findFirst({
    where: eq(users.workosId, user.id),
  });

  if (!userdata) {
    throw new Error("User data not found");
  }

  let profileData:
    | Awaited<ReturnType<typeof db.query.userProfiles.findFirst>>
    | null
    | undefined;

  const profileSchemaReady = await isUserProfilesSchemaReady();
  if (!profileSchemaReady) {
    if (!hasWarnedAboutUserProfilesSchema) {
      console.warn(
        `Profile settings fallback for user ${userdata.id}: user_profiles schema is not up to date`
      );
      hasWarnedAboutUserProfilesSchema = true;
    }
    profileData = null;
  } else {
    try {
      profileData = await db.query.userProfiles.findFirst({
        where: eq(userProfiles.userId, userdata.id),
      });
    } catch (error) {
      // Prevent settings page crash when user_profiles schema is behind runtime code.
      const errorMessage =
        error instanceof Error ? error.message : "Unknown profile query error";
      console.warn(
        `Profile settings fallback for user ${userdata.id}: ${errorMessage}`
      );
      profileData = null;
    }
  }

  return {
    id: userdata.id,
    firstName: userdata.firstName,
    lastName: userdata.lastName,
    email: userdata.email,
    role: userdata.role,
    status: userdata.status,
    displayName: profileData?.displayName ?? "",
    phoneNumber: profileData?.phone ?? null,
    avatarUrl: profileData?.avatarUrl ?? null,
    bio: profileData?.bio ?? null,
    socialMediaName: profileData?.socialMediaName ?? null,
    socialMediaUrl: profileData?.socialMediaUrl ?? null,
  };
}

export const profileSettings = new Elysia({
    prefix: "/routes/users",
  })

profileSettings.get("/profile-settings", getProfileSettingsForCurrentUser);

export type ProfilesApp = typeof profileSettings;
>>>>>>>> 217c2b9 (Save current workspace changes):server/db/routes/users/profile-settings/route.ts
