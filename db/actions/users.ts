"use server";

import { withAuth } from "@workos-inc/authkit-nextjs";
import { z } from "zod";
import { headers } from "next/headers";
import { ratelimit } from "@/lib/upstash/rate-limit";
import { updateProfilePipeline } from "@/server/db/services/users";

const updateProfileInputSchema = z.object({
  name: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  bio: z.string().trim().optional(),
  socialMediaName: z.string().trim().optional(),
  socialMediaUrl: z.string().trim().optional(),
  avatarUrl: z.string().trim().optional(),
});

export async function updateProfileSettingsAction(input: {
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  socialMediaName?: string;
  socialMediaUrl?: string;
  avatarUrl?: string;
}) {
  const ip = (await headers()).get("x-forwarded-for") ?? "anonymous";
  const { success } = await ratelimit.limit(ip);
  if (!success) return { success: false, message: "Too many requests" };

  try {
    const parsedInput = updateProfileInputSchema.parse(input);
    const { user } = await withAuth({ ensureSignedIn: true });

    const result = await updateProfilePipeline({ workOsId: user.id, input: parsedInput });

    return {
      success: true,
      user: {
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        phoneNumber: result.profile?.phone?.trim() || null,
        socialMediaName: result.profile?.socialMediaName ?? null,
        socialMediaUrl: result.profile?.socialMediaUrl ?? null,
        avatarUrl: result.profile?.avatarUrl ?? null,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Profile update failed";
    return { success: false, message };
  }
}
