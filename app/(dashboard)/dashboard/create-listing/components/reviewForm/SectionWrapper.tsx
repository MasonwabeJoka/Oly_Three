"use client";
import { useState } from "react";
import styles from "./SectionWrapper.module.scss";
import Button from "@/components/Buttons";
import useEditStore from "../../store/useEditStore";
import useFormStore from "../../store/useFormStore";
import { useRouter } from "next/navigation";
type SectionWrapperProps = {
  title: string;
  path: string;
  children: React.ReactNode;
};
export const SectionWrapper = ({
  title,
  path,
  children,
}: SectionWrapperProps) => {
  const { setIsEditMode } = useEditStore();
  const { goTo } = useFormStore();
  const router = useRouter();
  
  const onClick = () => {
    setIsEditMode(true);
    router.push(`${path}?edit=true`);
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
