"use client";
import ProductOfferSlideFrontend from "@/components/carousels/ProductOfferSlideFrontend";
import ProductOfferSlideBackend from "@/components/carousels/ProductOfferSlideBackend";
import useFeatureInfo from "@/store/featuresInfo";

const ProductOfferSlide = () => {
  const { isMoreInfo } = useFeatureInfo();

  return (
    <>
      {isMoreInfo === false ? (
        <ProductOfferSlideFrontend />
      ) : (
        <ProductOfferSlideBackend />
      )}
    </>
  );
};

export default ProductOfferSlide;
