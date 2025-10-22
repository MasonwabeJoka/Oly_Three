"use client";
import styles from "./ResultsFilters.module.scss";
import {
  olyFilters,
  olyAutoFilters,
  olyHiringFilters,
  olyPropertiesFilters,
  olyServicesFilters,
} from "@/data/FiltersData";
import { ListingsQueryResult } from "@/sanity.types";
import { useState } from "react";

interface ResultsFilters {
  listings: ListingsQueryResult;
  site: "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services";
}


  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const renderFilters = (site: string) => {
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
    const filters = renderFilters(site);
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
        setActiveFilterOptions(filterIndex); 
      }
    }
  };

  const filters = (site: string) => {
    const filters = renderFilters(site);
    const filterLabels = filters.map((filter) => filter.filterLabel);

    if (showMoreFilters) {
      filterLabels.splice(3, 0, "More Filters +");
      return filterLabels;
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
      if (filterLabel === "More Filters +") {
        return handleMoreFiltersClick;
      }

      let actualFilterIndex = index;

      if (showMoreFilters) {
        if (index > 3) {
          actualFilterIndex = index - 1;
        }
      } else {
        if (index >= 3) {
          return () => {};
        }
      }

      return () => handleFilterTabClick(actualFilterIndex);
    });
  };

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
};

export default ResultsFilters;
