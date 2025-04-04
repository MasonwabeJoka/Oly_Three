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
      <div className={styles.header}>
        <h2 className={styles.title}>Property Calculators</h2>
        <p className={styles.description}>
          Use our range of financial calculators to help plan your property journey. Whether you're buying, 
          selling, or investing, our tools will help you make informed decisions.
        </p>
      </div>
      
      <div className={styles.calculatorsGrid}>
        <div className={styles.calculatorCard}>
          <div className={styles.calculatorIcon}>
            <div className={styles.iconPlaceholder}>A</div>
          </div>
          <h3 className={styles.calculatorTitle}>Affordability Calculator</h3>
          <p className={styles.calculatorDescription}>
            Determine how much home you can afford based on your income, expenses, and financial situation.
          </p>
          <Button
            type="button"
            name="affordabilityCalculator"
            buttonType="primary"
            buttonSize="medium"
            buttonChildren="Calculate Affordability"
            autoFocus={false}
            onClick={() => handleNavigateToCalculator('affordability')}
            className={styles.calculatorButton}
          />
        </div>
        
        <div className={styles.calculatorCard}>
          <div className={styles.calculatorIcon}>
            <div className={styles.iconPlaceholder}>B</div>
          </div>
          <h3 className={styles.calculatorTitle}>Bond Calculator</h3>
          <p className={styles.calculatorDescription}>
            Calculate your monthly bond repayments based on the loan amount, interest rate, and term.
          </p>
          <Button
            type="button"
            name="bondCalculator"
            buttonType="primary"
            buttonSize="medium"
            buttonChildren="Calculate Bond"
            autoFocus={false}
            onClick={() => handleNavigateToCalculator('bond')}
            className={styles.calculatorButton}
          />
        </div>
        
        <div className={styles.calculatorCard}>
          <div className={styles.calculatorIcon}>
            <div className={styles.iconPlaceholder}>T</div>
          </div>
          <h3 className={styles.calculatorTitle}>Transfer Cost Calculator</h3>
          <p className={styles.calculatorDescription}>
            Estimate the transfer duties, legal fees, and other costs associated with buying property.
          </p>
          <Button
            type="button"
            name="transferCostCalculator"
            buttonType="primary"
            buttonSize="medium"
            buttonChildren="Calculate Transfer Costs"
            autoFocus={false}
            onClick={() => handleNavigateToCalculator('transfer-cost')}
            className={styles.calculatorButton}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculators;
