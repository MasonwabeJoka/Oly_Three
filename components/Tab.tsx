"use client";
import React from "react";
import styles from "./Tab.module.scss";

interface TabProps {
  title: string;
  count?: number | null;
  isActive: boolean;
  index: number;
  isMobile?: boolean;
  color?: string;
  style?: React.CSSProperties;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const Tab: React.FC<TabProps> = ({
  title,
  count = null,
  isActive,
  index,
  isMobile = false,
  style,
  color = "#434b4d",
  onClick,
}) => {
  return (
    <li
      key={index}
      className={`${styles.tab} ${isActive ? styles.active : ""}`}
      style={{
        ...style,
        color,
        marginBottom: isMobile ? "1rem" : undefined,
      }}
      onClick={onClick}
    >
      {title}
      {count !== null && count !== undefined && count !== 0 && (
        <div className={styles.count}>
          <div>{count}</div>
        </div>
      )}
    </li>
  );
};

export default Tab;