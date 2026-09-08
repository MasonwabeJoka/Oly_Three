"use client";

import React from "react";
import Button from "@/components/Button";
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
  const site = pathname.split("/")[3] || "oly";
  const continueUrl = `/dashboard/create-listing/${site}/title-and-description`;

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      router.push(continueUrl);
    }
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <div className={styles.wrapper}>
      
        <p className={styles.description}>
          Hold on! You haven't finished creating your listing. Do you want to
          complete it, or start over from scratch?
        </p>

        <div className={styles.buttonContainer}>
          <Link href={continueUrl} className={styles.continueButtonContainer}>
            <Button
              children="Complete Current Listing"
              buttonVariant="primary"
              buttonSize="large"
              ariaLabel="Continue with current category"
              dashboard
            />
          </Link>
          <Button
            children="Start New Listing"
            buttonVariant="normal"
            buttonSize="large"
            ariaLabel="Select new category"
            onClick={() =>
              router.push(
                `/dashboard/create-listing/${site}/confirm-new-listing`,
              )
            }
            dashboard
          />
          <Link href='/' className={styles.cancelContainer}>
            <Button
              children="Cancel"
              buttonVariant="normal"
              buttonSize="large"
              ariaLabel="Cancel"
              dashboard
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectNewCategory;
