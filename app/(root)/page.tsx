"use client";
import { useState, useEffect } from "react";
import Blogs from "@/components/Blogs";
import styles from "./styles.module.scss";
import FeaturedCategories from "@/components/FeaturedCategories";
import Features from "@/components/Features";
import FeaturedListings from "@/components/FeaturedListings";
import SponsoredArticles from "@/components/SponsoredArticles";
import HeroSection from "@/components/HeroSection";
import useSidebarStore from "@/store/useSidebarStore";
import { useRouter } from "next/navigation";
import useIsMobileStore from "@/store/useMobileStore";
import Modal from "@/components/Modal";
import Categories from "@/components/Categories";
import Menu from "@/components/Menu";
import { useModalStore } from "@/store/modalStore";
import { useResponsive } from "@/utils/useResponsive";
import AboveFoldAd from "@/components/ads/AboveFoldAd";
import BelowFoldAd from "@/components/ads/BelowFoldAd";
import Navbar from "@/components/layouts/Navbar";
import MoreFromOly from "@/components/MoreFromOly";

const Home = () => {
  const showMenuModal = useModalStore((state) => state.showMenuModal);
  const setShowMenuModal = useModalStore((state) => state.setShowMenuModal);
  const showCategoriesModal = useModalStore(
    (state) => state.showCategoriesModal
  );
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );
  const router = useRouter();
  // const isMobile = useIsMobileStore((state) => state.isMobile);
  const setIsMobile = useIsMobileStore((state) => state.setIsMobile);
  const currentScreenSize = useIsMobileStore(
    (state) => state.currentScreenSize
  );
  const setCurrentScreenSize = useIsMobileStore(
    (state) => state.setCurrentScreenSize
  );
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);

  const isDesktop = useResponsive("desktop", isSidebarOpen);
  const isTablet = useResponsive("tablet", isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      setCurrentScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMobile(currentScreenSize < 640);
  }, [currentScreenSize]);

  useEffect(() => {
    isMobile ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
  }, [isMobile]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <nav className={styles.nav}>
          <Navbar />
        </nav>
        <div className={styles.modal}>
          <Modal
            showModal={showMenuModal}
            setShowModal={setShowMenuModal}
            modalContent={<Menu />}
          />
        </div>
        <div className={styles.modal}>
          <Modal
            showModal={showCategoriesModal}
            setShowModal={setShowCategoriesModal}
            modalContent={<Categories />}
          />
        </div>

        <section className={styles.heroSection}>
          <HeroSection
            mainTitle=" Welcome to South Africa's hub for buying and selling. Oly is a
        modern marketplace. The future of classifieds."
          />
        </section>
        <section className={styles.moreFromOly}>
          <h2 className={styles.title}>More from Oly</h2>
          <MoreFromOly />
        </section>
        <section className={styles.aboveFoldAd}>
          <AboveFoldAd />
        </section>

        <section className={styles.categories}>
          <h2 className={styles.title}>Featured Categories</h2>
          <FeaturedCategories />
        </section>

        <section className={styles.features}>
          <Features />
        </section>

        <section className={styles.featuredListings}>
          <h2 className={styles.title}>Featured Listings</h2>
          <FeaturedListings />
        </section>
        <section className={styles.blog}>
          <h2 className={styles.title}>Oly Articles</h2>
          <Blogs />
        </section>

        <section className={styles.belowFoldAd}>
          <BelowFoldAd />
        </section>
        <section className={styles.sponsoredArticles}>
          <h2 className={styles.title}>Sponsored Articles</h2>
          <SponsoredArticles />
        </section>
      </div>
    </div>
  );
};

export default Home;
