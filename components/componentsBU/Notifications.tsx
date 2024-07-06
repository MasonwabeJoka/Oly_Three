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
import { useClerk } from "@clerk/clerk-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { sign } from "crypto";

const Menu = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const router = useRouter();
  const showNotificationsModal = useModalStore(
    (state) => state.showNotificationsModal
  );
  const setShowNotificationsModal = useModalStore(
    (state) => state.setShowNotificationsModal
  );

  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
    setShowNotificationsModal(false);
  };

  const containerStyles = {
    width: isMobile ? "100vw" : isSidebarOpen ? "85vw" : "51.51rem",
    // width: isMobile ? "100vw" : isSidebarOpen ? "49.375rem" : "60.60rem",
    minHeight: isMobile ? "100vh" : isSidebarOpen ? "33.625rem" : "80vh",
    // minHeight: isMobile ? "100vh" : isSidebarOpen ? "33.625rem" : "45.875rem",
    boxShadow: isMobile ? "none" : "none",
    // boxShadow: isMobile ? "none" : shadow,
  };

  const notificationsStyles = {
    columnGap: isMobile ? "1rem" : isSidebarOpen ? "3rem" : "3rem",
    padding: isMobile ? "" : "3rem 3rem 12rem 3rem",
  };
  const notificationStyles = {
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

  // TODO: When notification is open and the user is logged out dynamically change the logout button to exit button, with an X icon.
  return (
    <MaxWidthWrapper className={styles.maxWidthWrapper}>
      <div className={styles.container} style={containerStyles}>
        <ul className={styles.notifications} style={notificationsStyles}>
          {MenuData.map((notification: any) => {
            const { id, icon, text, path } = notification;
            return (
              <Link href={path}>
                <li
                  key={id}
                  className={styles.notification}
                  style={notificationStyles}
                  
                >
                  {text === "Logout" ? (
                    <>
                      <SignedIn>
                        <div
                          className={styles.iconContainer}
                          style={iconContainerSize}
                          onClick={handleSignOut}
                        >
                          <Icon
                            src={icon}
                            alt={`{${text} icon}`}
                            width={isMobile ? 20 : isSidebarOpen ? 32 : 40}
                            height={isMobile ? 20 : isSidebarOpen ? 32 : 40}
                            className={styles.icon}
                          />
                        </div>
                      </SignedIn>
                      <SignedOut>
                        <div
                          className={styles.iconContainer}
                          style={iconContainerSize}
                          onClick={() => setShowNotificationsModal(false)}
                        >
                          <Icon
                            src={icon}
                            alt={`{${text} icon}`}
                            width={isMobile ? 20 : isSidebarOpen ? 32 : 40}
                            height={isMobile ? 20 : isSidebarOpen ? 32 : 40}
                            className={styles.icon}
                          />
                        </div>
                      </SignedOut>
                    </>
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
              onClick={() => setShowNotificationsModal(false)}
            />
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Menu;
