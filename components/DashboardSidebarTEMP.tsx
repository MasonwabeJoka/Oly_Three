"use client";
import styles from "./DashboardSidebar.module.scss";
import Avatar from "@/components/Avatars";
import Link from "next/link";
import { DashboardSidebarData } from "@/data/DashboardSidebarData";
import Icon from "./Icon";
import Image from "next/image";
import { useResponsive } from "@/utils/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";
import { useState } from "react";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
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
          avatar="/profilePic.jpg"
          imageAlt="Profile"
          avatarSize={isMobile ? "regular" : "large"}
        />
        {!isMobile && <p className={styles.name}>Mongezi Shezi</p>}
      </div>
      <div>
        <div className={styles.mainMenu}>
          {DashboardSidebarData.slice(0, -1).map((menuItem) => {
            const { id, icon, active_icon, menu, link } = menuItem;
            const isActiveItem = pathname === link;
            const postYourAd = menu === "Post Your Ad";
            return (
              <Link
                href={link}
                className={styles.menu}
                key={id}
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
