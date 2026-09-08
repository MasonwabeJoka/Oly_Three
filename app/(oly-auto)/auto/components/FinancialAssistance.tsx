import Image from "@/components/Image";
import styles from "./FinancialAssistance.module.scss";
import BulletPoint from "@/components/BulletPoint";
import Button from "@/components/Button";
import BankLogos from "./BankLogos";
interface FinancialAssistanceProps {}

const FinancialAssistance = ({}: FinancialAssistanceProps) => {
  // const logos = [
  //   {
  //     id: 1,
  //     name: "WesBank",
  //     logo: "/vehicle-finance/wesbank.png",
  //   },
  //   {
  //     id: 6,
  //     name: "Standard Bank",
  //     logo: "/vehicle-finance/standardbank.png",
  //   },
  //   {
  //     id: 3,
  //     name: "MFC",
  //     logo: "/vehicle-finance/mfc.png",
  //   },
  //   {
  //     id: 4,
  //     name: "Absa",
  //     logo: "/vehicle-finance/absa.png",
  //   },
  // ];
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>Get help securing car finance</p>
        <p className={styles.message}>
          We work with trusted banking partners to help you explore finance
          options that fit your budget. Compare offers, and take the next step
          with confidence — all at no cost.{" "}
        </p>
      </div>
      <div>
        <BankLogos />
      </div>
      <p className={styles.disclaimer}>
        We are not a lender. We connect you with accredited finance providers.
      </p>
      <div className={`${styles.button} ${styles.getFinanceBtnContainer}`}>
        <Button
          children="Get Finance Help"
          className={styles.getFinanceBtn}
          buttonVariant="primary"
          buttonSize="large"


          ariaLabel="Get Finance Help Button"


        />
      </div>
      <div
        className={`${styles.button} ${styles.continueWithoutFinanceBtnContainer}`}
      >
        <Button
          children="Continue Without Finance"
          className={styles.continueWithoutFinanceBtn}
          buttonVariant="normal"
          buttonSize="large"


          ariaLabel="Continue Without Finance Button"


        />
      </div>
    </div>
  );
};

export default FinancialAssistance;
