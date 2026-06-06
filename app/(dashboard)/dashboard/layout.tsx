import "@/app/globals.scss";
import styles from "./layout.module.scss";
import localFont from "next/font/local";
import "@uploadthing/react/styles.css";
import DashboardLayoutWrapper from "./create-listing/components/DashboardLayoutWrapper";
import DashboardSidebarData from "@/data/DashboardSidebarData";
import { getWorkOS, withAuth } from "@workos-inc/authkit-nextjs";
import Navbar from "@/components/layouts/Navbar";
import BackButton from "@/components/BackButton";

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
  const auth = await withAuth();
  const workos = getWorkOS();
  // const currentUser = auth.user
  //   ? await workos.userManagement.getUser(auth.user.id)
  //   : auth.user;
  const currentUser = auth.user;
  const { accessToken, ...initialAuth } = auth;
  
  return (
    <html lang="en" className={`${outfit.className} ${styles.html}`} >
      <body className={styles.body}>
        <Navbar
            homeButton
            rightButton={<BackButton />}
          />
        <DashboardLayoutWrapper
          currentUser={currentUser}
          initialAuth={initialAuth}
          sidebarItems={sidebarItems}
        >
          
          {children}
        </DashboardLayoutWrapper>
      </body>
    </html>
  );
}
