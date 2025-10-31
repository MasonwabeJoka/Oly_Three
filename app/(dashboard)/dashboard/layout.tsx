import "../../globals.css";
import styles from "./layout.module.scss";
import localFont from "next/font/local";
import "@uploadthing/react/styles.css";
import DashboardLayoutWrapper from "./create-listing/components/DashboardLayoutWrapper";
import DashboardSidebarData from "@/data/DashboardSidebarData";
import { withAuth } from "@workos-inc/authkit-nextjs";

export const metadata = {
  title: "Oly Dashboard",
  description: "Dashboard",
};

const outfit = localFont({
  src: "./outfit.ttf",
  display: "swap",
  fallback: ["roboto", "system-ui", "arial"],
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarItems = DashboardSidebarData;
  const {user} = await withAuth()
  
  return (
    <html lang="en" className={`${outfit.className} ${styles.html}`} >
      <body className={styles.body}>
        <DashboardLayoutWrapper
          currentUser={user}
          sidebarItems={sidebarItems}
        >
          {children}
        </DashboardLayoutWrapper>
      </body>
    </html>
  );
}
