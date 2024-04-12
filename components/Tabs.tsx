import { useResponsive } from "@/store/useResponsive";
import styles from "./Tabs.module.scss";
import { useState } from "react";
import useSidebarStore from "@/store/useSidebarStore";

type TabsProps = {
  condition?: boolean;
  dashboard: boolean;
  width: number;
  altWidth?: number;
  tabs: string[];
  data: any[];
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
  // Now isActive holds the index of the active tab
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
            width: dashboard ? "16.6875rem" : "19.1475rem",
          }}
        >
          {tabs?.map((tab, index) => (
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
                {tab}
              </div>

              <ul
                className={
                  tabOptions === index ? styles.options : styles.hideOptions
                }
                style={{ width: "100%" }}
              >
                {data[index].map((item, index) => {
                  return (
                    <li key={index} className={styles.option}>
                      <div>{item}</div>
                    </li>
                  );
                })}
              </ul>
            </>
          ))}
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
          width: condition
            ? `${altWidth && altWidth / 16}rem`
            : `${width / 16}rem`,
        }}
      >
        {tabs?.map((tab, index) => (
          <div
            className={`${styles.tab} ${isActive === index ? styles.active : ""}`}
            style={{
              flexBasis: condition
                ? `${altWidth && (altWidth / 4 - 8) / 16}rem`
                : `${(width / 4 - 8) / 16}rem`,
              flexShrink: condition
                ? `${altWidth && (altWidth / 4 - 8) / 16}rem`
                : `${(width / 4 - 8) / 16}rem`,
            }}
            key={index} // Assuming tabs are unique and static, so using index as key
            onClick={(event) => {
              handleClick(index);
              onClickHandlers?.[index]?.(event);
            }}
          >
            {tab}
          </div>
        ))}
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
