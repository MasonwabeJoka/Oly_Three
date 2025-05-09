import styles from "./styles.module.scss";
import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

const Page = ({ searchParams }: { searchParams: { redirectUrl?: string } }) => {
  return (
    <div className={styles.container}>
      <ClerkLoading>
        <div>Loading...</div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn
          afterSignInUrl={searchParams.redirectUrl || "/"} // Fallback to "/" if no redirectUrl
        />
      </ClerkLoaded>
    </div>
  );
};

export default Page;
