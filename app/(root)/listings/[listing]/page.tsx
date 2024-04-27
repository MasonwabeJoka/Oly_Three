"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import GalleryOne from "@/components/GalleryOne";
import SellerDetails from "@/components/SellerDetails";
import Button from "@/components/Buttons";
import Breadcrumbs from "@/components/Breadcrumbs";
import useSidebarStore from "@/store/useSidebarStore";
import { galleryData } from "@/data/GalleryData";
import Image from "next/image";
import { fetchAd } from "@/sanity/sanity_utils/sanityServerActions";
import { Ad } from "@/sanity/Types/Ad";
import { PortableText } from "@portabletext/react";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import ConfirmYourPurchase from "@/components/payment/ConfirmYourPurchase";
import OlySecurePayment from "@/components/payment/OlySecurePayment";
import AcceptOffer from "@/components/payment/AcceptOffer";
import TransactionComplete from "@/components/payment/TransactionComplete";
import PaymentConfirmation from "@/components/payment/PaymentConfirmation";
import Payment from "@/components/payment/Payment";
import Feedback from "@/components/payment/Feedback";
import OrderDetails from "@/components/payment/OrderDetails";
import ReceiptConfirmation from "@/components/payment/ReceiptConfirmation";
import BuyerChat from "@/components/payment/BuyerCat";
import {ads} from "@/data/adData"
type ParamsProp = {
  listing: string;
};

