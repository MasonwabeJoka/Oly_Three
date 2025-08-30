"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Listing.module.scss";
import Modal from "@/components/Modal";
import AdCarousel from "@/components/carousels/AdCarousel";
import { listingDetails } from "@/data/listingDetails";
import ListingsCollage from "@/components/ListingsCollage";
import multipleImages from "@/data/multipleImages";
import usePaymentModalStore from "../store/usePaymentModalStore";
import MainSection from "./MainSection";
import useAuctionModalStore from "../auction/store/useAuctionModalStore";
import SellerDetailsContainer from "./SellerDetailsContainer";
import ListingDetails from "./ListingDetails";
import { usePathname } from "next/navigation";
import GallerySection from "./GallerySection";
import { ListingQueryResult } from "@/sanity/types";

type ListingProps = {
  listing: ListingQueryResult;
  similarListings: any;
};

const Listing: React.FC<ListingProps> = ({ listing, similarListings }) => {
  const [showImages, setShowImages] = useState(false);
  const [isAuction, setIsAuction] = useState(true);
  const { showPaymentModal, setShowPaymentModal } = usePaymentModalStore();
  const { showAuctionModal, setShowAuctionModal } = useAuctionModalStore();
  const sellerDetailsRef = useRef<HTMLDivElement>(null);
  const similarAdsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); 
  const [isClient, setIsClient] = useState(false);

  const { images } = listing;

  console.log("similarListings", similarListings);
  useEffect(() => {
    setIsClient(true);
  }, []);



  useEffect(() => {
    if (isClient) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, isClient]);

  if (!isClient) {
    return null;
  }
   
  return (
    <div className={styles.container}>
      <div className={styles.listingContainer}>
        {!showImages ? (
          <>
            <div className={styles.listingImagesContainer}>
              <GallerySection images={images}/>
            </div>
            <section className={styles.listingDetails}>
              <div className={styles.mainSectionContainer}>
                <div ref={sellerDetailsRef} className={styles.sellerDetails}>
                  <SellerDetailsContainer />
                </div>
                <div className={styles.mainSectionContainer}>
                  <MainSection listing={listing} />
                </div>
              </div>
              <div
                className={`${styles.productSpecsContainer} ${styles.detailsContainer}`}
              >
                <h4 className={styles.title}>Product Specifications</h4>
                <ListingDetails details={listingDetails} />
              </div>
              <div
                className={`${styles.featuresContainer} ${styles.detailsContainer}`}
              >
                <h4 className={styles.title}>Features</h4>
                <ListingDetails details={listingDetails} />
              </div>
              <div ref={similarAdsRef} className={styles.similarAdsContainer}>
                <h4 className={`${styles.title} ${styles.similarAdsTitle}`}>
                  Similar Listings
                </h4>
                <ListingsCollage
                  category="all"
                  listings={similarListings}
                  isDeletable={false}
                  isDashboard={false}
                  sortBy="postedOn"
                  sortOrder="desc"
                />
              </div>
              <div style={{ height: "6rem" }}></div>
            </section>
          </>
        ) : (
          <div className={styles.allImagesContainer}>
            <Modal
              showModal={showImages}
              setShowModal={setShowImages}
              modalContent={
                listing && (
                  <AdCarousel
                    images={listing.images}
                    onClick={() => showImages && setShowImages(false)}
                  />
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;
