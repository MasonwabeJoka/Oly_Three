import styles from "./OlyFeedHeader.module.scss";
import Link from "next/link";
import Image from "@/components/Image";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";

const OlyFeedHeader = () => {
  return (
    <nav className={styles.container}>
      <Link href={"/"}>
        <Image src="/logo.png" alt="logo" width={80} height={45} />
      </Link>
      <div>
        {/* <SignedIn>
          <SignOutButton>
            <Image src="" alt="" width={24} height={24}/>
          </SignOutButton>
        </SignedIn> */}
      </div>
      {/* <OrganizationSwitcher
        appearance={{
          elements : {
            organizationSwitcherTrigger: 'padding: 2 0, padding: 0 4'
          }
        }}
      /> */}
    </nav>
  );
};

export default OlyFeedHeader;
