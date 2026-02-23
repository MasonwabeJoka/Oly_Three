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
import ReviewListing from "../components/ReviewListing";
import ReviewAndSubmit from "../components/ReviewAndSubmit";

export const getStepDefinitions = (
  isAuction: boolean,
  handleNext: () => void
): Record<SiteType, StepType[]> => ({
  oly: [
    {
      title: "Select A Category",
      content: <SelectACategory />,
      path: "select-category",
      fields: ["category.main", "category.subcategory"] as FormDataFields[],
    },
    {
      title: "Listing Description",
      content: <TitleAndDescription onNext={handleNext} />,
      path: "title-and-description",
      fields: ["titleAndDescription.title", "titleAndDescription.description"] as FormDataFields[],
    },
    isAuction
      ? {
          title: "Auction Price",
          content: <AuctionPrice onNext={handleNext} />,
          path: "auction-price",
          fields: ["price.startingPrice", "price.buyNowPrice", "price.startTime", "price.auctionDuration"] as FormDataFields[],
        }
      : {
          title: "Price",
          content: <Price onNext={handleNext} />,
          path: "price",
          fields: ["price.pricingOption", "price.amount"] as FormDataFields[],
        },
    {
      title: "Product Details",
      content: <Details onNext={handleNext} />,
      path: "details",
      fields: ["details.condition"] as FormDataFields[],
    },
    {
      title: "Bank Account Details",
      content: <BankAccountDetails onNext={handleNext} />,
      path: "create-account",
      fields: ["createAccount.bankName", "createAccount.accountHolder", "createAccount.accountNumber"] as FormDataFields[],
    },
    {
      title: "Upload Photos",
      content: <UploadPhotos onNext={handleNext} />,
      path: "upload-photos",
      fields: ["uploadPhotos"] as FormDataFields[],
    },
    {
      title: "Upload Videos",
      content: <UploadVideos onNext={handleNext} />,
      path: "upload-videos",
      fields: ["uploadVideos"] as FormDataFields[],
    },
    {
      title: "Upload Attachments",
      content: <UploadAttachments onNext={handleNext} />,
      path: "upload-attachments",
      fields: ["uploadAttachments"] as FormDataFields[],
    },
    {
      title: "Location",
      content: <Location onNext={handleNext} />,
      path: "location",
      fields: ["location.province", "location.city", "location.suburb", "location.customLocation"] as FormDataFields[],
    },
    {
      title: "Promote Your Ad",
      content: <PromoteYourAd onNext={handleNext} />,
      path: "promote-your-ad",
      fields: ["promoteYourAd.promotionDuration"] as FormDataFields[],
    },
    {
      title: "Review Listing",
      content: <ReviewListing onNext={handleNext} />,
      path: "review-listing",
      fields: [] as FormDataFields[],
    },
    {
      title: "Review Your Listing",
      content: <ReviewAndSubmit onNext={handleNext} />,
      path: "review-and-submit",
      fields: [] as FormDataFields[],
    },
  ],
  "oly-properties": [
    {
      title: "Select A Category",
      content: <SelectACategory />,
      path: "select-category",
      fields: ["category.main", "category.subcategory"] as FormDataFields[],
    },
    {
      title: "Product Details",
      content: <Details onNext={handleNext} />,
      path: "details",
      fields: ["details.condition"] as FormDataFields[],
    },
    {
      title: "Price",
      content: <Price onNext={handleNext} />,
      path: "price",
      fields: ["price.pricingOption", "price.amount"] as FormDataFields[],
    },
    {
      title: "Bank Account Details",
      content: <BankAccountDetails onNext={handleNext} />,
      path: "create-account",
      fields: ["createAccount.bankName", "createAccount.accountHolder", "createAccount.accountNumber"] as FormDataFields[],
    },
    {
      title: "Ad Description",
      content: <TitleAndDescription onNext={handleNext} />,
      path: "title-and-description",
      fields: ["titleAndDescription.title", "titleAndDescription.description"] as FormDataFields[],
    },
    {
      title: "Upload Media",
      content: <UploadMedia onNext={handleNext} />,
      path: "upload-media",
      fields: ["uploadMedia.uploadPhotos", "uploadMedia.uploadVideos", "uploadMedia.uploadAttachments"] as FormDataFields[],
    },
    {
      title: "Location",
      content: <Location onNext={handleNext} />,
      path: "location",
      fields: ["location.province", "location.city", "location.suburb", "location.customLocation"] as FormDataFields[],
    },
    {
      title: "Promote Your Ad",
      content: <PromoteYourAd onNext={handleNext} />,
      path: "promote-your-ad",
      fields: ["promoteYourAd.promotionDuration"] as FormDataFields[],
    },
    {
      title: "Review Listing",
      content: <ReviewListing onNext={handleNext} />,
      path: "review-message",
      fields: [] as FormDataFields[],
    },
    {
      title: "Review Your Listing",
      content: <ReviewAndSubmit onNext={handleNext} />,
      path: "review-and-submit",
      fields: [] as FormDataFields[],
    },
  ],
  "oly-auto": [
    {
      title: "Product Details",
      content: <Details onNext={handleNext} />,
      path: "details",
      fields: ["details.condition"] as FormDataFields[],
    },
    {
      title: "Price",
      content: <Price onNext={handleNext} />,
      path: "price",
      fields: ["price.pricingOption", "price.amount"] as FormDataFields[],
    },
    {
      title: "Bank Account Details",
      content: <BankAccountDetails onNext={handleNext} />,
      path: "create-account",
      fields: ["createAccount.bankName", "createAccount.accountHolder", "createAccount.accountNumber"] as FormDataFields[],
    },
    {
      title: "Ad Description",
      content: <TitleAndDescription onNext={handleNext} />,
      path: "title-and-description",
      fields: ["titleAndDescription.title", "titleAndDescription.description"] as FormDataFields[],
    },
    {
      title: "Upload Media",
      content: <UploadMedia onNext={handleNext} />,
      path: "upload-media",
      fields: ["uploadMedia.uploadPhotos", "uploadMedia.uploadVideos", "uploadMedia.uploadAttachments"] as FormDataFields[],
    },
    {
      title: "Location",
      content: <Location onNext={handleNext} />,
      path: "location",
      fields: ["location.province", "location.city", "location.suburb", "location.customLocation"] as FormDataFields[],
    },
    {
      title: "Promote Your Ad",
      content: <PromoteYourAd onNext={handleNext} />,
      path: "promote-your-ad",
      fields: ["promoteYourAd.promotionDuration"] as FormDataFields[],
    },
    {
      title: "Review Listing",
      content: <ReviewListing onNext={handleNext} />,
      path: "review-message",
      fields: [] as FormDataFields[],
    },
    {
      title: "Review Your Listing",
      content: <ReviewAndSubmit onNext={handleNext} />,
      path: "review-and-submit",
      fields: [] as FormDataFields[],
    },
  ],
  "oly-hiring": [
    {
      title: "Select A Category",
      content: <SelectACategory />,
      path: "select-category",
      fields: ["category.main", "category.subcategory"] as FormDataFields[],
    },
    {
      title: "Product Details",
      content: <Details onNext={handleNext} />,
      path: "details",
      fields: ["details.condition"] as FormDataFields[],
    },
    {
      title: "Price",
      content: <Price onNext={handleNext} />,
      path: "price",
      fields: ["price.pricingOption", "price.amount"] as FormDataFields[],
    },
    {
      title: "Bank Account Details",
      content: <BankAccountDetails onNext={handleNext} />,
      path: "create-account",
      fields: ["createAccount.bankName", "createAccount.accountHolder", "createAccount.accountNumber"] as FormDataFields[],
    },
    {
      title: "Ad Description",
      content: <TitleAndDescription onNext={handleNext} />,
      path: "title-and-description",
      fields: ["titleAndDescription.title", "titleAndDescription.description"] as FormDataFields[],
    },
    {
      title: "Upload Media",
      content: <UploadMedia onNext={handleNext} />,
      path: "upload-media",
      fields: ["uploadMedia.uploadPhotos", "uploadMedia.uploadVideos", "uploadMedia.uploadAttachments"] as FormDataFields[],
    },
    {
      title: "Location",
      content: <Location onNext={handleNext} />,
      path: "location",
      fields: ["location.province", "location.city", "location.suburb", "location.customLocation"] as FormDataFields[],
    },
    {
      title: "Promote Your Ad",
      content: <PromoteYourAd onNext={handleNext} />,
      path: "promote-your-ad",
      fields: ["promoteYourAd.promotionDuration"] as FormDataFields[],
    },
    {
      title: "Review Listing",
      content: <ReviewListing onNext={handleNext} />,
      path: "review-message",
      fields: [] as FormDataFields[],
    },
    {
      title: "Review Your Listing",
      content: <ReviewAndSubmit onNext={handleNext} />,
      path: "review-and-submit",
      fields: [] as FormDataFields[],
    },
  ],
  "oly-services": [
    {
      title: "Select A Category",
      content: <SelectACategory />,
      path: "select-category",
      fields: ["category.main", "category.subcategory"] as FormDataFields[],
    },
    {
      title: "Product Details",
      content: <Details onNext={handleNext} />,
      path: "details",
      fields: ["details.condition"] as FormDataFields[],
    },
    {
      title: "Price",
      content: <Price onNext={handleNext} />,
      path: "price",
      fields: ["price.pricingOption", "price.amount"] as FormDataFields[],
    },
    {
      title: "Bank Account Details",
      content: <BankAccountDetails onNext={handleNext} />,
      path: "create-account",
      fields: ["createAccount.bankName", "createAccount.accountHolder", "createAccount.accountNumber"] as FormDataFields[],
    },
    {
      title: "Ad Description",
      content: <TitleAndDescription onNext={handleNext} />,
      path: "title-and-description",
      fields: ["titleAndDescription.title", "titleAndDescription.description"] as FormDataFields[],
    },
    {
      title: "Upload Media",
      content: <UploadMedia onNext={handleNext} />,
      path: "upload-media",
      fields: ["uploadMedia.uploadPhotos", "uploadMedia.uploadVideos", "uploadMedia.uploadAttachments"] as FormDataFields[],
    },
    {
      title: "Location",
      content: <Location onNext={handleNext} />,
      path: "location",
      fields: ["location.province", "location.city", "location.suburb", "location.customLocation"] as FormDataFields[],
    },
    {
      title: "Promote Your Ad",
      content: <PromoteYourAd onNext={handleNext} />,
      path: "promote-your-ad",
      fields: ["promoteYourAd.promotionDuration"] as FormDataFields[],
    },
    {
      title: "Review Listing",
      content: <ReviewListing onNext={handleNext} />,
      path: "review-message",
      fields: [] as FormDataFields[],
    },
    {
      title: "Review Your Listing",
      content: <ReviewAndSubmit onNext={handleNext} />,
      path: "review-and-submit",
      fields: [] as FormDataFields[],
    },
  ],
});
