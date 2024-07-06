"use client";
import { useEffect, useState } from "react";
import styles from "./FeaturesCarousel.module.scss";
import Image from "next/image";
import Button from "@/components/Buttons";
import { Swiper, SwiperSlide } from "swiper/react";
import { featuresData } from "@/data/FeaturesData";
import { Keyboard, Autoplay } from "swiper/modules";
import NavButtonRight from "../navButtonRight";
import NavButtonLeft from "../navButtonLeft";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import useFeatureInfo from "@/store/featuresInfo";
import useCurrentSlideIndex from "@/store/currentSlide";
type Feature = {
  id: number;
  featureText: string;
  featureImage: string;
};

const FeaturesCarousel = () => {
  const [initialSlideIndex, setInitialSlideIndex] = useState<number | null>(
    null
  );
  const { setIsMoreInfo } = useFeatureInfo();
  const { setCurrentSlideIndex } = useCurrentSlideIndex();

  useEffect(() => {
    setInitialSlideIndex(Math.floor(Math.random() * featuresData.length));
  }, []);

  const handleSlideChange = (swiper: any) => {
    setCurrentSlideIndex(swiper.realIndex);
  };

  if (initialSlideIndex === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.featureContainer}>
        <Swiper
          initialSlide={initialSlideIndex}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          keyboard={{
            enabled: true,
          }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: true,
          }}
          onSlideChange={handleSlideChange}
          modules={[Keyboard, Autoplay]}
          className={styles.swiper}
        >
          {featuresData.map((feature: Feature, index: number) => (
            <SwiperSlide className={styles.slideContainer} key={index}>
              <div className={styles.slide}>
                <div className={styles.textContainer}>
                  <h2 className={styles.text}>{feature.featureText}</h2>
                  <div className={styles.buttonContainer}>
                    <Button
                      className={styles.button}
                      buttonChildren="More Information"
                      buttonType="normal"
                      buttonSize="medium"
                      name="more-info-btn"
                      type="button"
                      ariaLabel="More Information Button"
                      autoFocus={false}
                      disabled={false}
                      onClick={() => setIsMoreInfo(true)}
                    />
                  </div>
                </div>

                <div className={styles.illustrationContainer}>
                  <Image
                    className={styles.illustration}
                    src="/icons/heart-hover.svg"
                    width={400}
                    height={400}
                    alt="alt"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className={styles.leftButtonContainer}>
            <NavButtonLeft size="standard" />
          </div>
          <div className={styles.rightButtonContainer}>
            <NavButtonRight size="standard" />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturesCarousel;
