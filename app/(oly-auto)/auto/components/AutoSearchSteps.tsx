// app/dashboard/settings/account-verification/page.tsx
import MultiStepForm from "@/components/MultiStepForm";
import { verificationSchema } from "@/lib/validation-schema";

import IndividualAccountVerification from "./components/individual/IndividualAccountVerification";
import UploadId from "./components/individual/UploadID";
import TakeSelfie from "./components/individual/TakeSelfie";
import EnterMobileNumber from "./components/individual/EnterMobileNumber";
import Finish from "./components/individual/VerificationComplete";

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
    fields: [] as const,
  },
  {
    title: "ID/Passport",
    content: <UploadId />,
    fields: ["idFile"] as const,
  },
  {
    title: "Selfie Verification",
    content: <TakeSelfie />,
    fields: ["selfie"] as const,
  },
  {
    title: "Mobile Verification",
    content: <EnterMobileNumber />,
    fields: ["phoneNumber", "verificationCode"] as const,
  },
  {
    title: "Finish",
    content: <Finish />,
    fields: [] as const,
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