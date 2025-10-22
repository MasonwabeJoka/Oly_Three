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
import Button from "./Buttons";
import { useModalStore } from "@/store/modalStore";

const Menu = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const router = useRouter();
  const showMenuModal = useModalStore((state) => state.showMenuModal);
  const setShowMenuModal = useModalStore((state) => state.setShowMenuModal);
  // Authentication removed - no longer using Clerk

  const containerStyles = {
    width: isMobile ? "100vw" : isSidebarOpen ? "85vw" : "51.51rem",
    // width: isMobile ? "100vw" : isSidebarOpen ? "49.375rem" : "60.60rem",
    height: isMobile ? "100vh" : isSidebarOpen ? "33.625rem" : "80vh",
    // minHeight: isMobile ? "100vh" : isSidebarOpen ? "33.625rem" : "45.875rem",
    boxShadow: isMobile ? "none" : "none",
    // boxShadow: isMobile ? "none" : shadow,
  };

  const menuStyles = {
    columnGap: isMobile ? "1rem" : isSidebarOpen ? "3rem" : "3rem",
    // padding: isMobile ? "" : "3rem 3rem 12rem 3rem",
  };
  const menuItemStyles = {
    width: isMobile ? "6rem" : isSidebarOpen ? "12rem" : "12rem",
    height: isMobile ? "6rem" : isSidebarOpen ? "12rem" : "12rem",
    marginBottom: isMobile ? "1rem" : isSidebarOpen ? "1rem" : "1rem",
  };
  const iconContainerSize = {
    width: isMobile ? "3rem" : isSidebarOpen ? "4rem" : "5.5rem",
    height: isMobile ? "3rem" : isSidebarOpen ? "4rem" : "5.5rem",
  };
  const textSize = {
    fontSize: isMobile ? "0.875rem" : isSidebarOpen ? "1rem" : "1rem",
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
              buttonChildren="Go Back"
              buttonType="normal"
              buttonSize="medium"
              name="go-back-btn"
              type="button"
              ariaLabel="Go Back Button"
              autoFocus={false}
              disabled={false}
              ariaHidden={false}
              onClick={() => setShowMenuModal(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
