import { useState } from "react";
import Tabs from "./Tabs";
import styles from "./ResultsToolbar.module.scss";
import { useTabsLogic } from "@/hooks/useTabsLogic";
import TabOptions from "./TabOptions";
import {
  olyResultsToolbar,
  olyAutoResultsToolbar,
  olyHiringResultsToolbar,
  olyServicesResultsToolbar,
  olyPropertiesResultsToolbar,
} from "@/data/resultsToolbarData";

interface ResultsToolbarProps {
  site: string;
  currentScreenSize: number;
  collageViewWidth: number;
  expanded: boolean;
  optionsWidth: string;
  toggleExpanded: () => void;
}

const ResultsToolbar = ({
  site,
  currentScreenSize,
  collageViewWidth,
  expanded,
  optionsWidth,
  toggleExpanded,
}: ResultsToolbarProps) => {
  const [isMapView, setIsMapView] = useState(false); // Added for Map/List View toggle

  const validSites = [
    "oly",
    "oly-properties",
    "oly-auto",
    "oly-hiring",
    "oly-services",
  ];
  const renderToolbarData = () => {
    if (!validSites.includes(site)) {
      console.warn(
        `ResultsToolbar: Invalid site prop: ${site}. Expected one of: ${validSites.join(", ")}`
      );
      return [];
    }
    return (
      {
        oly: olyResultsToolbar,
        "oly-properties": olyPropertiesResultsToolbar,
        "oly-auto": olyAutoResultsToolbar,
        "oly-hiring": olyHiringResultsToolbar,
        "oly-services": olyServicesResultsToolbar,
      }[site] || []
    );
  };

  const getToolbarOptions = (index: number) => {
    const toolbarData = renderToolbarData();
    const item = toolbarData[index];
    if (!item || !item.values) return null;

    const { values } = item;
    if (Array.isArray(values)) {
      return values.map((value, index) => ({
        id: index + 1,
        result: value,
      }));
    }
    if (values.rangeValues && Array.isArray(values.rangeValues)) {
      return values.rangeValues.map((option: any, index) => ({
        id: index + 1,
        result: [option.min.toString(), option.max.toString()],
      }));
    }
    return null;
  };

  const {
    activeTabIndex,
    setActiveTabIndex,
    containerRef,
    handleTabClick,
    handleOptionSelect,
  } = useTabsLogic({
    getOptions: getToolbarOptions,
  });

  const tabs = () => {
    const toolbarData = renderToolbarData();
    const labels = toolbarData.map((item) => {
      if (item.label === "View") {
        return expanded ? "Collage View" : "Expanded View";
      }
      if (item.label === "Map") {
        return isMapView ? "List View" : "Map View";
      }
      return item.label;
    });
    return labels;
  };

  const createToolbarClickHandlers = () => {
    const currentTabs = tabs();
    const handlers = currentTabs.map((label: string, index: number) => {
      if (label === "Collage View" || label === "Expanded View") {
        return () => {
          toggleExpanded();
          setActiveTabIndex(null);
        };
      }
      if (label === "Map View" || label === "List View") {
        return () => {
       
          setIsMapView(!isMapView);
          setActiveTabIndex(null);
        };
      }
      return () => handleTabClick(index);
    });

    return handlers;
  };

  const renderToolbarOptions = () => {
    if (activeTabIndex === null) return null;
    const options = getToolbarOptions(activeTabIndex);
   
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
    <div className={styles.resultsToolbar} ref={containerRef}>
      <Tabs
        tabs={tabs()}
        condition={!expanded}
        width={currentScreenSize > 1025 ? 954 : 800}
        collageViewWidth={currentScreenSize > 1025 ? collageViewWidth : 800}
        onClickHandlers={createToolbarClickHandlers()}
        dashboard={false}
        activeTabIndex={activeTabIndex ?? undefined}
      />
      {renderToolbarOptions()}
    </div>
  );
};

export default ResultsToolbar;
