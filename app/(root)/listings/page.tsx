import styles from "./styles.module.scss";
import multipleImages from "@/data/multipleImages";
import { articles } from "@/data/articles";
import { articleCategories } from "@/data/articlesCategories";
import ListingsClient from "./Listings";
import Listings from "./Listings";
import ListingsSearchForm from "./components/ListingsSearchForm";
import Form from "next/form";
import Pagination from "@/components/Pagination";
import TopNotification from "@/components/TopNotification";
import ads from "@/data/adsData";
import { getListings } from "@/sanity/lib/crud/listings/data";
import { getUser } from "@/sanity/lib/crud/user/data";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm: string; locationSearch: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams?.searchTerm;
  const locationSearch = resolvedSearchParams?.locationSearch;

  const listings = await getListings();
  const { _id, description, images, postedOn, price, slug, title, user } =
    listings;
  console.log("user", listings[0].user);
  // console.log(JSON.stringify(listings, null, 2));

  return (
    <div className={styles.container}>
      <div className={styles.toastContainer}>
        <div className={styles.toastWrapper}>
          {searchTerm && locationSearch && (
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
              // onClose={() => {}}
            />
          )}
        </div>
      </div>
      <Form action="/listings" scroll={false} className={styles.formContainer}>
        <ListingsSearchForm
          searchTerm={searchTerm}
          locationSearch={locationSearch}
          categories="  All Appliances"
        />
      </Form>

      <Listings
        listings={listings}
        searchTerm={searchTerm}
        locationSearch={locationSearch}
      />
      <div className={styles.pagination}>
        <Pagination totalPages={985} />
      </div>
    </div>
  );
};

export default Page;
