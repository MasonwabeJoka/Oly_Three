import { writeClient } from "@/sanity/lib/write-client";

// update
export async function updateListingView(id: string, totalViews: number) {
    try {
        await writeClient.patch(id).set({ views: totalViews + 1 }).commit();
    } catch (error) {
        console.error("Error handling listing view:", error);
        throw error;
    }
}

