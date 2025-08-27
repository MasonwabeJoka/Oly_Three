import VerificationSteps from "../../main-components/VerificationSteps";

export default function VerifyStepPage({
  params,
}: {
  params: { type: string; step: string };
}) {
  const { type, step } = params;
 
  return (
    <VerificationSteps
      initialType={type as "individual" | "business"}
      initialStep={step}
    />
  );
}
