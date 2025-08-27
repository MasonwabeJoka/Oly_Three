"use client";

import React from "react";
import Button from "@/components/Buttons";
import styles from "./CategoryChangeWarning.module.scss";

interface CategoryChangeWarningProps {
  onProceed: () => void;
  onCancel: () => void;
}

const CategoryChangeWarning = ({
  onProceed,
  onCancel,
}: CategoryChangeWarningProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <div className={styles.warningIcon}>⚠️</div>
      </div>

      <h2 className={styles.title}>
        Warning: You're about to lose your progress
      </h2>

      <div className={styles.content}>
        <p className={styles.description}>
          Selecting a new category will reset all the information you've entered
          so far, including:
        </p>

        <ul className={styles.list}>
          <li>Product details and condition</li>
          <li>Pricing information</li>
          <li>Bank account details</li>
          <li>Title and description</li>
          <li>Uploaded media (photos, videos, attachments)</li>
          <li>Location information</li>
          <li>Promotion settings</li>
        </ul>

        <p className={styles.confirmText}>
          Are you sure you want to continue and lose all your current progress?
        </p>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          buttonChildren="Yes, Select New Category"
          buttonType="danger"
          buttonSize="large"
          name="proceed-new-category"
          type="button"
          ariaLabel="Proceed with selecting new category"
          autoFocus={false}
          onClick={onProceed}
          dashboard
        />

        <Button
          buttonChildren="Cancel, Keep Current Category"
          buttonType="primary"
          buttonSize="large"
          name="cancel-category-change"
          type="button"
          ariaLabel="Cancel category change"
          autoFocus={false}
          onClick={onCancel}
          dashboard
        />
      </div>
    </div>
  );
};

export default CategoryChangeWarning;
