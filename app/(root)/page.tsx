import styles from "./../global-styles/homepage.module.scss";
import FeaturedListings from "@/components/FeaturedListings";
import SponsoredArticles from "@/components/SponsoredArticles";
import HeroSection from "@/components/HeroSection";
import MoreFromOly from "@/components/MoreFromOly";
import ShowMenu from "@/components/ShowMenu";
import ShowCategories from "@/components/ShowCategories";
import ExternalAd from "@/components/ExternalAd";
import FeaturedServicesSlide from "@/components/carousels/FeaturedServicesSlide";

import { getOlyHomepage } from "@/sanity/lib/crud/pages/oly-homepage/data";
import { getCategories } from "@/sanity/lib/crud/categories/data";
import { getFeaturedCategoriesSection } from "@/sanity/lib/crud/featuredCategoriesSection/data";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import OlyArticles from "@/components/OlyArticles";
import FeaturedCategories from "@/components/FeaturedCategories";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const olyHomepage = await getOlyHomepage();
  const categories = await getCategories();
  const { categories: firstLevelCategories, title } = categories || {
    categories: null,
    title: null,
  };

  // Read page from URL parameters, default to 1
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || "1");

  const {
    heroSection,
    moreFromOlySection,
    topAdSection,
    featuredServicesSection,
    featuredCategoriesSection,
    featuredListingsSection,
    bottomAdSection,
    olyArticlesSection,
    sponsoredArticlesSection,
  } = olyHomepage || {};
  const featuredCategoriesSectionData = await getFeaturedCategoriesSection();
  const { featuredCategories } = featuredCategoriesSectionData || {
    featuredCategories: null,
  };

  return (
    <div
      className={styles.container}
    
    >
      <div className={styles.main}>
             <div className={styles.modal}>
          <ShowMenu />
        </div>
      
        <div className={styles.modal}>
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            {categories && <ShowCategories categories={firstLevelCategories} />}
          </Suspense>
        </div>

        {heroSection?.isEnabled === true && (
          <section className={styles.heroSection}>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              <HeroSection
                category="all"
                mainTitle=" Welcome to South Africa's hub for buying and selling. Oly is a
        modern marketplace. The future of classifieds."
              />
            </Suspense>
          </section>
        )}
        {moreFromOlySection?.isEnabled === true && (
          <section className={styles.moreFromOly}>
            <h2 className={styles.title}>More from Oly</h2>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              <MoreFromOly />
            </Suspense>
          </section>
        )}
        {topAdSection?.isEnabled === true && (
          <section className={styles.aboveFoldAd}>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              <ExternalAd
                adType="image"
                path="https://fastly.picsum.photos/id/830/1300/200.jpg?hmac=m8fdkf3QoO94k44M5vVpB1h-qZKOb46CuIJl43h9QDQ"
              />
            </Suspense>
          </section>
        )}
      
         {featuredCategoriesSection?.isEnabled === true && (
          <section className={styles.categories}>
            <h2 className={styles.title}>Featured Categories</h2>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              <FeaturedCategories/>
            </Suspense>
          </section>
        )}  

        {featuredServicesSection?.isEnabled === true && (
          <section className={styles.features}>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              <FeaturedServicesSlide />
            </Suspense>
          </section>
        )}

        {featuredListingsSection?.isEnabled === true && (
          <section className={styles.featuredListings}>
            <h2 className={styles.title}>Featured Listings</h2>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              <FeaturedListings category="all" currentPage={currentPage} />
            </Suspense>
          </section>
        )}

        {olyArticlesSection?.isEnabled === true && (
          <section className={styles.articles}>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              <OlyArticles />
            </Suspense>
          </section>
        )}

        {bottomAdSection?.isEnabled === true && (
          <section className={styles.belowFoldAd}>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              <ExternalAd
                adType="video"
                path="//https://developers.google.com/youtube/player_parameters"
              />
            </Suspense>
          </section>
        )}
        {sponsoredArticlesSection?.isEnabled === true && (
          <section className={styles.sponsoredArticles}>
            <h2 className={styles.title}>Sponsored Articles</h2>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              <SponsoredArticles />
            </Suspense>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
