import styles from "./Features.module.scss";
import useIsMobileStore from "@/store/useMobileStore";
import MobileCarouselOne from "@/components/carousels/MobileCarouselOne";
import DesktopCarouselOne from "@/components/carousels/DesktopCarouselOne";
import { slides } from "@/data/SlidesData";
import useTitleStore from "@/store/titleStore";
import FeaturesCarousel from "./carousels/FeaturedServicesSlide";

const Features = () => {
  const initialValue = Math.floor(Math.random() * slides.length);
  const Title = useTitleStore((state) => state.Title);
  const isMobile = useIsMobileStore((state) => state.isMobile);

  return (
    <div className={styles.container}>
      {/* <Title className={styles.title}>OLY Advantage</Title> */}
      <div className={styles.carousel}>
        {isMobile ? (
          <MobileCarouselOne
            src={(slides as any).src}
            mobileSrc={(slides as any).mobileSrc}
            slideName={(slides as any).slideName}
            slideTitle={(slides as any).slideTitle}
            data={slides as any}
          />
        ) : (
          <FeaturesCarousel />
          // <DesktopCarouselOne
          //   src={slides.src}
          //   mobileSrc={slides.mobileSrc}
          //   slideName={slides.slideName}
          //   slideTitle={slides.slideTitle}
          //   currentValue={initialValue}
          //   data={slides}
          // />
        )}
      </div>
    </div>
  );
};

export default Features;
