"use client";

import React from "react";
import Button from "@/components/Buttons";
import styles from "./CategoryChangeWarning.module.scss";
import Link from "next/link";
// Todo: only show this if there is data in the form.
// Todo: reset the form data if new listing is created (if Yes is clicked).
interface CategoryChangeWarningProps {
  // onProceed: () => void;
  // onCancel: () => void;
}

const CategoryChangeWarning = (
  {
    // onProceed,
    // onCancel,
  }: CategoryChangeWarningProps
) => {
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
        <Link href="/dashboard/post-your-ad/oly/select-category">
          <Button
            buttonChildren="Yes"
            buttonType="danger"
            buttonSize="large"
            name="yes"
            type="button"
            ariaLabel="Yes"
            autoFocus={false}
            onClick={() => {}}
            dashboard
          />
        </Link>
        <Link href="/dashboard/post-your-ad/oly/title-and-description">
          <Button
            buttonChildren="Cancel"
            buttonType="normal"
            buttonSize="large"
            name="cancel"
            type="button"
            ariaLabel="Cancel"
            autoFocus={false}
            // onClick={onCancel}
            dashboard
          />
        </Link>
      </div>
    </div>
  );
};

export default CategoryChangeWarning;
