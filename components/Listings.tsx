"use client";

import { useEffect, useRef, RefObject } from "react";
import styles from "./Listings.module.scss";
import useArticlesStore from "@/store/articlesStore";
import { useListingsStore } from "@/store/listingsStore";
import { useBreakpoint } from "@/store/useBreakpointStore";
import { ListingsQueryResult } from "@/sanity.types";
import FilterTabs from "@/components/FilterTabs";
import ResultsToolbar from "@/components/ResultsToolbar";
import MenuModal from "@/components/MenuModal";
import ListingsClient from "@/components/ListingsClient";
import { useScrollAdjustments } from "@/hooks/useScrollAdjustments";

interface ListingsClientProps {
  listings: ListingsQueryResult;
  site: "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services";
}

export default function Listings({ listings, site }: ListingsClientProps) {
  const {
    expanded,
    setIsClient,
    toggleExpanded,
    setOptionsWidth,
    setAltWidth,
    optionsWidth,
    collageViewWidth = 988,
  } = useListingsStore();
  const { getAvatars } = useArticlesStore();
  const { currentScreenSize } = useBreakpoint();
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const listingsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    getAvatars();
  }, [getAvatars]);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [listings]);

  useScrollAdjustments({
    filtersRef: filtersRef as RefObject<HTMLDivElement>,
    tabsContainerRef: tabsContainerRef as RefObject<HTMLDivElement>,
    listingsRef: listingsRef as RefObject<HTMLDivElement>,
    expanded,
    currentScreenSize,
    setOptionsWidth,
    setAltWidth,
  });

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <MenuModal showModal={false} setShowModal={() => {}} />
        <div className={styles.listingsContainer}>
          <div className={styles.tabsContainer} ref={tabsContainerRef} id="tabsContainer">
            <div className={styles.filters}>
              <FilterTabs
                site={site}
                currentScreenSize={currentScreenSize}
                collageViewWidth={collageViewWidth}
                expanded={expanded}
                optionsWidth={optionsWidth}
              />
            </div>
            <div className={styles.resultsToolbar}>
              <ResultsToolbar
                site={site}
                currentScreenSize={currentScreenSize}
                collageViewWidth={collageViewWidth}
                expanded={expanded}
                optionsWidth={optionsWidth}
                toggleExpanded={toggleExpanded}
              />
            </div>
          </div>
          <div className={styles.listings} ref={listingsRef}>
            <ListingsClient
              category="all"
              listings={listings}
              expanded={expanded}
              limit={4}
              page={1}
              sortBy="postedOn"
              sortOrder="desc"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
