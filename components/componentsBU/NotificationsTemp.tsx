import styles from "./Menu.module.scss";
import { MenuData } from "@/data/MenuData";
import Icon from "./Icon";
import Link from "next/link";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import useSidebarStore from "@/store/useSidebarStore";
import { useState } from "react";

const Menu = () => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div
      className={styles.container}
      style={{
        width: isSidebarOpen ? "49.375rem" : "60.60rem",
        height: isSidebarOpen ? "33.625rem" : "45.875rem",
      }}
    >
      <ul
        className={styles.notifications}
        style={{
          columnGap: "3rem",
        }}
      >
        {MenuData.map((notification: any) => {
          const { id, icon, text, path } = notification;
          return (
            <Link href={path}>
              <li
                key={id}
                className={styles.notification}
                style={{
                  width: isSidebarOpen ? "12rem" : "12rem",
                  height: isSidebarOpen ? "12rem" : "12rem",
                  marginBottom: isSidebarOpen ? "1rem" : "1rem",
                }}
              >
                <div
                  className={styles.iconContainer}
                  style={{
                    width: isSidebarOpen ? "4rem" : "5.5rem",
                    height: isSidebarOpen ? "4rem" : "5.5rem",
                  }}
                >
                  {text === "Logout" ? (
                    <>
                      <SignedIn>
                        <div
                          onClick={() => signOut(() => logoutBtnClicked())}
                          className={styles.logoutBtnContainer}
                        >
                          <Icon
                            src={icon}
                            alt={`{${text} icon}`}
                            width={isSidebarOpen ? 32 : 40}
                            height={isSidebarOpen ? 32 : 40}
                            className={styles.icon}
                          />
                        </div>
                      </SignedIn>
                      <SignedOut>
                        <div
                          onClick={() => setShowNotificationsModal(false)}
                          className={styles.logoutBtnContainer}
                        >
                          <Icon
                            src={icon}
                            alt={`{${text} icon}`}
                            width={isSidebarOpen ? 32 : 40}
                            height={isSidebarOpen ? 32 : 40}
                            className={styles.icon}
                          />
                        </div>
                      </SignedOut>
                    </>
                  ) : (
                    <Icon
                      src={icon}
                      alt={`{${text} icon}`}
                      width={isSidebarOpen ? 32 : 40}
                      height={isSidebarOpen ? 32 : 40}
                      className={styles.icon}
                    />
                  )}
                </div>
                <p className={styles.text}>{text}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
