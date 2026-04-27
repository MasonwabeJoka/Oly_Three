"use client";

import React from "react";
import Button from "@/components/Buttons";
import styles from "./SelectNewCategory.module.scss";
import ExitButton from "@/components/ExitButton";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface SelectNewCategoryProps {
  onNext?: () => void;
  goTo?: () => void;
}

const SelectNewCategory = ({ onNext, goTo }: SelectNewCategoryProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const site = pathname.split('/')[3] || 'oly';
  const continueUrl = `/dashboard/create-listing/${site}/title-and-description`;

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      router.push(continueUrl);
    }
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <div className={styles.wrapper}>
        <Link href={continueUrl} className={styles.exitButtonContainer}>
          <ExitButton />
        </Link>
        <p className={styles.description}>
          Hold on! You haven't finished creating your listing. Do you want to
          complete it, or start over from scratch?
        </p>

        <div className={styles.buttonContainer}>
          <Link href={continueUrl} className={styles.continueButtonContainer}>
            <Button
              buttonChildren="Complete Current Listing"
              buttonType="primary"
              buttonSize="large"
              name="continue-current-category"
              type="button"
              ariaLabel="Continue with current category"
              autoFocus={false}
              dashboard
            />
          </Link>
          <Button
            buttonChildren="Start New Listing"
            buttonType="normal"
            buttonSize="large"
            name="select-new-category"
            type="button"
            ariaLabel="Select new category"
            autoFocus={false}
            onClick={() => router.push(`/dashboard/create-listing/${site}/confirm-new-listing`)}
            dashboard
          />
        </div>
      </div>
    </div>
  );
};

export default SelectNewCategory;
