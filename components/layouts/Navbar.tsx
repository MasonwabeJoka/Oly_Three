'use client'
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import MenuButton from "../MenuButton";
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname(); // Get the current route
  const isHomePage = pathname === '/'; // Check if the current page is the homepage
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
      window.addEventListener('scroll', handleScroll);

      // Clean up the event listener on component unmount or route change
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isHomePage]); // Re-run effect if the pathname changes
  return (
    <div className={styles.container}>
      <Link href="/" className={`${styles.logo} ${isScrolled ? styles.visible : styles.hidden}`}>
        <Image src="/logo.png" alt="Logo" width={70.14} height={32} />
      </Link>

      <MenuButton />
    </div>
  );
};

export default Navbar;
