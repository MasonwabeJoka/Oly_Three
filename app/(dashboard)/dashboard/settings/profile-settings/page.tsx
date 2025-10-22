"use client";
import styles from "./styles.module.scss";
import { useState, useEffect, useRef } from "react";
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
// Authentication removed - no longer using Clerk
import LoadingSpinner from "@/components/LoadingSpinner";

type FormValues = z.infer<typeof profileSchema>;

const ProfileSettings = () => {
  const [selected, setSelected] = useState("");
  const [otherSocialMedia, setOtherSocialMedia] = useState("");
  const [isSocialMediaOpen, setIsSocialMediaOpen] = useState(false);
  const [errorsByField, setErrorsByField] = useState({
    general: null as string | null,
    email: null as string | null,
    phone: null as string | null,
    metadata: null as string | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Authentication removed - no longer using Clerk
  // const { user, isSignedIn, isLoaded } = useUser();
  // console.log("User:", user);
  const user = null;
  const isSignedIn = false;
  const isLoaded = true;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    getValues,
    trigger,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(
      profileSchema.extend({ avatarFile: z.instanceof(File).optional() })
    ),
    mode: "onSubmit",
  });

  const avatarFile = useWatch({ control, name: "avatarFile" });
  const avatarPreview = avatarFile
    ? URL.createObjectURL(avatarFile)
    : user?.imageUrl || "";

  // Set initial form values and clear social media fields
  useEffect(() => {
    if (isLoaded && user) {
      const defaultValues = {
        name: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses?.[0]?.emailAddress || "",
        phone: user.phoneNumbers?.[0]?.phoneNumber || "",
        socialMediaName: user.publicMetadata?.socialMediaName || "",
        socialMediaUrl: user.publicMetadata?.socialMediaUrl || "",
        avatarFile: undefined,
      };
      reset(defaultValues);
      setSelected("");
    }
  }, [isLoaded, user, reset]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Submitted data:", data);
    console.log("Form errors:", errors);
    if (!user) {
      setErrorsByField({
        ...errorsByField,
        general: "User not authenticated",
      });
      return;
    }

    setErrorsByField({
      general: null,
      email: null,
      phone: null,
      metadata: null,
    });

    try {
      // Update basic profile information
      const updateData: any = {
        firstName: data.name,
        lastName: data.lastName,
      };

      if (data.socialMediaName || data.socialMediaUrl) {
        updateData.publicMetadata = {
          socialMediaName: data.socialMediaName || "",
          socialMediaUrl: data.socialMediaUrl || "",
        };
      }

      console.log("Sending update to Clerk:", updateData);
      await user.update(updateData).catch((error: any) => {
        throw { ...error, field: "metadata" };
      });

      // Update email if changed
      if (data.email && data.email !== user.emailAddresses?.[0]?.emailAddress) {
        console.log("Updating email:", data.email);
        await user
          .createEmailAddress({ email: data.email })
          .catch((error: any) => {
            throw { ...error, field: "email" };
          });
        if (user.emailAddresses?.[0]?.id) {
          await user.emailAddresses[0].destroy();
        }
      }

      // Update phone only if provided, valid, and different
      if (
        data.phone?.trim() &&
        data.phone !== user.phoneNumbers?.[0]?.phoneNumber
      ) {
        console.log("Attempting to update phone:", data.phone);
        await user
          .createPhoneNumber({ phoneNumber: data.phone })
          .catch((error: any) => {
            throw { ...error, field: "phone" };
          });
        if (user.phoneNumbers?.[0]?.id) {
          await user.phoneNumbers[0].destroy();
        }
      } else if (!data.phone?.trim() && user.phoneNumbers?.[0]?.id) {
        console.log("Removing existing phone number");
        await user.phoneNumbers[0].destroy();
      }

      // Update avatar if a new file is provided
      if (data.avatarFile) {
        console.log("Updating avatar:", data.avatarFile.name);
        await user.setProfileImage({ file: data.avatarFile });
      }

      await user.reload();
      console.log("Profile updated successfully");
      setValue("avatarFile", undefined); // Clear file after successful update
    } catch (error: any) {
      console.error("Clerk error:", error);
      const errorMessage =
        error.errors?.[0]?.message ||
        "Failed to update profile. Please check your inputs.";
      const field = error.field || "general";
      setErrorsByField({
        ...errorsByField,
        [field]: errorMessage,
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = getValues();
    const isValid = await trigger();
    console.log("Form submit attempted with data:", formData);
    console.log("Current form errors:", errors);
    if (isValid) {
      console.log("Validation passed, calling onSubmit");
      await handleSubmit(onSubmit)();
    } else {
      console.log("Validation failed, submission blocked");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatarFile", file, { shouldDirty: true, shouldTouch: true });
    }
  };

  if (!isLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className={styles.container} noValidate>
      <h4 className={styles.title}>Profile Settings</h4>
      {errorsByField.general && (
        <p className={styles.errorMessage}>{errorsByField.general}</p>
      )}
      <div className={styles.avatarContainer}>
        <Avatar
          className={styles.avatar}
          avatarSize="large"
          avatar={avatarPreview}
          isOnline={false}
          onClick={handleAvatarClick}
          style={{ cursor: "pointer" }}
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
            value={watch("name")}
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
            value={watch("lastName")}
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
              value={watch("email")}
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
              value={watch("phone")}
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
              label="Social Media Links"
              name="social-media"
              id="social-media"
              ariaLabel="Social Media Links"
              onChange={(e) => {
                const newValue = e.target.value;
                setSelected(newValue);
                setValue("socialMediaName", "");
                setValue("socialMediaUrl", "");
                trigger(["socialMediaName", "socialMediaUrl"]);
              }}
              onDropdownOpenChange={(isOpen) => setIsSocialMediaOpen(isOpen)}
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
                  placeholder="Write your social media platform name here"
                  id="other"
                  ariaLabel="Other Social Media Field"
                  required={!!selected}
                  value={watch("socialMediaName")}
                  error={
                    errors.socialMediaName?.message || errorsByField.metadata
                  }
                  {...register("socialMediaName", {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      setOtherSocialMedia(e.target.value);
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
                  placeholder="Paste Other link here"
                  id="otherSocialMedia"
                  ariaLabel="Other Social Media Link Field"
                  required={!!selected}
                  value={watch("socialMediaUrl")}
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
                  required={!!selected}
                  value={watch("socialMediaUrl")}
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
      {!isSocialMediaOpen && (
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.updateProfileSettings}
            buttonChildren="Update Profile"
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

export default ProfileSettings;
