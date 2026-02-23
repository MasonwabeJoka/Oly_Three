"use client";

import { useModalStore } from "@/store/modalStore";
import Button from "@/components/Buttons";
import Image from "@/components/Image";
import styles from "./MenuButton.module.scss";

const MenuButton = () => {
  const setShowMenuModal = useModalStore((state) => state.setShowMenuModal);

  const openModal = () => {
    setShowMenuModal(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileIconContainer}>
        <Button
          className={styles.profile}
          buttonChildren={
            <div
              style={{
                height: "28px",
                display: "flex",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              <Image
                src="/icons/menu.png"
                alt="Profile Icon"
                width={28}
                height={28}
              />
            </div>
          }
          buttonType="icon"
          buttonSize=""
          name="profile-icon"
          type="button"
          ariaLabel="Profile Icon"
          autoFocus={false}
          disabled={false}
          onClick={openModal}
        />
      </div>
    </div>
  );
};

export default MenuButton;
