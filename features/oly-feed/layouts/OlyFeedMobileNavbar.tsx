"use client";
import styles from "./OlyFeedMobileNavbar.module.scss";
import { sidebarLinks } from "@/features/oly-feed/data/OlyFeedSidebarData";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const OlyFeedMobileNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className={styles.container}>

        {sidebarLinks.map((link) => {
          // if pathname includes the current route (from SidebarLinks database) and the link is not home (/)  or if pathname is the same as route name
          const isActive =
            (pathname.includes(link.route) && link.route !== "/oly-feed") ||
            pathname === link.route;
          return (
            <div className={styles.mainSection}>
              <Link
                key={link.label}
                href={link.route}
                className={styles.sidebarLink}
                style={{ backgroundColor: isActive ? "yellow" : "" }}
              >
                <Image
                  src={link.image}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p>{link.label}</p>
                {/* <p>{link.label.split(/\s +./)[0]}</p> */}
              </Link>
            </div>
          );
        })}
  
    </nav>
  );
};

export default OlyFeedMobileNavbar;
