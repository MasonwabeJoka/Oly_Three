import { Suspense } from "react";
import styles from "./../../global-styles/homepage.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner";
import ExternalAd from "@/components/ExternalAd";
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
            Hero Section
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
        <section className={styles.categories}>
          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            Vehicle Categories
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
             Features
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
              Featured Listings
            </Suspense>
          </section>
          <section className={styles.articles}>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              Oly Articles
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
              Sponsored Articles
            </Suspense>
          </section>
      </div>
    </div>
  );
};

export default Page;
