import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@workos-inc/authkit-nextjs";
import ImageKit from "imagekit";
import { ratelimit } from "@/lib/upstash/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  if (!success) return NextResponse.json({ message: 'Too many requests' }, { status: 429 });

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

    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint:
        process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
        process.env.IMAGEKIT_URL_ENDPOINT ||
        "",
    });

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
