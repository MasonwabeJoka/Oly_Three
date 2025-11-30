"use client";
import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDataSchema } from "../validations/formDataSchema";
import useFormStore from "../store/useFormStore";
import useUploadMediaStore from "../store/useUploadMediaStore";
import useQAndAStore from "../store/useFAQStore";
import UploadPhotos from "./UploadPhotos";
import ReorderPhotos from "./ReorderPhotos";
import UploadVideos from "./UploadVideos";
import UploadAttachments from "./UploadAttachments";
import Modal from "@/components/Modal";
import FAQs from "@/components/Faqs";
import { auctionFAQs } from "@/data/auctionFAQs";

type Props = {
  initialFormData?: any;
  steps: React.ReactElement[];
};

const CreateAListingClient = ({ initialFormData = {}, steps }: Props) => {
  const [isClient, setIsClient] = useState(false);

  const methods = useForm({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
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
      ...initialFormData,
    },
  });

  const { currentStepIndex, categoryPreviouslySelected } = useFormStore();
  const { goToMediaType } = useUploadMediaStore();
  const { showFAQs, setShowFAQs } = useQAndAStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getMediaComponent = (goToMediaType: string) => {
    const mediaComponents: Record<string, React.ReactElement> = {
      photos: <UploadPhotos />,
      reorder: <ReorderPhotos />,
      videos: <UploadVideos />,
      attachments: <UploadAttachments />,
      none: steps[5],
    };
    return mediaComponents[goToMediaType] || steps[5];
  };

  const renderStep = () => {
    const enhancedSteps = steps.map(
      (step: React.ReactElement, index: number) => {
        if (index === 0) {
          return React.cloneElement(step);
        }
        return step;
      }
    );

    // If on step 0 and category was previously selected, show SelectNewCategory instead
    if (currentStepIndex === 0 && categoryPreviouslySelected) {
      return steps[10]; // SelectNewCategory component
    }

    if (currentStepIndex === 5) return getMediaComponent(goToMediaType);
    if (currentStepIndex === 2 && showFAQs)
      return (
        <Modal
          showModal={showFAQs}
          setShowModal={setShowFAQs}
          modalContent={<FAQs faqs={auctionFAQs} />}
        />
      );
    return enhancedSteps[currentStepIndex];
  };

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  return <FormProvider {...methods}>{renderStep()}</FormProvider>;
};

export default CreateAListingClient;
