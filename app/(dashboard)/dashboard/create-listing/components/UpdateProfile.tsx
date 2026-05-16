"use client";

import type { User } from "@workos-inc/node";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProfileSettingsForm from "../../settings/components/ProfileSettingsForm";

type UpdateProfileProps = {
  initialUser?: User | null;
  onNext?: () => void;
};

const UpdateProfile = ({ initialUser, onNext }: UpdateProfileProps) => {
  if (!initialUser) {
    return <LoadingSpinner />;
  }

  return (
    <ProfileSettingsForm
      initialUserProfile={{
        firstName: initialUser.firstName ?? "",
        lastName: initialUser.lastName ?? "",
        email: initialUser.email ?? "",
        avatarUrl:
          initialUser.profilePictureUrl ?? null,
        phoneNumber: null,
        socialMediaName: null,
        socialMediaUrl: null,
      }}
      hideButtons
      formId="update-profile-form"
      onSuccess={onNext}
      requireAvatar
    />
  );
};

export default UpdateProfile;
