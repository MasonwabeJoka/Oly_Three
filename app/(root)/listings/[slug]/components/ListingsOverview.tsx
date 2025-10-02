import styles from "./ListingsOverview.module.scss";
import { useState, useEffect } from "react";
import { Ad } from "@/sanityTemp/Types/Ad";
import { PortableText } from "@portabletext/react";
import PriceSection from "./PriceSection";
import ButtonsContainer from "./ButtonsContainer";
import useMessageStore from "@/features/messages/store/useMessageStore";
import Chat from "@/features/messages/components/Chat";
import { useSingInCheckHook } from "@/hooks/useSingInCheckHook";
import useAuctionModalStore from "../auction/store/useAuctionModalStore";
import usePaymentModalStore from "../store/usePaymentModalStore";
import { ListingQueryResult } from "@/sanity/types";

interface Props {
   listing: ListingQueryResult;
}

const ListingOverview = ({ listing }: Props) => {
  const { chats, setChats } = useMessageStore();
  const [isAuction, setIsAuction] = useState(false);
  const { showAuctionModal, setShowAuctionModal } = useAuctionModalStore();
  const { showPaymentModal, setShowPaymentModal } = usePaymentModalStore();

  const { signInAndReturnUser, isSignedIn, isLoaded } = useSingInCheckHook({
    actionId: "openChat",
    queryParam: "openChat",
    onAction: () => {
      if (!chats) {
        setChats(true);
      }
    },
  });

  useEffect(() => {
    if (!isLoaded || isSignedIn || !chats) return;
    signInAndReturnUser();
  }, [chats, isLoaded, isSignedIn, signInAndReturnUser]);

  const handleContactSeller = () => {
    if (!isLoaded) return;
    if (!chats) {
      setChats(true);
    }
    signInAndReturnUser();
  };

  const buyNowHandler = () => {
    if (!isLoaded) return;
    if (isSignedIn && !showPaymentModal) {
      setShowPaymentModal(true);
    }
    signInAndReturnUser();
  };

  return (
    <>
      {chats ? (
        <div className={styles.chatContainer}>{isSignedIn && <Chat />}</div>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.title}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
          </h1>
          <div className={styles.priceSection}>
            <PriceSection listing={listing} isAuction={isAuction} />
          </div>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
            pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
            tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
            Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
            hendrerit semper vel class aptent taciti sociosqu. Ad litora
            torquent per conubia nostra inceptos himenaeos.
          </p>
          <div className={styles.buttonsContainer}>
            <ButtonsContainer
              isAuction={isAuction}
              placeBid={() => setShowAuctionModal(true)}
              contactSeller={handleContactSeller}
              buyNow={buyNowHandler}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ListingOverview;
