"use client";

import React, { useState } from "react";
import Button from "@/components/Buttons";
import Modal from "@/components/Modal";
import useFormStore from "../store/useFormStore";
import { FormWrapper } from "./FormWrapper";
import CategoryChangeWarning from "./CategoryChangeWarning";
import styles from "./SelectNewCategory.module.scss";

const SelectNewCategory = () => {
  const {
    goTo,
    currentStepIndex,
    setCategoryPreviouslySelected,
    resetFormData,
  } = useFormStore();
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleSelectNewCategoryClick = () => {
    // Show the warning modal instead of immediately proceeding
    setShowWarningModal(true);
  };

  const handleProceedWithNewCategory = () => {
    // Reset all form data and category selection flag
    resetFormData();
    setCategoryPreviouslySelected(false);
    setShowWarningModal(false);
    goTo(0);
  };

  const handleCancelCategoryChange = () => {
    // Close the modal and stay on current step
    setShowWarningModal(false);
  };

  const continueToNextStep = () => {
    // Go to the step after category selection
    goTo(1);
  };

  return (
    <FormWrapper title="Category Selection" selectOpen={true}>
      <div className={styles.container}>
        <h2 className={styles.title}>Category Selection</h2>
        <p className={styles.description}>
          Would you like to select a new category or continue with your current
          selection?
        </p>

        <div className={styles.buttonContainer}>
          <Button
            buttonChildren="Select New Category"
            buttonType="primary"
            buttonSize="large"
            name="select-new-category"
            type="button"
            ariaLabel="Select new category"
            autoFocus={false}
            onClick={handleSelectNewCategoryClick}
            dashboard
          />

          <Button
            buttonChildren="Continue with Current Category"
            buttonType="normal"
            buttonSize="large"
            name="continue-current-category"
            type="button"
            ariaLabel="Continue with current category"
            autoFocus={false}
            onClick={continueToNextStep}
            dashboard
          />
        </div>
      </div>

      {/* Warning Modal */}
      <Modal
        showModal={showWarningModal}
        setShowModal={setShowWarningModal}
        modalContent={
          <CategoryChangeWarning
            onProceed={handleProceedWithNewCategory}
            onCancel={handleCancelCategoryChange}
          />
        }
      />
    </FormWrapper>
  );
};

export default SelectNewCategory;
