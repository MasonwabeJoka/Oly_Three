"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import styles from "./PostYourAdSteps.module.scss";
import Step from "./Step";

import { verificationSchema } from "../lib/validation-schema";
import SelectACategory from "../../post-your-ad/components/SelectACategory";
import Details from "../../post-your-ad/components/Details";
import Price from "../../post-your-ad/components/Price";
import BankAccountDetails from "../../post-your-ad/components/BankAccountDetails";
import TitleAndDescription from "../../post-your-ad/components/TitleAndDescription";
import UploadMedia from "../../post-your-ad/components/UploadMedia";
import Location from "../../post-your-ad/components/Location";
import PromoteYourAd from "@/components/PromoteYourAds";
import ReviewAndSubmit from "../../post-your-ad/components/ReviewAndSubmit";
import LoadingSpinner from "@/components/LoadingSpinner";
import SiteSelection from "./SiteSelection";
import ReviewListing from "./ReviewListing";
import { formDataSchema } from "../validations/formDataSchema";

type FormDataFields =
  | "category.main"
  | "category.subcategory"
  | "details.condition"
  | "price.pricingOption"
  | "price.amount"
  | "price.startingPrice"
  | "price.buyNowPrice"
  | "price.startTime"
  | "createAccount.bankName"
  | "createAccount.accountHolder"
  | "createAccount.accountNumber"
  | "titleAndDescription.title"
  | "titleAndDescription.description"
  | "uploadMedia.uploadPhotos"
  | "uploadMedia.uploadVideos"
  | "uploadMedia.uploadAttachments"
  | "location.province"
  | "location.city"
  | "location.suburb"
  | "location.customLocation"
  | "promoteYourAd.promotionDuration"
  | "reviewYourAd";
interface StepType {
  title: string;
  content: React.ReactNode;
  path: string;
  fields: FormDataFields[];
}

export type FormData = {
  category: { main: string; subcategory: string };
  details: { condition: string };
  price: {
    pricingOption: string;
    amount: number;
    startingPrice?: number;
    buyNowPrice?: number;
    startTime?: string;
  };
  createAccount: {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
  };
  titleAndDescription: {
    title: string;
    description: string;
  };
  uploadMedia: {
    uploadPhotos: boolean;
    uploadVideos: boolean;
    uploadAttachments: boolean;
  };
  location: {
    province: string;
    city: string;
    suburb: string;
    customLocation?: string;
  };
  promoteYourAd: { promotionDuration: string };
  reviewYourAd?: string;
};

interface PostYourAdStepsProps {
  currentSite?:
    | "oly"
    | "oly-properties"
    | "oly-auto"
    | "oly-hiring"
    | "oly-services";
  currentStep?: string;
}

