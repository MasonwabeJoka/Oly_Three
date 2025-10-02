import { useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

interface ProtectedActionConfig {
  actionId: string; // Unique identifier for the action (e.g., "openChat", "startAuction")
  queryParam?: string; // Optional query param to signal action (e.g., "openChat=true")
  onAction: () => void; // Callback to execute when action is allowed
}

export const useSingInCheckHook = ({ actionId, queryParam, onAction }: ProtectedActionConfig) => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect to sign-in if user is not signed in
  const signInAndReturnUser = useCallback(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      const returnUrl = new URL(window.location.href);
      if (queryParam) {
        returnUrl.searchParams.set(queryParam, "true");
      }
      router.push(`/sign-in?redirectUrl=${encodeURIComponent(returnUrl.toString())}`);
    } else {
      onAction();
    }
  }, [isLoaded, isSignedIn, router, onAction, queryParam]);

  // Check for query param on mount to trigger action post-sign-in
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (queryParam && searchParams.get(queryParam) === "true") {
      onAction();
      // Clean up query param
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete(queryParam);
      router.replace(cleanUrl.toString());
    }
  }, [isLoaded, isSignedIn, searchParams, queryParam, onAction, router]);

  return { signInAndReturnUser, isSignedIn, isLoaded };
};