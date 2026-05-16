"use client";

import styles from "./ProfileSettingsForm.module.scss";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Input from "@/components/Input";
import Select from "@/components/Select";
import Avatar from "@/components/Avatar";
import Button from "@/components/Buttons";

import { profileSchema } from "@/server/db/schemas/users/validations";

import {
  socialMediaOptions,
  otherSocialMediaPlatforms,
} from "@/data/socialMediaPlatforms";
import { updateProfileSettingsAction } from "@/server/db/actions/users";





type FormValues = z.infer<typeof profileSchema>;

type ProfileSettingsFormUser = {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  socialMediaName: string | null;
  socialMediaUrl: string | null;
  avatarUrl: string | null;
};

interface ProfileSettingsFormProps {
  initialUserProfile: ProfileSettingsFormUser;
  hideButtons?: boolean;
  formId?: string;
  onSuccess?: () => void;
  requireAvatar?: boolean;
}

const getSelectedPlatform = (socialMediaName?: string | null) => {
  if (!socialMediaName) {
    return "";
  }

  if (
    socialMediaOptions.includes(socialMediaName) &&
    socialMediaName !== "Other"
  ) {
    return socialMediaName;
  }

  return "Other";
};

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () =>
      reject(new Error("Failed to read avatar file"));
    reader.readAsDataURL(file);
  });

