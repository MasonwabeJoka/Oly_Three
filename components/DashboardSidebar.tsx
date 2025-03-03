"use client";
import styles from "./DashboardSidebar.module.scss";
import Avatar from "@/components/Avatars";
import Link from "next/link";
import { MainMenuItem, LogoutMenuItem } from "./DashboardMenuItem";
import Image from "next/image";
import { useResponsive } from "@/store/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";
import { useState } from "react";
import { User } from "@/sanity/Types/User";
import { useUser } from "@clerk/nextjs";
import DashboardSidebarData from "@/data/DashboardSidebarData";

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
  // currentUser: User;
  currentUser: CurrentUserTemp;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  currentUser,
  users,
}) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const [isOpen, setIsOpen] = useState(false);
  const data = DashboardSidebarData();
  const { user, isSignedIn, isLoaded } = useUser();

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

      <div className={styles.profile}>
        {user?.hasImage && (
          <Avatar
            className={styles.avatar}
            avatar={user?.imageUrl || "/profilePic.jpg"}
            avatarSize={isMobile ? "regular" : "large"}
          />
        )}
        {/* <Avatar
          className={styles.avatar}
          avatar={currentUser?.image || "/profilePic.jpg"}
          avatarSize={isMobile ? "regular" : "large"}
        /> */}
        {!isMobile && <p className={styles.name}>{user?.fullName || user?.username}</p>}
      </div>
      <div>
        <ul className={styles.mainMenu} role="list">
          {data.slice(0, -1).map((menuItem) => {
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
                  data={data}
                />
              </li>
            );
          })}
        </ul>
        <LogoutMenuItem
          key={data[data.length - 1].id}
          id={data[data.length - 1].id}
          icon={data[data.length - 1].icon}
          active_icon={data[data.length - 1].active_icon}
          label={data[data.length - 1].label}
          link={data[data.length - 1].link}
          active={data[data.length - 1].active}
          onClick={data[data.length - 1].onClick}
          data={data}
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;
