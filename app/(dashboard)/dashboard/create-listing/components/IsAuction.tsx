"use client";
import styles from "./IsAuction.module.scss";
import { useIsAuctionStore } from "../store/useIsAuction";
import Button from "@/components/Buttons";
import Link from "next/link";

const IsAuction = () => {
  const { setIsAuction } = useIsAuctionStore();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Want to auction your item?
</h1>
      <p className={styles.description}>
       Choose 'Yes' to auction your item or 'No' to sell at a fixed price.
      </p>
      <div className={styles.buttons}>
        <Link
          href="/dashboard/create-listing/oly/select-category"
          className={styles.auctionButtonContainer}
        >
          <Button
            className={styles.saleButton}
            buttonChildren="Yes"
            buttonType="primary"
            buttonSize="large"
            name="sale-listing-btn"
            type="button"
            ariaLabel="Sale Listing Button"
            autoFocus={false}
            disabled={false}
            onClick={() => setIsAuction(true)}
            dashboard
          />
        </Link>
        <Link
          href="/dashboard/create-listing/oly/select-category"
          className={styles.saleButtonContainer}
        >
          <Button
            className={styles.auctionButton}
            buttonChildren="No"
            buttonType="normal"
            buttonSize="large"
            name="auction-listing-btn"
            type="button"
            ariaLabel="Auction Listing Button"
            autoFocus={false}
            disabled={false}
            onClick={() => setIsAuction(false)}
            dashboard
          />
        </Link>
      </div>
    </div>
  );
};

export default IsAuction;
