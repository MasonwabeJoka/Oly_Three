"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Listings.module.scss";
import useArticlesStore from "@/store/articlesStore";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/modalStore";
import Menu from "@/components/Menu";
import Tabs from "@/components/Tabs";
import { useListingsStore } from "@/store/listingsStore";
import { useBreakpoint } from "@/store/useBreakpointStore";
import ListingsClient from "@/components/ListingsClient";
import { SortData, PriceRanges } from "@/data/DropdownData";
import { ListingsQueryResult } from "@/sanity.types";
import {
  olyFilters,
  olyAutoFilters,
  olyHiringFilters,
  olyPropertiesFilters,
  olyServicesFilters,
} from "@/data/FiltersData";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
interface ListingsClientProps {
  listings: ListingsQueryResult;
  site: "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services";
}

export default function Listings({ listings, site }: ListingsClientProps) {
  const {
    expanded,
    sortOptions,
    setSortOptions,
    priceOptions,
    setPriceOptions,
    collageViewWidth = 988,
    optionsWidth,
    page,
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
  const { currentScreenSize } = useBreakpoint();
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [activeFilterOptions, setActiveFilterOptions] = useState<number | null>(
    null
  );
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const listingsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const resultsToolbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true);
  }, []);

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

      // Only adjust widths if currentScreenSize is greater than 1382
      if (currentScreenSize > 1382) {
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
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expanded, setOptionsWidth, setAltWidth, currentScreenSize]);

  const handleSelect = () => {
    setSortOptions(false);
    setPriceOptions(false);
    setActiveFilterOptions(null);
  };

  const renderSites = (site: string) => {
    switch (site) {
      case "oly":
        return olyFilters;
      case "oly-properties":
        return olyPropertiesFilters;
      case "oly-auto":
        return olyAutoFilters;
      case "oly-hiring":
        return olyHiringFilters;
      case "oly-services":
        return olyServicesFilters;
      default:
        return [];
    }
  };

  const getFilterOptions = (site: string, filterIndex: number) => {
    const filters = renderSites(site);
    const filter = filters[filterIndex];

    if (!filter || !filter.filterValues) {
      return null; // No options for this filter
    }

    const { filterValues } = filter;

    if (Array.isArray(filterValues)) {
      return filterValues.map((value, index) => ({
        id: index + 1,
        result: value,
      }));
    }

    if (filterValues.rangeValues && Array.isArray(filterValues.rangeValues)) {
      return filterValues.rangeValues.map((option: any, index) => ({
        id: index + 1,
        result: [option.min.toString(), option.max.toString()],
      }));
    }

    return null; // No valid options structure
  };

  const handleFilterTabClick = (filterIndex: number) => {
    if (activeFilterOptions === filterIndex) {
      setActiveFilterOptions(null); // Close if already open
    } else {
      const options = getFilterOptions(site, filterIndex);
      if (options && options.length > 0) {
        setActiveFilterOptions(filterIndex); // Open if has options
   
      }
    }
  };

  const filters = (site: string) => {
    const filters = renderSites(site);
    const filterLabels = filters.map((filter) => filter.filterLabel);

    if (showMoreFilters) {
      return [...filterLabels, "Less Filters -"];
    } else {
      const visibleFilters = filterLabels.slice(0, 3);
      visibleFilters.push("More Filters +");
      return visibleFilters;
    }
  };

  const handleMoreFiltersClick = () => {
    setShowMoreFilters(!showMoreFilters);
    setActiveFilterOptions(null);
  };

  const createFilterClickHandlers = (site: string) => {
    const currentFilters = filters(site);

    return currentFilters.map((filterLabel: string, index: number) => {
      if (filterLabel === "More Filters +" || filterLabel === "Less Filters -") {
        return handleMoreFiltersClick;
      }

      let actualFilterIndex = index;

      if (showMoreFilters) {
        // When showing more filters, all are actual filters except the last one
        if (index === currentFilters.length - 1) {
          return () => {};
        }
      } else {
        // When not showing more filters, only first 3 are actual filters
        if (index >= 3) {
          return () => {};
        }
      }

      return () => handleFilterTabClick(actualFilterIndex);
    });
  };

  const createResultsToolbarClickHandlers = () => {
    return [
      toggleSortOptions,
      togglePriceOptions,
      () => {}, 
      toggleExpanded,
    ];
  };

  const renderResultsOptions = () => {
    if (sortOptions) {
      return renderOptions(SortData);
    } else if (priceOptions) {
      return renderOptions(PriceRanges);
    }
    return null;
  };

  useOnClickOutside(filtersRef as React.RefObject<HTMLElement>, () => {
    setActiveFilterOptions(null);
    setShowMoreFilters(false);
  });

  useOnClickOutside(resultsToolbarRef as React.RefObject<HTMLElement>, (event) => {
    if (filtersRef.current && filtersRef.current.contains(event.target as Node)) {
      return;
    }
    setSortOptions(false);
    setPriceOptions(false);
  });

  const renderOptions = (options: any[]) => {
    if (!options || options.length === 0) return null;

    return (
      <ul className={styles.options}>
        {options.map((option) => (
          <li
            key={option.id}
            className={styles.option}
            onClick={handleSelect}
            style={{
              width: expanded ? "57.24rem" : optionsWidth,
              cursor: "pointer",
            }}
          >
            {Array.isArray(option.result) ? (
              <div style={{ display: "flex", gap: "56px" }}>
                <span className={styles.optionText}>{option.result[0]}</span>
                <span className={styles.optionText}>-</span>
                <span className={styles.optionText}>{option.result[1]}</span>
              </div>
            ) : (
              <span className={styles.optionText}>{option.result}</span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderFilterOptions = () => {
    if (activeFilterOptions === null) return null;

    const options = getFilterOptions(site, activeFilterOptions);
    if (!options) return null;
    return renderOptions(options);
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
                tabs={filters(site)}
                condition={!expanded}
                width={currentScreenSize > 1025 ? 954 : 800}
                collageViewWidth={
                  currentScreenSize > 1025 ? collageViewWidth : 800
                }
                onClickHandlers={createFilterClickHandlers(site)}
                dashboard={false}
              />
              {renderFilterOptions()}
            </div>
            <div className={styles.resultsToolbar} ref={resultsToolbarRef}>
              <Tabs
                tabs={[
                  "Order",
                  "Price Range",
                  "Show Map",
                  expanded ? "Collage View" : "Expanded View",
                ]}
                condition={!expanded}
                width={currentScreenSize > 1025 ? 954 : 800}
                collageViewWidth={
                  currentScreenSize > 1025 ? collageViewWidth : 800
                }
                onClickHandlers={createResultsToolbarClickHandlers()}
                dashboard={false}
              />
              {renderResultsOptions()}
            </div>
          </div>
          <div className={styles.listings} >
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
function handleClickOutsideResultsToolbar(event: Event): void {
  throw new Error("Function not implemented.");
}

