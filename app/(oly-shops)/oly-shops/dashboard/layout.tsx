import localFont from "next/font/local";
import { currentUser } from "@/app/temp/tempForMessages";
import DashboardLayoutWrapper from "@/app/(dashboard)/dashboard/create-listing/components/DashboardLayoutWrapper";
import StoreDashboardSidebarData from "./data/StoreDashboardSidebarData";

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
  const sidebarItems = StoreDashboardSidebarData;
  return (
    <html lang="en" className={`${outfit.className}`} data-scroll-behavior="smooth">
      <body>
        <DashboardLayoutWrapper
          currentUser={currentUser!}
          sidebarItems={sidebarItems}
        >
          {children}
        </DashboardLayoutWrapper>
      </body>
    </html>
  );
}
