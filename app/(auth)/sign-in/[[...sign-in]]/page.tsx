import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./styles.module.scss";
import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

const Page = async ({ searchParams }: { searchParams: Promise<{ redirectUrl?: string }> }) => {
  const resolvedSearchParams = await searchParams;
  return (
    <div className={styles.container}>
      <ClerkLoading>
        <LoadingSpinner />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn
          afterSignInUrl={resolvedSearchParams.redirectUrl || "/"} // Fallback to "/" if no redirectUrl
        />
      </ClerkLoaded>
    </div>
  );
};

export default Page;
