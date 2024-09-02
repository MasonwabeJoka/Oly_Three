"use client";
import { useState, useEffect } from "react";
import Blog from "@/components/Blog";
import styles from "./styles.module.scss";
import FeaturedCategories from "@/components/FeaturedCategories";
import Features from "@/components/Features";
import FeaturedListings from "@/components/FeaturedListings";
import VideoAd from "@/components/VideoAd";
import SponsoredArticles from "@/components/SponsoredArticles";
import HeroSection from "@/components/HeroSection";
import useSidebarStore from "@/store/useSidebarStore";
import { useRouter } from "next/navigation";
import useIsMobileStore from "@/store/useMobileStore";
import Modal from "@/components/Modal";
import Categories from "@/components/Categories";
import Menu from "@/components/Menu";
import { useModalStore } from "@/store/modalStore";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import { useResponsive } from "@/utils/useResponsive";
import AboveFoldAd from "@/components/ads/AboveFoldAd";


const Home = () => {
  const showNotificationsModal = useModalStore(
    (state) => state.showNotificationsModal
  );
  const setShowNotificationsModal = useModalStore(
    (state) => state.setShowNotificationsModal
  );
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
    <MaxWidthWrapper className={styles.maxWidthWrapper}>
      <div className={styles.container}>
        <div className={styles.main}>
          <section className={styles.modalContainer}>
            <div className={styles.modal}>
              <Modal
                showModal={showNotificationsModal}
                setShowModal={setShowNotificationsModal}
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
          </section>

          <section className={styles.heroSection}>
            <HeroSection />
          </section>
          <section className={styles.aboveFoldAd}>
            <AboveFoldAd />
          </section>

          <section className={styles.categories}>
            <FeaturedCategories />
          </section>

          <section className={styles.features}>
            <Features />
          </section>
          
          <section className={styles.featuredListings}>
            <FeaturedListings />
          </section>
          <section className={styles.blog}>
            <Blog />
          </section>
          <section className={styles.videoAd}>
            <VideoAd />
          </section>
          <section className={styles.sponsoredArticles}>
            <SponsoredArticles />
          </section>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
