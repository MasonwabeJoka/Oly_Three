"use client";
import styles from "./FeaturedListings.module.scss";
import ListingsCollage from "@/components/ListingsCollage";
import Link from "next/link";
import Button from "@/components/Buttons";
import FeaturedListingsClient from "./FeaturedListingsClient";
import { FeaturedListingsQueryResult } from "@/sanity/types";
import Pagination from "./Pagination";
import { useSuspenseQuery } from "@tanstack/react-query";
import { featuredListingsQueryOptions } from "@/sanity/lib/crud/listings/queryOptions";
import TempListingsCollage from "./Temp/TempListingCollage";

type FeaturedListingsProps = {
  category: "all" | "property" | "vehicles" | "services" | "jobs" | "shops";
  currentPage: number;
};

const FeaturedListings = ({ category, currentPage }: FeaturedListingsProps) => {
  const { data } = useSuspenseQuery(featuredListingsQueryOptions(currentPage));
  const { listings, totalPages } = data;
  return (
    <>
      {category === "all" && (
        <div className={styles.listingsSection}>
          <h2 className={styles.title}>Featured Listings</h2>
          <div className={styles.collage}>
            <FeaturedListingsClient category={category} />
            <TempListingsCollage
              category={category}
              listings={listings || []}
              sortBy="postedOn"
              sortOrder="desc"
              isDeletable={false}
              isDashboard={false}
              cardSize="standard"
            />
            {/* <ListingsCollage
              category={category}
              listings={listings}
              sortBy="postedOn"
              sortOrder="desc"
              isDeletable={false}
              isDashboard={false}
              cardSize="standard"
            /> */}
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
