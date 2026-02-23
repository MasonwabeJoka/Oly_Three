import styles from "./ListingsOverview.module.scss";
import { useState, useEffect } from "react";
import { Ad } from "@/sanityTemp/Types/Ad";
import { PortableText } from "@portabletext/react";
import PriceSection from "./PriceSection";
import ButtonsContainer from "./ButtonsContainer";
import useMessageStore from "@/features/messages/store/useMessageStore";
// import Chat from "@/features/messages/components/Chat";
import { useSingInCheckHook } from "@/hooks/useSingInCheckHook";
import useAuctionModalStore from "../auction/store/useAuctionModalStore";
import usePaymentModalStore from "../store/usePaymentModalStore";
import { ListingQueryResult } from "@/sanity/types";

interface Props {
  listing: ListingQueryResult;
}

const ListingOverview = ({ listing }: Props) => {
  // const { chats, setChats } = useMessageStore();
  const chats = false; // Placeholder
  const [isAuction, setIsAuction] = useState(false);
  const { showAuctionModal, setShowAuctionModal } = useAuctionModalStore();
  const { showPaymentModal, setShowPaymentModal } = usePaymentModalStore();

  const { signInAndReturnUser, isSignedIn, isLoaded } = useSingInCheckHook({
    actionId: "openChat",
    queryParam: "openChat",
    onAction: () => {
      if (!chats) {
        // setChats(true);
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
      // setChats(true);
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
        <div className={styles.chatContainer}>
          {isSignedIn && null /* <Chat /> */}
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.priceSection}>
              <PriceSection listing={listing} isAuction={isAuction} />
            </div>

            <div className={styles.buttonsContainer}>
              <ButtonsContainer
                isAuction={isAuction}
                placeBid={() => setShowAuctionModal(true)}
                contactSeller={handleContactSeller}
                buyNow={buyNowHandler}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingOverview;
