import styles from "./ListingsPage.module.scss";
import ListingsSearchForm from "./ListingsSearchForm";
import Form from "next/form";
import Pagination from "@/components/Pagination";
import TopNotification from "@/components/TopNotification";
import Listings from "./Listings";

interface ListingsPageProps {
  searchTerm: string;
  locationSearch: string;
  page: string;
  listings: any;
  totalPages: number;
  currentPage: number;
    site: "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services";
}   

const ListingsPage = async ({
    searchTerm,
    locationSearch,
    page,
    listings,
    totalPages,
    currentPage,
    site,
}: ListingsPageProps) => {
 

  return (
    <div className={styles.container}>
      <div className={styles.toastContainer}>
        <div className={styles.toastWrapper}>
          {(searchTerm || locationSearch) && (
            <TopNotification
              key={`${searchTerm}-${locationSearch}`}
              type="success"
              showHomeButton
              message={
                <div className={styles.resultsTextContainer}>
            
                  <h1 className={styles.resultsText}>
                    Showing results for&nbsp;&nbsp;<span>{searchTerm}</span>&emsp;in&emsp;<span>{locationSearch}</span>
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

      <Listings listings={listings} site={site} />

      <div className={styles.pagination}>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default ListingsPage;
