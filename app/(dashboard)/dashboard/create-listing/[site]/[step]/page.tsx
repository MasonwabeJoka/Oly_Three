"use client";
import { use, Suspense } from "react";
import CreateListingSteps from "../../components/CreateListingSteps";
import LoadingSpinner from "@/components/LoadingSpinner";
import useFormStore from "../../store/useFormStore";
import { SiteType } from "../../types/listing.types";

export default function CreateAListingStepPage({
  params,
}: {
  params: Promise<{ site: string; step: string }>;
}) {
  const { site, step } = use(params);
  const resetKey = useFormStore((state) => state.resetKey);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CreateListingSteps
        key={resetKey}
        currentSite={site as SiteType}
        currentStep={step}
      />
    </Suspense>
  );
}
