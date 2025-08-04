"use client";
import { useEffect, useState } from "react";
import styles from "./FeaturedServicesSlideFrontendClient.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Autoplay, EffectFade } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import 'swiper/css/effect-fade';
import useFeatureInfo from "@/store/featuresInfo";
import useCurrentSlideIndex from "@/store/currentSlide";
import FeaturedServices from "../FeaturedServices";
import NavButtons from "../NavButtons";
import LoadingSpinner from "../LoadingSpinner";

const FeaturedServicesSlideFrontendClient = ({ productData }) => {
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
    return <LoadingSpinner />;
  }

  return (
    <Swiper
      initialSlide={initialSlideIndex}
      centeredSlides={true}
      slidesPerView={1}
      spaceBetween={30}
      effect={"fade"}
      fadeEffect={{
        crossFade: true,
      }}
      loop={true}
      keyboard={{
        enabled: true,
      }}
      autoplay={{
        delay: 8000,
        disableOnInteraction: true,
      }}
      onSlideChange={handleSlideChange}
      modules={[Keyboard, Autoplay, EffectFade]}
      className={styles.swiper}
    >
      {productData.map((product, index) => (
        <SwiperSlide className={styles.slideContainer} key={index}>
          <div className={styles.slide}>
            <FeaturedServices
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

export default FeaturedServicesSlideFrontendClient;
