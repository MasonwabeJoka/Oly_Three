"use client";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "@/components/Image";
import MenuButton from "../MenuButton";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

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
      <Link
        href="/"
        className={`${styles.logo} ${isHomePage ? (isScrolled ? styles.visible : styles.hidden) : styles.visible}`}
      >
        <Image src="/logo.png" alt="Logo" width={70.14} height={32} />
      </Link>

      <MenuButton />
    </div>
  );
};

export default Navbar;