const PostYourAdSteps: React.FC<PostYourAdStepsProps> = ({
  currentSite,
  currentStep,
}) => {
  const router = useRouter();
  const [site, setSite] = useState<
    "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services" | null
  >(currentSite || null);
  const [step, setStep] = useState<number>(0);
  const methods = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(formDataSchema),
  });

  const steps: Record<
    "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services",
    StepType[]
  > = {
    oly: [
      {
        title: "Select A Category",
        content: <SelectACategory />,
        path: "select-category",
        fields: ["category.main", "category.subcategory"],
      },
      {
        title: "Product Details",
        content: <Details onNext={() => handleNext()} />,
        path: "details",
        fields: ["details.condition"],
      },
      {
        title: "Price",
        content: <Price onNext={() => handleNext()} />,
        path: "price",
        fields: ["price.pricingOption", "price.amount"],
      },
      {
        title: "Bank Account Details",
        content: <BankAccountDetails onNext={() => handleNext()} />,
        path: "create-account",
        fields: [
          "createAccount.bankName",
          "createAccount.accountHolder",
          "createAccount.accountNumber",
        ],
      },
      {
        title: "Ad Description",
        content: <TitleAndDescription onNext={() => handleNext()} />,
        path: "title-and-description",
        fields: [
          "titleAndDescription.title",
          "titleAndDescription.description",
        ],
      },
      {
        title: "Upload Media",
        content: <UploadMedia onNext={() => handleNext()} />,
        path: "upload-media",
        fields: [
          "uploadMedia.uploadPhotos",
          "uploadMedia.uploadVideos",
          "uploadMedia.uploadAttachments",
        ],
      },
      {
        title: "Location",
        content: <Location onNext={() => handleNext()} />,
        path: "location",
        fields: [
          "location.province",
          "location.city",
          "location.suburb",
          "location.customLocation",
        ],
      },
      {
        title: "Promote Your Ad",
        content: <PromoteYourAd onNext={() => handleNext()} />,
        path: "promote-your-ad",
        fields: ["promoteYourAd.promotionDuration"],
      },
      {
        title: "Review Listing",
        content: <ReviewListing onNext={() => handleNext()} />,
        path: "review-message",
        fields: [],
      },
      {
        title: "Review Your Listing",
        content: <ReviewAndSubmit onNext={() => handleNext()} />,
        path: "review-and-submit",
        fields: [],
      },
    ],
    "oly-properties": [
      {
        title: "Select A Category",
        content: <SelectACategory />,
        path: "select-category",
        fields: ["category.main", "category.subcategory"],
      },
      {
        title: "Product Details",
        content: <Details onNext={() => handleNext()} />,
        path: "details",
        fields: ["details.condition"],
      },
      {
        title: "Price",
        content: <Price onNext={() => handleNext()} />,
        path: "price",
        fields: ["price.pricingOption", "price.amount"],
      },
      {
        title: "Bank Account Details",
        content: <BankAccountDetails onNext={() => handleNext()} />,
        path: "create-account",
        fields: [
          "createAccount.bankName",
          "createAccount.accountHolder",
          "createAccount.accountNumber",
        ],
      },
      {
        title: "Ad Description",
        content: <TitleAndDescription onNext={() => handleNext()} />,
        path: "title-and-description",
        fields: [
          "titleAndDescription.title",
          "titleAndDescription.description",
        ],
      },
      {
        title: "Upload Media",
        content: <UploadMedia onNext={() => handleNext()} />,
        path: "upload-media",
        fields: [
          "uploadMedia.uploadPhotos",
          "uploadMedia.uploadVideos",
          "uploadMedia.uploadAttachments",
        ],
      },
      {
        title: "Location",
        content: <Location onNext={() => handleNext()} />,
        path: "location",
        fields: [
          "location.province",
          "location.city",
          "location.suburb",
          "location.customLocation",
        ],
      },
      {
        title: "Promote Your Ad",
        content: <PromoteYourAd onNext={() => handleNext()} />,
        path: "promote-your-ad",
        fields: ["promoteYourAd.promotionDuration"],
      },
      {
        title: "Review Listing",
        content: <ReviewListing onNext={() => handleNext()} />,
        path: "review-message",
        fields: [],
      },
      {
        title: "Review Your Listing",
        content: <ReviewAndSubmit onNext={() => handleNext()} />,
        path: "review-and-submit",
        fields: [],
      },
    ],
    "oly-auto": [
      {
        title: "Select A Category",
        content: <SelectACategory />,
        path: "select-category",
        fields: ["category.main", "category.subcategory"],
      },
      {
        title: "Product Details",
        content: <Details onNext={() => handleNext()} />,
        path: "details",
        fields: ["details.condition"],
      },
      {
        title: "Price",
        content: <Price onNext={() => handleNext()} />,
        path: "price",
        fields: ["price.pricingOption", "price.amount"],
      },
      {
        title: "Bank Account Details",
        content: <BankAccountDetails onNext={() => handleNext()} />,
        path: "create-account",
        fields: [
          "createAccount.bankName",
          "createAccount.accountHolder",
          "createAccount.accountNumber",
        ],
      },
      {
        title: "Ad Description",
        content: <TitleAndDescription onNext={() => handleNext()} />,
        path: "title-and-description",
        fields: [
          "titleAndDescription.title",
          "titleAndDescription.description",
        ],
      },
      {
        title: "Upload Media",
        content: <UploadMedia onNext={() => handleNext()} />,
        path: "upload-media",
        fields: [
          "uploadMedia.uploadPhotos",
          "uploadMedia.uploadVideos",
          "uploadMedia.uploadAttachments",
        ],
      },
      {
        title: "Location",
        content: <Location onNext={() => handleNext()} />,
        path: "location",
        fields: [
          "location.province",
          "location.city",
          "location.suburb",
          "location.customLocation",
        ],
      },
      {
        title: "Promote Your Ad",
        content: <PromoteYourAd onNext={() => handleNext()} />,
        path: "promote-your-ad",
        fields: ["promoteYourAd.promotionDuration"],
      },
      {
        title: "Review Listing",
        content: <ReviewListing onNext={() => handleNext()} />,
        path: "review-message",
        fields: [],
      },
      {
        title: "Review Your Listing",
        content: <ReviewAndSubmit onNext={() => handleNext()} />,
        path: "review-and-submit",
        fields: [],
      },
    ],
    "oly-hiring": [
      {
        title: "Select A Category",
        content: <SelectACategory />,
        path: "select-category",
        fields: ["category.main", "category.subcategory"],
      },
      {
        title: "Product Details",
        content: <Details onNext={() => handleNext()} />,
        path: "details",
        fields: ["details.condition"],
      },
      {
        title: "Price",
        content: <Price onNext={() => handleNext()} />,
        path: "price",
        fields: ["price.pricingOption", "price.amount"],
      },
      {
        title: "Bank Account Details",
        content: <BankAccountDetails onNext={() => handleNext()} />,
        path: "create-account",
        fields: [
          "createAccount.bankName",
          "createAccount.accountHolder",
          "createAccount.accountNumber",
        ],
      },
      {
        title: "Ad Description",
        content: <TitleAndDescription onNext={() => handleNext()} />,
        path: "title-and-description",
        fields: [
          "titleAndDescription.title",
          "titleAndDescription.description",
        ],
      },
      {
        title: "Upload Media",
        content: <UploadMedia onNext={() => handleNext()} />,
        path: "upload-media",
        fields: [
          "uploadMedia.uploadPhotos",
          "uploadMedia.uploadVideos",
          "uploadMedia.uploadAttachments",
        ],
      },
      {
        title: "Location",
        content: <Location onNext={() => handleNext()} />,
        path: "location",
        fields: [
          "location.province",
          "location.city",
          "location.suburb",
          "location.customLocation",
        ],
      },
      {
        title: "Promote Your Ad",
        content: <PromoteYourAd onNext={() => handleNext()} />,
        path: "promote-your-ad",
        fields: ["promoteYourAd.promotionDuration"],
      },
      {
        title: "Review Listing",
        content: <ReviewListing onNext={() => handleNext()} />,
        path: "review-message",
        fields: [],
      },
      {
        title: "Review Your Listing",
        content: <ReviewAndSubmit onNext={() => handleNext()} />,
        path: "review-and-submit",
        fields: [],
      },
    ],
    "oly-services": [
      {
        title: "Select A Category",
        content: <SelectACategory />,
        path: "select-category",
        fields: ["category.main", "category.subcategory"],
      },
      {
        title: "Product Details",
        content: <Details onNext={() => handleNext()} />,
        path: "details",
        fields: ["details.condition"],
      },
      {
        title: "Price",
        content: <Price onNext={() => handleNext()} />,
        path: "price",
        fields: ["price.pricingOption", "price.amount"],
      },
      {
        title: "Bank Account Details",
        content: <BankAccountDetails onNext={() => handleNext()} />,
        path: "create-account",
        fields: [
          "createAccount.bankName",
          "createAccount.accountHolder",
          "createAccount.accountNumber",
        ],
      },
      {
        title: "Ad Description",
        content: <TitleAndDescription onNext={() => handleNext()} />,
        path: "title-and-description",
        fields: [
          "titleAndDescription.title",
          "titleAndDescription.description",
        ],
      },
      {
        title: "Upload Media",
        content: <UploadMedia onNext={() => handleNext()} />,
        path: "upload-media",
        fields: [
          "uploadMedia.uploadPhotos",
          "uploadMedia.uploadVideos",
          "uploadMedia.uploadAttachments",
        ],
      },
      {
        title: "Location",
        content: <Location onNext={() => handleNext()} />,
        path: "location",
        fields: [
          "location.province",
          "location.city",
          "location.suburb",
          "location.customLocation",
        ],
      },
      {
        title: "Promote Your Ad",
        content: <PromoteYourAd onNext={() => handleNext()} />,
        path: "promote-your-ad",
        fields: ["promoteYourAd.promotionDuration"],
      },
       {
        title: "Review Listing",
        content: <ReviewListing onNext={() => handleNext()} />,
        path: "review-message",
        fields: [],
      },
      {
        title: "Review Your Listing",
        content: <ReviewAndSubmit onNext={() => handleNext()} />,
        path: "review-and-submit",
        fields: [],
      },
    ],
  };

  const stepPaths: Record<
    "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services",
    string[]
  > = {
    oly: steps.oly.map((step) => step.path),
    "oly-properties": steps["oly-properties"].map((step) => step.path),
    "oly-auto": steps["oly-auto"].map((step) => step.path),
    "oly-hiring": steps["oly-hiring"].map((step) => step.path),
    "oly-services": steps["oly-services"].map((step) => step.path),
  };

  useEffect(() => {
    if (currentSite && currentStep) {
      const validTypes = [
        "oly",
        "oly-properties",
        "oly-auto",
        "oly-hiring",
        "oly-services",
      ];
      if (!validTypes.includes(currentSite)) {
        router.push("/dashboard/post-your-ad/oly/select-a-category");
        return;
      }
      const stepIndex =
        stepPaths[
          (currentSite as "oly",
          "oly-properties",
          "oly-auto",
          "oly-hiring",
          "oly-services")
        ].indexOf(currentStep);
      if (stepIndex === -1) {
        router.push(`/dashboard/post-your-ad/${currentSite}/select-a-category`);
      } else {
        setSite(
          currentSite as
            | "oly"
            | "oly-properties"
            | "oly-auto"
            | "oly-hiring"
            | "oly-services"
        );
        setStep(stepIndex);
      }
    }
  }, [currentSite, currentStep, router]);

  const handleSiteSelection = (
    site: "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services"
  ) => {
    setSite(site);
    setStep(0);
    methods.reset();
    router.push(`/dashboard/post-your-ad/${site}/${steps[site][0].path}`);
  };

  const handleNext = async () => {
    if (!site) return;
    const currentFields = steps[site][step].fields;
    const isValid = await methods.trigger(currentFields);
    if (isValid && step < steps[site].length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      router.push(
        `/dashboard/post-your-ad/${site}/${steps[site][nextStep].path}`
      );
    } else if (isValid && step === steps[site].length - 1) {
      router.push(`/dashboard/post-your-ad/${site}/published`); //temp

      // Submit form data to backend
      // try {
      //   const formData = methods.getValues();
      //   await axios.post(
      //     "https://api.example.com/submit-verification",
      //     formData
      //   );
      //   router.push(`/dashboard/post-your-ad/${site}/published`);
      // } catch (error) {
      //   console.error("Submission failed:", error);
      //   methods.setError("root", {
      //     message: "Submission failed. Please try again.",
      //   });
      // }
    }
  };

  const handleBack = () => {
    if (!site) return;
    
    // If on review-and-submit step (last step), skip review-message step
    if (step === steps[site].length - 1) {
      const prevStep = step - 2; // Skip review-message step
      console.log(`Skipping back from step ${step} to step ${prevStep}`);
      setStep(prevStep);
      router.push(
        `/dashboard/post-your-ad/${site}/${steps[site][prevStep].path}`
      );
    } else if (step > 1) {
      const prevStep = step - 1;
      setStep(prevStep);
      router.push(
        `/dashboard/post-your-ad/${site}/${steps[site][prevStep].path}`
      );
    } else if (step === 1) {
      setStep(1);
      router.push(`/dashboard/post-your-ad/${site}/select-new-category`);
    } else {
      setSite(null);
      methods.reset();
      router.push("/dashboard/post-your-ad/");
    }
  };

  const goTo = (path: string) => {
    if (!site) return;
    const stepIndex = steps[site].findIndex((s) => s.path === path);
    if (stepIndex !== -1) {
      setStep(stepIndex);
      router.push(`/dashboard/post-your-ad/${site}/${path}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.container}>
        {methods.formState.errors.root && (
          <p className={styles.error}>
            {methods.formState.errors.root.message}
          </p>
        )}
        {!site ? (
          <SiteSelection onSelect={handleSiteSelection} />
        ) : site && steps[site] && steps[site][step] ? (
          <Step
            step={steps[site][step]}
            onNext={handleNext}
            onBack={handleBack}
            isLastStep={step === steps[site].length - 1}
            isFirstStep={step === 0}
          />
        ) : (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default PostYourAdSteps;
