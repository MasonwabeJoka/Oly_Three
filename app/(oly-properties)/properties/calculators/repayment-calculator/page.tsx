
import styles from "../styles.module.scss";
import HomeButton from "@/components/HomeButton";
import RepaymentCalculator from "../../components/RepaymentCalculator";

const Page = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.homeButton}>
        <HomeButton path="/properties" />
      </nav>
      <div className={styles.content}>
        <h1 className={styles.title}>Repayment Calculator</h1>
        <RepaymentCalculator />
      </div>
    </div>
  );
};

export default Page;
