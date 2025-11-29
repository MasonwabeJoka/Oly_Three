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