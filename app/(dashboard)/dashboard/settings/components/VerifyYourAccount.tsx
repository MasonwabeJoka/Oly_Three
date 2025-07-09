import Image from "next/image";
import VerificationFormWrapper from "./VerificationFormWrapper";
import styles from "./VerifyYourAccount.module.scss";
import Avatar from "@/components/Avatar";

const VerifyYourAccount = () => {
  const benefits = [
    {
      id: 1,
      benefit: "Get a Verified Seller Badge on your profile.",
    },
    {
      id: 2,
      benefit: "Increase trust with buyers and sell faster",
    },
    {
      id: 3,
      benefit: "Stand out from other sellers & improve your reputation",
    },
  ];

  return (
    <VerificationFormWrapper title="">
      <div className={styles.container}>
        <div className={styles.avatarContainer}>
          <Avatar
            className={styles.avatar}
            avatar="/profile_images/1.jpg"
            avatarSize="large"
            isVerified={true}
          />
        </div>
        <p className={`${styles.title} ${styles.topTitle}`}>
          Boost Your Credibility & Gain Buyers' Trust!
        </p>
        <div className={styles.description}>
          <p>
            Buyers are more likely to choose verified sellers because they know
            they’re dealing with real people. Your Verified Badge makes you
            stand out, helps build confidence, and reduces unnecessary inquiries
            from hesitant buyers.
          </p>
          <p>
            Your data is safe. We use secure technology to verify your identity
            without sharing your personal details.
          </p>
        </div>
      </div>
    </VerificationFormWrapper>
  );
};

export default VerifyYourAccount;
