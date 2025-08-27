"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDataSchema } from "../validations/formDataSchema";
import useFormStore from "../store/useFormStore";
import useUploadMediaStore from "../store/useUploadMediaStore";
import useQAndAStore from "../store/useQAndAStore";
import UploadPhotos from "./UploadPhotos";
import ReorderPhotos from "./ReorderPhotos";
import UploadVideos from "./UploadVideos";
import UploadAttachments from "./UploadAttachments";
import Modal from "@/components/Modal";
import FAQs from "@/components/Faqs";
import { auctionFAQs } from "@/data/auctionFAQs";

const DashboardClient = ({ initialFormData, steps }) => {
  const methods = useForm({
    resolver: zodResolver(formDataSchema),
    defaultValues: initialFormData,
  });

  const { currentStepIndex } = useFormStore();
  const { goToMediaType } = useUploadMediaStore();
  const { showFAQs, setShowFAQs } = useQAndAStore();

  const getMediaComponent = (goToMediaType) => {
    const mediaComponents = {
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

  return <FormProvider {...methods}>{renderStep()}</FormProvider>;
};

export default DashboardClient;