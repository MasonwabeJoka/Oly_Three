"use client";
import { useState, useEffect, useRef } from "react";
import Input from "@/components/Input";
import styles from "./Listings.module.scss";
import { SortData, PriceRanges } from "@/data/DropdownData";
import { suggestions } from "@/data/SuggestionsData";
import Breadcrumbs from "@/components/Breadcrumbs";
import PaginatedListingsCollage from "@/components/PaginatedListingsCollage";
import ListingsExpanded from "@/components/ListingsExpanded";
import useArticlesStore from "@/store/articlesStore";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";
import Menu from "@/components/Menu";
import Tabs from "@/components/Tabs";
import Map from "@/components/Map";
import { useFetchAdStore } from "@/store/useFetchStore";
import Select from "@/components/Select";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";

import Button from "@/components/Buttons";

type FormValues = z.infer<typeof searchFormSchema>;

const Listings = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);
  const avatars = useArticlesStore((state) => state.avatars);
  const getAvatars = useArticlesStore((state) => state.getAvatars);
  const [sortOptions, setSortOptions] = useState(false);
  const [priceOptions, setPriceOptions] = useState(false);
  const [altWidth, setAltWidth] = useState(954);
  const [optionsWidth, setOptionsWidth] = useState("57.24rem");
  const showMenuModal = useModalStore((state) => state.showMenuModal);
  const setShowMenuModal = useModalStore((state) => state.setShowMenuModal);
  const tabsRef = useRef<HTMLDivElement>(null);
  const listingsRef = useRef<HTMLDivElement>(null);
  const sortingContainerRef = useRef<HTMLDivElement>(null);
  const observedDivRef = useRef<HTMLDivElement>(null);
  const observedOptionsDivRef = useRef<HTMLDivElement>(null);
  const { ads, fetchAds, imageUrls } = useFetchAdStore();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // TODO:Put breadcrumbs above results instead of above search inputs.
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

  const locations = ads.map((ad) => ad.location);

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

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema),
  });
  const { register, control, handleSubmit, setValue, formState } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  return (
    <div className={styles.container}>
      {/* <aside className={styles.sidebar}>
      <Map locations={locations}/>
    </aside> */}
      <div className={styles.main}>
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <Modal
              showModal={showMenuModal}
              setShowModal={setShowMenuModal}
              modalContent={<Menu />}
            />
          </div>
        </div>
        <form
          id="Listings Search"
          className={styles.searchContainer}
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <fieldset className={styles.search}>
            <div className={styles.categories}>
              <Select
                options={[
                  "All Categories",
                  "Properties",
                  "Vehicles",
                  "Jobs",
                  "Services",
                ]}
                initialValue="All Categories"
                selectSize="large"
                label="Provinces"
                id="provinces"
                name="provinces"
                ariaLabel="Provinces"
                autoFocus={false}
                required={true}
              />
            </div>
            <div className={styles.searchTerm}>
              <p className={styles.errorMessage}>
                {errors.searchTerm?.message}
              </p>
              <div
                className={`${styles.breadcrumbs} ${styles.searchTermBreadcrumbs}`}
              >
                <Breadcrumbs
                  homeBreadcrumb={{ id: 1, name: "All Categories", href: "#" }}
                  firstBreadcrumb={{
                    id: 2,
                    name: "Electronics & Computers",
                    href: "#",
                  }}
                  searchResult={{ id: 3, name: "Computer", href: "#" }}
                />
              </div>
              <div className={styles.searchTermInputContainer}>
                <Input
                  className={`${styles.formInput} ${styles.searchTermInput}`}
                  isSearchBar={true}
                  suggestions={suggestions}
                  inputSize="large"
                  inputType="text"
                  label="Search Field: "
                  placeholder="What are you looking for?"
                  id="searchTerm"
                  ariaLabel="Search Term"
                  autoComplete="on"
                  autoFocus={false}
                  required={true}
                  form="Listings Search"
                  iconSrcLeft=""
                  iconSrcRight="/icons/search.png"
                  iconPosition="right"
                  iconWidth={32}
                  iconHeight={32}
                  {...register("searchTerm")}
                  onChange={(e) => {
                    setValue("searchTerm", e.target.value, {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
              </div>
            </div>

            <div className={styles.location}>
              <p className={styles.errorMessage}>
                {errors.locationSearch?.message}
              </p>
              <div
                className={`${styles.breadcrumbs} ${styles.locationBreadcrumbs}`}
              >
                <Breadcrumbs
                  homeBreadcrumb={{ id: 4, name: "South Africa", href: "#" }}
                  firstBreadcrumb={{ id: 5, name: "Gauteng", href: "#" }}
                  secondBreadcrumb={{ id: 6, name: "Johannesburg", href: "#" }}
                  searchResult={{ id: 7, name: "Sandton", href: "#" }}
                />
              </div>
              <div className={styles.locationInputContainer}>
                <Input
                  className={`${styles.formInput} ${styles.locationInput}`}
                  isSearchBar={true}
                  suggestions={suggestions}
                  inputSize="large"
                  inputType="text"
                  label="Location: "
                  placeholder="Search by city, province, township..."
                  id="LocationSearch"
                  ariaLabel="Location"
                  autoComplete="on"
                  autoFocus={false}
                  required
                  form="Listings Search"
                  iconSrcLeft=""
                  iconSrcRight="/icons/search.png"
                  iconPosition="right"
                  iconWidth={32}
                  iconHeight={32}
                  {...register("locationSearch")}
                  onChange={(e) => {
                    setValue("locationSearch", e.target.value, {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
              </div>
            </div>
          </fieldset>
          <div className={styles.searchButton}>
            <Button
              buttonChildren={"Search"}
              className={styles.search}
              buttonType="normal"
              buttonSize="large"
              name="Search Button"
              type="submit"
              ariaLabel="Search Button"
              autoFocus={false}
              disabled={isSubmitting}
            />
          </div>
        </form>

        <div className={styles.filters}>
          <div ref={tabsRef}>
            <Tabs
              tabs={["Make", "Model", "Body Type", "More Filters+"]}
              condition={!expanded}
              width={954}
              altWidth={988}
              onClickHandlers={[undefined, undefined, undefined, undefined]}
              dashboard={false}
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
              dashboard={false}
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
              <ListingsExpanded
                avatars={avatars}
                isDeletable={false}
                isDashboard={false}
              />
            ) : (
              <PaginatedListingsCollage
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
