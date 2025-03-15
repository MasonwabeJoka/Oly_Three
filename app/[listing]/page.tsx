"use client";
import React from 'react';
import SellerDetails from "@/components/SellerDetails";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import { Ad } from "@/sanity/Types/Ad";
import { fetchAd } from "@/sanity/actions/singleAdActions";
import useSidebarStore from "@/store/useSidebarStore";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ListingImages from "@/app/[listing]/components/ListingImages";
import Modal from "@/components/Modal";
import SimilarAds from "@/components/SimilarAds";
import AdCarousel from "@/components/carousels/AdCarousel";
import { Image as ImageType } from "@/sanity/Types/Ad";
import usePaymentModalStore from "../(dashboard)/dashboard/post-your-ad/store/usePaymentModalStore";
import ProductSpecifications from "./components/ProductSpecifications";
import PaymentProcessing from "./payment/page";
import { useCart } from "./payment/store/useCart";
import MainSection from "./components/MainSection";
import Features from "./components/Features";
import ads from '@/data/adsData'

type ParamsProp = {
  params: {
    listing: string;
  };
};

const Listing = ({ params }: ParamsProp) => {
  const listing = React.use(params).listing;  // Unwrap the params
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const [showImages, setShowImages] = useState(false);
  const [isAuction, setIsAuction] = useState(true);
  const [ad, setAd] = useState<Ad | null>(null);
  const { addItem } = useCart();
  const [isClient, setIsClient] = useState(false);
  const { showPaymentModal, setShowPaymentModal } = usePaymentModalStore();

  useEffect(() => {
    setIsClient(true);
    setIsSidebarOpen(false); 
  }, []);

  useEffect(() => {
    const getAd = async () => {
      const fetchedAd = await fetchAd(listing);  // Use the unwrapped listing
      isClient && setAd(fetchedAd ? fetchedAd : null);
    };

    getAd();
  }, [isClient]);

  const aspectRatios = ad?.images.map((image: ImageType) => image.aspectRatio);

  //Todo: When I click on an image in the Gallery open the modal and show that image in the modal
  //Todo: Add map to the modal
  //Todo: Add Map, Images, and Exit tabs in the modal

  const handleBuyNow = () => {
    ad && addItem(ad);
    setShowPaymentModal(true);
  };

  return (
    <div
      className={styles.container}
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className={styles.listingContainer}>
        {!showImages ? (
          <>
             <ListingImages
              id={ad?._id}
              images={ad?.images?.slice(0, 5)}
              onClick={() => setShowImages(true)}
              aspectRatios={aspectRatios}
            />
            <div className={styles.wrapper}>
              <section className={styles.listingDetails}>
                <div className={styles.topSection}>
                  <div className={styles.sellerDetails}>
                    <SellerDetails />
                  </div>
                  <div className={styles.detailsContainer}>
                    <div className={styles.details}>
                      <MainSection ad={ad} isAuction={isAuction} onBuyNow={handleBuyNow}/>
                      <Modal
                        showModal={showPaymentModal}
                        setShowModal={setShowPaymentModal}
                        modalContent={<PaymentProcessing />}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.moreInfoContainer} ${styles.detailsContainer}`}
                >
                  {/* <h4 className={`${styles.title} ${styles.detailsTitle}`}>
                    Product Specifications
                  </h4> */}
                  {/* <ProductSpecifications ad={ad} /> */}
                  <ProductSpecifications ad={ads[0]} />
                </div>
                {/* <Features ad={ad} /> */}
                <Features ad={ads[0]} />
                <SimilarAds />
                <div style={{ height: "6rem" }}></div>
              </section>
            </div>
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

export default Listing;
