"use client";
import styles from "./ProductOfferBackend.module.scss";
import Button from "@/components/Buttons";
import useFeatureInfo from "@/store/featuresInfo";
import Modal from "./Modal";

type Props = {
  content: JSX.Element;
};

const ProductOfferSlideBackend = ({ content }: Props) => {
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

export default ProductOfferSlideBackend;
