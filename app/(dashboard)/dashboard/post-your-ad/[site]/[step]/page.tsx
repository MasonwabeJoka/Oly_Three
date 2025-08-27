import PostYourAdSteps from "../../components/PostYourAdSteps";


export default async function PostYourAdStepPage({
  params,
}: {
  params: { site: string; step: string };
}) {
  const { site, step } = await params;

  return (
    <PostYourAdSteps
      currentSite={site as "oly" | "oly-properties" | "oly-auto" | "oly-hiring" | "oly-services"}
      currentStep={step}
    />
  );
}
