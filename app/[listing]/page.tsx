"use client";
import React from "react";
import SellerDetails from "@/components/SellerDetails";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import { Ad } from "@/sanity/Types/Ad";
import { fetchAd } from "@/sanity/actions/singleAdActions";
import useSidebarStore from "@/store/useSidebarStore";
import { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import ListingImages from "@/app/[listing]/components/ListingImages";
import Modal from "@/components/Modal";
import SimilarAds from "@/components/SimilarAds";
import AdCarousel from "@/components/carousels/AdCarousel";
import { Image as ImageType } from "@/sanity/Types/Ad";
import usePaymentModalStore from "../(dashboard)/dashboard/post-your-ad/store/usePaymentModalStore";
import ProductSpecifications from "./components/ListingSpecifications";
import PaymentProcessing from "./payment/page";
import { useCart } from "./payment/store/useCart";
import MainSection from "./components/MainSection";
import Features from "./components/ListingFeatures";
import ads from "@/data/adsData";
import Avatar from "@/components/Avatars";

type ParamsProp = {
  params: {
    listing: string;
  };
};

const Listing = ({ params }: ParamsProp) => {
  const listing = React.use(params).listing; // Unwrap the params
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const [showImages, setShowImages] = useState(false);
  const [isAuction, setIsAuction] = useState(true);
  const [ad, setAd] = useState<Ad | null>(null);
  const { addItem } = useCart();
  const [isClient, setIsClient] = useState(false);
  const { showPaymentModal, setShowPaymentModal } = usePaymentModalStore();
  const sellerDetailsRef = useRef<HTMLDivElement>(null);
  const similarAdsRef = useRef<HTMLDivElement>(null);
  const [isCentered, setIsCentered] = useState(false);
  const [isSimilarAdsVisible, setIsSimilarAdsVisible] = useState(false);

  useEffect(() => {
    const checkIfCentered = () => {
      if (sellerDetailsRef.current) {
        const rect = sellerDetailsRef.current.getBoundingClientRect();
        const sellerDetailsMidpoint = rect.top + rect.height / 2;
        const viewportMidpoint = window.innerHeight / 2;
        // Allow a small tolerance (e.g., 5 pixels) to account for subpixel rendering
        const tolerance = 5;
        setIsCentered(Math.abs(sellerDetailsMidpoint - viewportMidpoint) <= tolerance);
      }
    };

    // Check on mount and when scrolling
    checkIfCentered();
    window.addEventListener('scroll', checkIfCentered);
    window.addEventListener('resize', checkIfCentered);

    // Cleanup listeners
    return () => {
      window.removeEventListener('scroll', checkIfCentered);
      window.removeEventListener('resize', checkIfCentered);
    };
  }, []);

  useEffect(() => {
    const checkIfSimilarAdsDivIsVisible = () => {
      if (similarAdsRef.current) {
        const similarAdsDiv = similarAdsRef.current.getBoundingClientRect();
        const isVisible = similarAdsDiv.top >= 0 && similarAdsDiv.top <= window.innerHeight;
        setIsSimilarAdsVisible(isVisible);
      }
    };

    // Check on mount, scroll, and resize
    checkIfSimilarAdsDivIsVisible();
    window.addEventListener('scroll', checkIfSimilarAdsDivIsVisible);
    window.addEventListener('resize', checkIfSimilarAdsDivIsVisible);

    // Cleanup listeners
    return () => {
      window.removeEventListener('scroll', checkIfSimilarAdsDivIsVisible);
      window.removeEventListener('resize', checkIfSimilarAdsDivIsVisible);
    };
  }, []);


  useEffect(() => {
    setIsClient(true);
    setIsSidebarOpen(false);
  }, []);




  useEffect(() => {
    const getAd = async () => {
      const fetchedAd = await fetchAd(listing); // Use the unwrapped listing
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
    <div className={styles.container} style={{ backgroundColor: isCentered ? "red" : "transparent" }}>  
      {/* <div className={styles.topSection}>
      <div className={styles.topPrice}>
          <p className={styles.price}>R 1200</p>
        </div>
        <p className={styles.topTitle}>Lorem ipsum dolor sit amet consectetur adipiscing elit.Lorem ipsum dolor sit amet .</p>

      
        <div className={styles.profileContainer}>
          <Avatar
            className={styles.avatar}
            avatar="/profilePic.jpg"
            isOnline={false}
            avatarSize="regular"
          />
        <div className={styles.profileDetails}>
          <p className={styles.name}>Mandisa Msebenzi</p>
          <p className={styles.location}>Bryanston, JHB</p>
        </div>
        </div>
      </div> */}
      <div className={styles.listingContainer}>
        {!showImages ? (
          <>
            <div className={styles.listingImagesContainer}>
              <ListingImages
                id={ad?._id}
                images={ad?.images?.slice(0, 5)}
                onClick={() => setShowImages(true)}
                aspectRatios={aspectRatios}
              />
            </div>
            <>
              <section className={styles.listingDetails}>
                <div
                  // ref={mainSectionRef}
                  className={styles.mainSectionContainer}
                >
                  <div
                    ref={sellerDetailsRef}
                    className={styles.sellerDetails}
                    style={{
                      position: isCentered ? "fixed" : "unset",
                      top: isCentered && !isSimilarAdsVisible  ? "50%" : "auto",
                      left: isCentered  && !isSimilarAdsVisible ? "184px" : "unset",
                      transform: isCentered && !isSimilarAdsVisible  ? "translateY(-50%)" : "none",
                    }}
                  >
                    <SellerDetails />
                  </div>

                  <div className={styles.details}>
                    <MainSection
                      ad={ad}
                      isAuction={isAuction}
                      onBuyNow={handleBuyNow}
                    />
                    <Modal
                      showModal={showPaymentModal}
                      setShowModal={setShowPaymentModal}
                      modalContent={<PaymentProcessing />}
                    />
                  </div>
                </div>

                <div
                  className={`${styles.productSpecsContainer} ${styles.detailsContainer}`}
                >
                  <ProductSpecifications ad={ads[0]} />
                </div>
                <div
                  className={`${styles.featuresContainer} ${styles.detailsContainer}`}
                >
                  <Features ad={ads[0]} />
                </div>
            <div ref={similarAdsRef} className={styles.similarAdsContainer}>

                <SimilarAds />
            </div>
                <div style={{ height: "6rem" }}></div>
              </section>
            </>
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
