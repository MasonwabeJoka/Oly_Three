"use client";

import styles from "./ProfileSettingsForm.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Avatar from "@/components/Avatar";
import Button from "@/components/Buttons";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import {
  socialMediaOptions,
  otherSocialMediaPlatforms,
} from "@/data/socialMediaPlatforms";
import { User } from "@workos-inc/node";
import { updateProfileAction } from "@/app/actions/updateProfile";
import { useRouter } from "next/navigation";
import { getImageKitAuthAction } from "@/app/actions/imagekit";

const profileSettingsSchema = profileSchema
  .pick({
    name: true,
    lastName: true,
    email: true,
  })
  .extend({
    phone: z.string().optional(),
    socialMediaName: z.string().optional(),
    socialMediaUrl: z.string().optional(),
    avatarFile: z.instanceof(File).optional(),
  });

type FormValues = z.infer<typeof profileSettingsSchema>;

interface ProfileSettingsFormProps {
  initialUser: User;
  hideButtons?: boolean;
  formId?: string;
  onSuccess?: () => void;
  requireAvatar?: boolean;
}

type ProfileUpdatedEventDetail = {
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string;
  profilePictureUrl?: string | null;
};

const isGeneratedInitialsAvatar = (avatarUrl?: string | null) => {
  if (!avatarUrl) {
    return false;
  }

  const normalized = avatarUrl.toLowerCase();
  if (
    normalized.includes("ui-avatars.com") ||
    normalized.includes("avatar.vercel.sh") ||
    normalized.includes("dicebear") ||
    normalized.includes("gravatar.com/avatar") ||
    normalized.includes("/initials") ||
    normalized.includes("default-avatar") ||
    normalized.includes("placeholder") ||
    normalized.includes("default-user") ||
    normalized.includes("name=") ||
    normalized.includes("background=")
  ) {
    return true;
  }

  try {
    const parsedUrl = new URL(avatarUrl);
    const host = parsedUrl.hostname.toLowerCase();
    const path = parsedUrl.pathname.toLowerCase();
    const params = parsedUrl.searchParams;

    if (
      path.includes("/avatar") ||
      path.includes("/initial") ||
      path.includes("default") ||
      params.has("name") ||
      params.has("background") ||
      params.has("color")
    ) {
      return true;
    }

    if (
      host.includes("googleusercontent.com") &&
      (path.includes("/a/default-user") || path.includes("/avatar"))
    ) {
      return true;
    }

  } catch {
    return normalized.includes("avatar") || normalized.includes("initial");
  }

  return false;
};

