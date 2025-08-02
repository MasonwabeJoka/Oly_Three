import styles from "./Congratulations.module.scss";
import { FormWrapper } from "./FormWrapper";

const Congratulations = () => {
  return (
    <FormWrapper title="">
      <div className={styles.container}>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>Congratulations! 🎉</p>
          <p className={styles.description}>
            Your listing is ready to go live. Please review all the details
            you’ve entered, and when you’re ready, click “Publish My Listing” to
            share it with the world.
          </p>
          <p className={styles.description}>
            If you're ready to go live, simply click 'Publish Immediately' to
            make your listing live right away.
          </p>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Congratulations;
