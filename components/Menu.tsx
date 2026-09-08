"use client";
import styles from "./Menu.module.scss";
import { MenuData } from "@/data/MenuData";
import Icon from "./Icon";
import Link from "next/link";
import { useResponsive } from "@/store/useResponsive";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import useSidebarStore from "@/store/useSidebarStore";
import { useState } from "react";
import Button from "./Button";
import { useModalStore } from "@/store/modalStore";

const Menu = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const router = useRouter();
  const showMenuModal = useModalStore((state) => state.showMenuModal);
  const setShowMenuModal = useModalStore((state) => state.setShowMenuModal);
  // Authentication removed - no longer using Clerk

  const containerStyles = {
    width: isMobile ? "100vw" : isSidebarOpen ? "85vw" : "82.416rem",
    // width: isMobile ? "100vw" : isSidebarOpen ? "49.375rem" : "60.60rem",
    height: isMobile ? "100vh" : isSidebarOpen ? "53.8rem" : "80vh",
    // minHeight: isMobile ? "100vh" : isSidebarOpen ? "33.625rem" : "45.875rem",
    boxShadow: isMobile ? "none" : "none",
    // boxShadow: isMobile ? "none" : shadow,
  };

  const menuStyles = {
    columnGap: isMobile ? "1.6rem" : isSidebarOpen ? "4.8rem" : "4.8rem",
    // padding: isMobile ? "" : "3rem 3rem 12rem 3rem",
  };
  const menuItemStyles = {
    width: isMobile ? "9.6rem" : isSidebarOpen ? "19.2rem" : "19.2rem",
    height: isMobile ? "9.6rem" : isSidebarOpen ? "19.2rem" : "19.2rem",
    marginBottom: isMobile ? "1.6rem" : isSidebarOpen ? "1.6rem" : "1.6rem",
  };
  const iconContainerSize = {
    width: isMobile ? "4.8rem" : isSidebarOpen ? "6.4rem" : "8.8rem",
    height: isMobile ? "4.8rem" : isSidebarOpen ? "6.4rem" : "8.8rem",
  };
  const textSize = {
    fontSize: isMobile ? "1.4rem" : isSidebarOpen ? "1.6rem" : "1.6rem",
  };

  // TODO: When Menu is open and the user is logged out, dynamically change the logout button to exit button, with an X icon.
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.menuStyles} style={menuStyles}>
          {MenuData.map((menuItem: any) => {
            const { id, icon, text, path } = menuItem;
            return (
              <Link href={path} key={id}>
                <li className={styles.menuItem} style={menuItemStyles}>
                  {text === "Logout" ? (
                    <div
                      className={styles.iconContainer}
                      style={iconContainerSize}
                      onClick={() => setShowMenuModal(false)}
                    >
                      <Icon
                        src={icon}
                        alt={`{${text} icon}`}
                        width={isMobile ? 20 : isSidebarOpen ? 32 : 40}
                        height={isMobile ? 20 : isSidebarOpen ? 32 : 40}
                        className={styles.icon}
                      />
                    </div>
                  ) : (
                    <div
                      className={styles.iconContainer}
                      style={iconContainerSize}
                    >
                      <Icon
                        src={icon}
                        alt={`{${text} icon}`}
                        width={isMobile ? 20 : isSidebarOpen ? 32 : 40}
                        height={isMobile ? 20 : isSidebarOpen ? 32 : 40}
                        className={styles.icon}
                      />
                    </div>
                  )}
                  <p className={styles.text} style={textSize}>
                    {text}
                  </p>
                </li>
              </Link>
            );
          })}
        </ul>
        {isMobile && (
          <div className={styles.goBackButtonContainer}>
            <Button
              className={styles.goBackButton}
              children="Go Back"
              buttonVariant="normal"
              buttonSize="medium"


              ariaLabel="Go Back Button"



              onClick={() => setShowMenuModal(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
