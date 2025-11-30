"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import styles from "./CreateAListingSteps.module.scss";
import Step from "./Step";
import SelectACategory from "./SelectACategory";
import Details from "./Details";
import Price from "./Price";
import BankAccountDetails from "./BankAccountDetails";
import TitleAndDescription from "./TitleAndDescription";
import UploadMedia from "./UploadMedia";
import Location from "./Location";
import PromoteYourAd from "./PromoteYourAds";
import ReviewAndSubmit from "./ReviewAndSubmit";
import LoadingSpinner from "@/components/LoadingSpinner";
import SiteSelection from "./SiteSelection";
import ReviewListing from "./ReviewListing";
import { formDataSchema } from "../validations/formDataSchema";
import AuctionPrice from "./AuctionPrice";
import { useIsAuctionStore } from "../store/useIsAuction";
import FormProgressBar from "./FormProgressBar";

type FormDataFields =
  | "category.main"
  | "category.subcategory"
  | "details.condition"
  | "titleAndDescription.title"
  | "titleAndDescription.description"
  | "listingType"
  | "price.pricingOption"
  | "price.amount"
  | "price.startingPrice"
  | "price.buyNowPrice"
  | "price.startTime"
  | "createAccount.bankName"
  | "createAccount.accountHolder"
  | "createAccount.accountNumber"
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
  listingType: "sale" | "auction";
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

interface CreateAListingStepsProps {
  currentSite?:
    | "oly"
    | "oly-properties"
    | "oly-auto"
    | "oly-hiring"
    | "oly-services";
  currentStep?: string;
}

const CreateAListingSteps: React.FC<CreateAListingStepsProps> = ({
  currentSite,
  currentStep,
}) => {
  const router = useRouter();
  const { isAuction } = useIsAuctionStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [site, setSite] = useState<
    "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services" | null
  >(currentSite || null);
  const [step, setStep] = useState<number | null>(null);
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
        title: "Listing Description",
        content: <TitleAndDescription onNext={() => handleNext()} />,
        path: "title-and-description",
        fields: [
          "titleAndDescription.title",
          "titleAndDescription.description",
        ],
      },
      isAuction
        ? {
            title: "Auction Price",
            content: <AuctionPrice onNext={() => handleNext()} />,
            path: "auction-price",
            fields: ["price.pricingOption", "price.amount"],
          }
        : {
            title: "Price",
            content: <Price onNext={() => handleNext()} />,
            path: "price",
            fields: ["price.pricingOption", "price.amount"],
          },

      {
        title: "Product Details",
        content: <Details onNext={() => handleNext()} />,
        path: "details",
        fields: ["details.condition"],
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
    if (currentSite && currentStep && isClient) {
      const validTypes = [
        "oly",
        "oly-properties",
        "oly-auto",
        "oly-hiring",
        "oly-services",
      ];
      if (!validTypes.includes(currentSite)) {
        router.push("/dashboard/create-listing/oly/select-category");
        return;
      }
      const stepIndex = stepPaths[currentSite].indexOf(currentStep);
      if (stepIndex === -1) {
        router.push(`/dashboard/create-listing/${currentSite}/select-category`);
      } else {
        setSite(currentSite);
        setStep(stepIndex);
      }
    }
  }, [currentSite, currentStep, router, isAuction, isClient]);

  const handleSiteSelection = (
    site: "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services"
  ) => {
    setSite(site);
    setStep(0);
    methods.reset();
    router.push(`/dashboard/create-listing/${site}/${steps[site][0].path}`);
  };

  const handleNext = async () => {
    if (!site || step === null) return;
    const currentFields = steps[site][step!].fields;
    const isValid = await methods.trigger(currentFields);
    if (isValid && step! < steps[site].length - 1) {
      const nextStep = step! + 1;

      setStep(nextStep);
      router.push(
        `/dashboard/create-listing/${site}/${steps[site][nextStep].path}`
      );
    } else if (isValid && step! === steps[site].length - 1) {
      router.push(`/dashboard/create-listing/${site}/published`); //temp

      // Submit form data to backend
      // try {
      //   const formData = methods.getValues();
      //   await axios.post(
      //     "https://api.example.com/submit-verification",
      //     formData
      //   );
      //   router.push(`/dashboard/create-listing/${site}/published`);
      // } catch (error) {
      //   console.error("Submission failed:", error);
      //   methods.setError("root", {
      //     message: "Submission failed. Please try again.",
      //   });
      // }
    }
  };

  const handleBack = () => {
    if (!site || step === null) return;

    // If on review-and-submit step (last step), skip review-message step
    if (step! === steps[site].length - 1) {
      const prevStep = step! - 2; // Skip review-message step
      setStep(prevStep);
      router.push(
        `/dashboard/create-listing/${site}/${steps[site][prevStep].path}`
      );
    } else if (step! > 1) {
      const prevStep = step! - 1;
      setStep(prevStep);
      router.push(
        `/dashboard/create-listing/${site}/${steps[site][prevStep].path}`
      );
    } else if (step! === 1) {
      setStep(1);
      router.push(`/dashboard/create-listing/${site}/select-new-category`);
      } else {
      setSite(null);
      methods.reset();
      router.push("/dashboard/create-listing/");
    }
  };

  const goTo = (path: string) => {
    if (!site) return;
    const stepIndex = steps[site].findIndex((s) => s.path === path);
    if (stepIndex !== -1) {
      setStep(stepIndex);
      router.push(`/dashboard/create-listing/${site}/${path}`);
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
        {!isClient ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : !site ? (
          <SiteSelection onSelect={handleSiteSelection} />
        ) : site && steps[site] && step !== null && steps[site][step!] ? (
          <>
            <Step
              step={steps[site][step!] as StepType}
              key={steps[site][step!]}
              onNext={handleNext}
              onBack={handleBack}
              isLastStep={step! === steps[site].length - 1}
              isFirstStep={step! === 0}
            />
            <FormProgressBar
              currentStepIndex={step ?? 0}
              totalSteps={steps[site].length}
            />
          </>
        ) : (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default CreateAListingSteps;
