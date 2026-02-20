import { useCallback } from "react";
import { useRouter } from "next/navigation";
// Ensures certain actions (like opening chat, starting auctions) only happen when users are signed in
// Verifies if a user is authenticated before allowing them to perform specific actions
 // Handless redirects to sign-in pages when users aren't authenticated

interface ProtectedActionConfig {
  actionId: string; // Unique identifier for the action (e.g., "openChat", "startAuction")
  queryParam?: string; // Optional query param to signal action (e.g., "openChat=true")
  onAction: () => void; // Callback to execute when action is allowed
}

export const useSingInCheckHook = ({ actionId, queryParam, onAction }: ProtectedActionConfig) => {
  const router = useRouter();

  // Authentication removed - directly execute action
  const signInAndReturnUser = useCallback(() => {
    onAction();
  }, [onAction]);

  // Authentication removed - always return as signed in and loaded
  return {
    signInAndReturnUser,
    isSignedIn: true, // Always true since auth is removed
    isLoaded: true    // Always true since auth is removed
  };
};