"use client";
import FeaturedServicesSlideFrontend from "@/components/carousels/FeaturedServicesSlideFrontend";
import FeaturedServicesSlideBackend from "@/components/carousels/FeaturedServicesSlideBackend";
import useFeatureInfo from "@/store/featuresInfo";

const FeaturedServicesSlide = () => {
  const { isMoreInfo } = useFeatureInfo();

  return (
    <>
      {isMoreInfo === false ? (
        <FeaturedServicesSlideFrontend />
      ) : (
        <FeaturedServicesSlideBackend />
      )}
    </>
  );
};

export default FeaturedServicesSlide;
