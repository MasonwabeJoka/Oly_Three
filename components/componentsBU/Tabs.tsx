import styles from "./Tabs.module.scss";
import { useState } from "react";

type TabsProps = {
  condition?: boolean;
  width: number;
  altWidth?: number;
  tabs: string[];
  onClickHandlers?: (
    | ((event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined
  )[];
};

const Tabs: React.FC<TabsProps> = ({
  condition,
  width = 954,
  altWidth = 988,
  tabs,
  onClickHandlers,
}) => {
  // Now isActive holds the index of the active tab
  const [isActive, setIsActive] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setIsActive(index);
  };

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

export default Tabs;
