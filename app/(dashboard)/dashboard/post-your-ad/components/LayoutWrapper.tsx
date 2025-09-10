"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import styles from "./LayoutWrapper.module.scss";
import { useShowSidebarStore } from "../store/useShowSidebarStore";
import { Toaster } from "sonner";
import useBreakpointStore from "@/store/useBreakpointStore";

interface LayoutWrapperProps {
  children: React.ReactNode;
  currentUser: any;
}

export default function LayoutWrapper({
  currentUser,
  children,
}: LayoutWrapperProps) {
  const isVisible = useShowSidebarStore((state) => state.isVisible);
  const {isLargeDesktop, isSmallDesktop, isTablet} = useBreakpointStore()

  
  let marginLeft = ''
  switch(true) {
    case isLargeDesktop:
       marginLeft = isVisible ? "auto" : "0";
      break;
    case isSmallDesktop:
        marginLeft = isVisible ? "1rem" : "0";
      break;
    case isTablet:
        marginLeft = isVisible ? "1rem" : "0";
      break;
    default:
      marginLeft = "0";
      break;
  }

  const flexStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: isVisible ? "row" : "column",
    justifyContent: isVisible ? "flex-start" : "center",
    alignItems: isVisible ? "unset" : "center",
  }

  return (
    <div className={styles.wrapper} style={flexStyles}>
      {isVisible && <div className={styles.keepSidebarInPlace} />}
      {isVisible && (
        <aside className={styles.sidebar}>
          <DashboardSidebar currentUser={currentUser} />
        </aside>
      )}
      <main className={styles.main} style={{ marginLeft }}>
        {children}
        <Toaster
          richColors
          toastOptions={{
            style: {
              height: "60px",
              padding: "32px 28px",
            },
            className: "class",
          }}
        />
      </main>
    </div>
  );
}
