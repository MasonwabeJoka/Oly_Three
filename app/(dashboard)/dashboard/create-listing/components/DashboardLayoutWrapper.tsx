"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import styles from "./DashboardLayoutWrapper.module.scss";
import { useShowSidebarStore } from "../store/useShowSidebarStore";
import { Toaster } from "sonner";
import useBreakpointStore from "@/store/useBreakpointStore";
import { ImageKitProvider } from "@imagekit/next";
import BackButton from "@/components/BackButton";
import { useEffect } from "react";

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  currentUser?: any;
  sidebarItems?: any;
}

export default function DashboardLayoutWrapper({
  currentUser,
  children,
  sidebarItems,
}: DashboardLayoutWrapperProps) {
  const isVisible = useShowSidebarStore((state) => state.isVisible);
  const { isLargeDesktop, isSmallDesktop, isTablet, currentScreenSize } =
    useBreakpointStore();
  const [queryClient] = useState(() => new QueryClient());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  let marginLeft = "";
  switch (true) {
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
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ImageKitProvider
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      >
        <div
          className={styles.wrapper}
          style={{
            ...flexStyles,
          }}
        >
          <div className={styles.backButton}>
            <BackButton />
          </div>
          {/* {isVisible && <div className={styles.keepSidebarInPlace} />} */}
          {isVisible && (
            <aside className={styles.sidebarContainer}>
              <div className={styles.sidebar}>
                <DashboardSidebar
                  currentUser={currentUser}
                  sidebarItems={sidebarItems}
                />
              </div>
            </aside>
          )}
          <div
            className={styles.main}
            // style={{ marginLeft }}
            suppressHydrationWarning
          >
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
          </div>
        </div>
      </ImageKitProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
