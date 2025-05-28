import styles from "./Finish.module.scss";
import SettingsFormWrapper from "./SettingsFormWrapper";

const Finish = () => {
  return (
    <SettingsFormWrapper title="">
      <div className={styles.container}>
        <h3 className={styles.title}>You're Verified!</h3>
        <p className={styles.description}>
          Your verification is complete, and you now have a Verified Seller
          Badge on your profile. You also gain access to premium features and
          can enjoy more secure transactions.
        </p>
      </div>
    </SettingsFormWrapper>
  );
};

export default Finish;