const Listing = ({ params }: { params: ParamsProp }) => {
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const [showImages, setShowImages] = useState(false);
  const [isAuction, setIsAuction] = useState(false);
  const [ad, setAd] = useState<Ad | null>(null);
  const [currentlyDisplayed, setCurrentlyDisplayed] = useState("MainSection");

  const listing = params.listing;

  // const ad = fetchAd(listing);
  useEffect(() => {
    const adFunction = async () => {
      const ad = await fetchAd(listing);
      setAd(ad);
    };

    adFunction();
  }, []);

  const showAllImages = () => {
    setShowImages(true);
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, []);




    useEffect(() => {
      const tempAd = (listing) => {
        ads.map((ad) => {
          if (ad.id === listing) {
            setAd(ad);
          }
        })
      };
      tempAd(listing)
    }, [])



  const ListingImages = () => {
    return (
      <section className={styles.listingImages}>
        <div className={styles.breadcrumbsContainer}>
          <Breadcrumbs
            homeBreadcrumb="Results"
            firstBreadcrumb="Properties For Sale"
            secondBreadcrumb="Gauteng"
            thirdBreadcrumb="Sandton"
            searchResult="Bryanston"
          />
        </div>
        <GalleryOne images={ad?.images} onClick={showAllImages} />
      </section>
    );
  };

  const MainSection = () => {
    return (
      <>
        <h1 className={styles.title}>
          {ad?.title && ad?.title.length > 96
            ? ad?.title.slice(0, 96)
            : ad?.title}
        </h1>
        <div className={styles.priceSection}>
          {isAuction ? (
            <>
              <p className={styles.priceLabel}>Current Price</p>
              <h1 className={styles.price}>
                {/* {ad?.price && `R${Formatter.formatLargeNumber(ad?.price)}`} */}
                {ad?.price && `R${Formatter.formatLargeNumber(ad?.price)}`}
              </h1>
              <div className={styles.countDown}>
                <span className={styles.countDownPeriod}>1d</span>
                <span className={styles.countDownPeriod}>15h</span>
                <span className={styles.countDownPeriod}>56m</span>
                <span className={styles.lastCountDownPeriod}>08s</span>
              </div>
              <p className={styles.buyNowLabel}>Buy Now</p>
              <h3 className={styles.buyNow}>R2550</h3>
            </>
          ) : (
            <>
              <p className={styles.priceLabel}>Price</p>
              <h1 className={styles.nonAuctionPrice}>
                {/* {ad?.price && `R${Formatter.formatLargeNumber(ad?.price)}`} */}
                {ad?.price &&
                  Formatter.formatPrice(ad?.price, { showCents: false })}
              </h1>
            </>
          )}
        </div>
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
                />
              </div>
            </>
          ) : (
            <>
              <div
                className={`${styles.buttons} ${styles.contactSellerContainer}`}
              >
                <Button
                  className={styles.contactSellerBtn}
                  buttonChildren="Contact Seller"
                  buttonType="primary"
                  buttonSize="medium"
                  name="contact-seller-btn"
                  type="button"
                  ariaLabel="Contact Seller Button"
                  autoFocus={false}
                  disabled={false}
                  ariaHidden={false}
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
                  onClick={() => setCurrentlyDisplayed("ConfirmYourPurchase")}
                />
              </div>
            </>
          )}
        </div>

        <div className={styles.description}>
          <p>{ad && <PortableText value={ad.description} />}</p>
        </div>
      </>
    );
  };

  const GoodToKnow = () => {
    return (
      <div className={`${styles.moreInfoContainer} ${styles.detailsContainer}`}>
        <h4 className={`${styles.title} ${styles.detailsTitle}`}>
          Good To Know
        </h4>
        <div className={`${styles.infoItems} ${styles.details}`}>
          {ad?.details.map((detail, index) => {
            return (
              <div
                className={`${styles.infoItem} ${styles.detail}`}
                key={index}
              >
                <div className={styles.bulletContainer}>
                  <div className={styles.bullet} key={index}></div>
                </div>
                <div
                  className={`${styles.infoItemContainer} ${styles.detailContainer}`}
                >
                  <p>{detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const Features = () => {
    return (
      <div
        className={`${styles.moreInfoContainer} ${styles.featuresContainer}`}
      >
        <h4 className={`${styles.title} ${styles.featuresTitle}`}>Features</h4>
        <div className={`${styles.infoItems} ${styles.features}`}>
          {ad?.features.map((feature, index) => {
            return (
              <div
                className={`${styles.infoItem} ${styles.feature}`}
                key={index}
              >
                <div className={styles.bulletContainer}>
                  <div className={styles.bullet}></div>
                </div>
                <div
                  className={`${styles.infoItemContainer} ${styles.featureContainer}`}
                >
                  <p>{feature}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        cursor: showImages ? "url('/icons/X.png'), auto" : "default",
      }}
      onClick={() => showImages && setShowImages(false)}
    >
      <div className={styles.listingContainer}>
        {!showImages ? (
          <>
            <ListingImages />
            <MaxWidthWrapper className={styles.maxWidthWrapper}>
              <section className={styles.listingDetails}>
                <div className={styles.topSection}>
                  <div className={styles.sellerDetails}>
                    <SellerDetails />
                  </div>
                  <div className={styles.detailsContainer}>
                    <div className={styles.details}>
                      {currentlyDisplayed === "MainSection" ? (
                        <MainSection />
                      ) : currentlyDisplayed === "ConfirmYourPurchase" ? (
                        <ConfirmYourPurchase
                          olySecurePaymentLink={() => {
                            setCurrentlyDisplayed("OlySecurePayment");
                          }}
                          goToPaymentsBtn={() => {
                            setCurrentlyDisplayed("Payment");
                          }}
                          contactSellerBtn={() => {
                            setCurrentlyDisplayed("Chat");
                          }}
                        />
                      ) : currentlyDisplayed === "OlySecurePayment" ? (
                        <OlySecurePayment
                          goToPaymentsBtn={() => {
                            setCurrentlyDisplayed("Payment");
                          }}
                          contactSellerBtn={() => {
                            setCurrentlyDisplayed("Chat");
                          }}
                        />
                      ) : currentlyDisplayed === "Payment" ? (
                        <Payment />
                      ) : currentlyDisplayed === "Chat" ? (
                        <BuyerChat />
                      ) : null}
                    </div>
                  </div>
                </div>
                <GoodToKnow />
                <Features />

                <div style={{ height: "6rem" }}></div>
              </section>
            </MaxWidthWrapper>
          </>
        ) : (
          <div className={styles.allImagesContainer}>
            {galleryData.map((image) => {
              return (
                <div key={image.id}>
                  <Image
                    className={styles.image}
                    src={image.image}
                    alt="Full Screen Image"
                    width={1296}
                    height={800}
                    style={{ borderRadius: "2rem" }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;