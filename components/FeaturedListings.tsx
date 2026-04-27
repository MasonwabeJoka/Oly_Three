import styles from "./FeaturedListings.module.scss";
import ListingsCollage from "@/components/ListingsCollage";
import Link from "next/link";
import Button from "@/components/Buttons";
import FeaturedListingsClient from "./FeaturedListingsClient";
import Pagination from "./Pagination";
import { getFeaturedListings } from "@/sanity/lib/crud/featuredListings/data";

type FeaturedListingsProps = {
   site:
    | "oly"
    | "oly-properties"
    | "oly-auto"
    | "oly-hiring"
    | "oly-services"
    | "oly-shops"
    | "oly-agents"
    | "oly-dealerships";
  currentPage: number;
};

const FeaturedListings = async ({ site, currentPage }: FeaturedListingsProps) => {
  const data = await getFeaturedListings(currentPage);
  const { listings, totalPages } = data;


  return (
    <>
      {site === "oly" && (
        <div className={styles.listingsSection}>
          <h2 className={styles.title}>Featured Listings</h2>
          <div className={styles.collage}>
            <FeaturedListingsClient site={site} />
            {/* <TempListingsCollage
              site={site}
              listings={listings || []}
              sortBy="postedOn"
              sortOrder="desc"
              isDeletable={false}
              isDashboard={false}
              cardSize="standard"
            /> */}
            
              <ListingsCollage
                site={site}
                listings={listings}
                sortBy="postedOn"
                sortOrder="desc"
                isDeletable={false}
                isDashboard={false}
                cardSize="standard"
              />
         
         
            <div className={styles.pagination}>
              <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
          </div>
          <div className={styles.buttonsAndSearch}>
            <Link href="/listings" className={styles.buttons}>
              <Button
                className={styles.button}
                buttonChildren="View all listings"
                buttonType="primary"
                buttonSize="large"
                name="View All Listings Button"
                type="button"
                ariaLabel="View All Listings Button"
                autoFocus={false}
                disabled={false}
              />
            </Link>
          </div>
        </div>
      )}
      {site === "oly-properties" && (
        <div className={styles.listingsSection}>
          <div className={styles.collage}>
            <FeaturedListingsClient site={site} />
            <ListingsCollage
              site={site}
              listings={listings}
              isDeletable={false}
              isDashboard={false}
              cardSize="standard"
              sortBy="postedOn"
              sortOrder="desc"
            />
          </div>
          <div className={styles.buttonsAndSearch}>
            <Link href="/listings" className={styles.buttons}>
              <Button
                className={styles.button}
                buttonChildren="View All Properties"
                buttonType="primary"
                buttonSize="large"
                name="View All Listings Button"
                type="button"
                ariaLabel="View All Listings Button"
                autoFocus={false}
                disabled={false}
              />
            </Link>
          </div>
        </div>
      )}
      {site === "oly-shops" && (
        <div className={styles.listingsSection}>
          <div className={styles.collage}>
            <FeaturedListingsClient site={site} />
            <div className={styles.collage}>
              <ListingsCollage
                site={site}
                listings={listings}
                isDeletable={false}
                isDashboard={false}
                cardSize="standard"
                sortBy="postedOn"
                sortOrder="desc"
              />

              <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
          </div>
          <div className={styles.buttonsAndSearch}>
            <Link href="/listings" className={styles.buttons}>
              <Button
                className={styles.button}
                buttonChildren="View All Properties"
                buttonType="primary"
                buttonSize="large"
                name="View All Listings Button"
                type="button"
                ariaLabel="View All Listings Button"
                autoFocus={false}
                disabled={false}
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedListings;
