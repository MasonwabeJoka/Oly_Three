"use client";
import { useState, useEffect } from "react";
import Blogs from "@/components/Blogs";
import styles from "../../styles/styles.module.scss";
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
import ExternalAd from "@/components/ExternalAd";

const Home = () => {
  const showMenuModal = useModalStore((state) => state.showMenuModal);
  const setShowMenuModal = useModalStore((state) => state.setShowMenuModal);
  const showCategoriesModal = useModalStore(
    (state) => state.showCategoriesModal
  );
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal
  );

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
            category="all"
            mainTitle=" Welcome to South Africa's hub for buying and selling. Oly is a
        modern marketplace. The future of classifieds."
          />
        </section>
        <section className={styles.moreFromOly}>
          <h2 className={styles.title}>More from Oly</h2>
          <MoreFromOly />
        </section>
        <section className={styles.aboveFoldAd}>
          <section className={styles.aboveFoldAd}>
            <ExternalAd
              adType="image"
              path="https://fastly.picsum.photos/id/830/1300/200.jpg?hmac=m8fdkf3QoO94k44M5vVpB1h-qZKOb46CuIJl43h9QDQ"
            />
          </section>
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
          <ExternalAd
            adType="video"
            path="//https://developers.google.com/youtube/player_parameters"
          />
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
