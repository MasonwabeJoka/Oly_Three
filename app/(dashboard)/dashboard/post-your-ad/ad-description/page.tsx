"use client";
import styles from "./styles.module.scss";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import TextArea from "@/components/TextArea";
import { useState } from "react";
import MaxWidthWrapper from "@/components/utilComponents/MaxWidthWrapper";

const TitleAndDescription = () => {
  const [isFocused, setIsFocused] = useState(false);

  const onBlur = (e) => {
    if (e.target.value === "") setIsFocused(false);
  };
  return (
    <MaxWidthWrapper className={styles.maxWidthWrapper}>
      <form className={styles.container}>
        <legend className={styles.pageTitle}>Ad Description</legend>
        <div className={styles.titleContainer}>
          <Input
            className={styles.title}
            inputType="text"
            inputSize="large"
            placeholder="Write a title for your ad"
            label="Write a title for your ad"
            id="title"
            name="title"
            ariaLabel="Title Field"
            autoFocus={false}
            autoComplete="off"
            iconPosition="right"
            iconWidth={32}
            iconHeight={32}
            disabled={false}
            required={true}
          />
        </div>

        <div className={styles.descriptionContainer}>
          <TextArea
            className={styles.description}
            placeholder={isFocused ? "" : "Write a description for your ad"}
            label="Description"
            id="description"
            name="description"
            size="large"
            required={false}
            onFocus={() => setIsFocused(true)}
            onBlur={onBlur}
            style={{
              textAlign: isFocused ? "left" : "center",
            }}
          />
        </div>

        <Link
          href="/dashboard/post-your-ad/upload-media"
          className={styles.proceedButtonContainer}
        >
          <Button
            className={styles.proceedButton}
            buttonChildren="Proceed"
            buttonType="primary"
            buttonSize="large"
            name="proceed-btn"
            type="button"
            ariaLabel="Proceed Button"
            autoFocus={false}
            disabled={false}
            dashboard
          />
        </Link>

        <div className={styles.backButtonContainer}>
          <Link href="/dashboard/post-your-ad/price">
            <Button
              className={styles.backButton}
              buttonChildren="Back"
              buttonType="normal"
              buttonSize="large"
              name="back-btn"
              type="button"
              ariaLabel="Back Button"
              autoFocus={false}
              disabled={false}
              dashboard
            />
          </Link>
        </div>
      </form>
    </MaxWidthWrapper>
  );
};

export default TitleAndDescription;
