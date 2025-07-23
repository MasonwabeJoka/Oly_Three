import { SortData, PriceRanges } from "@/data/DropdownData";
import styles from "./styles.module.scss";
import multipleImages from "@/data/multipleImages";
import { articles } from "@/data/articles";
import { articleCategories } from "@/data/articlesCategories";
import ListingsClient from "./ListingsClient";
import ListingsSearchForm from "./components/ListingsSearchForm";
import Form from "next/form";
import Pagination from "@/components/Pagination";
import TopNotification from "@/components/TopNotification";

const Listings = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchTerm: string; locationSearch: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams?.searchTerm;
  const locationSearch = resolvedSearchParams?.locationSearch;
  return (
    <div className={styles.container}>
      <div className={styles.toastContainer}>
        <div className={styles.toastWrapper}>
          {searchTerm && locationSearch ? (
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
          ):(
            <TopNotification
              key={`${searchTerm}-${locationSearch}`}
              type="success"
              message={
                <div className={styles.resultsTextContainer}>
                  <h1 className={styles.resultsText}>
                    Showing results for <span>All Listings</span> in{" "}
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

      <ListingsClient
        searchTerm={searchTerm}
        locationSearch={locationSearch}
        sortData={SortData}
        priceRanges={PriceRanges}
        multipleImages={multipleImages}
        articles={articles}
        articleCategories={articleCategories}
      />
      <div className={styles.pagination}>
        <Pagination totalPages={985} />
      </div>
    </div>
  );
};

export default Listings;