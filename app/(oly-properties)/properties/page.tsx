import Blogs from "@/components/Blogs";
import styles from "./styles.module.scss";
import FeaturedListings from "@/components/FeaturedListings";
import SponsoredArticles from "@/components/SponsoredArticles";
import BelowFoldAd from "@/components/ads/BelowFoldAd";
import Navbar from "@/components/layouts/Navbar";
import Calculators from "./components/Calculators";
import HeroSection from "@/components/HeroSection";
import ShowMenu from "@/components/ShowMenu";
import ShowCategories from "@/components/ShowCategories";
import FeaturedServices from "@/components/FeaturedServices";
import ExternalAd from "@/components/ExternalAd";
// Todo: Fix cards arrow buttons don't appear when hovering the bottom of the card
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
            category="property"
            mainTitle="Welcome to South Africa's premier destination for property listings. Oly Properties is a modern real estate marketplace—your gateway to buying, selling, and renting with ease"
          />
        </section>

        <section className={styles.aboveFoldAd}>
          <ExternalAd
            adType="image"
            path="https://fastly.picsum.photos/id/830/1300/200.jpg?hmac=m8fdkf3QoO94k44M5vVpB1h-qZKOb46CuIJl43h9QDQ"
          />
        </section>
        <section className={styles.propertyValuation}>
          <FeaturedServices
            layout="textLeft"
            path="/properties/valuation"
            image="/houses/house9.jpg"
            title="Property Valuation"
            description=" Get a valuation of your property in minutes. Whether you're looking
            to sell or rent, our advanced valuation tool provides reliable
            estimates based on current market data."
            cta="Go to Valuation"
            features={[
              { id: 1, feature: "Market-based valuations" },
              { id: 2, feature: "Selling price recommendations" },
              { id: 3, feature: "Rental income estimates" },
            ]}
            content={<Calculators />}
          />
        </section>

        <section className={styles.preQualification}>
          <FeaturedServices
            layout="textRight"
            path="/properties/pre-qualification"
            image="/houses/house12.jpg"
            title="Oly Home Loan"
            description="We handle your home loan application by
            submitting it to all major banks on your behalf. Get pre-qualified
            and understand your buying power with our streamlined, hassle-free
            process — designed to boost your chances of approval."
            cta="Get Pre-Qualified"
            features={[
              { id: 4, feature: "Free pre-qualification assessment" },
              { id: 5, feature: "Submit to multiple banks simultaneously" },
              { id: 6, feature: "Compare offers and rates side by side" },
            ]}
            content={<Calculators />}
          />
        </section>

        <section className={styles.agentFinder}>
          <FeaturedServices
            layout="textLeft"
            path="/properties/find-agent"
            image="/agent/3.jpg"
            title="Find Your Perfect Agent"
            description="Connect with experienced real estate agents in your area who can
            help you buy, sell, or rent property. Our database includes verified
            professionals with proven track records."
            cta="Find an Agent"
            features={[]}
            content={<Calculators />}
          />
        </section>

        <section className={styles.featuredListings}>
          <h2 className={styles.title}>Featured Properties</h2>
          {/* <FeaturedListings category="property" /> */}
        </section>

        <section className={styles.belowFoldAd}>
          <ExternalAd
            adType="video"
            path="//https://developers.google.com/youtube/player_parameters"
          />
        </section>
        <section className={styles.calculators}>
          <Calculators />
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
