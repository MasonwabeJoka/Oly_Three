"use client";
import { useEffect, useState } from "react";
import styles from "./ProductOfferSlideFrontend.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { featuresData } from "@/data/FeaturesData";
import { Keyboard, Autoplay } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import useFeatureInfo from "@/store/featuresInfo";
import useCurrentSlideIndex from "@/store/currentSlide";
import ProductOffer from "../ProductOffer";
import { ProductOfferData } from "@/data/ProductOfferData";
import NavButtons from "../NavButtons";
type ProductOfferProps = {
  id: number;
  layout: "textLeft" | "textRight";
  path: string;
  image: string;
  title: string;
  description: string;
  cta: string;
  features: {
    id: number;
    feature: string;
  }[];
};

const ProductOfferSlideFrontend = () => {
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
          {ProductOfferData.map((product: ProductOfferProps, index: number) => {
            return (
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
                    onClick={()=> setIsMoreInfo(true)}
                  />
                </div>
              </SwiperSlide>
            );
          })}
{/* <NavButtonRight size="standard"/> */}
          <div className={styles.navButtons}>
            <NavButtons />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default ProductOfferSlideFrontend;
