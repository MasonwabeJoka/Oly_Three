"use client";

import { useState, useMemo } from "react";
import Masonry from "react-masonry-css";
import PropertiesFilter from "./PropertiesFilter";
import styles from "./PropertiesFilters.module.scss";
import { PROPERTY_SEARCH_FILTERS } from "@/data/propertyFilters";
import { PROPERTY_FILTER_UI_ORDER, PROPERTY_FILTER_UI_ORDER_COMMON } from "@/data/propertyFilters.uiOrder";
import useBreakpointStore from "@/store/useBreakpointStore";

type ListingType = "rent" | "buy";

type PropertyTypeKey =
  | "House"
  | "Apartment"
  | "Townhouse"
  | "Vacant Land"
  | "Development"
  | "Office"
  | "Retail Property"
  | "Industrial Property"
  | "Agricultural Property";

type FilterMode = "single" | "multiple";

type FilterOption = {
  value: string;
  label: string;
};

type FilterField = {
  id: string;
  label: string;
  type: "radio" | "checkbox";
  mode: FilterMode;
  options: FilterOption[];
};

type FilterSection = {
  sectionId: string;
  title: string;
  fields: FilterField[];
};

interface PropertiesFiltersProps {
  listingType?: ListingType;
  propertyTypes?: PropertyTypeKey[];
  onChange?: (fieldId: string, selected: string[]) => void;
  isDashboard?: boolean;
}

const PropertiesFilters = ({
  listingType = "rent",
  propertyTypes = ["House"],
  onChange,
  isDashboard = false,
}: PropertiesFiltersProps) => {
  const [selectedValues, setSelectedValues] = useState<
    Record<string, string[]>
  >({});
  const { isSmallDesktop, currentScreenSize } = useBreakpointStore();

const sections: FilterSection[] = useMemo(() => {
  const configs = PROPERTY_SEARCH_FILTERS[listingType] ?? [];

  const selected =
    propertyTypes && propertyTypes.length > 0
      ? propertyTypes
      : configs.map((c) => c.propertyType);

  const groupsPool = configs
    .filter((c) => selected.includes(c.propertyType))
    .flatMap((c) => c.groups);

  const byGroupId = new Map<string, (typeof groupsPool)[number]>();
  for (const g of groupsPool) {
    if (!byGroupId.has(g.groupId)) byGroupId.set(g.groupId, g);
  }

  const isSingleType = selected.length === 1;

  const plan = isSingleType
    ? PROPERTY_FILTER_UI_ORDER[listingType]?.[selected[0]] ?? []
    : PROPERTY_FILTER_UI_ORDER_COMMON[listingType] ?? [];

  const used = new Set<string>();
  const ordered = plan
    .map((id) => {
      const g = byGroupId.get(id);
      if (g) used.add(id);
      return g;
    })
    .filter(Boolean);

  const leftovers = Array.from(byGroupId.entries())
    .filter(([id]) => !used.has(id))
    .map(([, g]) => g);

  const finalGroups = [...ordered, ...leftovers].filter((g) => {
    if (!g.visibility || g.visibility === "always") return true;
    return isSingleType; // 👈 hide type-specific filters when multi/all
  });

  return finalGroups.map((g) => ({
    sectionId: g.groupId,
    title: g.title,
    fields: [
      {
        id: g.fieldId,
        label: g.title,
        mode: g.mode,
        type: g.mode === "single" ? "radio" : "checkbox",
        options: g.options,
      },
    ],
  }));
}, [listingType, propertyTypes]);



  const handleFilterChange = (fieldId: string, selected: string[]) => {
    setSelectedValues((prev) => ({
      ...prev,
      [fieldId]: selected,
    }));
    onChange?.(fieldId, selected);
  };

  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    1000: 2,
    600: 1,
  };

  return (
    <div className={styles.container}>
      <Masonry
        className={styles.masonryGrid}
        columnClassName={styles.masonryColumn}
        breakpointCols={breakpointColumnsObj}
        style={{
          maxWidth: isDashboard ? "59.625rem" : "95vw",
          width:
            isSmallDesktop && currentScreenSize < 1383 ? "62rem" : "1650px",
        }}
      >
        {sections.map((section) => (
          <div key={section.sectionId}>
            <p className={styles.filterTitle}>{section.title}</p>
            <PropertiesFilter
              fields={section.fields}
              selectedValues={selectedValues}
              onFilterChange={handleFilterChange}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default PropertiesFilters;
