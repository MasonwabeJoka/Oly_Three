"use client";

import { useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./ErrorComponent.module.scss";
import Button from "@/components/Buttons";

export default function ErrorComponent({
  error,
  reset,
  title = "Oops! Something went wrong.",
  defaultMessage = "Please reload page or go back to the previous page.",
}: {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  defaultMessage?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.error(error);
  }, [error]);

const handleGoBack = useCallback(() => {
  // If user has browsing history take them back to the previous page
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
}, [router]);


  return (
    <div className={styles.container} role="alert">
      <h2 className={styles.message}>{title}</h2>
      <p className={styles.description}>
        {error.message || defaultMessage}
      </p>
      {process.env.NODE_ENV === 'development' && error.digest && (
        <p className={styles.digest}>Error ID: {error.digest}</p>
      )}
      <div className={styles.buttonContainer}>
        <Button
          className={styles.tryAgainButton}
          buttonChildren="Reload Page"
          buttonType="primary"
          buttonSize="large"
          name="try-again-btn"
          type="button"
          ariaLabel="Retry the action"
          onClick={reset}
          autoFocus
          disabled={false}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.goBackButton}
          buttonChildren="Go Back"
          buttonType="normal"
          buttonSize="large"
          name="go-back-btn"
          type="button"
          ariaLabel="Return to previous page"
          onClick={handleGoBack}
          autoFocus={false}
          disabled={false}
        />
      </div>
    </div>
  );
}