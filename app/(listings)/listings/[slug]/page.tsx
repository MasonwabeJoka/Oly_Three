import { getListing } from "@/server/sanity/read-write/listing/read";
import Listing from "./components/Listing";
import { getSimilarListings } from "@/server/sanity/read-write/similarListings/read";
import { getListingViews } from "@/server/sanity/read-write/listingViews/read";
import { updateListingView } from "@/server/sanity/read-write/listingViews/write";
import { after } from "next/server";

// export const experimental_ppr = true;
type ParamsProp = {
  params: {
    slug: string;
  };
};

//TODO:
/*
Delay after page load (e.g., +5s or +10s) → prevents instant bounces from counting. To filter out bots and accidental clicks.

Ensure visibility → only increment when the main listing content is visible (IntersectionObserver).

Per user/listing cooldown (e.g., only count 1 view per 24h per user/IP per listing).
*/
const Page = async ({ params }: ParamsProp) => {
  const { slug } = await params;
  const listing = await getListing(slug);
  const similarListings = await getSimilarListings(listing, 2);
  const viewsData = await getListingViews(listing._id);
  const totalViews = viewsData?.views ?? 0;
  after(async () => await updateListingView(listing._id, totalViews));

  return (
    <Listing
      listing={listing}
      similarListings={similarListings}
      totalViews={totalViews}
    />
  );
};

export default Page;

