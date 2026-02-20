"use client";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "@/components/Image";
import MenuButton from "../MenuButton";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import useBreakpointStore from "@/store/useBreakpointStore";

interface NavbarProps {
  rightButton?: React.ReactNode | null;
  homeButton?: boolean;
  logoSrc?: string;
  logoAlt?: string;
  logoPath?: string;
  logoWidth?: number;
  logoHeight?: number;
  mobileLogoWidth?: number;
  mobileLogoHeight?: number;
}

const Navbar = ({
  rightButton = <MenuButton />,
  homeButton = true,
  logoSrc = "/logo.png",
  logoAlt = "logo",
  logoPath = "/",
  logoWidth = 70.14,
  logoHeight = 32,
  mobileLogoWidth = 61.372,
  mobileLogoHeight = 28,
}: NavbarProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobile } = useBreakpointStore();

  useEffect(() => {
    // Only add scroll listener if on the homepage
    if (isHomePage) {
      const handleScroll = () => {
        // Check if the user has scrolled more than 200px
        if (window.scrollY > 200) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      // Add scroll event listener
      window.addEventListener("scroll", handleScroll);

      // Clean up the event listener on component unmount or route change
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      // Ensure logo is visible on non-homepage routes
      setIsScrolled(true);
    }
  }, [isHomePage]); // Re-run effect if the pathname changes

  return (
    <div className={styles.container}>
      {homeButton && (
        <Link
          href={logoPath}
          className={`${styles.logo} ${isHomePage ? (isScrolled ? styles.visible : styles.hidden) : styles.visible}`}
        >
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={isMobile ? mobileLogoWidth : logoWidth}
            height={isMobile ? mobileLogoHeight : logoHeight}
            className={isScrolled ? styles.logo : styles.logoHidden}
          />
        </Link>
      )}

      {rightButton && <div className={styles.rightButton}>{rightButton}</div>}
    </div>
  );
};

export default Navbar;
