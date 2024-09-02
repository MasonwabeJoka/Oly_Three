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
import ListingImages from "@/app/[listing]/components/ListingImages";
import { Image as ImageType } from "@/sanity/Types/Ad";
import PriceSection from "./components/PriceSection";
import ButtonsContainer from "./components/ButtonsContainer";
import GoodToKnow from "./components/GoodToKnow";
import Cart from "./components/Cart";
import { useCart } from "@/store/useCart";

// Todo: Reformat by moving components into their own files.
type ParamsProp = {
  params: {
    listing: string;
  };
};

const Listing = ({ params }: ParamsProp) => {
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const [showImages, setShowImages] = useState(false);
  const [isAuction, setIsAuction] = useState(false);
  const [ad, setAd] = useState<Ad | null>(null);
  const [currentlyDisplayed, setCurrentlyDisplayed] = useState("MainSection");
  const { addItem } = useCart();
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

  // // Calculate Greatest Common Divisor (GCD) between two numbers
  // function findGreatestCommonDivisor(
  //   firstNumber: number,
  //   secondNumber: number
  // ): number {
  //   while (secondNumber !== 0) {
  //     let temporary = secondNumber;
  //     secondNumber = firstNumber % secondNumber;
  //     firstNumber = temporary;
  //   }
  //   return firstNumber;
  // }

  // // Function to calculate and return the aspect ratio as a decimal value
  // function calculateAspectRatio(
  //   imageWidth: number,
  //   imageHeight: number
  // ): number {
  //   const greatestCommonDivisor = findGreatestCommonDivisor(
  //     imageWidth,
  //     imageHeight
  //   ); //https://www.youtube.com/watch?v=jFd-6EPfnec
  //   const width = imageWidth / greatestCommonDivisor;
  //   const height = imageHeight / greatestCommonDivisor;
  //   return width / height;
  // }

  const aspectRatios: (number | undefined)[] | undefined = ad?.images.map(
    (image: ImageType) => image.aspectRatio
  );

  //Todo: When I click on an image in the Gallery open the modal and show that image in the modal
  //Todo: Add map to the modal
  //Todo: Add Map, Images, and Exit tabs in the modal

  const MainSection = () => {
    return (
      <>
        <h1 className={styles.title}>
          {ad?.title && ad?.title.length > 96
            ? ad?.title.slice(0, 96)
            : ad?.title}
        </h1>
        <div className={styles.priceSection}>
          <PriceSection ad={ad} isAuction={isAuction} />
        </div>
        <div className={styles.buttonsContainer}>
          <ButtonsContainer
            isAuction={isAuction}
            placeBid={() => setCurrentlyDisplayed("Payment")}
            contactSeller={() => setCurrentlyDisplayed("Chat")}
            buyNow={() => {
              ad && addItem(ad);
              setCurrentlyDisplayed("Cart");
              // setCurrentlyDisplayed("ConfirmYourPurchase");
            }}
          />
        </div>

        <div className={styles.description}>
          {ad && <PortableText value={ad.description as any} />}
        </div>
      </>
    );
  };

  // const GoodToKnow = () => {
  //   return (
  //     <div className={`${styles.moreInfoContainer} ${styles.detailsContainer}`}>
  //       <h4 className={`${styles.title} ${styles.detailsTitle}`}>
  //         Good To Know
  //       </h4>
  //       <div className={`${styles.infoItems} ${styles.details}`}>
  //         {ad?.details?.map((details, index) => {
  //           // Check if the details object has an array value
  //           if (Array.isArray(details.arrayKey)) {
  //             // Join the array elements into a comma-separated string
  //             const arrayString = details.arrayKey.join(", ");
  //             // Create a new object with the string value instead of the array
  //             details = { ...details, arrayKey: arrayString };
  //           }
  //           const detailsArray = Object.values(details) as string[];
  //           return (
  //             <div
  //               className={`${styles.infoItem} ${styles.detail}`}
  //               key={index}
  //             >
  //               <div className={styles.bulletContainer}>
  //                 <div className={styles.bullet} key={index}></div>
  //               </div>
  //               <div
  //                 className={`${styles.infoItemContainer} ${styles.detailContainer}`}
  //               >
  //                 {detailsArray.map((detail, index) => {
  //                   return <p key={index}>{detail}</p>;
  //                 })}
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // };
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
              onClick={showAllImages}
              aspectRatios={aspectRatios}
            />
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
                      ) : currentlyDisplayed === "Cart" ? (
                        <Cart    confirmPurchase={() => {
                          setCurrentlyDisplayed("ConfirmYourPurchase");
                        }}/>
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
                <div
                  className={`${styles.moreInfoContainer} ${styles.detailsContainer}`}
                >
                  <h4 className={`${styles.title} ${styles.detailsTitle}`}>
                    Good To Know
                  </h4>
                  <GoodToKnow ad={ad} />
                </div>
                <Features />
                <SimilarAds />
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
