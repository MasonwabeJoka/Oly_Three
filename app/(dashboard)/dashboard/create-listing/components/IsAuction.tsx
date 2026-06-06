"use client";
import styles from "./IsAuction.module.scss";
import { useIsAuctionStore } from "../store/useIsAuction";
import Button from "@/components/Buttons";
import Link from "next/link";

interface isAuctionProps {
  title: string;
  description: string;
  site: string;
}

const IsAuction = ({ title, description, site }: isAuctionProps) => {
  const { setIsAuction } = useIsAuctionStore();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.buttons}>
        <Link
          href={`/dashboard/create-listing/${site}/select-category`}
          className={styles.auctionButtonContainer}
        >
          <Button
            className={styles.saleButton}
            buttonChildren="Auction"
            buttonType="primary"
            buttonSize="large"
            name="auction-listing-btn"
            type="button"
            ariaLabel="Auction Listing Button"
            autoFocus={false}
            disabled={false}
            onClick={() => setIsAuction(true)}
            dashboard
          />
        </Link>
        <Link
          href={`/dashboard/create-listing/${site}/select-category`}
          className={styles.saleButtonContainer}
        >
          <Button
            className={styles.auctionButton}
            buttonChildren="Fixed Price"
            buttonType="normal"
            buttonSize="large"
            name="fixed-price-listing-btn"
            type="button"
            ariaLabel="Fixed Price Listing Button"
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
