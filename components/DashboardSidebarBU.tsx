"use client";
import styles from "./DashboardSidebar.module.scss";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import { DashboardSidebarData } from "@/data/DashboardSidebarData";
import Icon from "./Icon";
import Image from "@/components/Image";
import { useResponsive } from "@/utils/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { User } from "@/sanityTemp/Types/User";

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
  const [isActive, setIsActive] = useState<null | number>(null);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <Image src="/logo.png" width={80} height={33.3} alt="logo" />
      </Link>

      <div className={styles.profile}>
        <Avatar
          className={styles.avatar}
          avatar={currentUser?.image || "/profilePic.jpg"}
          avatarSize={isMobile ? "regular" : "large"}
        />
        {!isMobile && <p className={styles.name}>Mongezi Shezi</p>}
      </div>
      <div>
        <div className={styles.mainMenu}>
          {DashboardSidebarData.slice(0, -1).map((menuItem) => {
            const { id, icon, active_icon, menu, link } = menuItem;
            const isActiveItem = pathname === link;
            const CreateAListing = menu === "Create A Listing";
            return (
              <li className={styles.menu} key={id}>
                <Link
                  href={link}
                  onClick={() => setIsActive(isActiveItem ? id : null)}
                >
                  <Icon
                    className={styles.icon}
                    src={isActiveItem ? active_icon : icon}
                    alt="Edit Icon"
                    width={40}
                    height={40}
                  />
                  {!isMobile && (
                    <h4
                      className={styles.menuText}
                      style={{ color: isActiveItem ? "#ff3c14" : "#434b4d" }}
                    >
                      {menu}
                    </h4>
                  )}
                </Link>
              </li>
            );
          })}
        </div>
        <div className={`${styles.menu} ${styles.logout}`}>
          <Icon
            className={`${styles.logoutIcon} ${styles.icon}`}
            src={DashboardSidebarData[DashboardSidebarData.length - 1].icon}
            alt={DashboardSidebarData[DashboardSidebarData.length - 1].menu}
            width={40}
            height={40}
          />
          <h4 className={styles.menuText}>
            {!isMobile &&
              DashboardSidebarData[DashboardSidebarData.length - 1].menu}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
