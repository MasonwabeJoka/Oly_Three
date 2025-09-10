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

interface Props {
  onNext: () => void;
  goTo: (index: number) => void;
}
const SelectNewCategory = ({ onNext, goTo }: Props) => {
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
      router.push("/dashboard/post-your-ad/oly/title-and-description");
    }
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <div className={styles.wrapper}>
        <Link
          href="/dashboard/post-your-ad/oly/title-and-description"
          className={styles.exitButtonContainer}
        >
          <ExitButton />
        </Link>
        {/* <h2 className={styles.title}>Category Selection</h2> */}
        <p className={styles.description}>
          Hold on! You haven't finished creating your listing. Do you want to complete it, or start over from scratch?
        </p>
        {/* <p className={styles.description}>
          You haven't finished creating your listing yet. Would you like to
          continue and finish posting your ad, or would you like to start over a new listing?
        </p> */}

        <div className={styles.buttonContainer}>
          <Button
            buttonChildren="Start New Listing"
            buttonType="primary"
            buttonSize="large"
            name="select-new-category"
            type="button"
            ariaLabel="Select new category"
            autoFocus={false}
            onClick={handleSelectNewCategoryClick}
            dashboard
          />
          <Link
            href="/dashboard/post-your-ad/oly/title-and-description"
            className={styles.continueButtonContainer}
          >
            <Button
              buttonChildren="Complete Current Listing"
              buttonType="normal"
              buttonSize="large"
              name="continue-current-category"
              type="button"
              ariaLabel="Continue with current category"
              autoFocus={false}
              dashboard
            />
          </Link>
        </div>
      </div>

      {/* Warning Modal */}
      <Modal
        showModal={showWarningModal}
        setShowModal={setShowWarningModal}
        path="/dashboard/post-your-ad/oly/title-and-description"
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
