"use client";
import styles from "./Post.module.scss";
import Image from "next/image";
// import {useForm} from 'react-hook-form'
// import {zodResolver} from '@hookform/resolvers/zod'
import TextArea from "@/components/TextArea";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import * as z from "zod";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/utils/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname, useRouter } from "next/navigation";
import { PostValidation } from "@/lib/validations/post";
import PostImage from "@/components/PostImage";
import { createPost } from "@/utils/serverActions/postActions";

const Post = ({ userId }: { userId: string }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const [newImage, setNewImage] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  //   const form = useForm({
  //     resolver: zodResolver(PostValidation),
  //     defaultValues: {
  //       post: '',
  //  accountId: userId,
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

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        setNewImage(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: z.infer<typeof PostValidation>) => {
    const postImage = values.postImage;

    const hasImageChanged = isBase64Image(postImage);

    if (hasImageChanged) {
      const imageResponse = await startUpload(files);

      if (imageResponse && imageResponse[0].fileUrl) {
        values.postImage = imageResponse[0].fileUrl;
      }
    }

    await createPost({
      image: values.postImage,
      text: values.postText,
      author: userId,
      groupId: null,
      path: pathname,
    });

    router.push("/oly-feed");
  };

  return (
    <>
      <h3>Post Form</h3>
      <form
        className={styles.onboardingForm}
        onSubmit={(values) =>
          handleSubmit({
            postImage: "/bear.jpg",
            postText: "dfaf",
            accountId: "df",
          })
        }
      >
        <div>
          <PostImage image={newImage} />
          <Input
            className={styles.uploadPhoto}
            inputType="file"
            accept="image/*"
            inputSize=""
            placeholder="Upload Post Image"
            label=""
            id="upload-post-image"
            name="upload-post-image"
            ariaLabel="Post Image Upload Element."
            autoFocus={false}
            autoComplete="off"
            disabled={false}
            required={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleImageUpload(e)
            }
          />
          <TextArea
            className={styles.post}
            placeholder=""
            label="Post"
            id="post"
            name="post"
            rows={10}
            cols={50}
            required={false}
          />
        </div>
        <Button
          className={styles.makeAPostButton}
          buttonChildren="Make A Post"
          buttonType="normal"
          buttonSize="largeDesktop"
          name="make-a-btn"
          type="submit"
          ariaLabel="Make A Post Button"
          autoFocus={false}
          disabled={false}
        />
      </form>
    </>
  );
};

export default Post;
