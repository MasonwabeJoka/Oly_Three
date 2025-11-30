"use client";
import styles from "./AccountProfile.module.scss";
import Image from "@/components/Image";
// import {useForm} from 'react-hook-form'
// import {zodResolver} from '@hookform/resolvers/zod'
import { userValidation } from "@/lib/validations/user";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Button from "@/components/Buttons";
import * as z from "zod";
import Avatar from "../Avatar";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/utils/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/utils/serverActions/userActions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: {
    id: string;
    objectId: string;
    username?: string;
    name: string;
    bio?: string;
    image: string;
  };
  buttonChildren: string;
}
const AccountProfile = ({ user, buttonChildren }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const [newImage, setNewImage] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  //   const form = useForm({
  //     resolver: zodResolver(userValidation),
  //     defaultValues: {
  //       profile_photo: user?.image || "",
  //       name: user?.name || "",
  //       username: user?.username || "",
  //       bio: user?.bio || "",
  //     },
  //   });
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const fileReader = new FileReader();

    // if a file exists read it for file type
    if (e.target.files?.length) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event: ProgressEvent<FileReader>) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        setNewImage(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: z.infer<typeof userValidation>) => {
    const profileImage = values.profile_photo;

    const hasImageChanged = isBase64Image(profileImage);

    if (hasImageChanged) {
      const imageResponse = await startUpload(files);

      if (imageResponse && imageResponse[0].fileUrl) {
        values.profile_photo = imageResponse[0].fileUrl;
      }
    }

    await updateUser({
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      userId: user.id,
      path: pathname,
    });

    // if(pathname === '/profile/edit') {
    //   router.back()
    // } else {
    //   router.push('/')
    // }
  };
  return (
    <div
      className={styles.onboardingForm}
      onSubmit={(values) =>
        handleSubmit({
          profile_photo: "",
          name: "",
          username: "",
          bio: "",
        })
      }
    >
      <div>
        {user.image ? (
          <Avatar
            className={styles.avatar}
            avatar={newImage}
            imageAlt="Profile Picture"
            avatarSize="extraLargeDesktop"
            priority
          />
        ) : (
          <Avatar
            className={styles.avatar}
            avatar="/missing_image.jpg"
            imageAlt="Profile Picture"
            avatarSize="extraLargeDesktop"
            priority={false}
          />
        )}
        <Input
          className={styles.uploadPhoto}
          inputType="file"
          accept="image/*"
          inputSize=""
          placeholder="Upload a profile picture"
          label=""
          id="profile-pic-upload"
          name="profile-pic-upload"
          ariaLabel="Profile Picture Upload Element."
          autoFocus={false}
          autoComplete="off"
          disabled={false}
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageUpload(e)}
        />

        <Input
          className={styles.firstName}
          inputType="text"
          inputSize="extraLargeDesktop"
          placeholder="First Name"
          label="First Name"
          id="first-name"
          name="first-name"
          ariaLabel="First Name Field"
          autoFocus={false}
          autoComplete="off"
          disabled={false}
          required={true}
        />
        <Input
          className={styles.lastName}
          inputType="text"
          inputSize="extraLargeDesktop"
          placeholder="Last Name"
          label="Last Name"
          id="last-name"
          name="last-name"
          ariaLabel="Last Name Field"
          autoFocus={false}
          autoComplete="off"
          disabled={false}
          required={true}
        />
        <Input
          className={styles.username}
          inputType="text"
          inputSize="extraLargeDesktop"
          placeholder="Username"
          label="Username"
          id="username"
          name="username"
          ariaLabel="Username Field"
          autoFocus={false}
          autoComplete="off"
          disabled={false}
          required={true}
        />
        <TextArea
          className={styles.bio}
          placeholder=""
          label="Bio"
          id="bio"
          name="bio"
          rows={10}
          cols={50}
          required={true}
        />
      </div>
      <Button
        className={styles.submitButton}
        buttonChildren="Submit"
        buttonType="normal"
        buttonSize="extraLargeDesktop"
        name="submit-btn"
        type="submit"
        ariaLabel="Submit Button"
        autoFocus={false}
        disabled={false}
      />
    </div>
  );
};

export default AccountProfile;
