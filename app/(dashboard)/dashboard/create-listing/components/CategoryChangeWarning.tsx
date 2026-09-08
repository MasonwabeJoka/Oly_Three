"use client";

import React from "react";
import Button from "@/components/Button";
import styles from "./CategoryChangeWarning.module.scss";
import { useRouter } from "next/navigation";

interface CategoryChangeWarningProps {
  site: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CategoryChangeWarning = ({ site, onConfirm, onCancel }: CategoryChangeWarningProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Warning: You're about to lose your progress!
      </h2>

      <div className={styles.content}>
        <p className={styles.description}>
          Starting a new listing will erase your current progress. Are you sure
          you want to continue?
        </p>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          children="Yes"
          buttonVariant="danger"
          buttonSize="large"


          ariaLabel="Yes"

          onClick={onConfirm}
          dashboard
        />
        <Button
          children="Cancel"
          buttonVariant="normal"
          buttonSize="large"


          ariaLabel="Cancel"

          onClick={onCancel}
          dashboard
        />
      </div>
    </div>
  );
};

export default CategoryChangeWarning;
