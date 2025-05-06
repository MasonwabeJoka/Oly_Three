"use client";
import Blogs from "@/components/Blogs";
import styles from "../styles/styles.module.scss";
import FeaturedCategories from "@/components/FeaturedCategories";
import Features from "@/components/Features";
import FeaturedListings from "@/components/FeaturedListings";
import SponsoredArticles from "@/components/SponsoredArticles";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/layouts/Navbar";
import MoreFromOly from "@/components/MoreFromOly";
import ShowMenu from "@/components/ShowMenu";
import ShowCategories from "@/components/ShowCategories";
import ExternalAd from "@/components/ExternalAd";
import FeaturesCarousel from "@/components/carousels/ProductOfferSlide";
import ProductOfferSlide from "@/components/carousels/ProductOfferSlide";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <nav className={styles.nav}>
          <Navbar />
        </nav>
        <div className={styles.modal}>
          <ShowMenu />
        </div>
        <div className={styles.modal}>
          <ShowCategories />
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
          <ExternalAd
            adType="image"
            path="https://fastly.picsum.photos/id/830/1300/200.jpg?hmac=m8fdkf3QoO94k44M5vVpB1h-qZKOb46CuIJl43h9QDQ"
          />
        </section>

        <section className={styles.categories}>
          <h2 className={styles.title}>Featured Categories</h2>
          <FeaturedCategories />
        </section>

        <section className={styles.features}>
          <ProductOfferSlide />
        </section>

        <section className={styles.featuredListings}>
          <h2 className={styles.title}>Featured Listings</h2>
          <FeaturedListings category="all" />
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
