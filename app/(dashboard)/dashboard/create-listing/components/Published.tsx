"use client";
import Button from "@/components/Button";
import styles from "./Published.module.scss";
import { useEffect } from "react";
const Published = () => {
  useEffect(() => {
    // Clear the history stack
    window.history.replaceState(
      null,
      "",
      "/dashboard/create-listing/oly/published"
    );
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎉 Your listing is live!</h1>
      <p className={styles.description}>
        Buyers can now view your listing. You can manage it anytime in your
        dashboard.
      </p>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.viewButton}
          children="View Your Listing"
          buttonVariant="primary"
          buttonSize="large"


          ariaLabel="View Your Listing"


          dashboard
        />
      </div>
    </div>
  );
};

export default Published;

