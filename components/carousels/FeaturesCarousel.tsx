"use client";
import styles from "./FeaturesCarousel.module.scss";
import { useState } from "react";
import FeaturedCarouselFrontend from "@/components/carousels/FeatureCarouselFrontend";
import FeaturedCarouselBackend from "@/components/carousels/FeaturesCarouselBackend";
import useFeatureInfo  from "@/store/featuresInfo";

const FeaturesCarousel = () => {
  const { isMoreInfo } = useFeatureInfo();
  

  return (
    <>
    {
      isMoreInfo === false ? <FeaturedCarouselFrontend/> : <FeaturedCarouselBackend/>
    }
     
    </>
  );
};

export default FeaturesCarousel;
