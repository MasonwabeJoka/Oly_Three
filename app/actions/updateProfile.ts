"use server";

import { getWorkOS, refreshSession, withAuth } from "@workos-inc/authkit-nextjs";
import { profileSchema } from "@/lib/validations/formValidations";

const updateProfileSchema = profileSchema.pick({
  name: true,
  lastName: true,
  email: true,
});

export type UpdateProfileInput = {
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  socialMediaName?: string;
  socialMediaUrl?: string;
  avatarUrl?: string;
};

export type UpdateProfileResult = {
  success: boolean;
  message: string;
  field?: "general" | "email" | "phone" | "metadata";
  user?: {
    firstName: string | null;
    lastName: string | null;
    email: string;
    metadata: Record<string, string>;
  };
};

export async function updateProfileAction(
  input: UpdateProfileInput
): Promise<UpdateProfileResult> {
  const parsed = updateProfileSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      field: "general",
      message: parsed.error.issues[0]?.message ?? "Invalid profile data.",
    };
  }

  try {
    const { user } = await withAuth({ ensureSignedIn: true });
    const workos = getWorkOS();

    const cleanedPhone = input.phone?.trim() ?? "";
    const cleanedSocialMediaName = input.socialMediaName?.trim() ?? "";
    const cleanedSocialMediaUrl = input.socialMediaUrl?.trim() ?? "";
    const cleanedAvatarUrl = input.avatarUrl?.trim();

    const metadata: Record<string, string | null> = {
      ...(user.metadata ?? {}),
      phone: cleanedPhone || null,
      socialMediaName: cleanedSocialMediaName || null,
      socialMediaUrl: cleanedSocialMediaUrl || null,
    };

    if (cleanedAvatarUrl) {
      metadata.avatarUrl = cleanedAvatarUrl;
    }

    const updatedUser = await workos.userManagement.updateUser({
      userId: user.id,
      firstName: parsed.data.name.trim(),
      lastName: parsed.data.lastName.trim(),
      email: parsed.data.email.trim().toLowerCase(),
      metadata,
    });

    try {
      await refreshSession({ ensureSignedIn: true });
    } catch {
      // Session refresh is best effort; return updated API response either way.
    }

    return {
      success: true,
      message: "Profile updated successfully.",
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        metadata: updatedUser.metadata ?? {},
      },
    };
  } catch (error: any) {
    const message =
      error?.message ||
      error?.errors?.[0]?.message ||
      "Failed to update profile.";

    const loweredMessage =
      typeof message === "string" ? message.toLowerCase() : "";

    const field = loweredMessage.includes("email")
      ? "email"
      : loweredMessage.includes("phone")
        ? "phone"
        : "general";

    return {
      success: false,
      field,
      message,
    };
  }
}