const getSelectedPlatform = (socialMediaName?: string) => {
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

const ProfileSettingsForm = ({
  initialUser,
  hideButtons = false,
  formId,
  onSuccess,
  requireAvatar = false,
}: ProfileSettingsFormProps) => {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [isAvatarUpdating, setIsAvatarUpdating] = useState(false);
  const [selected, setSelected] = useState<string>(
    getSelectedPlatform(initialUser.metadata?.socialMediaName)
  );
  const [isSocialMediaOpen, setIsSocialMediaOpen] = useState(false);
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
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(profileSettingsSchema),
    mode: "onSubmit",
    defaultValues: {
      name: currentUser.firstName ?? "",
      lastName: currentUser.lastName ?? "",
      email: currentUser.email ?? "",
      phone: currentUser.metadata?.phone ?? "",
      socialMediaName: currentUser.metadata?.socialMediaName ?? "",
      socialMediaUrl: currentUser.metadata?.socialMediaUrl ?? "",
      avatarFile: undefined,
    },
  });

  const avatarFile = useWatch({ control, name: "avatarFile" });

  const avatarPreview = useMemo(() => {
    if (!avatarFile) {
      const providerAvatar = isGeneratedInitialsAvatar(
        currentUser.profilePictureUrl
      )
        ? ""
        : currentUser.profilePictureUrl || "";

      return isAvatarUpdating
        ? ""
        : currentUser.metadata?.avatarUrl || providerAvatar;
    }

    return URL.createObjectURL(avatarFile);
  }, [
    avatarFile,
    currentUser.metadata?.avatarUrl,
    currentUser.profilePictureUrl,
    isAvatarUpdating,
  ]);

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
      phone: currentUser.metadata?.phone ?? "",
      socialMediaName: currentUser.metadata?.socialMediaName ?? "",
      socialMediaUrl: currentUser.metadata?.socialMediaUrl ?? "",
      avatarFile: undefined,
    });

    setSelected(getSelectedPlatform(currentUser.metadata?.socialMediaName));
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
    const applyUserResult = (resultUser: {
      firstName: string | null;
      lastName: string | null;
      email: string;
      metadata: Record<string, string>;
    }) => {
      setCurrentUser((prev) => ({
        ...prev,
        ...resultUser,
        metadata: {
          ...(prev.metadata ?? {}),
          ...(resultUser.metadata ?? {}),
        },
      }));
    };

    const selectedAvatarFile =
      fileInputRef.current?.files?.[0] ?? avatarFile ?? data.avatarFile;
    const providerAvatar = isGeneratedInitialsAvatar(
      currentUser.profilePictureUrl
    )
      ? ""
      : currentUser.profilePictureUrl || "";
    const existingAvatar = currentUser.metadata?.avatarUrl || providerAvatar;

    if (requireAvatar && !selectedAvatarFile && !existingAvatar) {
      setErrorsByField((prev) => ({
        ...prev,
        general: "Profile picture is required.",
      }));
      return;
    }

    let uploadedAvatarUrl: string | undefined;

    if (selectedAvatarFile) {
      setIsAvatarUpdating(true);
      try {
        const authData = await getImageKitAuthAction();
        if (!authData.success) {
          throw new Error(
            authData.message || "Unable to authorize avatar upload."
          );
        }

        const uploadData = new FormData();
        uploadData.append("file", selectedAvatarFile);
        uploadData.append("fileName", selectedAvatarFile.name);
        uploadData.append("token", authData.token);
        uploadData.append("signature", authData.signature);
        uploadData.append("expire", String(authData.expire));
        uploadData.append("publicKey", authData.publicKey);
        uploadData.append("folder", "/oly/avatars");
        uploadData.append("useUniqueFileName", "true");

        const imageKitResponse = await fetch(
          "https://upload.imagekit.io/api/v1/files/upload",
          {
            method: "POST",
            body: uploadData,
          }
        );

        if (!imageKitResponse.ok) {
          const uploadError = await imageKitResponse
            .json()
            .catch(() => ({ message: "Avatar upload failed." }));
          throw new Error(uploadError?.message || "Avatar upload failed.");
        }

        const imageKitResult: { url?: string } = await imageKitResponse.json();
        if (!imageKitResult.url) {
          throw new Error("Avatar upload response did not include a URL.");
        }

        uploadedAvatarUrl = imageKitResult.url;
      } catch (error: any) {
        setErrorsByField((prev) => ({
          ...prev,
          general:
            error?.message ||
            "Profile details were updated, but avatar upload failed.",
        }));
        setIsAvatarUpdating(false);
        return;
      }
    }

    const result = await updateProfileAction({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      socialMediaName: data.socialMediaName,
      socialMediaUrl: data.socialMediaUrl,
      avatarUrl: uploadedAvatarUrl,
    });

    if (!result.success) {
      const field = result.field ?? "general";
      setErrorsByField((prev) => ({
        ...prev,
        [field]:
          result.message ||
          "Profile update failed.",
      }));
      setIsAvatarUpdating(false);
      return;
    }

    const mergedUser = {
      ...currentUser,
      ...result.user,
      metadata: {
        ...(currentUser.metadata ?? {}),
        ...(result.user?.metadata ?? {}),
      },
    } as User;

    applyUserResult(result.user!);

    if (typeof window !== "undefined") {
      const detail: ProfileUpdatedEventDetail = {
        firstName: mergedUser.firstName,
        lastName: mergedUser.lastName,
        avatarUrl:
          typeof mergedUser.metadata?.avatarUrl === "string"
            ? mergedUser.metadata.avatarUrl
            : undefined,
        profilePictureUrl: mergedUser.profilePictureUrl ?? null,
      };

      window.dispatchEvent(
        new CustomEvent<ProfileUpdatedEventDetail>("oly:profile-updated", {
          detail,
        })
      );
    }

    setIsAvatarUpdating(false);
    clearAvatarSelection();
    router.refresh();
    onSuccess?.();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAvatarFile = fileInputRef.current?.files?.[0] ?? avatarFile;
    const providerAvatar = isGeneratedInitialsAvatar(
      currentUser.profilePictureUrl
    )
      ? ""
      : currentUser.profilePictureUrl || "";
    const existingAvatar = currentUser.metadata?.avatarUrl || providerAvatar;

    if (requireAvatar && !selectedAvatarFile && !existingAvatar) {
      setErrorsByField((prev) => ({
        ...prev,
        general: "Profile picture is required.",
      }));
      return;
    }

    const isValid = await trigger(["name", "lastName", "email"]);

    if (!isValid) {
      return;
    }

    await handleSubmit(onSubmit)();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatarFile", file, { shouldDirty: true, shouldTouch: true });
    }
  };

  return (
    <form
      id={formId}
      onSubmit={handleFormSubmit}
      className={styles.container}
      noValidate
    >
      <h4 className={styles.title}>Profile Settings</h4>
      {errorsByField.general && (
        <p className={styles.errorMessage}>{errorsByField.general}</p>
      )}
      {errorsByField.metadata && (
        <p className={styles.errorMessage}>{errorsByField.metadata}</p>
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
            {...register("name", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("name", e.target.value, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              },
            })}
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
            {...register("lastName", {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("lastName", e.target.value, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              },
            })}
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
              error={errors.email?.message || errorsByField.email}
              {...register("email", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue("email", e.target.value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                },
              })}
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
              error={errors.phone?.message || errorsByField.phone}
              {...register("phone", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue("phone", e.target.value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                },
              })}
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
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const newValue = e.target.value;
                setSelected(newValue);

                if (newValue === "Other") {
                  setValue("socialMediaName", "");
                  setValue("socialMediaUrl", "");
                } else {
                  setValue("socialMediaName", newValue);
                  setValue("socialMediaUrl", "");
                }

                trigger(["socialMediaName", "socialMediaUrl"]);
              }}
              onDropdownOpenChange={(isOpen: boolean) =>
                setIsSocialMediaOpen(isOpen)
              }
              dashboard
            />
            {selected && selected === "Other" ? (
              <div className={styles.otherSocialMediaContainer}>
                <Input
                  key="input-social-media-name"
                  className={styles.socialMediaName}
                  isSearchBar={true}
                  suggestions={otherSocialMediaPlatforms}
                  inputType="text"
                  inputSize="large"
                  label="Other"
                  placeholder="Social media platform"
                  id="other"
                  ariaLabel="Other Social Media Field"
                  value={watch("socialMediaName") || ""}
                  error={
                    errors.socialMediaName?.message || errorsByField.metadata
                  }
                  {...register("socialMediaName", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue("socialMediaName", e.target.value, {
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      trigger("socialMediaUrl");
                    },
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
                  value={watch("socialMediaUrl") || ""}
                  error={
                    errors.socialMediaUrl?.message || errorsByField.metadata
                  }
                  {...register("socialMediaUrl", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue("socialMediaUrl", e.target.value, {
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      trigger("socialMediaName");
                    },
                  })}
                  dashboard
                />
              </div>
            ) : selected && selected !== "Other" ? (
              <div className={styles.selectedSocialMediaContainer}>
                <Input
                  key="input-selected-social-media-url"
                  className={styles.link}
                  inputType="text"
                  inputSize="large"
                  label={`${selected} Link`}
                  placeholder={`Paste ${selected} link here`}
                  id="selectedSocialMedia"
                  ariaLabel="Selected Social Media Link Field"
                  // required={!!selected}
                  value={watch("socialMediaUrl") || ""}
                  error={
                    errors.socialMediaUrl?.message || errorsByField.metadata
                  }
                  {...register("socialMediaUrl", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue("socialMediaUrl", e.target.value, {
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      trigger("socialMediaName");
                    },
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
            buttonChildren={isSubmitting ? "Updating..." : "Update Profile"}
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
