"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDataSchema } from "./validations/formDataSchema";
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
import {type FormData} from "./store/useFormStore";


type GoToMediaType = "photos" | "reorder" | "videos" | "attachments" | "none";
const Dashboard = () => {
  const { goToMediaType } = useUploadMediaStore();
  const { currentStepIndex, goTo, setCategory } = useFormStore();
  const { showFAQs, setShowFAQs } = useQAndAStore();
  
  const methods = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues: useFormStore((state) => state.formData),
  });

  const steps = [
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
  const getMediaComponent = (goToMediaType: GoToMediaType) => {
    const mediaComponents: Record<GoToMediaType, JSX.Element> = {
      photos: <UploadPhotos />,
      reorder: <ReorderPhotos />,
      videos: <UploadVideos />,
      attachments: <UploadAttachments />,
      none: steps[5],
    };
    return mediaComponents[goToMediaType];
  };

  const renderStep = () => {
    if (currentStepIndex === 5) return getMediaComponent(goToMediaType);
    if (currentStepIndex === 2 && showFAQs)
      return (
        <Modal
          showModal={showFAQs}
          setShowModal={setShowFAQs}
          modalContent={<FAQs faqs={auctionFAQs} />}
        />
      );
    return steps[currentStepIndex];
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
