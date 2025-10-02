import styles from "../styles.module.scss";
import AffordabilityCalculator from "../../components/AffordabilityCalculator";
import HomeButton from "@/components/HomeButton";

const Page = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.homeButton}>
        <HomeButton path="/properties" />
      </nav>
      <div className={styles.content}>
        <h1 className={styles.title}>Affordability Calculator</h1>
        <AffordabilityCalculator />
      </div>
    </div>
  );
};

export default Page;
