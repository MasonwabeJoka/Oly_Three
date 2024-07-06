"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Gallery from "@/components/Gallery";
import SellerDetails from "@/components/SellerDetails";
import Button from "@/components/Buttons";
import Breadcrumbs from "@/components/Breadcrumbs";
import useSidebarStore from "@/store/useSidebarStore";
import { galleryData } from "@/data/GalleryData";
import Image from "next/image";
import { fetchAd } from "@/sanity/actions/singleAdActions";
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
import { notFound } from "next/navigation";
import SimilarAds from "@/components/SimilarAds";
import AdCarousel from "@/components/carousels/AdCarousel";
import Modal from "@/components/Modal";

type ParamsProp = {
  params: {
    listing: string;
  };
};

const Listing = ({ params }: ParamsProp) => {
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const [showImages, setShowImages] = useState(false);
  const [isAuction, setIsAuction] = useState(true);
  const [ad, setAd] = useState<Ad | null>(null);
  const [currentlyDisplayed, setCurrentlyDisplayed] = useState("MainSection");
  const [isClient, setIsClient] = useState(false);
  const { listing } = params;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const getAd = async () => {
      const fetchedAd = await fetchAd(listing);

      isClient && setAd(fetchedAd ? fetchedAd : null);
    };

    getAd();
  }, [isClient]);

  const showAllImages = () => {
    setShowImages(true);
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, []);

  const BREADCRUMBS = [
    { id: 1, name: "Home", href: "#" },
    { id: 2, name: "Properties For Sale", href: "#" },
    { id: 3, name: "Gauteng", href: "#" },
    { id: 4, name: "Bryanston", href: "#" },
  ];

  // Calculate Greatest Common Divisor (GCD) between two numbers
  function findGreatestCommonDivisor(
    firstNumber: number,
    secondNumber: number
  ): number {
    while (secondNumber !== 0) {
      let temporary = secondNumber;
      secondNumber = firstNumber % secondNumber;
      firstNumber = temporary;
    }
    return firstNumber;
  }

  // Function to calculate and return the aspect ratio as a decimal value
  function calculateAspectRatio(
    imageWidth: number,
    imageHeight: number
  ): number {
    const greatestCommonDivisor = findGreatestCommonDivisor(
      imageWidth,
      imageHeight
    ); //https://www.youtube.com/watch?v=jFd-6EPfnec
    const width = imageWidth / greatestCommonDivisor;
    const height = imageHeight / greatestCommonDivisor;
    return width / height;
  }

  const aspectRatios: number[] = ad?.images.map(
    (image: any) => image.aspectRatio
  );
  //Todo: When I click on an image in the Gallery open the modal and show that image in the modal
  //Todo: Add map to the modal
  //Todo: Add Map, Images, and Exit tabs in the modal

  const ListingImages = () => {
    return (
      <div className={styles.listingImages}>
        <div className={styles.galleryContainer}>
          <div className={styles.breadcrumbsContainer}>
            <Breadcrumbs
              homeBreadcrumb={BREADCRUMBS[0]}
              firstBreadcrumb={BREADCRUMBS[1]}
              secondBreadcrumb={BREADCRUMBS[2]}
              searchResult={BREADCRUMBS[3]}
              breadcrumbs={BREADCRUMBS}
            />
          </div>
          <div className={styles.gallery}>
            <Gallery
              id={ad?._id}
              images={ad?.images?.slice(0, 5)}
              onClick={showAllImages}
              aspectRatios={aspectRatios}
            />
          </div>
        </div>
      </div>
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
                  onClick={() => setCurrentlyDisplayed("Chat")}
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
          {ad?.details?.map((details, index) => {
            // Check if the details object has an array value
            if (Array.isArray(details.arrayKey)) {
              // Join the array elements into a comma-separated string
              const arrayString = details.arrayKey.join(", ");
              // Create a new object with the string value instead of the array
              details = { ...details, arrayKey: arrayString };
            }
            const detailsArray = Object.values(details) as string[];
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
                  {detailsArray.map((detail, index) => {
                    return <p key={index}>{detail}</p>;
                  })}
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
          {ad?.features?.map((feature, index) => {
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

  const SimilarAdsComponent = () => {
    return (
      <div>
        <h4 className={`${styles.title} ${styles.similarAds}`}>
          Sponsored Ads
        </h4>
        <div className={styles.collage}>
          <SimilarAds
            query={{ category: ad?.category, sort: "desc", limit: 4 }}
            isDashboard={false}
            isDeletable={false}
            cardSize="standard"
          />
        </div>
      </div>
    );
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
                          ad={ad!}
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
                <SimilarAdsComponent />
                <div style={{ height: "6rem" }}></div>
              </section>
            </MaxWidthWrapper>
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
