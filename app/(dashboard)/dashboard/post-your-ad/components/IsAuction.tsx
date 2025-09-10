"use client";
import styles from "./IsAuction.module.scss";
import { useIsAuctionStore } from "../store/useIsAuction";
import Button from "@/components/Buttons";
import Link from "next/link";

const IsAuction = () => {
  const { isAuction, setIsAuction } = useIsAuctionStore();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Is this an auction?</h1>
      <p className={styles.description}>
        Select "Yes" if you want to run an auction for your item. Select "No" if
        you want to sell your item for a fixed price.
      </p>
      <div className={styles.buttons}>
        <Link
          href="/dashboard/post-your-ad/oly/select-category"
          className={styles.saleButtonContainer}
        >
          <Button
            className={styles.saleButton}
            buttonChildren="Sale Listing"
            buttonType="normal"
            buttonSize="large"
            name="sale-listing-btn"
            type="button"
            ariaLabel="Sale Listing Button"
            autoFocus={false}
            disabled={false}
            onClick={() => setIsAuction(false)}
          />
        </Link>
        <Link
          href="/dashboard/post-your-ad/oly/select-category"
          className={styles.auctionButtonContainer}
        >
          <Button
            className={styles.auctionButton}
            buttonChildren="Auction Listing"
            buttonType="normal"
            buttonSize="large"
            name="auction-listing-btn"
            type="button"
            ariaLabel="Auction Listing Button"
            autoFocus={false}
            disabled={false}
            onClick={() => setIsAuction(true)}
          />
        </Link>
      </div>
    </div>
  );
};

export default IsAuction;
