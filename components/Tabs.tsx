import { useResponsive } from "@/store/useResponsive";
import styles from "./Tabs.module.scss";
import { useState } from "react";
import useSidebarStore from "@/store/useSidebarStore";

type Tab =
  | {
      title: string;
      count?: number;
    }
  | string;

type TabsProps = {
  condition?: boolean;
  dashboard: boolean;
  count?: number;
  width: number;
  altWidth?: number;
  tabs: Tab[];
  data?: any[];
  onClickHandlers?: (
    | ((event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined
  )[];
};

const Tabs: React.FC<TabsProps> = ({
  condition,
  dashboard,
  width = 954,
  altWidth = 988,
  tabs,
  data,
  onClickHandlers,
}) => {
  //  isActive holds the index of the active tab
  const [isActive, setIsActive] = useState<number | null>(null);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const [tabOptions, setTabOptions] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (tabOptions === null) {
      setIsActive(index);
      setTabOptions(index);
    } else {
      setIsActive(null);
      setTabOptions(null);
    }
  };

  const TabsMobile = () => {
    return (
      <>
        <div
          className={styles.tabs}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // justifyContent: tabs.length < 4 ? "center" : "flex-start",
            width: dashboard ? "16.6875rem" : "19.1475rem",
            // width: dashboard ? "16.6875rem" : "19.1475rem",
          }}
        >
          {tabs?.map((tab, index) => {
            const title = typeof tab === "object" ? tab.title : tab;
            const count = typeof tab === "object" ? tab.count : null;
            return (
              <>
                <div
                  className={`${styles.tab} ${isActive === index ? styles.active : ""}`}
                  key={index} // Assuming tabs are unique and static, so using index as key
                  onClick={(event) => {
                    handleClick(index);
                  }}
                  style={{
                    marginBottom: "1rem",
                  }}
                >
                  {title}
                  {count && (
                    <div
                      className={styles.count}
                      style={{
                        backgroundColor: isActive === index ? "white" : "#ffffff",
                      }}
                    >
                      <div
                        style={{
                          margin: "0 auto",
                        }}
                      >
                        {count}
                      </div>
                    </div>
                  )}
                </div>

                <ul
                  className={
                    tabOptions === index ? styles.options : styles.hideOptions
                  }
                  style={{ width: "100%" }}
                >
                  {data &&data[index].map((item, index) => {
                    return (
                      <li key={index} className={styles.option}>
                        <div>{item}</div>
                      </li>
                    );
                  })}
                </ul>
              </>
            );
          })}
        </div>
      </>
    );
  };

  const TabsDesktop = () => {
    return (
      <div
        className={styles.tabs}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          width: condition
            ? `${altWidth && altWidth / 16}rem`
            : `${width / 16}rem`,
        }}
      >
        {tabs?.map((tab, index) => {
          const title = typeof tab === "object" ? tab.title : tab;
          const count = typeof tab === "object" ? tab.count : null;
          return (
            <div
              className={`${styles.tab} ${isActive === index ? styles.active : ""}`}
              style={{
                flexBasis: condition
                  ? `${altWidth && (altWidth / 4 - 8) / 16}rem`
                  : `${(width / 4 - 8) / 16}rem`,
                flexShrink: condition
                  ? `${altWidth && (altWidth / 4 - 8) / 16}rem`
                  : `${(width / 4 - 8) / 16}rem`,
                  color: tabs[index] === "Delete" ? "#ff3c14" : "#434b4d",
              }}
              key={index} // Assuming tabs are unique and static, so using index as key
              onClick={(event) => {
                handleClick(index);
                onClickHandlers?.[index]?.(event);
              }}
            >
              {title}

              {count !== null && count !== 0 && (
                <div
                  className={styles.count}
                  style={{ backgroundColor: isActive === index ? "white" : "#ffffff", }}
                >
                  <div
                    style={{
                      margin: "0 auto",
                    }}
                  >
                    {count}{" "}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (isMobile) {
    return <TabsMobile />;
  } else {
    return <TabsDesktop />;
  }
};

export default Tabs;
