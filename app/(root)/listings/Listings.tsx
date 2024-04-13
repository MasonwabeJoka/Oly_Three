"use client";
import { useState, useEffect, useRef } from "react";
import Input from "@/components/Input";
import styles from "./Listings.module.scss";
import { SortData, PriceRanges } from "@/data/DropdownData";
import { suggestions } from "@/data/SuggestionsData";
import Breadcrumbs from "@/components/Breadcrumbs";
import ListingsCollage from "@/components/ListingsCollage";
import ListingsExpanded from "@/components/ListingsExpanded";
import useArticlesStore from "@/store/articlesStore";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";
import Notifications from "@/components/Notifications";
import Tabs from "@/components/Tabs";

const Listings = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);
  const avatars = useArticlesStore((state) => state.avatars);
  const getAvatars = useArticlesStore((state) => state.getAvatars);
  const [sortOptions, setSortOptions] = useState(false);
  const [priceOptions, setPriceOptions] = useState(false);
  const [altWidth, setAltWidth] = useState(954);
  const [optionsWidth, setOptionsWidth] = useState("57.24rem");
  const showNotificationsModal = useModalStore(
    (state) => state.showNotificationsModal
  );
  const setShowNotificationsModal = useModalStore(
    (state) => state.setShowNotificationsModal
  );
  const tabsRef = useRef<HTMLDivElement>(null);
  const listingsRef = useRef<HTMLDivElement>(null);
  const sortingContainerRef = useRef<HTMLDivElement>(null);
  const observedDivRef = useRef<HTMLDivElement>(null);
  const observedOptionsDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAvatars();
  }, [getAvatars]);

  const showSortOptions = () => {
    setPriceOptions(false);
    setSortOptions(!sortOptions);
  };

  const showPriceOptions = () => {
    setSortOptions(false);
    setPriceOptions(!priceOptions);
  };

  const showFeed = () => {
    setSortOptions(false);
    setPriceOptions(false);
  };

  const changeViews = () => {
    setSortOptions(false);
    setPriceOptions(false);
    setExpanded((prev) => !prev);
  };

  const handleSelect = () => {
    setSortOptions(false);
    setPriceOptions(false);
  };

  useEffect(() => {
    const handleMouseUp = (event) => {
      if (tabsRef.current && !tabsRef.current.contains(event.target)) {
        showSortOptions();
        showPriceOptions();
        showFeed();
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.makeDivSticky);
          } else {
            entry.target.classList.remove(styles.makeDivSticky);
          }
        });
      },
      {
        threshold: 0.01,
      }
    );

    const elementToObserve = document.querySelector("#blockingDiv");

    if (elementToObserve) {
      observer.observe(elementToObserve);
    }

    return () => {
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.getSticky);
          } else {
            entry.target.classList.remove(styles.getSticky);
          }
        });
      },
      {
        threshold: 0.01,
      }
    );

    const elementToObserve = document.querySelector("#sortingButtons");

    if (elementToObserve) {
      observer.observe(elementToObserve);
    }

    return () => {
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.hideListings);
          } else {
            entry.target.classList.remove(styles.hideListings);
          }
        });
      },
      {
        threshold: 0.01,
      }
    );

    const elementToObserve = document.querySelector("#sortingOptions");

    if (elementToObserve) {
      observer.observe(elementToObserve);
    }

    return () => {
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAltWidth(954);
            setOptionsWidth("57.24rem");
          } else {
            setAltWidth(1360);
            setOptionsWidth("81.6rem");
          }
        });
      },
      {
        rootMargin: sortOptions || priceOptions ? "-280px 0px 0px 0px" : "0px 0px 0px 0px",
        threshold: 0.01,
      }
    );

    const elementToObserve = observedDivRef.current;

    if (elementToObserve) {
      observer.observe(elementToObserve);
    }

    return () => {
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, [sortOptions, priceOptions]);



  return (
    <div className={styles.container}>
      <section className={styles.modalContainer}>
        <div className={styles.modal}>
          <Modal
            showModal={showNotificationsModal}
            setShowModal={setShowNotificationsModal}
            modalContent={<Notifications />}
          />
        </div>
      </section>
      <form id="Listings Search" className={styles.searchContainer}>
        <fieldset className={styles.search}>
          <div className={styles.searchTerm}>
            <div
              className={`${styles.breadcrumbs} ${styles.searchTermBreadcrumbs}`}
            >
              <Breadcrumbs
                homeBreadcrumb="All Categories"
                firstBreadcrumb="Electronics & Computers"
                searchResult="Computer"
              />
            </div>
            <div className={styles.searchTermInputContainer}>
              <Input
                className={`${styles.formInput} ${styles.searchTermInput}`}
                isSearchBar={true}
                suggestions={suggestions}
                inputSize="xxLarge"
                inputType="text"
                label="Search Field: "
                placeholder="What are you looking for?"
                id="search"
                name="Search"
                ariaLabel="What are you looking for?"
                autoComplete="on"
                autoFocus={false}
                required={false}
                form="Listings Search"
                iconSrcLeft=""
                iconSrcRight="/icons/search.png"
                iconPosition="right"
                iconWidth={32}
                iconHeight={32}
              />
            </div>
          </div>
          <div className={styles.location}>
            <div
              className={`${styles.breadcrumbs} ${styles.locationBreadcrumbs}`}
            >
              <Breadcrumbs
                homeBreadcrumb="South Africa"
                firstBreadcrumb="Gauteng"
                secondBreadcrumb="Johannesburg"
                searchResult="Sandton"
              />
            </div>
            <div className={styles.locationInputContainer}>
              <Input
                className={`${styles.formInput} ${styles.locationInput}`}
                inputSize="xxLarge"
                inputType="text"
                label="Location: "
                placeholder="Search by city, province, township..."
                id="location"
                name="location"
                ariaLabel="Location"
                autoComplete="on"
                autoFocus={false}
                required={false}
                form="Listings Search"
                iconSrcLeft=""
                iconSrcRight="/icons/search.png"
                iconPosition="right"
                iconWidth={32}
                iconHeight={32}
              />
            </div>
          </div>
        </fieldset>
      </form>
      <div className={styles.filters}>
        <div ref={tabsRef}>
          <Tabs
            tabs={["Make", "Model", "Body Type", "More Filters+"]}
            condition={!expanded}
            width={954}
            altWidth={988}
            onClickHandlers={[undefined, undefined, undefined, undefined]}
          />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#edf2f7",
          width: "100vw",
          height: "7.75rem",
          borderRadius: "0 0 2rem 2rem",
          pointerEvents: "none",
        }}
        id="blockingDiv"
      ></div>

      <div className={styles.listingsContainer}>
        <div
          ref={sortingContainerRef}
          className={styles.sortingContainer}
          id="sortingButtons"
        >
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
              showSortOptions,
              showPriceOptions,
              showFeed,
              changeViews,
            ]}
          />

          {sortOptions ? (
            <ul
              className={sortOptions ? styles.options : styles.hideOptions}
              id="sortingOptions"
              style={{ width: expanded ? "100%" : "112%" }}
            >
              {SortData.map((option) => (
                <li
                  key={option.id}
                  className={styles.option}
                  onClick={handleSelect}
                  style={{ width: expanded ? "57.24rem" : optionsWidth }}
                >
                  <div>
                    <span className={styles.optionText}>{option.result}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : priceOptions ? (
            <ul
              className={priceOptions ? styles.options : styles.hideOptions}
              id="priceOptions"
              style={{
                width: expanded ? "100%" : "112%",
                borderRadius: expanded
                  ? "0 0 3.125rem 3.125rem"
                  : "0 0 5rem 5rem",
              }}
            >
              {PriceRanges.map((element) => {
                return (
                  <li
                    key={element.id}
                    value={element.result}
                    className={styles.option}
                    style={{ width: expanded ? "57.24rem" : optionsWidth }}
                  >
                    <div style={{ display: "flex", gap: "56px" }}>
                      <span>{element.result[0]}</span>
                      <span>-</span>
                      <span>{element.result[1]}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div
          ref={observedDivRef}
          style={{ height: "1px", visibility: "hidden" }}
        ></div>
  

        <div ref={listingsRef} className={styles.listings}>
          {expanded ? (
            <ListingsExpanded avatars={avatars} isDeletable={false} isDashboard={false} />
          ) : (
            <ListingsCollage isDeletable={false} isDashboard={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
