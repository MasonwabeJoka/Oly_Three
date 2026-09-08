"use client";

import { useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./error.module.scss";
import Button from "@/components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleGoBack = useCallback(() => {
    // Attempt to go back to the previous page or redirect to home if no history
    if (document.referrer && new URL(document.referrer).pathname !== pathname) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router, pathname]);

  return (
    <div className={styles.container} role="alert">
      <h2 className={styles.message}>Something went wrong!</h2>
      <p className={styles.description}>
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.tryAgainButton}
          children="Try Again"
          buttonVariant="primary"
          buttonSize="large"


          ariaLabel="Retry the action"
          onClick={reset}
          autoFocus

          dashboard
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.goBackButton}
          children="Go Back"
          buttonVariant="normal"
          buttonSize="large"


          ariaLabel="Return to previous page"
          onClick={handleGoBack}


          dashboard
        />
      </div>
    </div>
  );
}
