"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import styles from "./CreateListingSteps.module.scss";
import Step from "./Step";
import LoadingSpinner from "@/components/LoadingSpinner";
import SiteSelection from "./SiteSelection";
import { formDataSchema } from "../validations/formDataSchema";
import { useIsAuctionStore } from "../store/useIsAuction";
import FormProgressBar from "./FormProgressBar";
import { FormData, CreateListingStepsProps, StepType, SiteType } from "../types/listing.types";
import { getStepDefinitions } from "../config/stepDefinitions";

export type { FormData };

const CreateListingSteps: React.FC<CreateListingStepsProps> = ({
  currentSite,
  currentStep,
}) => {
  const router = useRouter();
  const { isAuction } = useIsAuctionStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [site, setSite] = useState<SiteType | null>(currentSite || null);
  const [step, setStep] = useState<number | null>(null);
  const methods = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(formDataSchema),
  });

  const handleNext = async () => {
    if (!site || step === null) return;
    const currentFields = steps[site][step!].fields;
    const isValid = await methods.trigger(currentFields);
    if (isValid && step! < steps[site].length - 1) {
      const nextStep = step! + 1;
      router.push(
        `/dashboard/create-listing/${site}/${steps[site][nextStep].path}`
      );
    } else if (isValid && step! === steps[site].length - 1) {
      router.push(`/dashboard/create-listing/${site}/published`);
    }
  };

  const steps = useMemo(() => getStepDefinitions(isAuction, handleNext), [isAuction]);

  const stepPaths: Record<SiteType, string[]> = {
    oly: steps.oly.map((step) => step.path),
    "oly-properties": steps["oly-properties"].map((step) => step.path),
    "oly-auto": steps["oly-auto"].map((step) => step.path),
    "oly-hiring": steps["oly-hiring"].map((step) => step.path),
    "oly-services": steps["oly-services"].map((step) => step.path),
  };

  useEffect(() => {
    if (currentSite && currentStep && isClient) {
      const validTypes: SiteType[] = ["oly", "oly-properties", "oly-auto", "oly-hiring", "oly-services"];
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
  }, [currentSite, currentStep, router, isAuction, isClient, stepPaths]);

  const handleSiteSelection = (selectedSite: SiteType) => {
    methods.reset();
    router.push(`/dashboard/create-listing/${selectedSite}/${steps[selectedSite][0].path}`);
  };

  const handleBack = () => {
    if (!site || step === null) return;

    if (step! === steps[site].length - 1) {
      const prevStep = step! - 2;
      router.push(
        `/dashboard/create-listing/${site}/${steps[site][prevStep].path}`
      );
    } else if (step! > 1) {
      const prevStep = step! - 1;
      router.push(
        `/dashboard/create-listing/${site}/${steps[site][prevStep].path}`
      );
    } else if (step! === 1) {
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

export default CreateListingSteps;