const ProfileSettingsForm = ({
  initialUserProfile,
  hideButtons = false,
  formId,
  onSuccess,
  requireAvatar = false,
}: ProfileSettingsFormProps) => {
  const [currentUser, setCurrentUser] =
    useState<ProfileSettingsFormUser>(initialUserProfile);

  const [selected, setSelected] = useState<string>(
    getSelectedPlatform(initialUserProfile.socialMediaName)
  );

  const [isSocialMediaOpen, setIsSocialMediaOpen] =
    useState(false);

  const [errorsByField, setErrorsByField] = useState({
    general: null as string | null,
    email: null as string | null,
    phone: null as string | null,
    metadata: null as string | null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",
    defaultValues: {
      name: currentUser.firstName ?? "",
      lastName: currentUser.lastName ?? "",
      email: currentUser.email ?? "",
      phone: currentUser.phoneNumber ?? "",
      socialMediaName: currentUser.socialMediaName ?? "",
      socialMediaUrl: currentUser.socialMediaUrl ?? "",
      avatarFile: undefined,
    },
  });

  const avatarFile = watch("avatarFile");

  const avatarPreview = useMemo(() => {
    if (avatarFile) {
      return URL.createObjectURL(avatarFile);
    }

    return currentUser.avatarUrl || "";
  }, [avatarFile, currentUser.avatarUrl]);

  useEffect(() => {
    if (!avatarFile) {
      return;
    }

    return () => {
      URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarFile, avatarPreview]);

  useEffect(() => {
    reset({
      name: currentUser.firstName ?? "",
      lastName: currentUser.lastName ?? "",
      email: currentUser.email ?? "",
      phone: currentUser.phoneNumber ?? "",
      socialMediaName: currentUser.socialMediaName ?? "",
      socialMediaUrl: currentUser.socialMediaUrl ?? "",
      avatarFile: undefined,
    });

    setSelected(
      getSelectedPlatform(currentUser.socialMediaName)
    );
  }, [currentUser, reset]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const clearAvatarSelection = () => {
    setValue("avatarFile", undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: FormValues) => {
    setErrorsByField({
      general: null,
      email: null,
      phone: null,
      metadata: null,
    });

    const selectedAvatarFile =
      fileInputRef.current?.files?.[0] ??
      data.avatarFile;

    if (
      requireAvatar &&
      !selectedAvatarFile &&
      !currentUser.avatarUrl
    ) {
      setErrorsByField((prev) => ({
        ...prev,
        general: "Profile picture is required.",
      }));

      return;
    }

    const result =
      await updateProfileSettingsAction({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || undefined,
        socialMediaName:
          data.socialMediaName || undefined,
        socialMediaUrl:
          data.socialMediaUrl || undefined,
        avatarUrl: selectedAvatarFile
          ? await fileToDataUrl(selectedAvatarFile)
          : currentUser.avatarUrl ?? undefined,
      });

    if (!result.success || !result.user) {
      setErrorsByField((prev) => ({
        ...prev,
        general:
          result.message || "Profile update failed.",
      }));

      return;
    }

    setCurrentUser(result.user);

    clearAvatarSelection();

    router.refresh();

    onSuccess?.();
  };

  const handleFormSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const selectedAvatarFile =
      fileInputRef.current?.files?.[0] ?? avatarFile;

    if (
      requireAvatar &&
      !selectedAvatarFile &&
      !currentUser.avatarUrl
    ) {
      setErrorsByField((prev) => ({
        ...prev,
        general: "Profile picture is required.",
      }));

      return;
    }

    const isValid = await trigger([
      "name",
      "lastName",
      "email",
    ]);

    if (!isValid) {
      return;
    }

    await handleSubmit(onSubmit)();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setValue("avatarFile", file, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <form
      id={formId}
      onSubmit={handleFormSubmit}
      className={styles.container}
      noValidate
    >
      <h4 className={styles.title}>
        Profile Settings
      </h4>

      {errorsByField.general && (
        <p className={styles.errorMessage}>
          {errorsByField.general}
        </p>
      )}

      {errorsByField.metadata && (
        <p className={styles.errorMessage}>
          {errorsByField.metadata}
        </p>
      )}

      <div className={styles.avatarContainer}>
        <Avatar
          className={styles.avatar}
          avatarSize="large"
          avatar={avatarPreview}
          isOnline={false}
          onClick={handleAvatarClick}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <Input
            key="input-first-name"
            className={`${styles.firstName} ${styles.control}`}
            inputType="text"
            inputSize="large"
            placeholder="First Name"
            label="First Name"
            id="first-name"
            ariaLabel="First Name Field"
            autoComplete="on"
            required
            value={watch("name") || ""}
            error={errors.name?.message}
            {...register("name")}
            dashboard
          />

          <Input
            key="input-last-name"
            className={`${styles.lastName} ${styles.control}`}
            inputType="text"
            inputSize="large"
            placeholder="Last Name"
            label="Last Name"
            id="last-name"
            ariaLabel="Last Name Field"
            autoComplete="on"
            required
            value={watch("lastName") || ""}
            error={errors.lastName?.message}
            {...register("lastName")}
            dashboard
          />

          <div className={styles.emailContainer}>
            <Input
              key="input-email"
              className={`${styles.email} ${styles.control}`}
              inputType="email"
              inputSize="large"
              placeholder="Email"
              label="Email"
              id="email"
              ariaLabel="Email Field"
              autoComplete="on"
              required
              value={watch("email") || ""}
              error={
                errors.email?.message ||
                errorsByField.email
              }
              {...register("email")}
              dashboard
            />
          </div>

          <div className={styles.phoneContainer}>
            <Input
              key="input-phone-number"
              className={`${styles.phoneNumber} ${styles.control}`}
              inputType="tel"
              inputSize="large"
              placeholder="Phone Number"
              label="Phone Number"
              id="phone-number"
              ariaLabel="Phone Number Field"
              autoComplete="off"
              required={false}
              value={watch("phone") || ""}
              error={
                errors.phone?.message ||
                errorsByField.phone
              }
              {...register("phone")}
              dashboard
            />
          </div>

          <Link href="/dashboard/settings/password-settings">
            <Button
              className={`${styles.changePasswordButton} ${styles.control}`}
              buttonChildren="Change Your Password"
              buttonType="normal"
              buttonSize="large"
              name="change-password"
              type="button"
              ariaLabel="Change Your Password"
              autoFocus={false}
              disabled={false}
              dashboard
            />
          </Link>

          <div className={styles.socialMediaLinks}>
            <Select
              options={socialMediaOptions}
              initialValue="Social Media Links"
              selectSize="large"
              label="Socials"
              name="social-media"
              id="social-media"
              ariaLabel="Social Media Links"
              onChange={(
                e: React.ChangeEvent<HTMLSelectElement>
              ) => {
                const newValue = e.target.value;

                setSelected(newValue);

                if (newValue === "Other") {
                  setValue("socialMediaName", "");
                  setValue("socialMediaUrl", "");
                } else {
                  setValue(
                    "socialMediaName",
                    newValue
                  );

                  setValue("socialMediaUrl", "");
                }

                trigger([
                  "socialMediaName",
                  "socialMediaUrl",
                ]);
              }}
              onDropdownOpenChange={(isOpen: boolean) =>
                setIsSocialMediaOpen(isOpen)
              }
              dashboard
            />

            {selected && selected === "Other" ? (
              <div
                className={
                  styles.otherSocialMediaContainer
                }
              >
                <Input
                  key="input-social-media-name"
                  className={styles.socialMediaName}
                  isSearchBar={true}
                  suggestions={
                    otherSocialMediaPlatforms
                  }
                  inputType="text"
                  inputSize="large"
                  label="Other"
                  placeholder="Social media platform"
                  id="other"
                  ariaLabel="Other Social Media Field"
                  value={
                    watch("socialMediaName") || ""
                  }
                  error={
                    errors.socialMediaName?.message ||
                    errorsByField.metadata
                  }
                  {...register("socialMediaName", {
                    onChange: () =>
                      trigger("socialMediaUrl"),
                  })}
                  dashboard
                />

                <Input
                  key="input-social-media-url"
                  className={styles.link}
                  inputType="text"
                  inputSize="large"
                  label="Other Link"
                  placeholder="Paste link here"
                  id="otherSocialMedia"
                  ariaLabel="Other Social Media Link Field"
                  value={
                    watch("socialMediaUrl") || ""
                  }
                  error={
                    errors.socialMediaUrl?.message ||
                    errorsByField.metadata
                  }
                  {...register("socialMediaUrl", {
                    onChange: () =>
                      trigger("socialMediaName"),
                  })}
                  dashboard
                />
              </div>
            ) : selected &&
              selected !== "Other" ? (
              <div
                className={
                  styles.selectedSocialMediaContainer
                }
              >
                <Input
                  key="input-selected-social-media-url"
                  className={styles.link}
                  inputType="text"
                  inputSize="large"
                  label={`${selected} Link`}
                  placeholder={`Paste ${selected} link here`}
                  id="selectedSocialMedia"
                  ariaLabel="Selected Social Media Link Field"
                  value={
                    watch("socialMediaUrl") || ""
                  }
                  error={
                    errors.socialMediaUrl?.message ||
                    errorsByField.metadata
                  }
                  {...register("socialMediaUrl", {
                    onChange: () =>
                      trigger("socialMediaName"),
                  })}
                  dashboard
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {!hideButtons && !isSocialMediaOpen && (
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.updateProfileSettings}
            buttonChildren={
              isSubmitting
                ? "Updating..."
                : "Update Profile"
            }
            buttonType="primary"
            buttonSize="large"
            name="update-profile"
            type="submit"
            ariaLabel="Update Profile Button"
            autoFocus={false}
            disabled={isSubmitting}
            dashboard
          />

          <Link href="/dashboard/settings">
            <Button
              className={styles.backButton}
              buttonChildren="Back"
              buttonType="normal"
              buttonSize="large"
              name="back-btn"
              type="button"
              ariaLabel="Back"
              autoFocus={false}
              disabled={false}
              dashboard
            />
          </Link>
        </div>
      )}
    </form>
  );
};

export default ProfileSettingsForm;
