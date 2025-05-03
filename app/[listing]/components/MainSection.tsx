import { useState } from "react";
import styles from "./MainSection.module.scss";
import { Ad } from "@/sanity/Types/Ad";
import { PortableText } from "@portabletext/react";
import PriceSection from "./PriceSection";
import ButtonsContainer from "./ButtonsContainer";

interface MainSectionProps {
  ad: Ad | null;
  isAuction: boolean;
  onBuyNow: () => void;
}

const Main = ({ ad, isAuction, onBuyNow }: MainSectionProps) => {
  const [currentlyDisplayed, setCurrentlyDisplayed] = useState("MainSection");
  const [isChat, setIsChat] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {/* {ad?.title && ad?.title.length > 96
          ? ad?.title.slice(0, 96)
          : ad?.title} */}
          Lorem ipsum dolor sit amet consectetur adipiscing elit.
      </h1>
      <div className={styles.priceSection}>
        <PriceSection ad={ad} isAuction={isAuction} />
      </div>
      <p className={styles.description}>
        {/* {ad && <PortableText value={ad.description as any} />} */}
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
      </p>
      <div className={styles.buttonsContainer}>
        <ButtonsContainer
          isAuction={isAuction}
          placeBid={() => setCurrentlyDisplayed("Payment")}
          contactSeller={() => setCurrentlyDisplayed("Chat")}
          buyNow={onBuyNow}
        />
      </div>


    </div>
  );
};

const MainSection =  ({ ad, isAuction, onBuyNow }: MainSectionProps) => {
  {
    isChat ? (
      <div>Chat</div>
    ) : (
      <Main ad={ad} isAuction={isAuction} onBuyNow={onBuyNow} />
    );
  }
return  <>  
    {<Main ad={ad} isAuction={isAuction} onBuyNow={onBuyNow} /> }
  </>
}


export default MainSection;