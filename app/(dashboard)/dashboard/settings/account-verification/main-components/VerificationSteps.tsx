"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import styles from "./VerificationSteps.module.scss";
import Step from "./Step";
import UserTypeSelection from "./UserTypeSelection";
import axios from "axios";
import { verificationSchema } from "../lib/validation-schema";
import IndividualAccountVerification from "../components/individual/IndividualAccountVerification";
import UploadId from "../components/individual/UploadID";
import TakeSelfie from "../components/individual/TakeSelfie";
import EnterMobileNumber from "../components/individual/EnterMobileNumber";
import Finish from "../components/individual/VerificationComplete";
import BusinessAccountVerification from "../components/business/BusinessAccountVerification";
import EnterBusinessDetails from "../components/business/EnterBusinessDetails";
import UploadRepId from "../components/business/UploadRepId";
import RepSelfie from "../components/business/RepSelfie";
import EnterRepMobile from "../components/business/EnterRepMobile";
import BusinessVerificationComplete from "../components/business/BusinessVerificationComplete";
import LoadingSpinner from "@/components/LoadingSpinner";
import FormProgressBar from "../../../create-listing/components/FormProgressBar";

interface StepType {
  title: string;
  content: JSX.Element;
  path: string;
  fields: (keyof FormData)[];
}

interface FormData {
  phoneNumber: string;
  verificationCode?: string;
  idFile: File;
  selfie: string;
  businessName: string;
  regNumber: string;
  taxNumber: string;
  street: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  repIdFile: File;
  repSelfie: string;
  repPhoneNumber: string;
  repVerificationCode?: string;
}

interface VerificationStepsProps {
  initialType?: "individual" | "business";
  initialStep?: string;
}

const VerificationSteps: React.FC<VerificationStepsProps> = ({
  initialType,
  initialStep,
}) => {
  const router = useRouter();
  const [userType, setUserType] = useState<"individual" | "business" | null>(
    initialType || null
  );
  const [step, setStep] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const methods = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(verificationSchema),
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const steps: Record<"individual" | "business", StepType[]> = {
    individual: [
      {
        title: "Verify Your Account",
        content: <IndividualAccountVerification />,
        path: "account",
        fields: [],
      },
      {
        title: "ID/Passport",
        content: <UploadId onNext={() => handleNext()} />,
        path: "id-passport",
        fields: ["idFile"],
      },
      {
        title: "Selfie Verification",
        content: <TakeSelfie onNext={() => handleNext()} />,
        path: "selfie",
        fields: ["selfie"],
      },
      {
        title: "Mobile Verification",
        content: <EnterMobileNumber onNext={() => handleNext()} />,
        path: "mobile",
        fields: ["phoneNumber", "verificationCode"],
      },
      { title: "Finish", content: <Finish />, path: "finish", fields: [] },
    ],
    business: [
      {
        title: "Verify Business Account",
        content: <BusinessAccountVerification />,
        path: "account",
        fields: [],
      },
      {
        title: "Business Details Form",
        content: <EnterBusinessDetails onNext={() => handleNext()} />,
        path: "details",
        fields: [
          "businessName",
          "regNumber",
          "taxNumber",
          "street",
          "suburb",
          "city",
          "province",
          "postalCode",
        ],
      },
      {
        title: "Rep ID Verification",
        content: <UploadRepId onNext={() => handleNext()} />,
        path: "rep-id",
        fields: ["repIdFile"],
      },
      {
        title: "Rep Selfie Verification",
        content: <RepSelfie onNext={() => handleNext()} />,
        path: "rep-selfie",
        fields: ["repSelfie"],
      },
      {
        title: "Rep Mobile Verification",
        content: <EnterRepMobile onNext={() => handleNext()} />,
        path: "rep-mobile",
        fields: ["repPhoneNumber", "repVerificationCode"],
      },
      {
        title: "Finish",
        content: <BusinessVerificationComplete />,
        path: "finish",
        fields: [],
      },
    ],
  };

  const stepPaths = {
    individual: steps.individual.map((s) => s.path),
    business: steps.business.map((s) => s.path),
  };

  useEffect(() => {
    if (initialType && initialStep && isClient) {
      const validTypes = ["individual", "business"];
      if (!validTypes.includes(initialType)) {
        router.push("/dashboard/settings/account-verification");
        return;
      }
      const stepIndex =
        stepPaths[initialType as "individual" | "business"].indexOf(
          initialStep
        );
      if (stepIndex === -1) {
        router.push(
          `/dashboard/settings/account-verification/${initialType}/account`
        );
      } else {
        setUserType(initialType as "individual" | "business");
        setStep(stepIndex);
      }
    }
  }, [initialType, initialStep, router, isClient]);

  const handleUserType = (type: "individual" | "business") => {
    setUserType(type);
    setStep(0);
    methods.reset();
    router.push(
      `/dashboard/settings/account-verification/${type}/${steps[type][0].path}`
    );
  };

  const handleNext = async () => {
    if (!userType || step === null) return;
    const currentFields = steps[userType][step].fields;
    const isValid = await methods.trigger(currentFields);
    if (isValid && step < steps[userType].length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      router.push(
        `/dashboard/settings/account-verification/${userType}/${steps[userType][nextStep].path}`
      );
    } else if (isValid && step === steps[userType].length - 1) {
      // Submit form data to backend
      try {
        const formData = methods.getValues();
        await axios.post(
          "https://api.example.com/submit-verification",
          formData
        );
        router.push("/dashboard");
      } catch (error) {
        console.error("Submission failed:", error);
        methods.setError("root", {
          message: "Submission failed. Please try again.",
        });
      }
    }
  };

  const handleBack = () => {
    if (step !== null && step > 0 && userType) {
      const prevStep = step - 1;
      setStep(prevStep);
      router.push(
        `/dashboard/settings/account-verification/${userType}/${steps[userType][prevStep].path}`
      );
    } else {
      setUserType(null);
      methods.reset();
      router.push("/dashboard/settings/account-verification");
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
        ) : !userType ? (
          <UserTypeSelection onSelect={handleUserType} />
        ) : userType &&
          steps[userType] &&
          step !== null &&
          steps[userType][step] ? (
          <>
            <Step
              step={steps[userType][step]}
              onNext={handleNext}
              onBack={handleBack}
              isLastStep={step === steps[userType].length - 1}
            />
            <FormProgressBar
              currentStepIndex={step ?? 0}
              totalSteps={steps[userType].length}
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

export default VerificationSteps;
