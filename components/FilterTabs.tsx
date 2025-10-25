import { useState } from "react";
import Tabs from "./Tabs";
import styles from "./FilterTabs.module.scss";
import { useTabsLogic } from "@/hooks/useTabsLogic";
import  TabOptions  from "./TabOptions";
import {
  olyFilters,
  olyAutoFilters,
  olyHiringFilters,
  olyPropertiesFilters,
  olyServicesFilters,
} from "@/data/FiltersData";

interface FilterTabsProps {
  site: string;
  currentScreenSize: number;
  collageViewWidth: number;
  expanded: boolean;
  optionsWidth: string;
}

const FilterTabs = ({
  site,
  currentScreenSize,
  collageViewWidth,
  expanded,
  optionsWidth,
}: FilterTabsProps) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const validSites = ["oly", "oly-properties", "oly-auto", "oly-hiring", "oly-services"];
  const renderSites = () => {
    if (!validSites.includes(site)) {
      
      return [];
    }
    return {
      oly: olyFilters,
      "oly-properties": olyPropertiesFilters,
      "oly-auto": olyAutoFilters,
      "oly-hiring": olyHiringFilters,
      "oly-services": olyServicesFilters,
    }[site] || [];
  };

  const getFilterOptions = (filterIndex: number) => {
    const filters = renderSites();
    const filter = filters[filterIndex];
    console.log("FilterTabs: filterIndex =", filterIndex, "filter =", filter);
    if (!filter || !filter.filterValues) return null;

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
    if (typeof filterValues === "object" && !Array.isArray(filterValues)) {
      // Handle nested filterValues (e.g., Model in olyAutoFilters)
      const values = Object.values(filterValues).flat();
      return values.map((value, index) => ({
        id: index + 1,
        result: value,
      }));
    }
    return null;
  };

  const { activeTabIndex, containerRef, handleTabClick, handleOptionSelect } = useTabsLogic({
    getOptions: getFilterOptions,
  });

  const filters = () => {
    const filters = renderSites();
    const filterLabels = filters.map((filter) => filter.filterLabel);
    return showMoreFilters ? [...filterLabels, "Less Filters -"] : [...filterLabels.slice(0, 3), "More Filters +"];
  };

  const createFilterClickHandlers = () => {
    const currentFilters = filters();
    const handlers = currentFilters.map((filterLabel: string, index: number) => {
      if (filterLabel === "More Filters +" || filterLabel === "Less Filters -") {
        return () => {
          console.log("FilterTabs: toggling more filters, current =", showMoreFilters);
          setShowMoreFilters(!showMoreFilters);
          setActiveTabIndex(null);
        };
      }
      return () => handleTabClick(index);
    });
    console.log("FilterTabs: tabs =", currentFilters, "handlers =", handlers.map(h => h.name || "anonymous"));
    return handlers;
  };

  const renderFilterOptions = () => {
    if (activeTabIndex === null) return null;
    const options = getFilterOptions(activeTabIndex);
    console.log("FilterTabs: rendering options for index =", activeTabIndex, "options =", options);
    if (!options) return null;
    return (
      <TabOptions
        options={options}
        onSelect={handleOptionSelect}
        width={expanded ? "57.24rem" : optionsWidth}
      />
    );
  };

  return (
    <div className={styles.filters} ref={containerRef}>
      <Tabs
        tabs={filters()}
        condition={!expanded}
        width={currentScreenSize > 1025 ? 954 : 800}
        collageViewWidth={currentScreenSize > 1025 ? collageViewWidth : 800}
        onClickHandlers={createFilterClickHandlers()}
        dashboard={false}
        activeTabIndex={activeTabIndex}
      />
      {renderFilterOptions()}
    </div>
  );
};

export default FilterTabs;