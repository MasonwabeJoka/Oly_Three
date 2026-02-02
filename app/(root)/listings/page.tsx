import ListingsPage from "@/components/ListingsPage";
import { getListings } from "@/sanity/lib/crud/listings/data";

const listingsPerPage = 10;

const Page = async ({
  searchParams,
}: {
  searchParams: { searchTerm?: string; locationSearch?: string; page?: string };
}) => {


  const resolvedSearchParams = await searchParams;
  const { searchTerm = "", locationSearch = "", page = "1" } = resolvedSearchParams;


  const currentPage = Number(page) || 1;

  let listings: any[] = [];
  let totalCount = 0;

  try {
    const data = await getListings({
      searchTerm,
      locationSearch,
      page: currentPage,
      pageSize: listingsPerPage,
    });
    listings = data.listings || [];
    totalCount = data.totalCount;
  } catch (error) {
    console.error("Failed to fetch listings", error);
  }

  const totalPages = Math.ceil(totalCount / listingsPerPage);
  return (
    <ListingsPage
      searchTerm={searchTerm}
      locationSearch={locationSearch}
      page={page}
      listings={listings}
      totalPages={totalPages}
      currentPage={currentPage}
      site="oly"
    />
  );
};

export default Page;
