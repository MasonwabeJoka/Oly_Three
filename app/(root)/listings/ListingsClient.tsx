"use client";

import { useEffect, useRef } from "react";
import styles from "./Listings.module.scss";
import ListingsExpanded from "@/components/ListingsExpanded";
import ListingsCollage from "@/components/ListingsCollage";
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

export default function ListingsClient({
  sortData,
  priceRanges,
  multipleImages,
  articles,
  articleCategories,
}) {
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

  const searchParams = useSearchParams();
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

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <nav className={styles.nav}>
          <Navbar />
        </nav>
        <div className={styles.modalContainer}>
          <Modal
            showModal={showMenuModal}
            setShowModal={setShowMenuModal}
            modalContent={<Menu />}
          />
        </div>
        <div className={styles.listingsSearchForm}>
          <ListingsSearchForm onSubmit={onSubmit} />
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
            <div className={styles.sortingContainer}>
              <Tabs
                tabs={[
                  "Order",
                  "Price Range",
                  "Show Feed/Show Map",
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
          <div className={styles.pagination}>
            <Pagination totalPages={985} />
          </div>
        </div>
      </div>
    </div>
  );
}
