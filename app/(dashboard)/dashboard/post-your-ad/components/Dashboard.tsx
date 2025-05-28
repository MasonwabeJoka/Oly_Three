"use client";
import styles from "./Dashboard.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDataSchema } from "../validations/formDataSchema";
import SelectACategory from "./SelectACategory";
import Details from "./Details";
import useFormStore from "../store/useFormStore";
import useUploadMediaStore from "../store/useUploadMediaStore";
import useQAndAStore from "../store/useFAQStore";
import Price from "./Price";
import BankAccountDetails from "./BankAccountDetails";
import TitleAndDescription from "./TitleAndDescription";
import UploadMedia from "./UploadMedia";
import Location from "./Location";
import PromoteYourAd from "./PromoteYourAd";
import Congratulations from "./Congratulations";
import ReviewAndSubmit from "./ReviewAndSubmit";
import UploadPhotos from "./UploadPhotos";
import ReorderPhotos from "./ReorderPhotos";
import UploadVideos from "./UploadVideos";
import UploadAttachments from "./UploadAttachments";
import Modal from "@/components/Modal";
import FAQs from "@/components/Faqs";
import { auctionFAQs } from "@/data/auctionFAQs";


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
