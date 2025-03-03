"use client";
import styles from "./Navbar.module.scss";
import { useEffect, useState } from "react";
import { useModalStore } from "@/store/modalStore";
import Link from "next/link";
import Button from "@/components/Buttons";
import useSidebarStore from "@/store/useSidebarStore";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import UserButtonCustom from "@/components/clerk/UserButtonCustom";
import Image from "next/image";
import useIsMobileStore from "@/store/useMobileStore";

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const { user, isSignedIn, isLoaded } = useUser();
  const showMenuModal = useModalStore((state) => state.showModal);
  const setShowMenuModal = useModalStore((state) => state.setShowMenuModal);

  const openOlyFeed = () => {
    setIsSidebarOpen(true);
  };

  const openModal = () => {
    setShowMenuModal(true);
  };

  const isMobile = useIsMobileStore((state) => state.isMobile);

  return (
    <div
      className={`${styles.container}   ${
        isSidebarOpen ? styles.withFeedSize : styles.size
      }`}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" className={styles.logo} onClick={openOlyFeed}>
          <Image src="/logo.png" alt="Logo" width={70.14} height={32} />
        </Link>
        <div className={styles.profileIconContainer}>
          {isSignedIn ? (
            <div className={`${styles.profile} ${styles.profileLoggedIn}`}>
              <UserButtonCustom />
            </div>
          ) : (
            <Button
              className={styles.profile}
              buttonChildren={
                <div
                  style={{
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <Image
                    src="/icons/menu.png"
                    alt="Profile Icon"
                    width={32}
                    height={32}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
