"use client";
import React from "react";
import styles from "./MoreFromOly.module.scss";
import ClassifiedLink from "./cards/ClassifiedLink";
import { classifieds } from "../data/classifiedLinks";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { moreFromOlyQueryOptions } from "@/sanity/lib/crud/moreFromOly/queryOptions";

// Types
interface SanityOlySite {
  _id: string;
  _type: string;
  path: string;
  imageUrl: string;
  title?: string;
  siteName: string;
}

const MoreFromOly = () => {
  const { data } = useSuspenseQuery(moreFromOlyQueryOptions);

  const sites = data?.sites || [];

  if (!data) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>More from Oly</h2>

      <ul className={styles.classifieds}>
        {sites.map((site: SanityOlySite, index: number) => (
          <li key={site?._id || `fallback-${index}`}>
            <Link href={site.path} target="_blank" rel="noopener noreferrer">
              <ClassifiedLink text={site?.siteName} image={site?.imageUrl} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoreFromOly;
