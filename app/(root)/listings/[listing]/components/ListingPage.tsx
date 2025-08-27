"use client";
import React, { useState, useRef } from "react";
import { Ad, Image as ImageType } from "@/sanityTemp/Types/Ad";
import styles from "./ListingPage.module.scss";
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

type ListingProps = {
  ad: Ad | null;
};

const ListingPage: React.FC<ListingProps> = ({ ad }) => {
  const [showImages, setShowImages] = useState(false);
  const [isAuction, setIsAuction] = useState(true);
  const { showPaymentModal, setShowPaymentModal } = usePaymentModalStore();
  const { showAuctionModal, setShowAuctionModal } = useAuctionModalStore();
  const sellerDetailsRef = useRef<HTMLDivElement>(null);
  const similarAdsRef = useRef<HTMLDivElement>(null);

  const tempImages = multipleImages.map((item) => item.images);

  return (
    <div className={styles.container}>
      <div className={styles.listingContainer}>
        {!showImages ? (
          <>
            <div className={styles.listingImagesContainer}>
              <GallerySection />
            </div>
            <section className={styles.listingDetails}>
              <div className={styles.mainSectionContainer}>
                <div ref={sellerDetailsRef} className={styles.sellerDetails}>
                  <SellerDetailsContainer />
                </div>
                <div className={styles.mainSectionContainer}>
                  <MainSection ad={ad} />
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
                  Sponsored
                </h4>
                <ListingsCollage
                  category="all"
                  listings={listings}
                  // images={tempImages}
                  isDeletable={false}
                  isDashboard={false}
                  limit={4}
                  page={1}
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
                ad && (
                  <AdCarousel
                    images={ad.images}
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

export default ListingPage;
