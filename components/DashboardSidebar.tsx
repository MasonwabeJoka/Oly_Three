"use client";
import styles from "./DashboardSidebar.module.scss";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import { MainMenuItem, LogoutMenuItem } from "./DashboardMenuItem";
import Image from "@/components/Image";
import { useResponsive } from "@/store/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/actions/signOut";
import { User } from "@workos-inc/node";

interface DashboardSidebarProps {
  currentUser: User;
  sidebarItems?: any;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  currentUser,
  sidebarItems,
}) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const user = currentUser.profilePictureUrl ?? "";

  const itemsWithActiveState = sidebarItems?.map((item: any, index: any) => ({
    ...item,
    active:
      item.link === "/dashboard"
        ? pathname === "/dashboard"
        : item.link === "/dashboard/create-listing"
          ? pathname.startsWith("/dashboard/create-listing")
          : item.link === ""
            ? pathname === ""
            : pathname === item.link,
    onClick: index === sidebarItems.length - 1 ? signOutAction : () => {},
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
        <Avatar
          className={styles.avatar}
          avatar={currentUser}
          avatarSize={isMobile ? "regular" : "large"}
        />

        {!isMobile && (
          <p
            className={styles.name}
            style={{
              visibility: currentUser?.firstName ? "visible" : "hidden",
            }}
          >
            {/* The \u00A0 is a non-breaking space to maintain height when there's no text*/}
            <span>{currentUser?.firstName || "\u00A0"}</span> {""}
            <span>{currentUser?.lastName || "\u00A0"}</span>
          </p>
        )}
      </Link>
      <div>
        <ul className={styles.mainMenu} role="list">
          {itemsWithActiveState?.slice(0, -1).map((menuItem: any) => {
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
