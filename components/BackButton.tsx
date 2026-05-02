"use client";
import styles from "./BackButton.module.scss";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import Button from "./Buttons";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.button}>
      <Button
        buttonType="round"
        buttonSize="medium"
        name="back"
        type="button"
        ariaLabel="Go back"
        autoFocus={false}
        onClick={handleBack}
        buttonChildren={
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
