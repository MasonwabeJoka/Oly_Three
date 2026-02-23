import styles from "./FeaturedServicesSlideFrontend.module.scss";
import { FeaturedServicesData } from "@/data/FeaturedServicesData";
import FeaturedServicesSlideFrontendClient from "./FeaturedServicesSlideFrontendClient";
import { useSuspenseQuery } from "@tanstack/react-query";
import { featuredServicesSectionQueryOptions } from "@/sanity/lib/crud/featuredServicesSection/queryOptions";

const FeaturedServicesSlideFrontend = () => {
  const {data}= useSuspenseQuery(featuredServicesSectionQueryOptions)

  if(!data) return null;

  const services = data.services || [];
  // Remove the features line since it's not used and causes TypeScript error
  return (
    <div className={styles.container}>
      <div className={styles.featureContainer}>
        <FeaturedServicesSlideFrontendClient
          featuredServicesData={data}
        />
      </div>
    </div>
  );
};

export default FeaturedServicesSlideFrontend;
