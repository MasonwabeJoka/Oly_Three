"use client";
import styles from "./BackButton.module.scss";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import Button from "./Button";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.button}>
      <Button
        buttonShape="round"
        buttonSize="medium"
        ariaLabel="Go back"
        onClick={handleBack}
        children={
          <Icon
            src="/icons/left-arrow.png"
            alt="Go back"
            width={20}
            height={20}
          />
        }
      />
    </div>
  );
};

export default BackButton;
