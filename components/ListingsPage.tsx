import styles from "./ListingsPage.module.scss";
import ListingsSearchForm from "./ListingsSearchForm";
import Form from "next/form";
import Pagination from "@/components/Pagination";
import TopNotification from "@/components/TopNotification";
import Listings from "./Listings";
import PropertyListingsSearchForm from "@/app/(oly-properties)/property/components/PropertyListingsSearchForm";

interface ListingsPageProps {
  searchTerm?: string;
  locationSearch?: string;
  page: string;
  listings: any;
  totalPages: number;
  currentPage: number;
  site:
    | "oly"
    | "oly-properties"
    | "oly-auto"
    | "oly-hiring"
    | "oly-services"
    | "oly-shops"
    | "oly-agents"
    | "oly-dealerships";
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
  const test = true;
  return (
    <div className={styles.container}>
      <div className={styles.toastContainer}>
        <div className={styles.toastWrapper}>
          {/* {(searchTerm || locationSearch) && ( */}
          {test && (
            <TopNotification
              key={`${searchTerm}-${locationSearch}`}
              type="success"
              showHomeButton
              message={
                <div className={styles.resultsTextContainer}>
                  {site === "oly" && (
                    <h1 className={styles.resultsText}>
                      Results for <span>{searchTerm}</span> in{" "}
                      <span>{locationSearch}</span>
                    </h1>
                  )}
                  {/* {site === "oly-properties" && (
                    <h1 className={styles.resultsText}>
                      <span>Houses</span>{" "}and{" "}<span>apartments</span>{" "}for sale in{" "}
                      <span>Sandton </span>{" "}between{" "}<span>R500 000</span>{" "}and{" "}
                      <span>R10 000 000</span>
                    </h1>
                  )} */}
                  {site === "oly-properties" && (
                    <h1 className={styles.resultsText}>
                      <span>For Sale</span>&nbsp;{` ∷ `}&nbsp;<span>Houses,</span>{" "}<span>apartments</span>&nbsp;{` ∷ `}&nbsp;
                      <span>Sandton </span>&nbsp;{` ∷ `}&nbsp;<span>R500 000</span>&nbsp; — &nbsp;
                      <span>R10 000 000</span>
                    </h1>
                  )}
                  {/* {site === "oly-properties" && (
                    <h1 className={styles.resultsText}>
                      <span>Houses,</span>{" "}<span>apartments</span>{" "}{` • `}{" "}
                      <span>Sandton </span>{" "}{` • `}{" "}<span>R500 000</span>{" "} - {" "}
                      <span>R10 000 000</span>
                    </h1>
                  )} */}
                  {/* {site === "oly-properties" && (
                    <h1 className={styles.resultsText}>
                      <span>Houses,</span>{" "}<span>apartments</span>{" "}-{" "}
                      <span>Sandton </span>{" "}-{" "}<span>R500 000</span>{" "} to {" "}
                      <span>R10 000 000</span>
                    </h1>
                  )} */}
                </div>
              }
            />
          )}
        </div>
      </div>

      {site === "oly" && (
        <Form
          action="/listings"
          scroll={false}
          className={styles.formContainer}
        >
          <ListingsSearchForm
            searchTerm={searchTerm}
            locationSearch={locationSearch}
            categories="All Appliances"
          />
        </Form>
      )}
      {site === "oly-properties" && (
        <Form
          action="/property/listings"
          scroll={false}
          className={styles.formContainer}
        >
          <PropertyListingsSearchForm
            searchTerm={searchTerm}
            locationSearch={locationSearch}
            categories="All Appliances"
          />
        </Form>
      )}

      <Listings listings={listings} site={site} />

      <div className={styles.pagination}>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default ListingsPage;
