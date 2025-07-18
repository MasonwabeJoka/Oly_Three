"use client";
import { useEffect, useState } from "react";
import styles from "./ProductOfferSlideFrontendClient.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Autoplay } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import useFeatureInfo from "@/store/featuresInfo";
import useCurrentSlideIndex from "@/store/currentSlide";
import ProductOffer from "../ProductOffer";
import NavButtons from "../NavButtons";
import LoadingSpinner from "../LoadingSpinner";

const ProductOfferSlideFrontendClient = ({ productData }) => {
  const [initialSlideIndex, setInitialSlideIndex] = useState(null);
  const { setIsMoreInfo } = useFeatureInfo();
  const { setCurrentSlideIndex } = useCurrentSlideIndex();

  useEffect(() => {
    setInitialSlideIndex(Math.floor(Math.random() * productData.length));
  }, [productData]);

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  if (initialSlideIndex === null) {
    return <LoadingSpinner/>;
  }

  return (
    <Swiper
      initialSlide={initialSlideIndex}
      centeredSlides={true}
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      keyboard={{
        enabled: true,
      }}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      onSlideChange={handleSlideChange}
      modules={[Keyboard, Autoplay]}
      className={styles.swiper}
    >
      {productData.map((product, index) => (
        <SwiperSlide className={styles.slideContainer} key={index}>
          <div className={styles.slide}>
            <ProductOffer
              layout={product.layout}
              path={product.path}
              image={product.image}
              title={product.title}
              description={product.description}
              cta={product.cta}
              features={product.features}
              onClick={() => setIsMoreInfo(true)}
            />
          </div>
        </SwiperSlide>
      ))}
      <div className={styles.navButtons}>
        <NavButtons />
      </div>
    </Swiper>
  );
};

export default ProductOfferSlideFrontendClient;