"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  const handleGoBack = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <html>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "#f9f9f9",
          }}
          role="alert"
        >
          <h2
            style={{
              fontSize: "1.75rem",
              marginBottom: "3rem",
              color: "#dc3545",
            }}
          >
            Something went wrong!
          </h2>
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1rem",
              marginBottom: "3rem",
              color: "#dc3545",
              width: "40%",
              textAlign: "center",
            }}
          >
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          {process.env.NODE_ENV === "development" && error.digest && (
            <p
              style={{
                fontSize: "0.875rem",
                marginBottom: "1.5rem",
                color: "#999",
                fontFamily: "monospace",
              }}
            >
              Error ID: {error.digest}
            </p>
          )}
          <div style={{ marginBottom: "1.25rem" }}>
            <button
              onClick={reset}
              autoFocus
              aria-label="Retry the action"
              style={{
                padding: "12px 32px",
                fontSize: "1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Try Again
            </button>
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <button
              onClick={handleGoBack}
              aria-label="Return to previous page"
              style={{
                padding: "12px 32px",
                fontSize: "1rem",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
