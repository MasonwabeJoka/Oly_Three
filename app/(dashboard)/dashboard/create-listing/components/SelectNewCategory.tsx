"use client";

import React, { useState } from "react";
import Button from "@/components/Buttons";
import Modal from "@/components/Modal";
import useFormStore from "../store/useFormStore";
import CategoryChangeWarning from "./CategoryChangeWarning";
import styles from "./SelectNewCategory.module.scss";
import ExitButton from "@/components/ExitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SelectNewCategory = () => {
  const { currentStepIndex, setCategoryPreviouslySelected, resetFormData } =
    useFormStore();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const router = useRouter();

  const handleSelectNewCategoryClick = () => {
    // Show the warning modal instead of immediately proceeding
    setShowWarningModal(true);
  };

  const handleCancelCategoryChange = () => {
    // Close the modal and stay on current step
    setShowWarningModal(false);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      router.push("/dashboard/create-listing/oly/title-and-description");
    }
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <div className={styles.wrapper}>
        <Link
          href="/dashboard/create-listing/oly/title-and-description"
          className={styles.exitButtonContainer}
        >
          <ExitButton />
        </Link>
        <p className={styles.description}>
          Hold on! You haven't finished creating your listing. Do you want to
          complete it, or start over from scratch?
        </p>

        <div className={styles.buttonContainer}>
          <Link
            href="/dashboard/create-listing"
            className={styles.continueButtonContainer}
          >
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
            onClick={handleSelectNewCategoryClick}
            dashboard
          />
        </div>
      </div>

      {/* Warning Modal */}
      <Modal
        showModal={showWarningModal}
        setShowModal={setShowWarningModal}
        path="/dashboard/create-listing/oly/title-and-description"
        modalContent={
          <CategoryChangeWarning
          // onCancel={handleCancelCategoryChange}
          />
        }
      />
    </div>
  );
};

export default SelectNewCategory;
