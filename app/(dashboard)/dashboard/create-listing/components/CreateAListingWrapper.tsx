"use client";
import CreateAListingClient from "./CreateAListingClient";
import SelectACategory from "./SelectACategory";
import Details from "./Details";
import Price from "./Price";
import BankAccountDetails from "./BankAccountDetails";
import TitleAndDescription from "./TitleAndDescription";
import UploadMedia from "./UploadMedia";
import Location from "./Location";
import PromoteYourAds from "./PromoteYourAds";
import Congratulations from "./ReviewListing";
import ReviewAndSubmit from "./ReviewAndSubmit";
import SelectNewCategory from "./SelectNewCategory";

const CreateAListingWrapper = () => {
  const onNext = () => {};
  const goTo = () => {};
  const steps = [
    <SelectACategory key="0" />,
    <Details key="1" onNext={onNext} />,
    <Price key="2" onNext={onNext} />,
    <BankAccountDetails key="3" onNext={onNext} />,
    <TitleAndDescription key="4" onNext={onNext} />,
    <UploadMedia key="5" onNext={onNext} />,
    <Location key="6" onNext={onNext} />,
    <PromoteYourAds key="7" onNext={onNext} />,
    <Congratulations key="8" onNext={onNext} goTo={goTo} />,
    <ReviewAndSubmit key="9" onNext={onNext} goTo={goTo} />,
    <SelectNewCategory key="10" onNext={onNext} goTo={goTo} />,
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

  return (
    <CreateAListingClient initialFormData={initialFormData} steps={steps} />
  );
};

export default CreateAListingWrapper;
