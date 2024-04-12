'use client'
import { useEffect, useMemo, useState } from "react";
import { ReactNode } from "react";
import styles from "./MaxWidthWrapper.module.scss";
import useSidebarStore from "@/store/useSidebarStore";
import { useResponsive } from "@/store/useResponsive";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

const MaxWidthWrapper = ({
  className = "",
  children,
}: MaxWidthWrapperProps) => {
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const isTablet = useResponsive("tablet", isSidebarOpen);
  const isDesktop = useResponsive("desktop", isSidebarOpen);
  useEffect(() => {
    if (isMobile) {
      setStyle({ maxWidth: isSidebarOpen ? "22.5em" : "22.5em" });
    } else if (isTablet) {
      setStyle({ maxWidth: isSidebarOpen ? "68.625em" : "90.625em" });
    } else if (isDesktop) {
      setStyle({ maxWidth: isSidebarOpen ? "68.625em" : "90.625em" });
    }
  }, [isSidebarOpen]);

  return (
    <div className={`${styles.wrapper} ${className || ""}`} style={style}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
