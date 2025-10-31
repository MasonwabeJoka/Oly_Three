import { withAuth } from "@workos-inc/authkit-nextjs";

export async function user() {
  try {
    const { user } = await withAuth();
    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
