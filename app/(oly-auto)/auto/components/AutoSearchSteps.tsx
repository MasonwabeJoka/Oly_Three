import EnterMobileNumber from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/EnterMobileNumber";
import IndividualAccountVerification from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/IndividualAccountVerification";
import TakeSelfie from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/TakeSelfie";
import UploadId from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/UploadID";
import Finish from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/VerificationComplete";
import { verificationSchema } from "@/app/(dashboard)/dashboard/settings/account-verification/lib/validation-schema";
import MultiStepForm from "@/components/MultiStepForm";
import { z } from 'zod';

export type FormData = z.infer<typeof verificationSchema>;

// Define step type with proper typing for content
interface FormStep {
  title: string;
  content: React.ReactNode;
  fields: (keyof FormData)[];
}

const steps: FormStep[] = [
  {
    title: "Verify Your Account",
    content: <IndividualAccountVerification />,
    fields: [],
  },
  {
    title: "Business Information",
    content: <div>Business Information Form</div>,
    fields: ["businessName", "regNumber", "taxNumber"],
  },
  {
    title: "Address Information",
    content: <div>Address Form</div>,
    fields: ["street", "suburb", "city", "province", "postalCode"],
  },
  {
    title: "Representative ID",
    content: <UploadId onNext={() => {}} />,
    fields: ["repIdFile"],
  },
  {
    title: "Representative Selfie",
    content: <TakeSelfie onNext={() => {}} />,
    fields: ["repSelfie"],
  },
  {
    title: "Mobile Verification",
    content: <EnterMobileNumber onNext={() => {}} />,
    fields: ["phoneNumber", "verificationCode", "repPhoneNumber", "repVerificationCode"],
  },
  {
    title: "Finish",
    content: <Finish />,
    fields: [],
  },
];

export default function VerificationPage() {
  const handleSubmit = async (data: FormData) => {
    console.log("Final submit:", data);
    // await api.submit(data);
  };

  return (
    <MultiStepForm<FormData>
      steps={steps}
      schema={verificationSchema}
      onSubmit={handleSubmit}
      progressBar={true}
    />
  );
}