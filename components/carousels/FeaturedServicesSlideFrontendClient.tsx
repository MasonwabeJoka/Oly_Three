"use client";
import { useEffect, useState } from "react";
import styles from "./FeaturedServicesSlideFrontendClient.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css/effect-fade";
import useFeatureInfo from "@/store/featuresInfo";
import useCurrentSlideIndex from "@/store/currentSlide";
import FeaturedServices from "../FeaturedServices";
import NavButtons from "../NavButtons";
import LoadingSpinner from "../LoadingSpinner";
import useBreakpointStore from "@/store/useBreakpointStore";

const FeaturedServicesSlideFrontendClient = ({ featuredServicesData }) => {
  const { isMobile, isTablet } = useBreakpointStore();
  const [initialSlideIndex, setInitialSlideIndex] = useState(null);
  const { setIsMoreInfo } = useFeatureInfo();
  const { setCurrentSlideIndex } = useCurrentSlideIndex();
  const services = featuredServicesData.services?.map(service => ({
    ...service,
    features: service.features?.map(f => ({ id: f.featureId, feature: f.featureText })) || []
  })) || [];

  useEffect(() => {
    setInitialSlideIndex(Math.floor(Math.random() * services.length));
  }, [featuredServicesData]);

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
      grabCursor={isMobile ? true: false}
      pagination={isTablet ? { clickable: true } : false}
      loop={true}
      keyboard={{
        enabled: true,
      }}
      autoplay={{
        delay: 8000,
        disableOnInteraction: true,
      }}
      onSlideChange={handleSlideChange}
      modules={[Keyboard, Autoplay, EffectFade, Pagination]}
      className={styles.swiper}
    >
      {services.map((service: any, index: number) => (
        <SwiperSlide className={styles.slideContainer} key={index}>
          <div className={styles.slide}>
            <FeaturedServices
              layout={service.layout}
              path={service.path}
              image={service.image}
              title={service.title}
              description={service.description}
              cta={service.cta}
              features={service.features}
              onClick={() => setIsMoreInfo(true)}
            />
          </div>
        </SwiperSlide>
      ))}
      {!isMobile && !isTablet && (
        <div className={styles.navButtons}>
          <NavButtons />
        </div>
      )}
    </Swiper>
  );
};

export default FeaturedServicesSlideFrontendClient;
