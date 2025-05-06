"use client";
import React from "react";
import SellerDetails from "@/components/SellerDetails";
import { Ad } from "@/sanity/Types/Ad";
import { fetchAd } from "@/sanity/actions/singleAdActions";
import useSidebarStore from "@/store/useSidebarStore";
import { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import ListingImages from "@/app/[listing]/components/ListingImages";
import Modal from "@/components/Modal";
import AdCarousel from "@/components/carousels/AdCarousel";
import { Image as ImageType } from "@/sanity/Types/Ad";
import usePaymentModalStore from "../(dashboard)/dashboard/post-your-ad/store/usePaymentModalStore";
import { useCart } from "./payment/store/useCart";
import MainSection from "./components/MainSection";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ListingDetails from "./components/ListingDetails";
import { listingDetails } from "@/data/listingDetails";
import ListingsCollage from "@/components/ListingsCollage";
import multipleImages from "@/data/multipleImages";
import ReportAd from "@/components/ReportAd";
import ExitButton from "@/components/ExitButton";
import AuctionForm from "./auction/components/AuctionForm";

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
  const [report, setReport] = useState(false);
  

  useEffect(() => {
    setIsClient(true);
    setIsSidebarOpen(false);
  }, []);

  useEffect(() => {
    if (sellerDetailsRef.current && similarAdsRef.current) {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: sellerDetailsRef.current,
        start: "center center",
        // end: `bottom bottom-=${sellerDetailsRef.current.clientHeight}`,
        end: "bottom bottom",
        pin: true,
        anticipatePin: 1, // Smooths out the pinning start
        pinType: "transform", // default is position: fixed, pinType: "transform" uses CSS transforms instead
        pinSpacing: false,
        markers: false,
      });
    }

    // Cleanup: Kill all ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [sellerDetailsRef, similarAdsRef]);
  useEffect(() => {
    const getAd = async () => {
      const fetchedAd = await fetchAd(listing);
      isClient && setAd(fetchedAd ? fetchedAd : null);
    };

    getAd();
  }, [isClient]);
  const tempImages = multipleImages.map((item) => item.images);

  const aspectRatios = ad?.images.map((image: ImageType) => image.aspectRatio);
  if (!isClient) return null;
  //Todo: When I click on an image in the Gallery open the modal and show that image in the modal
  //Todo: Add map to the modal
  //Todo: Add Map, Images, and Exit tabs in the modal

  const handleBuyNow = () => {
    ad && addItem(ad);
    setShowPaymentModal(true);
  };

  return (
    <div className={styles.container}>
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
                <div className={styles.mainSectionContainer}>
                  <div ref={sellerDetailsRef} className={styles.sellerDetails}>
                    <SellerDetails />

                    <p
                      className={styles.report}
                      onClick={() => setReport(true)}
                    >
                      Report Ad
                    </p>
                  </div>
                  <div className={styles.details}>
                    {!report ? (
                      <>
                        <MainSection
                          ad={ad}
                          isAuction={isAuction}
                          onBuyNow={handleBuyNow}
                        />
                      </>
                    ) : (
                      <>
                        <div
                          className={styles.exitButtonContainer}
                          onClick={() => setReport(false)}
                        >
                          <ExitButton />
                        </div>

                        <div className={styles.reportAdContainer}>
                          <ReportAd />
                        </div>
                      </>
                    )}

                    <Modal
                      showModal={showPaymentModal}
                      setShowModal={setShowPaymentModal}
                      modalContent={<AuctionForm />}
                    />
                    {/* <Modal
                      showModal={showPaymentModal}
                      setShowModal={setShowPaymentModal}
                      modalContent={<PaymentProcessing />}
                    /> */}
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
                    images={tempImages}
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
