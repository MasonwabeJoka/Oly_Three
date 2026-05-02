"use client";
import { useParams } from "next/navigation";
import CreateListingSteps from "../../components/CreateListingSteps";
import LoadingSpinner from "@/components/LoadingSpinner";
import useFormStore from "../../store/useFormStore";
import { SiteType } from "../../types/listing.types";

export default function CreateAListingStepPage() {
  const params = useParams<{ site: string; step: string }>();
  const site = params?.site;
  const step = params?.step;
  const resetKey = useFormStore((state) => state.resetKey);

  if (!site || !step) {
    return <LoadingSpinner />;
  }

  return (
    <CreateListingSteps
      key={resetKey}
      currentSite={site as SiteType}
      currentStep={step}
    />
  );
}
