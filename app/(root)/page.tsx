import Blogs from "@/components/Blogs";
import styles from "./../global-styles/homepage.module.scss";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedListings from "@/components/FeaturedListings";
import SponsoredArticles from "@/components/SponsoredArticles";
import HeroSection from "@/components/HeroSection";
import MoreFromOly from "@/components/MoreFromOly";
import ShowMenu from "@/components/ShowMenu";
import ShowCategories from "@/components/ShowCategories";
import ExternalAd from "@/components/ExternalAd";
import FeaturedServicesSlide from "@/components/carousels/FeaturedServicesSlide";
import { getCategories } from "@/sanityTemp/actions/categoriesActions";
import { getOlyHomepage } from "@/sanity/lib/crud/pages/oly-homepage/data";
const Home = async () => {
  const fetchedCategories = await getCategories();
  const olyHomepage = await getOlyHomepage();
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
  } = olyHomepage;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.modal}>
          <ShowMenu />
        </div>
        <div className={styles.modal}>
          <ShowCategories fetchedCategories={fetchedCategories} />
        </div>

        {heroSection.isEnabled === true && (
          <section className={styles.heroSection}>
            <HeroSection
              category="all"
              mainTitle=" Welcome to South Africa's hub for buying and selling. Oly is a
        modern marketplace. The future of classifieds."
            />
          </section>
        )}
        {moreFromOlySection.isEnabled === true && (
          <section className={styles.moreFromOly}>
            <h2 className={styles.title}>More from Oly</h2>
            <MoreFromOly />
          </section>
        )}
        {topAdSection.isEnabled === true && (
          <section className={styles.aboveFoldAd}>
            <ExternalAd
              adType="image"
              path="https://fastly.picsum.photos/id/830/1300/200.jpg?hmac=m8fdkf3QoO94k44M5vVpB1h-qZKOb46CuIJl43h9QDQ"
            />
          </section>
        )}

        {featuredCategoriesSection.isEnabled === true && (
          <section className={styles.categories}>
            <h2 className={styles.title}>Featured Categories</h2>
            <FeaturedCategories />
          </section>
        )}

        {featuredServicesSection.isEnabled === true && (
          <section className={styles.features}>
            <FeaturedServicesSlide />
          </section>
        )}

        {featuredListingsSection.isEnabled === true && (
          <section className={styles.featuredListings}>
            <h2 className={styles.title}>Featured Listings</h2>
            <FeaturedListings category="all" />
          </section>
        )}

        {/* {olyArticlesSection.isEnabled === true && (
          <section className={styles.blog}>
            <h2 className={styles.title}>Oly Articles</h2>
            <Blogs />
          </section>
        )} */}

        {/* {bottomAdSection.isEnabled === true && ( */}
          <section className={styles.belowFoldAd}>
            <ExternalAd
              adType="video"
              path="//https://developers.google.com/youtube/player_parameters"
            />
          </section>
        {/* )} */}
        {/* {sponsoredArticlesSection.isEnabled === true && ( */}
          <section className={styles.sponsoredArticles}>
            <h2 className={styles.title}>Sponsored Articles</h2>
            <SponsoredArticles />
          </section>
        {/* )} */}
      </div>
    </div>
  );
};

export default Home;
