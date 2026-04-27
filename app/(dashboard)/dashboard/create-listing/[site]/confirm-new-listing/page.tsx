"use client";
import { use } from "react";
import CategoryChangeWarning from "../../components/CategoryChangeWarning";
import useFormStore from "../../store/useFormStore";
import { useRouter } from "next/navigation";

export default function ConfirmNewListingPage({
  params,
}: {
  params: Promise<{ site: string }>;
}) {
  const { site } = use(params);
  const { resetFormData } = useFormStore();
  const router = useRouter();

  const handleConfirm = () => {
    resetFormData();
    router.push(`/dashboard/create-listing/${site}/select-category`);
  };

  const handleCancel = () => {
    router.push(`/dashboard/create-listing/${site}/title-and-description`);
  };

  return (
    <CategoryChangeWarning
      site={site}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}
