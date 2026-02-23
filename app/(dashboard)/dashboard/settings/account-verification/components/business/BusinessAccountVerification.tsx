import styles from "./BusinessAccountVerification.module.scss";
import Avatar from "@/components/Avatar";

const BusinessAccountVerification = () => (
  <div className={styles.container}>
     <div className={styles.avatarContainer}>
      <Avatar
        className={styles.avatar}
        avatar="/profile_images/1.jpg"
        avatarSize="large"
        isVerified={true}
        isBusiness={true}
      />
    </div>
<p className={`${styles.title} ${styles.topTitle}`}>
  Enhance Your Business Profile & Gain Buyers' Trust!
</p>
<div className={styles.description}>
  <p>
    A Verified Business Badge showcases your legitimacy, making your business stand out to buyers and partners. Verification unlocks exclusive business-only features including analytics to help you grow.
  </p>
  <p>
    Your data is safe. We use secure technology to verify your business without sharing your details.
  </p>
</div>
  </div>
);

export default BusinessAccountVerification;
