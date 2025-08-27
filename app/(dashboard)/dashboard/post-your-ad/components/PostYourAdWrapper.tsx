"use client";
import PostYourAdClient from "./PostYourAdClient";
import SelectACategory from "./SelectACategory";
import Details from "./Details";
import Price from "./Price";
import BankAccountDetails from "./BankAccountDetails";
import TitleAndDescription from "./TitleAndDescription";
import UploadMedia from "./UploadMedia";
import Location from "./Location";
import PromoteYourAd from "./PromoteYourAd";
import Congratulations from "./ReviewListing";
import ReviewAndSubmit from "./ReviewAndSubmit";
import SelectNewCategory from "./SelectNewCategory";

const PostYourAdWrapper = () => {
  const steps = [
    <SelectACategory key="0" />,
    <Details key="1" />,
    <Price key="2" />,
    <BankAccountDetails key="3" />,
    <TitleAndDescription key="4" />,
    <UploadMedia key="5" />,
    <Location key="6" />,
    <PromoteYourAd key="7" />,
    <Congratulations key="8" />,
    <ReviewAndSubmit key="9" />,
    <SelectNewCategory key="10" />,
  ];

  const initialFormData = {
    category: { main: "", subcategory: "" },
    details: { condition: "" },
    price: { pricingOption: "", price: 0 },
    createAccount: { bankName: "", accountHolder: "", accountNumber: "" },
    titleAndDescription: { title: "", description: "" },
    uploadMedia: {
      uploadPhotos: false,
      uploadVideos: false,
      uploadAttachments: false,
    },
    location: { province: "", city: "", suburb: "", customLocation: "" },
    promoteYourAd: { promotionDuration: "" },
    reviewYourAd: "",
  };

  return <PostYourAdClient initialFormData={initialFormData} steps={steps} />;
};

export default PostYourAdWrapper;
