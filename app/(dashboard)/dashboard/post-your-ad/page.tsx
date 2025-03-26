"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoriesValidations,
  detailsValidations,
  priceValidations,
  bankAccountValidations,
  descriptionValidations,
  uploadMediaValidations,
  locationValidations,
  promoteYourAdValidations,
} from "./validations/multiStepFormValidations";
import styles from "./styles.module.scss";
import SelectACategory from "./components/SelectACategory";
import Details from "./components/Details";
import Location from "./components/Location";
import UploadPhotos from "./components/UploadPhotos";
import UploadVideos from "./components/UploadVideos";
import UploadMedia from "./components/UploadMedia";
import ReorderPhotos from "./components/ReorderPhotos";
import UploadAttachments from "./components/UploadAttachments";
import Price from "./components/Price";
import TitleAndDescription from "./components/TitleAndDescription";
import PromoteYourAd from "./components/PromoteYourAd";
import ReviewAndSubmit from "./components/ReviewAndSubmit";
import BankAccountDetails from "./components/BankAccountDetails";
import Congratulations from "./components/Congratulations";
import useFormStore from "./store/useFormStore";
import useUploadMediaStore from "./store/useUploadMediaStore";
import Modal from "@/components/Modal";
import useQAndAStore from "./store/useFAQStore";
import FAQs from "@/components/Faqs";
import { auctionFAQs } from "@/data/auctionFAQs";
import FormData from "./store/useFormStore";

type FormData = {
  [key: string]: any; // Dynamic object structure for the different steps
};
type MediaAction = "photos" | "reorder" | "videos" | "attachments" | "none";
const Dashboard = () => {
  const { mediaAction } = useUploadMediaStore();
  const { currentStepIndex, goTo, setCategory } = useFormStore();
  const { showFAQs, setShowFAQs } = useQAndAStore();
  
  const validationSchemaSteps = [
    categoriesValidations,
    detailsValidations,
    priceValidations,
    bankAccountValidations,
    descriptionValidations,
    uploadMediaValidations,
    locationValidations,
    promoteYourAdValidations,
  ];

  const methods = useForm<FormData>({
    resolver: zodResolver(validationSchemaSteps[currentStepIndex]),
    defaultValues: useFormStore((state) => state.formData),
  });

  const stepComponents = [
    <SelectACategory key="0" goTo={goTo} setCategory={setCategory} />,
    <Details key="1" />,
    <Price key="2" />,
    <BankAccountDetails key="3" />,
    <TitleAndDescription key="4" />,
    <UploadMedia key="5" />, // Default for step 5, overridden by media states
    <Location key="6" />,
    <PromoteYourAd key="7" />,
    <Congratulations key="8" />,
    <ReviewAndSubmit key="9" />,
  ];
  const getMediaComponent = (mediaAction: MediaAction) => {
    const mediaComponents: Record<MediaAction, JSX.Element> = {
      photos: <UploadPhotos />,
      reorder: <ReorderPhotos />,
      videos: <UploadVideos />,
      attachments: <UploadAttachments />,
      none: stepComponents[5],
    };
    return mediaComponents[mediaAction];
  };

  const renderStep = () => {
    if (currentStepIndex === 5) return getMediaComponent(mediaAction);
    if (currentStepIndex === 2 && showFAQs)
      return (
        <Modal
          showModal={showFAQs}
          setShowModal={setShowFAQs}
          modalContent={<FAQs faqs={auctionFAQs} />}
        />
      );
    return stepComponents[currentStepIndex];
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.container}>
        <div className={styles.form}>{renderStep()}</div>
      </form>
    </FormProvider>
  );
};

export default Dashboard;
