import styles from "./FeaturedServicesSlideFrontend.module.scss";
import { FeaturedServicesData } from "@/data/FeaturedServicesData";
import FeaturedServicesSlideFrontendClient from "./FeaturedServicesSlideFrontendClient";
import { useSuspenseQuery } from "@tanstack/react-query";
import { featuredServicesSectionQueryOptions } from "@/server/sanity/read-write/featuredServicesSection/queryOptions";

const FeaturedServicesSlideFrontend = () => {
  const { data } = useSuspenseQuery(featuredServicesSectionQueryOptions);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <div className={styles.featureContainer}>
        <FeaturedServicesSlideFrontendClient featuredServicesData={data} />
      </div>
    </div>
  );
};

export default FeaturedServicesSlideFrontend;

