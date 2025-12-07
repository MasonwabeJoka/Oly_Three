import CreateAListingSteps from "../../components/CreateAListingSteps";


export default async function CreateAListingStepPage({
  params,
}: {
  params: { site: string; step: string };
}) {
  const { site, step } = await params;


  return (
    <CreateAListingSteps
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
