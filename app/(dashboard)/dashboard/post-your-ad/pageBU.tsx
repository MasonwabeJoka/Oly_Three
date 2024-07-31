"use client";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";
import styles from "./styles.module.scss";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import Button from "@/components/Buttons";
import SelectACategory from "./components/SelectACategory";
import Details from "./components/Details";
import Location from "./components/Location";
import UploadPhotos from "./components/UploadPhotos";
import UploadVideos from "./components/UploadVideos";
import UploadMedia from "./components/UploadMedia";
import UploadAttachments from "./components/UploadAttachments";
import Features from "./components/Features";
import Price from "./components/Price";
import TitleAndDescription from "./components/TitleAndDescription";
import PromoteYourAd from "./components/PromoteYourAd";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

type FormData = {
  condition: string;
  selectDetail: string;
  detail: string;
  selectedFeature: string;
  feature: string;
  priceType: string;
  price: number;
  title: string;
  description: string;
  image: string;
  video: string;
  attachment: string;
  province: string;
  city: string;
  suburb: string;
  customLocation: string;
};

const initialData: FormData = {
  condition: "Condition",
  selectDetail: "Choose details to include",
  detail: "test",
  selectedFeature: "test",
  feature: "test",
  priceType: "Choose Pricing Option",
  price: 0,
  title: "",
  description: "test",
  image: "",
  video: "",
  attachment: "",
  province: "Select your province",
  city: "Select your city",
  suburb: "Select your suburb",
  customLocation: "",
};

const Dashboard = () => {
  const [data, setData] = useState(initialData);

  const methods = useForm<FormData>({ defaultValues: initialData });

  const validateStep = async (index: number) => {
    const isValid = await methods.trigger();
    return isValid;
  };

  const {
    currentStepIndex,
    step,
    steps,
    next,
    back,
    goTo,
    isFirstStep,
    isLastStep,
  } = useMultistepForm([
    <SelectACategory />,
    <Details {...data} />,
    <Features {...data} />,
    <Price {...data} />,
    <TitleAndDescription {...data} />,
    <UploadMedia {...data} />,
    <Location {...data} />,
    <PromoteYourAd {...data} />,
    // <UploadPhotos {...data}/>,
    // <UploadVideos {...data}/>,
    // <UploadAttachments {...data}/>,
  ]);

  const onSubmit = (event) => {
    event.preventDefault();
    next(); // go to next step
  };
  return (
    <FormProvider {...methods}>
      <MaxWidthWrapper className={styles.MaxWidthWrapper}>
        <form className={styles.container} onSubmit={onSubmit}>
          <div
            className={styles.stepsCounter}
            style={{ position: "absolute", top: ".5rem", right: "3rem" }}
          >
            {currentStepIndex + 1}/{steps.length}
          </div>
          {step}
          <nav className={styles.buttons}>
            <Button
              className={styles.proceedButton}
              buttonChildren={isLastStep ? "Finish" : "Proceed"}
              buttonType="primary"
              buttonSize="large"
              name="proceed-btn"
              type="submit"
              ariaLabel="Proceed Button"
              autoFocus={false}
              disabled={false}
              dashboard
            />

            {!isFirstStep && (
              <Button
                className={styles.backButton}
                buttonChildren="Back"
                buttonType="normal"
                buttonSize="large"
                name="back-btn"
                type="button"
                ariaLabel="Back Button"
                autoFocus={false}
                disabled={false}
                dashboard
                onClick={back}
              />
            )}
          </nav>
        </form>
      </MaxWidthWrapper>
    </FormProvider>
  );
};

export default Dashboard;
