import { useRouter } from "next/navigation";
import styles from "./Calculators.module.scss";
import Button from "@/components/Buttons";

const Calculators = () => {
  const router = useRouter();

  const handleNavigateToCalculator = (calculatorType: string) => {
    // This will be updated to navigate to the specific calculator
    router.push(`/properties/calculators/${calculatorType}`);
  };

  return (
    <div className={styles.container}>
      

      <div className={styles.calculators}>
        <div className={styles.calculator}>
          <h3 className={styles.calculatorTitle}>Affordability Calculator</h3>
          <p className={styles.calculatorDescription}>
            Determine how much home you can afford based on your income,
            expenses, and financial situation.
          </p>
    
        </div>

        <div className={styles.calculator}>
          <h3 className={styles.calculatorTitle}>Bond Calculator</h3>
          <p className={styles.calculatorDescription}>
            Calculate your monthly bond repayments based on the loan amount,
            interest rate, and term.
          </p>

        </div>

        <div className={styles.calculator}>
          <h3 className={styles.calculatorTitle}>Transfer Cost Calculator</h3>
          <p className={styles.calculatorDescription}>
            Estimate the transfer duties, legal fees, and other costs associated
            with buying property.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Calculators;
