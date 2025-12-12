import VerificationSteps from "../../main-components/VerificationSteps";

export default async function VerifyStepPage({
  params,
}: {
  params: Promise<{ type: string; step: string }>;
}) {
  const { type, step } = await params;
 
  return (
    <VerificationSteps
      initialType={type as "individual" | "business"}
      initialStep={step}
    />
  );
}
