"use client";

import { useRouter } from "next/navigation";
import styles from "./NotFoundComponent.module.scss";
import Button from "@/components/Buttons";

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
          buttonChildren="Go Home"
          buttonType="primary"
          buttonSize="large"
          name="go-home-btn"
          type="button"
          ariaLabel="Go to homepage"
          onClick={() => router.push("/")}
          autoFocus
          disabled={false}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.backButton}
          buttonChildren="Go Back"
          buttonType="normal"
          buttonSize="large"
          name="go-back-btn"
          type="button"
          ariaLabel="Go back to previous page"
          onClick={() => router.back()}
          autoFocus={false}
          disabled={false}
        />
      </div>
    </div>
  );
}
