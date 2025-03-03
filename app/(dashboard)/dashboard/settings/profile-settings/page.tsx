"use client";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import UploadBox from "@/components/UploadBox";
import Button from "@/components/Buttons";
import Link from "next/link";
import Avatar from "@/components/Avatars";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/validations/formValidations";
import { z } from "zod";

// Todo: Add back button.
type FormValues = z.infer<typeof profileSchema>;
const ProfileSettings = () => {
  const [selected, setSelected] = useState("");
  const [otherSocialMedia, setOtherSocialMedia] = useState("");
  const [otherSocialMediaError, setOtherSocialMediaError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
  });
  const { register, control, handleSubmit, setValue, formState } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const otherSocialMediaPlatforms = [
    "Tumblr",
    "Discord",
    "Twitch",
    "Tencent QQ",
    "WeChat",
    "Sina Weibo",
    "LINE",
    "Meetup",
    "Vkontakte",
    "Mixer",
    "YY",
    "Caffeine",
    "Houseparty",
    "TamTam",
    "Gab",
    "MeWe",
    "Minds",
    "Ello",
    "EyeEm",
    "Tagged",
    "Whisper",
    "Nextdoor",
    "Micro.blog",
    "Yubo",
    "Rumble",
    "Odysee",
    "Bitchute",
    "Locals",
    "PeerTube",
    "Quora",
    "Skyrock",
    "Hi5",
    "CaringBridge",
    "Patreon",
    "DeviantArt",
    "Hubzilla",
    "MyMFB",
    "Meemi",
    "Imzy",
    "AsianAvenue",
    "Google+",
    "Woozworld",
    "Second Life",
    "Cyworld",
    "Vero",
    "Path",
    "StumbleUpon",
    "Baidu Tieba",
    "Classmates",
    "Gaia Online",
    "Flixster",
    "iWiW",
    "Xanga",
    "Plinga",
    "Livejournal",
    "Orkut",
    "Copiny",
    "Interpals",
    "XING",
    "Bebo",
    "Friends Reunited",
    "Geocities",
    "Habbo",
    "TravBuddy",
    "MyEtherWallet",
    "Myspace",
    "Intellitar",
    "LunarStorm",
    "Pingsta",
    "Periscope",
    "SixDegrees",
    "Tagged",
    "Skout",
    "Sococo",
    "Chime",
    "Wallop",
    "Yammer",
    "Jive",
    "Kontactr",
    "Insightly",
    "Mixmax",
    "Workplace from Facebook",
    "Flock",
    "Pineapple",
    "Hype Machine",
  ];

  const handleOtherSocialMediaChange = (value) => {
    setOtherSocialMedia(value);
  };

  useEffect(() => {
    if (
      otherSocialMedia &&
      !otherSocialMediaPlatforms.includes(otherSocialMedia)
    ) {
      setOtherSocialMediaError("The platform is not supported.");
    } else {
      setOtherSocialMediaError("");
    }
  }, [otherSocialMedia]);

  const mergeOnChange = (registerOnChange: any, customOnChange: any) => (e) => {
    registerOnChange(e);
    customOnChange(e);
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
    >
      <h4 className={styles.title}>Profile Settings</h4>
      <div className={styles.avatarContainer}>
        <Avatar
          className={styles.avatar}
          avatarSize="large"
          avatar="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          isOnline={false}
        />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <p className={styles.errorMessage}>{errors.name?.message}</p>
          <Input
            className={`${styles.firstName} ${styles.control}`}
            inputType="text"
            inputSize="large"
            placeholder={"First Name"}
            label="First Name"
            id="first-name"
            ariaLabel="First Name Field"
            autoFocus={false}
            autoComplete="on"
            disabled={false}
            required={true}
            value={""}
            {...register("name")}
            dashboard
          />
          <p className={styles.errorMessage}>{errors.lastName?.message}</p>
          <Input
            className={`${styles.lastName} ${styles.control}`}
            inputType="text"
            inputSize="large"
            placeholder="Last Name"
            label="Last Name"
            id="last-name"
            ariaLabel="Last Name Field"
            autoFocus={false}
            autoComplete="on"
            disabled={false}
            required={true}
            value={""}
            {...register("lastName")}
            dashboard
          />
          <p className={styles.errorMessage}>{errors.email?.message}</p>

          <Input
            className={`${styles.email} ${styles.control}`}
            inputType="email"
            inputSize="large"
            placeholder="Email"
            label="Email"
            id="email"
            ariaLabel="Email Field"
            autoFocus={false}
            autoComplete="on"
            disabled={false}
            required={true}
            {...register("email")}
            dashboard
          />
          <p className={styles.errorMessage}>{errors.phone?.message}</p>
          <Input
            className={`${styles.phoneNumber} ${styles.control}`}
            inputType="tel"
            inputSize="large"
            placeholder="Phone Number"
            label="Phone Number"
            id="phone-number"
            ariaLabel="Phone Number Field"
            autoFocus={false}
            autoComplete="off"
            disabled={false}
            required={true}
            {...register("phone")}
            dashboard
          />

          <Link href="/dashboard/settings/password-settings">
            <Button
              className={`${styles.changePasswordButton} ${styles.control}`}
              buttonChildren="Change Your Password"
              buttonType="normal"
              buttonSize="large"
              name="change password"
              type="button"
              ariaLabel="Change Your Password"
              autoFocus={false}
              disabled={false}
              dashboard
            />
          </Link>

          <div className={styles.socialMediaLinks}>
            <div className={styles.selectContainer}>
              <Select
                options={[
                  "Facebook",
                  "X",
                  "Pinterest",
                  "Instagram",
                  "LinkedIn",
                  "YouTube",
                  "TikTok",
                  "Reddit",
                  "Snapchat",
                  "Other",
                ]}
                currentValue="Social Media Links"
                selectSize="large"
                label="Provinces"
                id="provinces"
                name="provinces"
                ariaLabel="Provinces"
                autoFocus={false}
                required={true}
                onChange={handleSelect}
                dashboard
              />
            </div>
            {selected && selected === "Other" ? (
              <div className={styles.otherSocialMediaContainer}>
                <p className={styles.errorMessage}>
                  {errors.socialMediaUrl?.message}
                </p>
                <div style={{ marginBottom: "1rem" }}>
                  <Input
                    className={styles.otherSocialMedia}
                    isSearchBar={true}
                    suggestions={otherSocialMediaPlatforms}
                    inputType="text"
                    inputSize="large"
                    label="Other"
                    placeholder="Write your social media platform name here"
                    id="other"
                    ariaLabel="Other Social Media Field"
                    autoFocus={false}
                    iconPosition="right"
                    iconSrcRight=""
                    iconWidth={32}
                    iconHeight={32}
                    required={true}
                    value={otherSocialMedia}
                    onChange={mergeOnChange(
                      register("socialMediaUrl").onChange,
                      (e) => handleOtherSocialMediaChange(e.target.value)
                    )}
                    dashboard
                  />
                  
                </div>
                <p className={styles.errorMessage}>
                  {errors.socialMediaUrl?.message}
                </p>

                <Input
                  className={styles.link}
                  inputType="text"
                  inputSize="large"
                  label={`${selected} Link`}
                  placeholder={`Paste ${selected} link here`}
                  id="otherSocialMedia"
                  ariaLabel="other Social Media Link Field"
                  autoFocus={false}
                  iconPosition="right"
                  iconSrcRight=""
                  iconWidth={32}
                  iconHeight={32}
                  required={true}
                  {...register("socialMediaUrl")}
                  dashboard
                />
              </div>
            ) : selected && selected !== "Other" ? (
              <div className={styles.selectedSocialMediaContainer}>
                <p className={styles.errorMessage}>
                  {errors.socialMediaUrl?.message}
                </p>

                <Input
                  className={styles.link}
                  inputType="text"
                  inputSize="large"
                  label={`${selected} Link`}
                  placeholder={`Paste ${selected} link here`}
                  id="selectedSocialMedia"
                  ariaLabel="selectedSocialMedia Link Field"
                  autoFocus={false}
                  iconPosition="right"
                  iconSrcRight=""
                  iconWidth={32}
                  iconHeight={32}
                  required={true}
                  {...register("socialMediaUrl")}
                  dashboard
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

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
          disabled={false}
          onClick={() => {}}
          dashboard
        />
      </div>

    </form>
  );
};

export default ProfileSettings;
