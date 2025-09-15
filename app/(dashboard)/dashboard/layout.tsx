import "../../globals.css";
import styles from "./layout.module.scss";
import { ClerkProvider } from "@clerk/nextjs";
import { localFont } from "next/font/local";
import { currentUser } from "@/app/temp/tempForMessages";
import "@uploadthing/react/styles.css";
import LayoutWrapper from "./post-your-ad/components/LayoutWrapper";
import DashboardSidebarData from "@/data/DashboardSidebarData";

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
 
  return (
    <ClerkProvider>
      <LayoutWrapper currentUser={currentUser!} sidebarItems={sidebarItems}>{children}</LayoutWrapper>
    </ClerkProvider>
  );
}
