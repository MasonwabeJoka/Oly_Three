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


type FormValues = {
  [key: string]: any; // Dynamic object structure for the different steps
};

const Dashboard = () => {
  // Get media upload state from the media store
  const { uploadPhotos, reorderPhotos, uploadVideos, uploadAttachments } =
    useUploadMediaStore();
  
  // Define validation schemas for each step of the form
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

  // Get form state and actions from Zustand form store
  const { currentStepIndex, goTo, setCategory } = useFormStore();

  // Set up react-hook-form with Zod resolver and default form values from Zustand
  const methods = useForm<FormValues>({
    resolver: zodResolver(validationSchemaSteps[currentStepIndex]),
    defaultValues: useFormStore((state) => state.formData),  // Updated to reflect formData structure
  });

  // Get the state to control FAQs modal from Zustand store
  const { showFAQs, setShowFAQs } = useQAndAStore();

  return (
    <FormProvider {...methods}>
      <form className={styles.container}>
        
        <div className={styles.form}>
          {/* Render the correct form step based on currentStepIndex */}
          {currentStepIndex === 0 && (
            <SelectACategory goTo={goTo} setCategory={setCategory} />
          )}

          {currentStepIndex === 1 && <Details />}

          {currentStepIndex === 2 && !showFAQs ? (
            <Price />
          ) : currentStepIndex === 2 && showFAQs ? (
            <Modal
              showModal={showFAQs}
              setShowModal={setShowFAQs}
              modalContent={<FAQs faqs={auctionFAQs} />}
            />
          ) : null}

          {currentStepIndex === 3 && <BankAccountDetails />}

          {currentStepIndex === 4 && <TitleAndDescription />}

          {/* Conditional rendering based on media upload actions */}
          {uploadPhotos ? (
            <UploadPhotos />
          ) : reorderPhotos ? (
            <ReorderPhotos />
          ) : uploadVideos ? (
            <UploadVideos />
          ) : uploadAttachments ? (
            <UploadAttachments />
          ) : (
            currentStepIndex === 5 && <UploadMedia />
          )}

          {currentStepIndex === 6 && <Location />}

          {currentStepIndex === 7 && <PromoteYourAd />}

          {currentStepIndex === 8 && <Congratulations />}

          {currentStepIndex === 9 && <ReviewAndSubmit />}
        </div>
      </form>
    </FormProvider>
  );
};

export default Dashboard;