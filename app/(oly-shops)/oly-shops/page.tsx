import Blogs from "@/components/Blogs";
import styles from "./styles.module.scss";
import FeaturedListings from "@/components/FeaturedListings";
import SponsoredArticles from "@/components/SponsoredArticles";
import BelowFoldAd from "@/components/ads/BelowFoldAd";
import HeroSection from "@/components/HeroSection";
import ShowMenu from "@/components/ShowMenu";
import ShowCategories from "@/components/ShowCategories";
import ExternalAd from "@/components/ExternalAd";
import { getCategories } from "@/sanityTemp/actions/categoriesActions";

const Home = () => {
  const fetchedCategories = getCategories(); // Fetch categories from Sanity

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.modal}>
          <ShowMenu />
        </div>
        <div className={styles.modal}>
          <ShowCategories fetchedCategories={fetchedCategories} />
        </div>

        <section className={styles.heroSection}>
          <HeroSection
            category="shops"
            mainTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo praesentium, consequatur minima placeat inventore maxime laboriosam ex."
          />
        </section>

        <section className={styles.aboveFoldAd}>
          <section className={styles.aboveFoldAd}>
            <ExternalAd
              adType="image"
              path="https://fastly.picsum.photos/id/830/1300/200.jpg?hmac=m8fdkf3QoO94k44M5vVpB1h-qZKOb46CuIJl43h9QDQ"
            />
          </section>
        </section>

        <section className={styles.featuredListings}>
          <h2 className={styles.title}>Featured Products</h2>
          <FeaturedListings category="shops" />
        </section>

        <section className={styles.belowFoldAd}>
          <BelowFoldAd />
        </section>
        <section className={styles.blog}>
          <h2 className={styles.title}>Oly Articles</h2>
          <Blogs />
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
