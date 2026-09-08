"use client";
import { useState } from "react";
import styles from "./TopNotification.module.scss";
import Button from "./Button";
import HomeButton from "./HomeButton";

interface TopNotificationProps {
  type: "success" | "error" | "warning" | "info";
  message: any;
  onClose?: () => void;
  showHomeButton?: boolean;
}

const TopNotification: React.FC<TopNotificationProps> = ({
  type,
  message,
  showHomeButton = false,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`${styles.topNotification} ${styles[type]}`}>
      {showHomeButton && (
        <div className={styles.homeButtonContainer}>
          <HomeButton />
        </div>
      )}
      <div className={styles.topNotificationContent}>{message}</div>

      <Button
        className={styles.closeButton}
        children="✕"
        buttonVariant="icon"
        buttonSize="small"


        ariaLabel="Close Button"


        onClick={handleClose}
      />
    </div>
  );
};

export default TopNotification;
