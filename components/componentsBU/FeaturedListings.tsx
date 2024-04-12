"use client";
import styles from "./FeaturedListings.module.scss";
import { useState, useEffect } from "react";
import Button from "@/components/Buttons";
import ListingsCollage from "@/components/ListingsCollage";
import Input from "@/components/Input";
import useTitleStore from "@/store/titleStore";
import { suggestions } from "@/data/SuggestionsData";
import Link from "next/link";

const FeaturedListings = () => {
  const Title = useTitleStore((state) => state.Title);

  return (
    <div className={styles.listingsSection}>
      <Title className={styles.title}>Featured Listings</Title>
      <div className={styles.collage}>
        <ListingsCollage isDeletable={false} />
      </div>

      <div className={styles.buttonsAndSearch}>
        <Link href="/listings" className={styles.buttons}>
          <Button
            className={styles.button}
            buttonChildren={"View all listings"}
            buttonType="normal"
            buttonSize="large"
            name="View All Listings Button"
            type="button"
            ariaLabel="View All Listings Button"
            autoFocus={false}
            disabled={false}
          />
        </Link>
        <form className={styles.searchFields} name="Featured Listings Search">
          <div className={styles.searchTermContainer}>
            <Input
              isSearchBar={true}
              suggestions={suggestions}
              className={`${styles.input} ${styles.searchTerm}`}
              inputSize="large"
              inputType="text"
              iconPosition="right"
              iconSrcLeft=""
              iconSrcRight="/icons/search.png"
              iconWidth={32}
              iconHeight={32}
              name="search"
              label="Search"
              placeholder="What are you looking for?"
              id="Featured Listings Search"
              ariaLabel="Search"
              autoFocus={false}
              autoComplete="off"
              required={true}
            />
          </div>
          <div className={styles.locationContainer}>
            <Input
              isSearchBar={true}
              suggestions={suggestions}
              className={`${styles.input} ${styles.location}`}
              inputSize="large"
              inputType="text"
              iconPosition="right"
              iconSrcLeft=""
              iconSrcRight="/icons/search.png"
              iconWidth={32}
              iconHeight={32}
              name="search"
              label="Search"
              placeholder="Search by city, province, township..."
              id="Featured Listings Search"
              ariaLabel="Location"
              autoFocus={false}
              autoComplete="off"
              required={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeaturedListings;
