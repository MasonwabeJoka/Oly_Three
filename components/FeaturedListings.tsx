"use client";
import styles from "./FeaturedListings.module.scss";
import ListingsCollage from "@/components/ListingsCollage";
import Link from "next/link";
import Button from "@/components/Buttons";
import FeaturedListingsClient from "./FeaturedListingsClient";
import { FeaturedListingsQueryResult } from "@/sanity/types";
import Pagination from "./Pagination";
import { use } from "react";


type ListingsPromiseType =  Promise<{
    listings: any;
    totalPages: number;
    currentPage: number;
  }>
type FeaturedListingsProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  listingsPromise: ListingsPromiseType;
};

const FeaturedListings = ({
  category,
  listingsPromise,
}: FeaturedListingsProps) => {
  const resolvedListings = use(listingsPromise);
  const { listings, totalPages, currentPage } = resolvedListings;
  return (
    <>
      {category === "all" && (
        <div className={styles.listingsSection}>
          <div className={styles.collage}>
            <FeaturedListingsClient category={category} />
            <ListingsCollage
              category={category}
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
      {category === "property" && (
        <div className={styles.listingsSection}>
          <div className={styles.collage}>
            <FeaturedListingsClient category={category} />
            <ListingsCollage
              category={category}
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
      {category === "shops" && (
        <div className={styles.listingsSection}>
          <div className={styles.collage}>
            <FeaturedListingsClient category={category} />
            <div className={styles.collage}>
              <ListingsCollage
                category={category}
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
