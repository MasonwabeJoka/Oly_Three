"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Listings.module.scss";
import useArticlesStore from "@/store/articlesStore";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/modalStore";
import Menu from "@/components/Menu";
import Tabs from "@/components/Tabs";
import { useFetchAdStore } from "@/store/useFetchStore";
import ListingsSearchForm from "./../listings/components/ListingsSearchForm";
import { useListingsStore } from "@/store/listingsStore";
import Navbar from "@/components/layouts/Navbar";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
import Listings from "@/components/Listings";
import TopNotification from "@/components/TopNotification";
import ListingsExpanded from "@/components/ListingsExpanded";
import ListingsCollage from "@/components/ListingsCollage";

interface ListingsClientProps {
  searchTerm: string;
  locationSearch: string;
  sortData: { id: number; result: string }[];
  priceRanges: { id: number; result: string[] }[];
  multipleImages: { id: number; images: string[] }[];
  articles: { id: number; title: string; image: string; category: string }[];
  articleCategories: string[];
}

export default function ListingsClient({
  searchTerm,
  locationSearch,
  sortData,
  priceRanges,
  multipleImages,
  articles,
  articleCategories,
}: ListingsClientProps) {
  const {
    expanded,
    sortOptions,
    setSortOptions,
    priceOptions,
    setPriceOptions,
    altWidth = 988,
    optionsWidth,
    page,
    loading,
    isClient,
    setIsClient,
    setLoading,
    toggleSortOptions,
    togglePriceOptions,
    toggleExpanded,
    setAltWidth,
    setOptionsWidth,
  } = useListingsStore();

  const { avatars, getAvatars } = useArticlesStore();
  const { showMenuModal, setShowMenuModal } = useModalStore();
  const { ads, fetchAds } = useFetchAdStore();
  const [showResultsNotification, setShowResultsNotification] = useState(true);

  const tempImages = multipleImages.map((item) => item.images);

  // Explicitly type refs as HTMLDivElement
  const filtersRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const listingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (isClient) {
      fetchAds({
        limit: 5,
        page: page,
        offset: 0,
        sortOrder: "desc",
        sortBy: "price",
      });
    }
    setLoading(false);
  }, [isClient, page, fetchAds, setLoading]);

  useEffect(() => {
    getAvatars();
  }, [getAvatars]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !filtersRef.current ||
        !tabsContainerRef.current ||
        !listingsRef.current
      )
        return;

      const filtersRect = filtersRef.current.getBoundingClientRect();
      const sortingRect = tabsContainerRef.current.getBoundingClientRect();
      const listingsRect = listingsRef.current.getBoundingClientRect();

      if (!expanded && listingsRect.top <= sortingRect.bottom) {
        setOptionsWidth("81.6rem");
        setAltWidth(1360);
      }
      if (listingsRect.top > filtersRect.bottom) {
        setOptionsWidth("57.24rem");
        setAltWidth(954);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expanded, setOptionsWidth, setAltWidth]);

  const showFeed = () => {
    setSortOptions(false);
    setPriceOptions(false);
  };

  const handleSelect = () => {
    setSortOptions(false);
    setPriceOptions(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.modalContainer}>
          <Modal
            showModal={showMenuModal}
            setShowModal={setShowMenuModal}
            modalContent={<Menu />}
          />
        </div>

        <div className={styles.listingsContainer}>
          <div className={styles.tabsContainer} ref={tabsContainerRef}>
            <div className={styles.filters} ref={filtersRef}>
              <Tabs
                tabs={["Make", "Model", "Body Type", "More Filters+"]}
                condition={!expanded}
                width={954}
                altWidth={altWidth}
                onClickHandlers={[undefined, undefined, undefined, undefined]}
                dashboard={false}
              />
            </div>
            <div className={styles.resultsToolbarContainer}>
              <Tabs
                tabs={[
                  "Order",
                  "Price Range",
                  "Show Map",
                  expanded ? "Collage View" : "Expanded View",
                ]}
                condition={!expanded}
                width={954}
                altWidth={altWidth}
                onClickHandlers={[
                  toggleSortOptions,
                  togglePriceOptions,
                  showFeed,
                  toggleExpanded,
                ]}
                dashboard={false}
              />

              {sortOptions ? (
                <ul
                  className={sortOptions ? styles.options : styles.hideOptions}
                >
                  {sortData.map((option) => (
                    <li
                      key={option.id}
                      className={styles.option}
                      onClick={handleSelect}
                      style={{ width: expanded ? "57.24rem" : optionsWidth }}
                    >
                      <span className={styles.optionText}>{option.result}</span>
                    </li>
                  ))}
                </ul>
              ) : priceOptions ? (
                <ul className={styles.options}>
                  {priceRanges.map((element) => (
                    <li
                      key={element.id}
                      className={styles.option}
                      style={{ width: expanded ? "57.24rem" : optionsWidth }}
                    >
                      <div style={{ display: "flex", gap: "56px" }}>
                        <span>{element.result[0]}</span>
                        <span>-</span>
                        <span>{element.result[1]}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          {/* 
          <div className={styles.listings} ref={listingsRef}>
            <Listings
              expanded={expanded}
              tempImages={tempImages}
              avatars={avatars}
              
            />
          </div> */}
          <div className={styles.listings} ref={listingsRef}>
            {expanded ? (
              <ListingsExpanded
                category="all"
                images={tempImages}
                avatars={avatars}
                isDeletable={false}
                isDashboard={false}
                limit={4}
                page={1}
                sortBy="postedOn"
                sortOrder="desc"
              />
            ) : (
              <ListingsCollage
                category="all"
                images={tempImages}
                isDeletable={false}
                isDashboard={false}
                limit={4}
                page={1}
                sortBy="postedOn"
                sortOrder="desc"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
