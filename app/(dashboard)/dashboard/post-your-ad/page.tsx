"use client";
//https://www.youtube.com/watch?v=FXWD_etMJWA&list=PLeO8M-2wYaaV5vh2lRWV7qt_-Io8agaf-&index=1
//https://www.youtube.com/watch?v=uDCBSnWkuH0
//https://www.youtube.com/watch?v=lW_0InDuejU
import {
  FormProvider,
  useForm,
  FieldName,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { multiStepFormSchema } from "@/lib/validations/formValidations";
import styles from "./styles.module.scss";
import Button from "@/components/Buttons";
import SelectACategory from "./components/SelectACategory";
import Details from "./components/Details";
import Location from "./components/Location";
import UploadPhotos from "./components/UploadPhotos";
import UploadVideos from "./components/UploadVideos";
import UploadMedia from "./components/UploadMedia";
import ReorderPhotos from "./components/ReorderPhotos";
import UploadAttachments from "./components/UploadAttachments";
import Features from "./components/Features";
import Price from "./components/Price";
import TitleAndDescription from "./components/TitleAndDescription";
import PromoteYourAd from "./components/PromoteYourAd";
import ReviewAndSubmit from "./components/ReviewAndSubmit";
import CreateAccount from "./components/BankAccountDetails";
import useFormStore from "./store/useFormStore";
import { createAd } from "@/sanity/actions/createAd";

type FormValues = z.infer<typeof multiStepFormSchema>;
const Dashboard = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(multiStepFormSchema),
    defaultValues: useFormStore((state) => state.initialData),
  });

  const {
    message,
    currentStepIndex,
    isEditMode,
    next,
    back,
    goTo,
    setCategory,
  } = useFormStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form className={styles.container}>
        <div className={styles.form}>
          {currentStepIndex === 0 && (
            <SelectACategory goTo={goTo} setCategory={setCategory} />
          )}

          {currentStepIndex === 1 && <Details />}

          {currentStepIndex === 2 && <Features />}

          {currentStepIndex === 3 && <Price />}

          {currentStepIndex === 4 && <CreateAccount />}

          {currentStepIndex === 5 && <TitleAndDescription />}

          {currentStepIndex === 6 && <UploadMedia goTo={goTo} />}

          {currentStepIndex === 7 && <UploadPhotos goTo={goTo} />}

          {currentStepIndex === 8 && <UploadVideos goTo={goTo} />}

          {currentStepIndex === 9 && <UploadAttachments goTo={goTo} />}

          {currentStepIndex === 10 && <Location />}

          {currentStepIndex === 11 && <PromoteYourAd />}

          {currentStepIndex === 12 && <ReviewAndSubmit />}

          {currentStepIndex === 13 && <ReorderPhotos />}
        </div>
      </form>
    </FormProvider>
  );
};

export default Dashboard;
