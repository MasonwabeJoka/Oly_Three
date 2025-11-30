import Button from "@/components/Buttons";
import styles from "./ButtonsContainer.module.scss";
// import useMessageStore from "@/features/messages/store/useMessageStore";
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
  const {setChats} = useMessageStore();

  return (
    <div className={styles.buttonsContainer}>
      {isAuction ? (
        <>
          <div className={`${styles.buttons} ${styles.bidContainer}`}>
            <Button
              className={styles.bidButton}
              buttonChildren="Place bid"
              buttonType="primary"
              buttonSize="medium"
              name="bid-button"
              type="button"
              ariaLabel="Bid Button"
              autoFocus={false}
              disabled={false}
              ariaHidden={false}
              onClick={placeBid}
            />
          </div>

          <div className={`${styles.buttons} ${styles.buyContainer}`}>
            <Button
              className={styles.buyButton}
              buttonChildren="Buy Now"
              buttonType="normal"
              buttonSize="medium"
              name="buy-btn"
              type="button"
              ariaLabel="Buy Button"
              autoFocus={false}
              disabled={false}
              ariaHidden={false}
              onClick={buyNow}
            />
          </div>

          <div className={`${styles.buttons} ${styles.contactSellerContainer}`}>
            <Button
              className={styles.contactSellerBtn}
              buttonChildren="Contact Seller"
              buttonType="normal"
              buttonSize="medium"
              name="contact-seller-btn"
              type="button"
              ariaLabel="Contact Seller Button"
              autoFocus={false}
              disabled={false}
              ariaHidden={false}
              onClick={() => setChats(true)}
            />
          </div>
        </>
      ) : (
        <>
          <div className={`${styles.buttons} ${styles.buyContainer}`}>
            <Button
              className={styles.buyButton}
              buttonChildren="Buy Now"
              buttonType="primary"
              buttonSize="medium"
              name="buy-btn"
              type="button"
              ariaLabel="Buy Button"
              autoFocus={false}
              disabled={false}
              ariaHidden={false}
              onClick={buyNow}
            />
          </div>
          <div className={`${styles.buttons} ${styles.contactSellerContainer}`}>
            <Button
              className={styles.contactSellerBtn}
              buttonChildren="Contact Seller"
              buttonType="normal"
              buttonSize="medium"
              name="contact-seller-btn"
              type="button"
              ariaLabel="Contact Seller Button"
              autoFocus={false}
              disabled={false}
              ariaHidden={false}
              onClick={contactSeller}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ButtonsContainer;
