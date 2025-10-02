"use client";
import styles from "./DashboardSidebar.module.scss";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import { MainMenuItem, LogoutMenuItem } from "./DashboardMenuItem";
import Image from "@/components/Image";
import { useResponsive } from "@/store/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Backpack } from "lucide-react";

interface CurrentUserTemp {
  conversationIds: string[];
  createdAt: string;
  email: string;
  emailVerified: boolean;
  id: string;
  image: string;
  name: string;
  messageIds: string[];
  updatedAt: string;
}
interface DashboardSidebarProps {
  currentUser: CurrentUserTemp;
  sidebarItems?: any;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  currentUser,
  sidebarItems,
}) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const [isOpen, setIsOpen] = useState(false);
  const { user, isSignedIn, isLoaded } = useUser();
  const pathname = usePathname();

  const itemsWithActiveState = sidebarItems?.map((item) => ({
    ...item,
    active:
      item.link === "/dashboard"
        ? pathname === "/dashboard"
        : item.link === "/dashboard/create-listing"
          ? pathname.startsWith("/dashboard/create-listing")
          : item.link === ""
            ? pathname === ""
            : pathname === item.link,
    onClick: () => {},
  }));

  const logoStyles = {
    marginTop: isMobile ? "1rem" : "1.5rem",
    marginBottom: isMobile ? "2rem" : "0rem",
  };

  return (
    <div className={styles.container}>
      {!isMobile && (
        <Link href="/" className={styles.logo} style={logoStyles}>
          <Image src="/logo.png" width={80} height={33.3} alt="logo" />
        </Link>
      )}

      <Link
        href="/dashboard/settings/profile-settings"
        className={styles.profile}
      >
        {/* {user?.hasImage && (
          <Avatar
            className={styles.avatar}
            avatar={user?.imageUrl || ""}
            avatarSize={isMobile ? "regular" : "large"}
          />
        )} */}
        <Avatar
          className={styles.avatar}
          avatar={currentUser?.image || ""}
          avatarSize={isMobile ? "regular" : "large"}
        />
        {!isMobile && (
          <p
            className={styles.name}
            style={{ visibility: user?.fullName ? "visible" : "hidden" }}
          >
            {/* The \u00A0 is a non-breaking space to maintain height when there's no text*/}
            {user?.fullName || user?.username || "\u00A0"}
          </p>
        )}
      </Link>
      <div>
        <ul className={styles.mainMenu} role="list">
          {itemsWithActiveState?.slice(0, -1).map((menuItem) => {
            const { id, icon, active_icon, label, link, active, onClick } =
              menuItem;
            return (
              <li key={id}>
                <MainMenuItem
                  id={id}
                  icon={icon}
                  active_icon={active_icon}
                  label={label}
                  link={link}
                  active={active}
                  onClick={onClick}
                  data={itemsWithActiveState}
                />
              </li>
            );
          })}
        </ul>
        {itemsWithActiveState && itemsWithActiveState.length > 0 && (
          <LogoutMenuItem
            key={itemsWithActiveState[itemsWithActiveState.length - 1].id}
            id={itemsWithActiveState[itemsWithActiveState.length - 1].id}
            icon={itemsWithActiveState[itemsWithActiveState.length - 1].icon}
            active_icon={
              itemsWithActiveState[itemsWithActiveState.length - 1].active_icon
            }
            label={itemsWithActiveState[itemsWithActiveState.length - 1].label}
            link={itemsWithActiveState[itemsWithActiveState.length - 1].link}
            active={
              itemsWithActiveState[itemsWithActiveState.length - 1].active
            }
            onClick={
              itemsWithActiveState[itemsWithActiveState.length - 1].onClick
            }
            data={itemsWithActiveState}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
