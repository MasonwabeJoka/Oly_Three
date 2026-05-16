"use client";

import { useEffect, useState } from "react";
import styles from "./FeaturedServicesSlideFrontend.module.scss";
import FeaturedServicesSlideFrontendClient from "./FeaturedServicesSlideFrontendClient";
import { useQuery } from "@tanstack/react-query";
import { featuredServicesSectionQueryOptions } from "@/server/sanity/lib/crud/featuredServicesSection/queryOptions";

export default function FeaturedServicesSlideFrontend() {
 
  const [isMounted, setIsMounted] = useState(false);


  const { data, isLoading, isError } = useQuery({
    ...featuredServicesSectionQueryOptions,
    enabled: isMounted,
    staleTime: Infinity,
  });


  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (isLoading || !data) return null;
  if (isError) return null;

  return (
    <div className={styles.container}>
      <div className={styles.featureContainer}>
        <FeaturedServicesSlideFrontendClient
          featuredServicesData={data}
        />
      </div>
    </div>
  );
}
