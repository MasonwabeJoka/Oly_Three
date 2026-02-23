"use client";
import styles from "./FeaturedServicesSlideBackend.module.scss";
import SlideOne from "./FeaturesMoreInfo/SlideOne";
import Button from "@/components/Buttons";
import useFeatureInfo from "@/store/featuresInfo";
import useCurrentSlideIndex from "@/store/currentSlide";
import SlideTwo from "./FeaturesMoreInfo/SlideTwo";
import SlideThree from "./FeaturesMoreInfo/SlideThree";
import SlideFour from "./FeaturesMoreInfo/SlideFour";
import SlideFive from "./FeaturesMoreInfo/SlideFive";
import Modal from "../Modal";

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
const FeaturedServicesSlideBackend = () => {
  const { isMoreInfo, setIsMoreInfo } = useFeatureInfo();

  return (
    <div className={styles.container}>
      <div className={styles.SlideDataContainer}>
        <Modal
          showModal={isMoreInfo}
          setShowModal={setIsMoreInfo}
          modalContent={<Slide />}
        />
      </div>
    </div>
  );
};

export default FeaturedServicesSlideBackend;
