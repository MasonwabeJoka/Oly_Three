import { Suspense } from "react";
import styles from "./../../global-styles/homepage.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner";
import ExternalAd from "@/components/ExternalAd";
import HeroSection from "@/components/HeroSection";
import FeaturedServices from "@/components/FeaturedServicesFrontend";
import Calculators from "@/app/(oly-properties)/properties/components/Calculators";
import FeaturedListings from "@/components/FeaturedListings";
import OlyArticles from "@/components/OlyArticles";
import SponsoredArticles from "@/components/SponsoredArticles";
const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        
        <section className={styles.heroSection}>
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            <HeroSection
              category="vehicles"
              mainTitle=" South Africa’s leading car marketplace. Oly Auto a modern approach — it's easier to buy, sell, and discover your next ride"
            />
          </Suspense>
        </section>
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
 
        <section className={styles.features}>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
              

            >
          <section className={styles.featured}>
          <FeaturedServices
            layout="textLeft"
            path="#"
            image="/cars/5.jpg"
            title="Secure Car Finance"
            description="We work with trusted lenders to help you get the best deal."
            cta="Get Finance Help"
            features={[
              { id: "1", feature: "Compare offers from multiple finance partners" },
              { id: "2", feature: "Get quick pre-qualification" },
              { id: "3", feature: "No commitment, completely free"},
            ]}

          />
        </section>

        

        
            </Suspense>
          </section>
          <section className={styles.featuredListings}>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              <FeaturedListings category="all" currentPage={1} />
            </Suspense>
          </section>
           <section className={styles.calculators}>
          <Calculators />
        </section>
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
          <section className={styles.sponsoredArticles}>
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
      </div>
    </div>
  );
};

export default Page;
