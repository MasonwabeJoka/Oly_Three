"use client";
import { useState } from "react";
import useBreakpointStore from "@/store/useBreakpointStore";
import Tab from "./Tab";
import TabOptions from "./TabOptions";
import styles from "./TabsClient.module.scss";

type Tab = { title: string; count?: number } | string;

interface TabsProps {
  condition?: boolean;
  dashboard: boolean;
  width: number;
  collageViewWidth?: number;
  tabs: Tab[];
  data?: any[];
  onClickHandlers?: (() => void)[];
  activeTabIndex?: number | null;
}

const TabsClient: React.FC<TabsProps> = ({
  condition,
  dashboard,
  width = 954,
  collageViewWidth = 988,
  tabs,
  data,
  onClickHandlers,
  activeTabIndex,
}) => {
  const [isActive, setIsActive] = useState<number | null>(null);
  const [tabOptions, setTabOptions] = useState<number | null>(null);
  const { isMobile } = useBreakpointStore();

  const handleClick = (
    index: number,
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    console.log("TabsClient: clicked tab index =", index, "tab =", tabs[index]);
    if (data) {
      if (tabOptions === null) {
        setIsActive(index);
        setTabOptions(index);
      } else {
        setIsActive(null);
        setTabOptions(null);
      }
    }
    if (onClickHandlers?.[index]) {
      try {
        onClickHandlers[index]!();
      } catch (error) {
        console.error("Error in tab click handler:", error);
      }
    }
  };

  const TabsMobile = () => (
    <ul
      className={styles.tabs}
      style={{
        width: dashboard ? "16.6875rem" : "19.1475rem",
      }}
    >
      {tabs.map((tab, index) => {
        const title = typeof tab === "object" ? tab.title : tab;
        const count = typeof tab === "object" ? tab.count : null;
        return (
          <div key={index}>
            <Tab
              index={index}
              title={title}
              count={count}
              isActive={
                activeTabIndex !== undefined
                  ? activeTabIndex === index
                  : isActive === index
              }
              isMobile
              onClick={(event) => handleClick(index, event)}
            />
            {data && (
              <TabOptions items={data[index]} visible={tabOptions === index} />
            )}
          </div>
        );
      })}
    </ul>
  );

  const TabsDesktop = () => {
    const tabWidth = condition
      ? `${Math.floor((((collageViewWidth || width) / 4 - 8) / 16) * 1000) / 1000}rem`
      : `${Math.floor(((width / 4 - 8) / 16) * 1000) / 1000}rem`;

    return (
      <ul
        className={styles.tabs}
        style={{
       
          width: condition
            ? `${(collageViewWidth || width) / 16}rem`
            : `${width / 16}rem`,
        }}
      >
        {tabs.map((tab, index) => {
          const title = typeof tab === "object" ? tab.title : tab;
          const count = typeof tab === "object" ? tab.count : null;
          return (
            <Tab
              key={index}
              index={index}
              title={title}
              count={count}
              isActive={
                activeTabIndex !== undefined
                  ? activeTabIndex === index
                  : isActive === index
              }
              style={{ flexBasis: tabWidth, flexShrink: tabWidth }}
              color={title === "Delete" ? "#ff3c14" : "#434b4d"}
              onClick={(event) => handleClick(index, event)}
            />
          );
        })}
      </ul>
    );
  };

  return isMobile ? <TabsMobile /> : <TabsDesktop />;
};

export default TabsClient;
