"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./SiteSelection.module.scss";

interface ListingTypeSelectionProps {
  currentSite: "oly" | "oly-auto";
}

const ListingTypeSelection: React.FC<ListingTypeSelectionProps> = ({
  currentSite,
}) => {
  const router = useRouter();

  const handleListingTypeSelection = (listingType: "sale" | "auction") => {
    router.push(`/dashboard/post-your-ad/${currentSite}/${listingType}/select-category`);
  };

  const handleBack = () => {
    router.push("/dashboard/post-your-ad/");
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.backButton}>
        ← Back to Site Selection
      </button>
      
      <h1 className={styles.title}>Choose Listing Type</h1>
      <p>Select how you want to sell your item:</p>

      <div className={styles.sitesContainer}>
        <div onClick={() => handleListingTypeSelection("sale")}>
          <div className={styles.listingTypeCard}>
            <h3>Fixed Price Sale</h3>
            <p>Set a fixed price for your item</p>
          </div>
        </div>
        
        <div onClick={() => handleListingTypeSelection("auction")}>
          <div className={styles.listingTypeCard}>
            <h3>Auction</h3>
            <p>Let buyers bid on your item</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingTypeSelection;