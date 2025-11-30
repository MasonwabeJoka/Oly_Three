"use client";
import { useState } from "react";
import styles from "../calculators/styles/calculatorStyles.module.scss";
import NumberInput from "@/components/NumberInput";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import ShareCalculator from "./shareCalculator";
import { formatNumberWithCommas } from "@/utils/formatterFunctions/Formatter";
// Todo: when I hit the arrows of the interest rate number input the number should start at the current interest rate + 1, e.g. 11 + 1
const AffordabilityCalculator = () => {
  const [grossIncome, setGrossIncome] = useState<number>(0);
  const [netIncome, setNetIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(11);
  const [repaymentTerm, setRepaymentTerm] = useState<number>(20);
  const [result, setResult] = useState<{
    maxLoanAmount: number;
    monthlyRepayment: number;
  } | null>(null);

  interface FinancialData {
    grossIncome: number;
    netIncome: number;
    expenses: number;
    interestRate: number;
    repaymentTerm: number;
  }

  const calculateAffordability = (data: FinancialData) => {
    const { grossIncome, netIncome, expenses, interestRate, repaymentTerm } = data;

    const maxMonthlyRepayment = grossIncome * 0.3;
    const netSurplus = netIncome - expenses;

    if (netSurplus <= 0) {
      return {
        maxLoanAmount: 0,
        monthlyRepayment: 0,
      };
    }

    const affordableRepayment = Math.min(maxMonthlyRepayment, netSurplus);
    const annualInterestRate = interestRate / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const termInMonths = repaymentTerm * 12;

    const loanAmount =
      (affordableRepayment *
        (1 - Math.pow(1 + monthlyInterestRate, -termInMonths))) /
      monthlyInterestRate;

    return {
      maxLoanAmount: Math.round(loanAmount),
      monthlyRepayment: Math.round(affordableRepayment),
    };
  };

  const handleCalculate = () => {
    const data: FinancialData = {
      grossIncome: grossIncome || 0,
      netIncome: netIncome || 0,
      expenses: expenses || 0,
      interestRate: interestRate || 0,
      repaymentTerm: repaymentTerm || 0,
    };

    if (
      data.grossIncome <= 0 ||
      data.netIncome <= 0 ||
      data.expenses < 0 ||
      data.interestRate <= 0
    ) {
      alert("Please enter valid financial details!");
      return;
    }

    const affordability = calculateAffordability(data);
    setResult(affordability);
  };

  // Handle input change by stripping non-numeric characters except decimals
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: string
  ) => {
    // Remove all non-numeric characters except decimal points, then convert to number
    const numericValue = parseFloat(value.replace(/[^\d.]/g, "")) || 0;
    setter(numericValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.inputSection}>
          <div className={styles.control}>
            <NumberInput
              className={styles.grossIncomeInput}
              min={0}
              max={9999999999}
              step={1}
              debounceTime={500}
              id="grossIncome"
              value={grossIncome} 
              inputSize="large"
              placeholder="Enter Your Monthly Gross Income"
              autoFocus={false}
              required={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(setGrossIncome, e.target.value)}
              // Optional: Add a formatter prop if NumberInput supports it
            />
          </div>

          <div className={styles.control}>
            <NumberInput
              className={styles.netIncomeInput}
              min={0}
              max={9999999999}
              step={1}
              debounceTime={500}
              id="netIncome"
              value={netIncome}
              inputSize="large"
              placeholder="Enter Your Monthly Net Income"
              autoFocus={false}
              required={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(setNetIncome, e.target.value)}
            />
          </div>

          <div className={styles.control}>
            <NumberInput
              className={styles.netIncomeInput}
              min={0}
              max={9999999999}
              step={1}
              debounceTime={500}
              id="expenses"
              value={expenses}
              inputSize="large"
              placeholder="Enter Your Monthly Expenses"
              autoFocus={false}
              required={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(setExpenses, e.target.value)}
            />
          </div>

          <div className={styles.control}>
            <NumberInput
              className={styles.interestRateInput}
              min={0}
              max={9999999999}
              step={1}
              debounceTime={500}
              id="interestRate"
              value={interestRate === 11 ? undefined : interestRate}
              inputSize="large"
              placeholder="11% Interest Rate"
              autoFocus={false}
              required={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterestRate(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className={styles.control}>
            <Select
              options={[
                "5 Years",
                "10 Years",
                "15 Years",
                "20 Years",
                "25 Years",
                "30 Years",
              ]}
              initialValue="20 Years"
              selectSize="large"
              label="repaymentTerm"
              id="repaymentTerm"
              name="repaymentTerm"
              ariaLabel="Repayment Term Selector"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRepaymentTerm(parseInt(e.target.value.split(" ")[0]))}
              autoFocus={false}
              required={false}
            />
          </div>
        </div>

        <div className={styles.resultSection}>
          <h3 className={styles.title}>Monthly Repayments</h3>
          <p className={styles.resultValue}>
            R {result ? formatNumberWithCommas(result.monthlyRepayment) : "0"}
          </p>

          <h3 className={styles.title}>Maximum Loan Available:</h3>
          <p className={styles.resultValue}>
            R {result ? formatNumberWithCommas(result.maxLoanAmount) : "0"}
          </p>

          <p className={styles.note}>
            Interest: {interestRate || "11"}% for {repaymentTerm} years
          </p>
          <p className={styles.note}>
            Note: This calculation is based on general lender affordability
            guidelines of 30% instalment to gross income and on your disposable
            income after expenses.
          </p>
          <div className={styles.share}>
            <ShareCalculator />
          </div>
        </div>
      </div>

      <div className={styles.button}>
        <Button
          className={styles.calculateButton}
          buttonChildren="Calculate"
          buttonType="primary"
          buttonSize="large"
          name="calculate-btn"
          type="button"
          ariaLabel="Calculate Button"
          autoFocus={false}
          disabled={false}
          onClick={handleCalculate}
        />
      </div>
    </div>
  );
};

export default AffordabilityCalculator;