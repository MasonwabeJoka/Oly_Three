import EnterMobileNumber from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/EnterMobileNumber";
import IndividualAccountVerification from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/IndividualAccountVerification";
import TakeSelfie from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/TakeSelfie";
import UploadId from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/UploadID";
import Finish from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/VerificationComplete";
import { verificationSchema } from "@/app/(dashboard)/dashboard/settings/account-verification/lib/validation-schema";
import MultiStepForm from "@/components/MultiStepForm";


export type FormData = {
  phoneNumber: string;
  verificationCode?: string;
  idFile: File;
  selfie: string;
};

const steps = [
  {
    title: "Verify Your Account",
    content: <IndividualAccountVerification />,
    fields: [] as (keyof FormData)[],
  },
  {
    title: "ID/Passport",
    content: <UploadId onNext={() => {}} />,
    fields: ["idFile"] as (keyof FormData)[],
  },
  {
    title: "Selfie Verification",
    content: <TakeSelfie onNext={() => {}} />,
    fields: ["selfie"] as (keyof FormData)[],
  },
  {
    title: "Mobile Verification",
    content: <EnterMobileNumber onNext={() => {}} />,
    fields: ["phoneNumber", "verificationCode"] as (keyof FormData)[],
  },
  {
    title: "Finish",
    content: <Finish />,
    fields: [] as (keyof FormData)[],
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