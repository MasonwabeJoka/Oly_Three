"use client";
import Button from "@/components/Buttons";
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
      <h1 className={styles.title}>🎉 Your ad is live!</h1>
      <p className={styles.description}>
        Buyers can now view your listing. You can manage it anytime in your
        dashboard.
      </p>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.viewButton}
          buttonChildren="View Your Ad"
          buttonType="primary"
          buttonSize="large"
          name="view-btn"
          type="button"
          ariaLabel="View Your Ad"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </div>
    </div>
  );
};

export default Published;
