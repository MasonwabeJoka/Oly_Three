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

const Dashboard = () => {
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
    <Details />,
    <Features/>,
    <Price/>,
    <TitleAndDescription/>,
    <UploadMedia />,
    <Location />,
    <PromoteYourAd/>,
    // <UploadPhotos />,
    // <UploadVideos />,
    // <UploadAttachments />,
  ]);

  return (
    <MaxWidthWrapper className={styles.maxWidthWrapper}>
      <div className={styles.container}>
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
            type="button"
            ariaLabel="Proceed Button"
            autoFocus={false}
            disabled={false}
            dashboard
            onClick={next}
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
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
