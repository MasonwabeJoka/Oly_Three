"use client";
import TransferCostCalculator from "../components/TransferCostCalculator";
import styles from "./styles.module.scss";

import HomeButton from "@/components/HomeButton";

const Page = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.homeButton}>
        <HomeButton path="/properties" />
      </nav>
      <div className={styles.content}>
        <h1 className={styles.title}>Transfer Cost Calculator</h1>
        <TransferCostCalculator />
      </div>
    </div>
  );
};

export default Page;
