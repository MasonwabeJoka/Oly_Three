"use client";
import styles from "./CommentForm.module.scss";
import Image from "@/components/Image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import * as z from "zod";
import { ChangeEvent, useState } from "react";
import { isBase64Image } from "@/utils/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from "@/lib/validations/post";
import PostImage from "@/components/PostImage";
import Avatar from "@/components/Avatar";
import { addCommentToPost } from "@/utils/serverActions/postActions";
import Form from "next/form";

interface Props {
  postId: string;
  currentUserImage: string;
  currentUserId: string;
}

// Mock server action for demonstration
async function mockServerAction(formData: FormData): Promise<void> {
  // Simulate server-side processing
  await new Promise((resolve) => setTimeout(resolve, 500));
  // No return value needed
}

const CommentForm = ({ postId, currentUserImage, currentUserId }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const [newImage, setNewImage] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      post: "",
    },
  });

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

  const handleSubmit = async (values: z.infer<typeof CommentValidation>) => {
    const postImage = values.postImage;

    const hasImageChanged = isBase64Image(postImage);

    if (hasImageChanged) {
      const imageResponse = await startUpload(files);

      if (imageResponse && imageResponse[0].fileUrl) {
        values.postImage = imageResponse[0].fileUrl;
      }
    }

    await addCommentToPost(
      values.commentImage,
      values.commentText,
      JSON.parse(currentUserId),
      groupId,
      pathname
    );

    form.reset(); // for if you want to add another comment
  };

  return (
    <>
      <h3>Post Form</h3>
      <Form
        className={styles.onboardingForm}
        action={mockServerAction}
        // onSubmit={form.handleSubmit(handleSubmit)} // If you have a submit handler, add it here
      >
        <div>
          <Avatar
            className={styles.avatar}
            avatar="/profilePic.jpg"
            imageAlt="Profile Image"
            avatarSize="regular"
            priority
          />
          <Input
            className={styles.comment}
            inputType="text"
            accept="image/*"
            inputSize=""
            placeholder="Comment..."
            label=""
            id="comment"
            name="comment"
            ariaLabel="Comment Input Field"
            autoFocus={false}
            autoComplete="off"
            disabled={false}
            required={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleImageUpload(e)
            }
          />
          <Button
            className={styles.replyButton}
            buttonChildren="Reply"
            buttonType="normal"
            buttonSize="small"
            name="reply-btn"
            type="submit"
            ariaLabel="Reply Button"
            autoFocus={false}
            disabled={false}
          />
        </div>
      </Form>
    </>
  );
};

export default CommentForm;
