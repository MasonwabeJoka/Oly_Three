"use client";
import styles from "./FeaturedServicesBackend.module.scss";
import Button from "@/components/Buttons";
import useFeatureInfo from "@/store/featuresInfo";
import Modal from "./Modal";

type Props = {
  content: JSX.Element;
};

const FeaturedServicesSlideBackend = ({ content }: Props) => {
  const { isMoreInfo, setIsMoreInfo } = useFeatureInfo();

  return (
    <div className={styles.container}>
      <div className={styles.SlideDataContainer}>
        <Modal
          showModal={isMoreInfo}
          setShowModal={setIsMoreInfo}
          modalContent={content}
        />
      </div>
    </div>
  );
};

export default FeaturedServicesSlideBackend;
