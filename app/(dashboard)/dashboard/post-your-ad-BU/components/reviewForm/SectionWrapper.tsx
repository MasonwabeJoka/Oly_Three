"use client";
import { useState } from "react";
import styles from "./SectionWrapper.module.scss";
import Button from "@/components/Buttons";
import useEditStore from "../../store/useEditStore";
import useFormStore from "../../store/useFormStore";
type SectionWrapperProps = {
  title: string;
  pageNumber: number;
  children: React.ReactNode;
};
export const SectionWrapper = ({
  title,
  pageNumber,
  children,
}: SectionWrapperProps) => {
  const { setIsEditMode } = useEditStore();
  const { goTo } = useFormStore();
  
  const onClick = () => {
    setIsEditMode(true);
    goTo(pageNumber);
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.childrenContainer}>
        <div className={styles.children}>{children}</div>
        <Button
          className={styles.editButton}
          buttonChildren="Edit"
          buttonType="normal"
          buttonSize="small"
          name="edit-btn"
          type="button"
          ariaLabel="Edit Button"
          autoFocus={false}
          disabled={false}
          dashboard
          onClick={onClick}
        />
      </div>
    </div>
  );
};
