"use client";
import styles from "./DashboardSidebar.module.scss";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import { MainMenuItem, LogoutMenuItem } from "./DashboardMenuItem";
import Image from "@/components/Image";
import { useResponsive } from "@/store/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/actions/signOut";
import { User } from "@workos-inc/node";

interface DashboardSidebarProps {
  currentUser: User;
  sidebarItems?: any;
}

type ProfileUpdatedEventDetail = {
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string;
  profilePictureUrl?: string | null;
};

const isGeneratedInitialsAvatar = (avatarUrl?: string | null) => {
  if (!avatarUrl) {
    return false;
  }

  const normalized = avatarUrl.toLowerCase();
  if (
    normalized.includes("ui-avatars.com") ||
    normalized.includes("avatar.vercel.sh") ||
    normalized.includes("dicebear") ||
    normalized.includes("gravatar.com/avatar") ||
    normalized.includes("/initials") ||
    normalized.includes("default-avatar") ||
    normalized.includes("placeholder") ||
    normalized.includes("default-user") ||
    normalized.includes("name=") ||
    normalized.includes("background=")
  ) {
    return true;
  }

  try {
    const parsedUrl = new URL(avatarUrl);
    const host = parsedUrl.hostname.toLowerCase();
    const path = parsedUrl.pathname.toLowerCase();
    const params = parsedUrl.searchParams;

    if (
      path.includes("/avatar") ||
      path.includes("/initial") ||
      path.includes("default") ||
      params.has("name") ||
      params.has("background") ||
      params.has("color")
    ) {
      return true;
    }

    if (
      host.includes("googleusercontent.com") &&
      (path.includes("/a/default-user") || path.includes("/avatar"))
    ) {
      return true;
    }

  } catch {
    return normalized.includes("avatar") || normalized.includes("initial");
  }

  return false;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  currentUser,
  sidebarItems,
}) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarUser, setSidebarUser] = useState<User>(currentUser);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const handleProfileUpdated = (event: Event) => {
      const detail = (event as CustomEvent<ProfileUpdatedEventDetail>).detail;
      if (!detail) {
        return;
      }

      setSidebarUser((prev) => ({
        ...prev,
        firstName:
          detail.firstName !== undefined ? detail.firstName : prev.firstName,
        lastName: detail.lastName !== undefined ? detail.lastName : prev.lastName,
        profilePictureUrl:
          detail.profilePictureUrl !== undefined
            ? detail.profilePictureUrl
            : prev.profilePictureUrl,
        metadata: {
          ...(prev.metadata ?? {}),
          ...(detail.avatarUrl !== undefined
            ? { avatarUrl: detail.avatarUrl }
            : {}),
        },
      }));
    };

    window.addEventListener("oly:profile-updated", handleProfileUpdated);
    return () => {
      window.removeEventListener("oly:profile-updated", handleProfileUpdated);
    };
  }, []);

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
  const providerAvatar = isGeneratedInitialsAvatar(
    sidebarUser?.profilePictureUrl
  )
    ? ""
    : sidebarUser?.profilePictureUrl || "";

  return (
    <div className={styles.container}>
    

      <Link
        href="/dashboard/settings/profile-settings"
        className={styles.profile}
      >
        <Avatar
          className={styles.avatar}
          avatar={sidebarUser?.metadata?.avatarUrl || providerAvatar}
          avatarSize={isMobile ? "regular" : "large"}
        />

        {!isMobile && (
          <p
            className={styles.name}
            style={{
              visibility: sidebarUser?.firstName ? "visible" : "hidden",
            }}
          >
            {/* The \u00A0 is a non-breaking space to maintain height when there's no text*/}
            <span>{sidebarUser?.firstName || "\u00A0"}</span> {""}
            <span>{sidebarUser?.lastName || "\u00A0"}</span>
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
