import { getListing } from "@/sanity/lib/crud/listing/data";
import Listing from "./components/Listing";
import { getSimilarListings } from "@/sanity/lib/crud/similarListings/data";

// export const experimental_ppr = true;
type ParamsProp = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: ParamsProp) => {
  const slug = params.slug;
  const listing = await getListing(slug);
  const similarListings = await getSimilarListings(listing, 2);
  return <Listing listing={listing} similarListings={similarListings} />;
};

export default Page;
