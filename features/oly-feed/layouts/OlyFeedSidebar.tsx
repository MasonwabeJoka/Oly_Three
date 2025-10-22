"use client";
import styles from "./OlyFeedSidebar.module.scss";
import { sidebarLinks } from "@/features/oly-feed/data/OlyFeedSidebarData";
import Link from "next/link";
import Image from "@/components/Image";
import { useRouter, usePathname } from "next/navigation";
// Authentication removed - no longer using Clerk

const OlyFeedSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const {userId} = useAuth()
  return (
    <div className={styles.container}>
      <section className={styles.mainSection}>
        {sidebarLinks.map((link) => {
          // if pathname includes the current route (from SidebarLinks database) and the link is not home (/)  or if pathname is the same as route name
          const isActive =
            (pathname.includes(link.route) && link.route !== "/oly-feed") ||
            pathname === link.route;

          // if(link.route ==='/oly-feed/profile') link.route = `${link.route}/${userId}`
          return (
            <nav className={styles.mainSection}>
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
              </Link>
            </nav>
          );
        })}
      </section>
      <section className={styles.groupsSection}>
        <div>
          <h3>Sellers To Follow</h3>
        </div>
        <div>
          <h3>Groups To Join</h3>
        </div>
      </section>
      <div className={styles.signOut}>
        {/* <SignedIn signOutCallback = {() => router.push('/sign-in')}>
          <SignOutButton>
            <Image src="" alt="" width={24} height={24}/>
          </SignOutButton>
        </SignedIn> */}
        <p>Logout</p>
      </div>
    </div>
  );
};

export default OlyFeedSidebar;
