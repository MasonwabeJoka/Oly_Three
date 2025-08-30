// app/listings/page.tsx
import styles from "./styles.module.scss";
import Listings from "./Listings";
import ListingsSearchForm from "./components/ListingsSearchForm";
import Form from "next/form";
import Pagination from "@/components/Pagination";
import TopNotification from "@/components/TopNotification";
import { getListings } from "@/sanity/lib/crud/listings/data";

const listingsPerPage = 2;

const Page = async ({
  searchParams,
}: {
  searchParams: { searchTerm?: string; locationSearch?: string; page?: string };
}) => {
  const { searchTerm = "", locationSearch = "", page = "1" } = searchParams;

  const currentPage = Number(page) || 1;

  let listings = [];
  let totalCount = 0;

  try {
    const data = await getListings({
      searchTerm,
      locationSearch,
      page: currentPage,
      pageSize: listingsPerPage,
    });
    listings = data.listings;
    totalCount = data.totalCount;
  } catch (error) {
    console.error("Failed to fetch listings:", error);
  }

  const totalPages = Math.ceil(totalCount / listingsPerPage);

  return (
    <div className={styles.container}>
      {/* Top notification */}
      <div className={styles.toastContainer}>
        <div className={styles.toastWrapper}>
          {(searchTerm || locationSearch) && (
            <TopNotification
              key={`${searchTerm}-${locationSearch}`}
              type="success"
              message={
                <div className={styles.resultsTextContainer}>
                  <h1 className={styles.resultsText}>
                    Showing results for <span>{searchTerm} </span> in{" "}
                    <span>{locationSearch}</span>
                  </h1>
                </div>
              }
            />
          )}
        </div>
      </div>

      <Form action="/listings" scroll={false} className={styles.formContainer}>
        <ListingsSearchForm
          searchTerm={searchTerm}
          locationSearch={locationSearch}
          categories="All Appliances"
        />
      </Form>

      <Listings listings={listings} />

      <div className={styles.pagination}>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default Page;
