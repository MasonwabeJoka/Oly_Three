"use client";
import { useEffect, useRef } from "react";
import styles from "./Listings.module.scss";
import { SortData, PriceRanges } from "@/data/DropdownData";
import ListingsExpanded from "@/components/ListingsExpanded";
import PaginatedListingsCollage from "@/components/PaginatedListingsCollage";
import useArticlesStore from "@/store/articlesStore";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/modalStore";
import Menu from "@/components/Menu";
import Tabs from "@/components/Tabs";
import { useFetchAdStore } from "@/store/useFetchStore";
import ListingsSearchForm from "./components/ListingsSearchForm";
import { useListingsStore } from "@/store/listingsStore";
import ListingsCollage from "@/components/ListingsCollage";
import multipleImages from "@/data/multipleImages";
import Navbar from "@/components/layouts/Navbar";

// TODO:Put breadcrumbs above results instead of above search inputs.
const Listings = () => {
  const {
    expanded,
    sortOptions,
    priceOptions,
    altWidth,
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
    setSortOptions,
    setPriceOptions,
  } = useListingsStore();

  const { avatars, getAvatars } = useArticlesStore();
  const { showMenuModal, setShowMenuModal } = useModalStore();
  const { ads, fetchAds } = useFetchAdStore();
  const tabsRef = useRef<HTMLDivElement>(null);
  const sortingContainerRef = useRef<HTMLDivElement>(null);
  const observedDivRef = useRef<HTMLDivElement>(null);

  const tempImages = (() => multipleImages.map((item) => item.images))();
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
  }, [isClient, page]);

  useEffect(() => {
    getAvatars();
  }, [getAvatars]);

  const showFeed = () => {
    setSortOptions(false);
    setPriceOptions(false);
  };

  const handleSelect = () => {
    setSortOptions(false);
    setPriceOptions(false);
  };

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
        rootMargin:
          sortOptions || priceOptions
            ? "-280px 0px 0px 0px"
            : "0px 0px 0px 0px",
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

        <div className={styles.filters}>
         
            <Tabs
              tabs={["Make", "Model", "Body Type", "More Filters+"]}
              condition={!expanded}
              width={954}
              altWidth={988}
              onClickHandlers={[undefined, undefined, undefined, undefined]}
              dashboard={false}
            />
      
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
                "Sort",
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
              <ul className={styles.options}>
                {SortData.map((option) => (
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
                {PriceRanges.map((element) => (
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

          <div
            ref={observedDivRef}
            style={{ height: "1px", visibility: "hidden" }}
          ></div>

          <div className={styles.listings}>
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
};

export default Listings;
