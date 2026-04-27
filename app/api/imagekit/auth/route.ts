import { NextResponse } from "next/server";
import { withAuth } from "@workos-inc/authkit-nextjs";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint:
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
    process.env.IMAGEKIT_URL_ENDPOINT ||
    "",
});

export async function POST() {
  try {
    if (
      !process.env.IMAGEKIT_PUBLIC_KEY ||
      !process.env.IMAGEKIT_PRIVATE_KEY ||
      (!process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT &&
        !process.env.IMAGEKIT_URL_ENDPOINT)
    ) {
      return NextResponse.json(
        { message: "ImageKit is not configured." },
        { status: 500 }
      );
    }

    const { user } = await withAuth();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const authParams = imagekit.getAuthenticationParameters();

    return NextResponse.json({
      ...authParams,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint:
        process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
        process.env.IMAGEKIT_URL_ENDPOINT,
    });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
