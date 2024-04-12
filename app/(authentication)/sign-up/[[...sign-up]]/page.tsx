import styles from "./styles.module.scss";
import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

const Page: React.FC = () => {
  return (
    <div className={styles.container}>
      <ClerkLoading>
        <div>Loading...</div>
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp />
      </ClerkLoaded>
    </div>
  );
};

export default Page;
