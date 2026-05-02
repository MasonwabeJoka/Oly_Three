import React from "react";
import { StepType, SiteType, FormDataFields } from "../types/listing.types";
import SelectACategory from "../components/SelectACategory";
import Details from "../components/Details";
import Price from "../components/Price";
import AuctionPrice from "../components/AuctionPrice";
import BankAccountDetails from "../components/BankAccountDetails";
import TitleAndDescription from "../components/TitleAndDescription";
import UploadMedia from "../components/UploadMediaTEMP";
import UploadPhotos from "../components/UploadPhotos";
import UploadVideos from "../components/UploadVideos";
import UploadAttachments from "../components/UploadAttachments";
import Location from "../components/Location";
import PromoteYourAd from "../components/PromoteYourAds";
import ReviewAndSubmit from "../components/ReviewAndSubmit";

// Step order (all sites):
// 0. Select A Category
// 1. Title & Description
// 2. Price
// 3. Product Details
// 4. Location
// 5. Upload Media
// 6. Review Your Listing
// 7. Promote Your Ad
// 8. Bank Account Details

export const getStepDefinitions = (
  isAuction: boolean,
  handleNext: () => void,
  currentUser: any,
): Record<SiteType, StepType[]> => ({
  oly: [
    {
      title: "Select A Category",
      content: <SelectACategory />,
      path: "select-category",
      alignContentToBottom: true,
      fields: ["category.main", "category.subcategory"] as FormDataFields[],
    },
    {
      title: "Listing Description",
      content: <TitleAndDescription onNext={handleNext} />,
      path: "title-and-description",
      alignContentToBottom: true,
      fields: [
        "titleAndDescription.title",
        "titleAndDescription.description",
      ] as FormDataFields[],
    },
    isAuction
      ? {
          title: "Auction Price",
          content: <AuctionPrice onNext={handleNext} />,
          path: "auction-price",
          alignContentToBottom: true,
          fields: [
            "price.startingPrice",
            "price.buyNowPrice",
            "price.startTime",
            "price.auctionDuration",
          ] as FormDataFields[],
        }
      : {
          title: "Price",
          content: <Price onNext={handleNext} />,
          path: "price",
          alignContentToBottom: true,
          fields: ["price.pricingOption", "price.amount"] as FormDataFields[],
        },
    {
      title: "Product Details",
      content: <Details onNext={handleNext} />,
      path: "details",
      alignContentToBottom: true,
      fields: ["details.condition"] as FormDataFields[],
    },
    {
      title: "Location",
      content: <Location onNext={handleNext} />,
      path: "location",
      alignContentToBottom: true,
      fields: [
        "location.province",
        "location.city",
        "location.suburb",
        "location.customLocation",
      ] as FormDataFields[],
    },
    {
      title: "Upload Photos",
      content: <UploadPhotos onNext={handleNext} />,
      path: "upload-photos",
      alignContentToBottom: true,
      fields: ["uploadPhotos"] as FormDataFields[],
    },
    {
      title: "Upload Videos",
      content: <UploadVideos onNext={handleNext} />,
      path: "upload-videos",
      alignContentToBottom: true,
      fields: ["uploadVideos"] as FormDataFields[],
    },
    {
      title: "Upload Attachments",
      content: <UploadAttachments />,
      path: "upload-attachments",
      alignContentToBottom: true,
      fields: ["uploadAttachments"] as FormDataFields[],
    },
    {
      title: "Review Your Listing",
      content: <ReviewAndSubmit onNext={handleNext} />,
      path: "review-and-submit",
      alignContentToBottom: false,
      fields: [] as FormDataFields[],
    },
    {
      title: "Promote Your Ad",
      content: <PromoteYourAd onNext={handleNext} />,
      path: "promote-your-ad",
      alignContentToBottom: false,
      fields: ["promoteYourAd.promotionDuration"] as FormDataFields[],
    },
    {
      title: "Bank Account Details",
      content: <BankAccountDetails onNext={handleNext} />,
      path: "create-account",
      alignContentToBottom: true,
      fields: [
        "createAccount.bankName",
        "createAccount.accountHolder",
        "createAccount.accountNumber",
      ] as FormDataFields[],
    },
  ],
  "oly-properties": [
    {
      title: "Select A Category",
      content: <SelectACategory />,
      path: "select-category",
      alignContentToBottom: true,
      fields: ["category.main", "category.subcategory"] as FormDataFields[],
    },
    {
      title: "Ad Description",
      content: <TitleAndDescription onNext={handleNext} />,
      path: "title-and-description",
      alignContentToBottom: true,
      fields: [
        "titleAndDescription.title",
        "titleAndDescription.description",
      ] as FormDataFields[],
    },
    {
      title: "Price",
      content: <Price onNext={handleNext} />,
      path: "price",
      alignContentToBottom: true,
      fields: ["price.pricingOption", "price.amount"] as FormDataFields[],
    },
    {
      title: "Product Details",
      content: <Details onNext={handleNext} />,
      path: "details",
      alignContentToBottom: true,
      fields: ["details.condition"] as FormDataFields[],
    },
    {
      title: "Location",
      content: <Location onNext={handleNext} />,
      path: "location",
      alignContentToBottom: true,
      fields: [
        "location.province",
        "location.city",
        "location.suburb",
        "location.customLocation",
      ] as FormDataFields[],
    },
    {
      title: "Upload Media",
      content: <UploadMedia onNext={handleNext} />,
      path: "upload-media",
      alignContentToBottom: true,
      fields: [
        "uploadMedia.uploadPhotos",
        "uploadMedia.uploadVideos",
        "uploadMedia.uploadAttachments",
      ] as FormDataFields[],
    },
    {
      title: "Review Your Listing",
      content: <ReviewAndSubmit onNext={handleNext} />,
      path: "review-and-submit",
      alignContentToBottom: false,
      fields: [] as FormDataFields[],
    },
    {
      title: "Promote Your Ad",
      content: <PromoteYourAd onNext={handleNext} />,
      path: "promote-your-ad",
      alignContentToBottom: false,
      fields: ["promoteYourAd.promotionDuration"] as FormDataFields[],
    },
    {
      title: "Bank Account Details",
      content: <BankAccountDetails onNext={handleNext} />,
      path: "create-account",
      alignContentToBottom: true,
      fields: [
        "createAccount.bankName",
        "createAccount.accountHolder",
        "createAccount.accountNumber",
      ] as FormDataFields[],
    },
  ],
  "oly-auto": [
    {
      title: "Select A Category",
      content: <SelectACategory />,
      path: "select-category",
      alignContentToBottom: true,
      fields: ["category.main", "category.subcategory"] as FormDataFields[],
    },
    {
      title: "Ad Description",
      content: <TitleAndDescription onNext={handleNext} />,
      path: "title-and-description",
      alignContentToBottom: true,
      fields: [
        "titleAndDescription.title",
        "titleAndDescription.description",
      ] as FormDataFields[],
    },
    {
      title: "Price",
      content: <Price onNext={handleNext} />,
      path: "price",
      alignContentToBottom: true,
      fields: ["price.pricingOption", "price.amount"] as FormDataFields[],
    },
    {
      title: "Product Details",
      content: <Details onNext={handleNext} />,
      path: "details",
      alignContentToBottom: true,
      fields: ["details.condition"] as FormDataFields[],
    },
    {
      title: "Location",
      content: <Location onNext={handleNext} />,
      path: "location",
      alignContentToBottom: true,
      fields: [
        "location.province",
        "location.city",
        "location.suburb",
        "location.customLocation",
      ] as FormDataFields[],
    },
    {
      title: "Upload Media",
      content: <UploadMedia onNext={handleNext} />,
      path: "upload-media",
      alignContentToBottom: true,
      fields: [
        "uploadMedia.uploadPhotos",
        "uploadMedia.uploadVideos",
        "uploadMedia.uploadAttachments",
      ] as FormDataFields[],
    },
    {
      title: "Review Your Listing",
      content: <ReviewAndSubmit onNext={handleNext} />,
      path: "review-and-submit",
      alignContentToBottom: false,
      fields: [] as FormDataFields[],
    },
    {
      title: "Promote Your Ad",
      content: <PromoteYourAd onNext={handleNext} />,
      path: "promote-your-ad",
      alignContentToBottom: false,
      fields: ["promoteYourAd.promotionDuration"] as FormDataFields[],
    },
    {
      title: "Bank Account Details",
      content: <BankAccountDetails onNext={handleNext} />,
      path: "create-account",
      alignContentToBottom: true,
      fields: [
        "createAccount.bankName",
        "createAccount.accountHolder",
        "createAccount.accountNumber",
      ] as FormDataFields[],
    },
  ],
  "oly-hiring": [
    {
      title: "Select A Category",
      content: <SelectACategory />,
      path: "select-category",
      alignContentToBottom: true,
      fields: ["category.main", "category.subcategory"] as FormDataFields[],
    },
    {
      title: "Ad Description",
      content: <TitleAndDescription onNext={handleNext} />,
      path: "title-and-description",
      alignContentToBottom: true,
      fields: [
        "titleAndDescription.title",
        "titleAndDescription.description",
      ] as FormDataFields[],
    },
    {
      title: "Price",
      content: <Price onNext={handleNext} />,
      path: "price",
      alignContentToBottom: true,
      fields: ["price.pricingOption", "price.amount"] as FormDataFields[],
    },
    {
      title: "Product Details",
      content: <Details onNext={handleNext} />,
      path: "details",
      alignContentToBottom: true,
      fields: ["details.condition"] as FormDataFields[],
    },
    {
      title: "Location",
      content: <Location onNext={handleNext} />,
      path: "location",
      alignContentToBottom: true,
      fields: [
        "location.province",
        "location.city",
        "location.suburb",
        "location.customLocation",
      ] as FormDataFields[],
    },
    {
      title: "Upload Media",
      content: <UploadMedia onNext={handleNext} />,
      path: "upload-media",
      alignContentToBottom: true,
      fields: [
        "uploadMedia.uploadPhotos",
        "uploadMedia.uploadVideos",
        "uploadMedia.uploadAttachments",
      ] as FormDataFields[],
    },
    {
      title: "Review Your Listing",
      content: <ReviewAndSubmit onNext={handleNext} />,
      path: "review-and-submit",
      alignContentToBottom: false,
      fields: [] as FormDataFields[],
    },
    {
      title: "Promote Your Ad",
      content: <PromoteYourAd onNext={handleNext} />,
      path: "promote-your-ad",
      alignContentToBottom: false,
      fields: ["promoteYourAd.promotionDuration"] as FormDataFields[],
    },
    {
      title: "Bank Account Details",
      content: <BankAccountDetails onNext={handleNext} />,
      path: "create-account",
      alignContentToBottom: true,
      fields: [
        "createAccount.bankName",
        "createAccount.accountHolder",
        "createAccount.accountNumber",
      ] as FormDataFields[],
    },
  ],
  "oly-services": [
    {
      title: "Select A Category",
      content: <SelectACategory />,
      path: "select-category",
      alignContentToBottom: true,
      fields: ["category.main", "category.subcategory"] as FormDataFields[],
    },
    {
      title: "Ad Description",
      content: <TitleAndDescription onNext={handleNext} />,
      path: "title-and-description",
      alignContentToBottom: true,
      fields: [
        "titleAndDescription.title",
        "titleAndDescription.description",
      ] as FormDataFields[],
    },
    {
      title: "Price",
      content: <Price onNext={handleNext} />,
      path: "price",
      alignContentToBottom: true,
      fields: ["price.pricingOption", "price.amount"] as FormDataFields[],
    },
    {
      title: "Product Details",
      content: <Details onNext={handleNext} />,
      path: "details",
      alignContentToBottom: true,
      fields: ["details.condition"] as FormDataFields[],
    },
    {
      title: "Location",
      content: <Location onNext={handleNext} />,
      path: "location",
      alignContentToBottom: true,
      fields: [
        "location.province",
        "location.city",
        "location.suburb",
        "location.customLocation",
      ] as FormDataFields[],
    },
    {
      title: "Upload Media",
      content: <UploadMedia onNext={handleNext} />,
      path: "upload-media",
      alignContentToBottom: true,
      fields: [
        "uploadMedia.uploadPhotos",
        "uploadMedia.uploadVideos",
        "uploadMedia.uploadAttachments",
      ] as FormDataFields[],
    },
    {
      title: "Review Your Listing",
      content: <ReviewAndSubmit onNext={handleNext} />,
      path: "review-and-submit",
      alignContentToBottom: false,
      fields: [] as FormDataFields[],
    },
    {
      title: "Promote Your Ad",
      content: <PromoteYourAd onNext={handleNext} />,
      path: "promote-your-ad",
      alignContentToBottom: false,
      fields: ["promoteYourAd.promotionDuration"] as FormDataFields[],
    },
    {
      title: "Bank Account Details",
      content: <BankAccountDetails onNext={handleNext} />,
      path: "create-account",
      alignContentToBottom: true,
      fields: [
        "createAccount.bankName",
        "createAccount.accountHolder",
        "createAccount.accountNumber",
      ] as FormDataFields[],
    },
  ],
});
