"use server";

import { withAuth } from "@workos-inc/authkit-nextjs";
import ImageKit from "imagekit";

type ImageKitAuthResult =
  | {
      success: true;
      token: string;
      expire: number;
      signature: string;
      publicKey: string;
    }
  | {
      success: false;
      message: string;
    };

export async function getImageKitAuthAction(): Promise<ImageKitAuthResult> {
  if (
    !process.env.IMAGEKIT_PUBLIC_KEY ||
    !process.env.IMAGEKIT_PRIVATE_KEY ||
    (!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT &&
      !process.env.IMAGEKIT_URL_ENDPOINT)
  ) {
    return { success: false, message: "ImageKit is not configured." };
  }

  try {
    const { user } = await withAuth({ ensureSignedIn: true });
    if (!user) {
      return { success: false, message: "Unauthorized." };
    }

    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint:
        process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
        process.env.IMAGEKIT_URL_ENDPOINT,
    });

    const authParams = imagekit.getAuthenticationParameters();

    return {
      success: true,
      ...authParams,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    };
  } catch {
    return { success: false, message: "Failed to authorize avatar upload." };
  }
}
