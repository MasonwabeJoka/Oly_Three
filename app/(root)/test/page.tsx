import TestSteps from "./components/TestSteps";

export default function VerifyStepPage({
  params,
}: {
  params: { type: string; step: string };
}) {
  const {  step } = params;
 
  return (
    <TestSteps
      
    />
  );
}
