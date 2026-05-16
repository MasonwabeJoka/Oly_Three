import ImageKit from "imagekit";
import { eq } from "drizzle-orm";
import { drizzleDb } from "@/server/db/db";
import { users } from "@/server/db/schemas/users/users";
import { userProfiles } from "@/server/db/schemas/users/user_profiles";
import { withAuth } from "@workos-inc/authkit-nextjs";

// ─── ImageKit upload ──────────────────────────────────────────────────────────

export async function uploadToImageKit(file: string) {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error("ImageKit environment variables are not configured");
  }

  const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

  const uploadResponse = await imagekit.upload({
    file,
    fileName: `avatar-${Date.now()}.jpg`,
    folder: "/avatars",
    useUniqueFileName: true,
  });

  return { url: uploadResponse.url };
}

// ─── Avatar resolver ──────────────────────────────────────────────────────────

export async function resolveAvatar({
  workOsId,
  avatarUrl,
}: {
  workOsId: string;
  avatarUrl?: string;
}) {
  if (!avatarUrl) return { url: undefined, type: "none" };

  if (avatarUrl.startsWith("http")) return { url: avatarUrl, type: "oauth" };

  const uploaded = await uploadToImageKit(avatarUrl);
  return { url: uploaded.url, type: "uploaded" };
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProfileSettingsInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  socialMediaName?: string;
  socialMediaUrl?: string;
  avatarUrl?: string | null;
};

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

// ─── DB operations ────────────────────────────────────────────────────────────

export async function createOrUpdateProfile(
  workosUserId: string,
  data: ProfileSettingsInput
) {
  const displayName = `${data.firstName} ${data.lastName}`.trim() || data.email;
  const phone = data.phoneNumber?.trim() || null;
  const bio = data.bio?.trim() || null;
  const socialMediaName = data.socialMediaName?.trim() || null;
  const socialMediaUrl = data.socialMediaUrl?.trim() || null;
  const hasAvatarUrl = Object.prototype.hasOwnProperty.call(data, "avatarUrl");
  const avatarUrl = hasAvatarUrl ? data.avatarUrl?.trim() || null : undefined;

  const [updatedUser] = await drizzleDb
    .update(users)
    .set({ firstName: data.firstName, lastName: data.lastName, email: data.email, updatedAt: new Date() })
    .where(eq(users.workosId, workosUserId))
    .returning();

  if (!updatedUser) throw new Error("User not found");

  const [updatedProfile] = await drizzleDb
    .update(userProfiles)
    .set({
      displayName,
      phone,
      bio,
      socialMediaName,
      socialMediaUrl,
      ...(hasAvatarUrl ? { avatarUrl } : {}),
      updatedAt: new Date(),
    })
    .where(eq(userProfiles.userId, updatedUser.id))
    .returning();

  if (updatedProfile) return { user: updatedUser, profile: updatedProfile };

  const [insertedProfile] = await drizzleDb
    .insert(userProfiles)
    .values({ userId: updatedUser.id, displayName, phone, bio, socialMediaName, socialMediaUrl, avatarUrl: avatarUrl ?? null })
    .returning();

  return { user: updatedUser, profile: insertedProfile };
}

export async function updateProfilePipeline({
  workOsId,
  input,
}: {
  workOsId: string;
  input: {
    name: string;
    lastName: string;
    email: string;
    phone?: string;
    bio?: string;
    socialMediaName?: string;
    socialMediaUrl?: string;
    avatarUrl?: string;
  };
}) {
  const avatar = await resolveAvatar({ workOsId, avatarUrl: input.avatarUrl });

  const profileData: ProfileSettingsInput = {
    firstName: input.name,
    lastName: input.lastName,
    email: input.email,
    phoneNumber: input.phone,
    bio: input.bio,
    socialMediaName: input.socialMediaName,
    socialMediaUrl: input.socialMediaUrl,
    ...(avatar.url !== undefined ? { avatarUrl: avatar.url } : {}),
  };

  return createOrUpdateProfile(workOsId, profileData);
}

export async function getProfileSettingsForCurrentUser(): Promise<ProfileSettingsDto> {
  const { user } = await withAuth({ ensureSignedIn: true });

  if (!user?.id) throw new Error("Unauthorized");

  const dbUser = await drizzleDb.query.users.findFirst({
    where: eq(users.workosId, user.id),
  });

  if (!dbUser) throw new Error("User not found");

  const profile = await drizzleDb.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, dbUser.id),
  });

  return {
    id: dbUser.id,
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    email: dbUser.email,
    role: dbUser.role,
    status: dbUser.status,
    displayName: profile?.displayName ?? "",
    phoneNumber: profile?.phone ?? null,
    avatarUrl: profile?.avatarUrl ?? null,
    bio: profile?.bio ?? null,
    socialMediaName: profile?.socialMediaName ?? null,
    socialMediaUrl: profile?.socialMediaUrl ?? null,
  };
}
