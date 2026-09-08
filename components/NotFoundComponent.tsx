"use client";

import { useRouter } from "next/navigation";
import styles from "./NotFoundComponent.module.scss";
import Button from "@/components/Button";

export default function NotFoundComponent({
  title = "404 - Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
}: {
  title?: string;
  message?: string;
}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.homeButton}
          children="Go Home"
          buttonVariant="primary"
          buttonSize="large"
          ariaLabel="Go to homepage"
          onClick={() => router.push("/")}
          autoFocus

        />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.backButton}
          children="Go Back"
          buttonVariant="normal"
          buttonSize="large"
          ariaLabel="Go back to previous page"
          onClick={() => router.back()}

        />
      </div>
    </div>
  );
}
