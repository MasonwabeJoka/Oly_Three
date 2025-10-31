"use client";

import IndividualAccountVerification from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/IndividualAccountVerification";
import UploadId from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/UploadID";
import TakeSelfie from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/TakeSelfie";
import EnterMobileNumber from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/EnterMobileNumber";
import Finish from "@/app/(dashboard)/dashboard/settings/account-verification/components/individual/VerificationComplete";
import MultiStepForm from "@/components/UrlMultiStepForm";

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
    path: "account",
    fields: [] as const,
  },
  {
    title: "ID/Passport",
    content: <UploadId />,
    path: "id-passport",
    fields: ["idFile"] as const,
  },
  {
    title: "Selfie Verification",
    content: <TakeSelfie />,
    path: "selfie",
    fields: ["selfie"] as const,
  },
  {
    title: "Mobile Verification",
    content: <EnterMobileNumber />,
    path: "mobile",
    fields: ["phoneNumber", "verificationCode"] as const,
  },
  {
    title: "Finish",
    content: <Finish />,
    path: "finish",
    fields: [] as const,
  },
];

const basePath = "/test";

export default function TestSteps() {
  return (
    <MultiStepForm<FormData>
      steps={steps}
      basePath={basePath}
      progressBar={false}
    />
  );
}
