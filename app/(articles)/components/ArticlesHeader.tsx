"use client";
import { useEffect, useState } from "react";
import styles from "./ArticlesHeader.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import useCurrentSlideIndex from "@/store/currentSlide";
import LoadingSpinner from "@/components/LoadingSpinner";
import useBreakpointStore from "@/store/useBreakpointStore";
import HeaderContent from "./HeaderContent";
import NavButtons from "@/components/NavButtons";

const ArticlesHeader = ({ data }: { data: any }) => {
  const { isMobile, isTablet } = useBreakpointStore();
  const [initialSlideIndex, setInitialSlideIndex] = useState<number | null>(
    null,
  );
  const { setCurrentSlideIndex } = useCurrentSlideIndex();
  const services =
    data.services?.map((service: any) => ({
      ...service,
      features:
        service.features?.map((f: any) => ({
          id: f.featureId,
          feature: f.featureText,
        })) || [],
    })) || [];

  useEffect(() => {
    setInitialSlideIndex(Math.floor(Math.random() * services.length));
  }, [data]);

  const handleSlideChange = (swiper: any) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  if (initialSlideIndex === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.featureContainer}>
        <Swiper
          initialSlide={initialSlideIndex}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={30}
          effect={"fade"}
          fadeEffect={{
            crossFade: true,
          }}
          grabCursor={isMobile ? true : false}
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
                <HeaderContent
                  layout={service.layout}
                  path={service.path}
                  image={service.image}
                  title={service.title}
                  description={service.description}
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
      </div>
    </div>
  );
};

export default ArticlesHeader;
