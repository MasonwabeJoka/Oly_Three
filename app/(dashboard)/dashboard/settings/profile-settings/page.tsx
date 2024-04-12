"use client";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Select from "@/components/Select";
import UploadBox from "@/components/UploadBox";
import Button from "@/components/Buttons";
import Link from "next/link";

const ProfileSettings = () => {
  const [selected, setSelected] = useState("");
  const [otherSocialMedia, setOtherSocialMedia] = useState("");
  const [otherSocialMediaError, setOtherSocialMediaError] = useState("");

  interface Types {
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
  }

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const otherSocialMediaPlatforms = [
    "Twitter",
    "WhatsApp",
    "Tumblr",
    "Twitch",
    "Discord",
    "Tencent QQ",
    "WeChat",
    "Sina Weibo",
    "LINE",
    "Telegram",
    "Viber",
    "Skype",
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

  const handleOtherSocialMedia = (e) => {
    setOtherSocialMedia(e.target.value);
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

  const handleOtherSocialMediaSubmit = () => {
    // Create a mock event object with the value from the other social media input
    const mockEvent = {
      target: {
        value: otherSocialMedia,
      },
    };
    handleOtherSocialMedia(mockEvent);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile Settings</h1>
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <Input
            className={`${styles.firstName} ${styles.control}`}
            inputType="text"
            inputSize="large"
            placeholder={"First Name"}
            label="First Name"
            id="first-name"
            name="first-name"
            ariaLabel="First Name Field"
            autoFocus={false}
            autoComplete="on"
            disabled={false}
            required={false}
            value={""}
            onChange={() => {}}
          />
          <Input
            className={`${styles.lastName} ${styles.control}`}
            inputType="text"
            inputSize="large"
            placeholder="Last name"
            label="Last Name"
            id="last-name"
            name="last-name"
            ariaLabel="Last Name Field"
            autoFocus={false}
            autoComplete="on"
            disabled={false}
            required={false}
            value={""}
            onChange={() => {}}
          />
          <Input
            className={`${styles.email} ${styles.control}`}
            inputType="email"
            inputSize="large"
            placeholder="Email"
            label="Email"
            id="email"
            name="email"
            ariaLabel="Email Field"
            autoFocus={false}
            autoComplete="on"
            disabled={false}
            required={false}
          />
          <Input
            className={`${styles.phoneNumber} ${styles.control}`}
            inputType="tel"
            inputSize="large"
            placeholder="Phone Number"
            label="Phone Number"
            id="phone-number"
            name="phone-number"
            ariaLabel="Phone Number Field"
            autoFocus={false}
            autoComplete="off"
            disabled={false}
            required={false}
          />

          <div className={styles.uploadBox}>
            <UploadBox
              mediaType="photo"
              required={false}
              accept="image/*"
              size="medium"
              // onChange={handleImageUpload}
            />

            <img src={""} alt="avatar preview" width="100" height="100" />
          </div>
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
                initialValue="Social Media Links"
                selectSize="large"
                label="Provinces"
                id="provinces"
                name="provinces"
                ariaLabel="Provinces"
                autoFocus={false}
                required={false}
                onChange={handleSelect}
              />
            </div>
            {selected && selected === "Other" ? (
              <>
                <Input
                  className={styles.otherSocialMedia}
                  inputType="text"
                  inputSize="large"
                  label="Other"
                  placeholder="Write your social media platform name here"
                  id="other"
                  name="other"
                  ariaLabel="Other Social Media Field"
                  autoFocus={false}
                  iconPosition="right"
                  iconSrcRight=""
                  iconWidth={32}
                  iconHeight={32}
                  required={false}
                  onBlur={(e) => handleOtherSocialMedia(e)}
                />
                {otherSocialMedia ? <p>{otherSocialMediaError}</p> : ""}
                <Input
                  className={styles.link}
                  inputType="text"
                  inputSize="large"
                  label={`${selected} Link`}
                  placeholder={`Paste ${selected} link here`}
                  id="facebook"
                  name="facebook"
                  ariaLabel="Facebook Link Field"
                  autoFocus={false}
                  iconPosition="right"
                  iconSrcRight=""
                  iconWidth={32}
                  iconHeight={32}
                  required={false}
                />
                {/* <div className={styles.submitSocialMediaContainer}>
                  <Button
                    className={styles.submitSocialMedia}
                    buttonChildren="Submit"
                    buttonType="primary"
                    buttonSize="large"
                    name="submit-social-media"
                    type="button"
                    ariaLabel="Submit Button"
                    autoFocus={false}
                    disabled={false}
                    onClick={handleOtherSocialMediaSubmit} // Changed this line
                  />
                </div> */}
              </>
            ) : selected && selected !== "Other" ? (
              <Input
                className={styles.link}
                inputType="text"
                inputSize="large"
                label={`${selected} Link`}
                placeholder={`Paste ${selected} link here`}
                id="facebook"
                name="facebook"
                ariaLabel="Facebook Link Field"
                autoFocus={false}
                iconPosition="right"
                iconSrcRight=""
                iconWidth={32}
                iconHeight={32}
                required={false}
              />
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
          type="button"
          ariaLabel="Update Profile Button"
          autoFocus={false}
          disabled={false}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ProfileSettings;
