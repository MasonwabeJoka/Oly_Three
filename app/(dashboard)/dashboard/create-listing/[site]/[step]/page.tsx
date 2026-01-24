import CreateListingSteps from "../../components/CreateListingSteps";

export default async function CreateAListingStepPage({
  params,
}: {
  params: { site: string; step: string };
}) {
  const { site, step } = await params;

  return (
    <CreateListingSteps
      currentSite={
        site as
          | "oly"
          | "oly-properties"
          | "oly-auto"
          | "oly-hiring"
          | "oly-services"
      }
      currentStep={step}
    />
  );
}
