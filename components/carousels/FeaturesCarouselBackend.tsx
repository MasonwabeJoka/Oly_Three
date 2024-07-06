"use client";
import styles from "./FeaturesCarouselBackend.module.scss";
import SlideOne from "./FeaturesMoreInfo/SlideOne";
import Button from "@/components/Buttons";
import useFeatureInfo from "@/store/featuresInfo";
import useCurrentSlideIndex from "@/store/currentSlide";
import SlideTwo from "./FeaturesMoreInfo/SlideTwo";
import SlideThree from "./FeaturesMoreInfo/SlideThree";
import SlideFour from "./FeaturesMoreInfo/SlideFour";
import SlideFive from "./FeaturesMoreInfo/SlideFive";



const Slide = () => {
  const { currentSlideIndex } = useCurrentSlideIndex();

  switch (currentSlideIndex) {
    case 0:
      return <SlideOne />;
    case 1:
      return <SlideTwo />;
    case 2:
      return <SlideThree />;
    case 3:
      return <SlideFour />;
    case 4:
      return <SlideFive />;
    default:
      return null; 
  }
};
const FeaturesCarouselFrontend = () => {
  const { setIsMoreInfo } = useFeatureInfo();
  
  return (
    <div className={styles.container}>
      <div className={styles.SlideDataContainer}>
        <Slide/>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          buttonChildren="Back"
          buttonType="normal"
          buttonSize="medium"
          name="back-btn"
          type="button"
          ariaLabel="Back Button"
          autoFocus={false}
          disabled={false}
          onClick={() => setIsMoreInfo(false)}
        />
      </div>
    </div>
  );
};

export default FeaturesCarouselFrontend;
