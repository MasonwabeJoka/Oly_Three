import Bottombar from "@/components/Bottombar";
import "../../globals.css";
import styles from "./layout.module.scss";
import DashboardSidebar from "@/components/DashboardSidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { localFont } from "next/font/local";
import Navbar from "@/components/layouts/Navbar";
import { currentUser } from "@/app/temp/tempForMessages";
import "@uploadthing/react/styles.css";
import QueryProvider from "@/app/(root)/queryProvider";

import { Toaster } from "sonner";
import DashboardSidebarWrapper from "./post-your-ad/components/LayoutWrapper";
import LayoutWrapper from "./post-your-ad/components/LayoutWrapper";

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
  return (
    <ClerkProvider>
      <html lang="en" className={`${outfit.className} ${styles.html}`}>
        <body className={styles.body}>
          <LayoutWrapper currentUser={currentUser!}>{children}</LayoutWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
