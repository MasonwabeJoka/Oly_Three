
import styles from "./Calculators.module.scss";
import Button from "@/components/Buttons";
import Link from "next/link";

const Calculators = () => {

  const data = [
    {
      title: "Affordability Calculator",
      description:
        "Determine how much home you can afford based on your income, expenses, and financial situation.",
      link: "/properties/calculators/affordability-calculator",
    },
    {
      title: "Repayment Calculator",
      description:
        "Calculate your monthly bond repayments based on the loan amount, interest rate, and term.",
      link: "/properties/calculators/repayment-calculator",
    },
    {
      title: "Transfer Cost Calculator",
      description:
        "Estimate the transfer duties, legal fees, and other costs associated with buying property.",
      link: "/properties/calculators/bond-transfer-cost-calculator",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.calculators}>
        {data.map((item, index) => {
          return (
            <Link href={item.link} className={styles.calculator} key={index}>
              <h3 className={styles.calculatorTitle}>{item.title}</h3>
              <p className={styles.calculatorDescription}>{item.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Calculators;
