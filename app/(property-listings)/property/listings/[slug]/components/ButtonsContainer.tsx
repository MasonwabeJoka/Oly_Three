import Button from "@/components/Button";
import styles from "./ButtonsContainer.module.scss";
import useMessageStore from "@/features/messages/store/useMessageStore";
type ButtonsContainerProps = {
  isAuction: boolean;
  placeBid: () => void;
  contactSeller?: () => void;
  buyNow?: () => void;
};
const ButtonsContainer = ({
  isAuction,
  placeBid,
  contactSeller,
  buyNow,
}: ButtonsContainerProps) => {
  const { setChats } = useMessageStore();

  return (
    <div className={styles.buttonsContainer}>
      {isAuction ? (
        <>
          <div className={`${styles.buttons} ${styles.bidContainer}`}>
            <Button
              className={styles.bidButton}
              children="Place bid"
              buttonVariant="primary"
              buttonSize="medium"


              ariaLabel="Bid Button"



              onClick={placeBid}
            />
          </div>

          <div className={`${styles.buttons} ${styles.buyContainer}`}>
            <Button
              className={styles.buyButton}
              children="Buy Now"
              buttonVariant="normal"
              buttonSize="medium"


              ariaLabel="Buy Button"



              onClick={buyNow}
            />
          </div>

          <div className={`${styles.buttons} ${styles.contactSellerContainer}`}>
            <Button
              className={styles.contactSellerBtn}
              children="Contact Seller"
              buttonVariant="normal"
              buttonSize="medium"


              ariaLabel="Contact Seller Button"



              onClick={() => setChats(true)}
            />
          </div>
        </>
      ) : (
        <>
          <div className={`${styles.buttons} ${styles.buyContainer}`}>
            <Button
              className={styles.buyButton}
              children="Buy Now"
              buttonVariant="primary"
              buttonSize="medium"


              ariaLabel="Buy Button"



              onClick={buyNow}
            />
          </div>
          <div className={`${styles.buttons} ${styles.contactSellerContainer}`}>
            <Button
              className={styles.contactSellerBtn}
              children="Contact Seller"
              buttonVariant="normal"
              buttonSize="medium"


              ariaLabel="Contact Seller Button"



              onClick={contactSeller}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ButtonsContainer;
