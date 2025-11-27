"use client";
import React from "react";
import styles from "./SiteSelection.module.scss";
import ClassifiedLink from "@/components/cards/ClassifiedLink";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import NavButtons from "@/components/NavButtons";

export const sites = [
  {
    id: 1,
    text: "Oly",
    image: "/bear.jpg",
    link: "/dashboard/create-listing/oly/listing-type",
  },
  {
    id: 2,
    text: "Oly Properties",
    image: "/properties.jpg",
    link: "/dashboard/create-listing/oly-properties/select-category",
  },
  {
    id: 3,
    text: "Oly Auto",
    image: "/auto.jpg",
    link: "/dashboard/create-listing/oly-auto/listing-type",
  },
    {
    id: 4,
    text: "Oly Services",
    image: "/services.jpg",
    link: "/dashboard/create-listing/oly-services/select-category",
  },
  {
    id: 5,
    text: "Oly Hiring",
    image: "/hiring.jpg",
    link: "/dashboard/create-listing/oly-hiring/select-category",
  },

];

const SiteSelection = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select Site</h1>
      <Swiper
        className={styles.sitesContainer}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          1199: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
          1439: {
            slidesPerView: 6,
            spaceBetween: 32,
          },
        }}
      >
        {sites.map((site) => (
          <SwiperSlide key={site.id}>
            <Link href={site.link}>
              <ClassifiedLink text={site.text} image={site.image} />
            </Link>
          </SwiperSlide>
        ))}

        <div className={styles.navButtons}>
          <NavButtons />
        </div>
      </Swiper>
    </div>
  );
};

export default SiteSelection;
