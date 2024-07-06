import styles from "./styles.module.scss";
import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";


const Page: React.FC = () => {
  return (
    <div className={styles.container}>
      <ClerkLoading>
        <div>Loading...</div>
      </ClerkLoading>
      <ClerkLoaded>
      
            <SignIn />
     
      </ClerkLoaded>
    </div>
  );
};

export default Page;