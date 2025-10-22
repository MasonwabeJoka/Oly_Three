"use client";
import React from "react";
import styles from "./TabOptions.module.scss";

interface TabOptionsProps {
  items: string[];
  visible: boolean;
}

const TabOptions: React.FC<TabOptionsProps> = ({ items, visible }) => {
  if (!visible) return null;

  return (
    <ul className={styles.options}>
      {items.map((item, i) => (
        <li key={i} className={styles.option}>
          <div>{item}</div>
        </li>
      ))}
    </ul>
  );
};

export default TabOptions;
