import styles from "./styles.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner";
import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

const Page: React.FC = () => {
  return (
    <div className={styles.container}>
      <ClerkLoading>
        <LoadingSpinner />
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp />
      </ClerkLoaded>
    </div>
  );
};

export default Page;
