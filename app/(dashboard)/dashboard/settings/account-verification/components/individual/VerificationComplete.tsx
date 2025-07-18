import styles from "./VerificationComplete.module.scss";

const Finish = (props) => (
  <div className={styles.container}>
    <h3 className={styles.title}>You're Verified!</h3>
    <p className={styles.description}>
      Your verification is complete, and you now have a Verified Seller Badge on
      your profile. You also gain access to premium features and can enjoy more
      secure transactions.
    </p>
  </div>
);

export default Finish;
