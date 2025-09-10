import React from "react";
import styles from "./SiteSelection.module.scss";
import ClassifiedLink from "@/components/cards/ClassifiedLink";
import Link from "next/link";

export const sites = [
  {
    id: 1,
    text: "Oly",
    image: "/bear.jpg",
    link: "/dashboard/post-your-ad/listing-type",
  },
  {
    id: 2,
    text: "Oly Properties",
    image: "/properties.jpg",
    link: "/dashboard/post-your-ad/oly-properties/select-category",
  },
  {
    id: 3,
    text: "Oly Auto",
    image: "/auto.jpg",
    link: "/dashboard/post-your-ad/oly-auto/select-category",
  },
  {
    id: 4,
    text: "Oly Hiring",
    image: "/hiring.jpg",
    link: "/dashboard/post-your-ad/oly-hiring/select-category",
  },
  {
    id: 5,
    text: "Oly Services",
    image: "/services.jpg",
    link: "/dashboard/post-your-ad/oly-services/select-category",
  },
];



const SiteSelection = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Site</h1>

      <div className={styles.sitesContainer}>
        {sites.map((site) => (
          <li key={site.id}>
            <Link href={site.link}>
              <ClassifiedLink text={site.text} image={site.image} />
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default SiteSelection;
