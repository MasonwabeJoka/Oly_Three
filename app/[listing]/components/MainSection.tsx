import { useState } from "react";
import styles from "../styles.module.scss";
import { Ad } from "@/sanity/Types/Ad";
import { PortableText } from "@portabletext/react";
import PriceSection from "./PriceSection";
import ButtonsContainer from "./ButtonsContainer";

interface MainSectionProps {
  ad: Ad | null;
  isAuction: boolean;
  onBuyNow: () => void;
}

const MainSection = ({ ad, isAuction, onBuyNow }: MainSectionProps) => {
  const [currentlyDisplayed, setCurrentlyDisplayed] = useState("MainSection");

  return (
    <>
      <h1 className={styles.title}>
        {/* {ad?.title && ad?.title.length > 96
          ? ad?.title.slice(0, 96)
          : ad?.title} */}
          Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </h1>
      <div className={styles.priceSection}>
        <PriceSection ad={ad} isAuction={isAuction} />
      </div>
      <div className={styles.buttonsContainer}>
        <ButtonsContainer
          isAuction={isAuction}
          placeBid={() => setCurrentlyDisplayed("Payment")}
          contactSeller={() => setCurrentlyDisplayed("Chat")}
          buyNow={onBuyNow}
        />
      </div>

      <div className={styles.description}>
        {ad && <PortableText value={ad.description as any} />}
      </div>
    </>
  );
};

export default MainSection;