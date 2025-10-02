"use client";
import { useState } from "react";
import styles from "../calculators/styles/calculatorStyles.module.scss";
import NumberInput from "@/components/NumberInput";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import ShareCalculator from "./shareCalculator";

const RepaymentCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [bondAmount, setBondAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(11);
  const [repaymentTerm, setRepaymentTerm] = useState<number>(20);
  const [result, setResult] = useState<{
    monthlyRepayment: number;
    totalRepayable: number;
    totalBondAndTransferCost: number;
  } | null>(null);

  interface LoanData {
    purchasePrice: number;
    bondAmount: number;
    interestRate: number; // in percentage (e.g., 11 for 11%)
    repaymentTerm: number; // in years
  }

  // Transfer Duty Brackets (2025 SARS rates)
  const transferDutyBrackets = [
    { upTo: 1210000, rate: 0 },
    { upTo: 1663800, rate: 0.03 },
    { upTo: 2329300, rate: 0.06 },
    { upTo: 2994800, rate: 0.08 },
    { upTo: Infinity, rate: 0.11 },
  ];

  // Calculate Transfer Duty
  function calculateTransferDuty(purchasePrice: number): number {
    let duty = 0;
    let previous = 0;
    for (const bracket of transferDutyBrackets) {
      if (purchasePrice > previous) {
        const bracketEnd = Math.min(purchasePrice, bracket.upTo);
        duty += (bracketEnd - previous) * bracket.rate;
        previous = bracketEnd;
      }
    }
    return Math.round(duty);
  }

  // Calculate Transfer Costs
  function calculateTransferCosts(purchasePrice: number): number {
    const transferDuty = calculateTransferDuty(purchasePrice);
    const conveyancingFeesBeforeVAT = 15000 + 0.00971 * purchasePrice; // Calibrated to match R28,544 at R1M
    const conveyancingFees = conveyancingFeesBeforeVAT * 1.155; // 15.5% VAT
    const deedsOfficeFees = 1374; // As per example
    const sundries = 2000; // Post, petties, FICA, etc., as per example
    return Math.round(
      transferDuty + conveyancingFees + deedsOfficeFees + sundries
    );
  }

  // Calculate Bond Costs
  function calculateBondCosts(bondAmount: number): number {
    if (bondAmount <= 0) return 0;
    const bondAttorneyFeesBeforeVAT = 15000 + 0.008595 * bondAmount; // Calibrated to match R26,261 at R900,000
    const bondAttorneyFees = bondAttorneyFeesBeforeVAT * 1.155; // 15.5% VAT
    const deedsOfficeFees = 1374; // As per example
    const sundries = 2000; // Post, petties, FICA, etc., as per example
    return Math.round(bondAttorneyFees + deedsOfficeFees + sundries);
  }

  // Calculate Total Bond and Transfer Costs
  function calculateTotalBondAndTransferCosts(
    purchasePrice: number,
    bondAmount: number
  ): number {
    const transferCosts = calculateTransferCosts(purchasePrice);
    const bondCosts = calculateBondCosts(bondAmount);
    return Math.round(transferCosts + bondCosts);
  }

  function calculateRepayment(data: LoanData) {
    const { purchasePrice, bondAmount, interestRate, repaymentTerm } = data;

    // Convert interest rate from percentage to decimal and calculate monthly rate
    const annualInterestRate = interestRate / 100;
    const monthlyInterestRate = annualInterestRate / 12;

    // Convert repayment term from years to months
    const termInMonths = repaymentTerm * 12;

    // Calculate monthly repayment using the formula for a fixed-rate loan
    const monthlyRepayment =
      (bondAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, termInMonths)) /
      (Math.pow(1 + monthlyInterestRate, termInMonths) - 1);

    // Total repayable over the term
    const totalRepayable = monthlyRepayment * termInMonths;

    // Calculate bond and transfer costs using the updated algorithm
    const totalBondAndTransferCost = calculateTotalBondAndTransferCosts(
      purchasePrice,
      bondAmount
    );

    return {
      monthlyRepayment: Math.round(monthlyRepayment),
      totalRepayable: Math.round(totalRepayable),
      totalBondAndTransferCost,
    };
  }

  const handleCalculate = () => {
    const data: LoanData = {
      purchasePrice: purchasePrice || 0,
      bondAmount: bondAmount || 0,
      interestRate: interestRate || 0,
      repaymentTerm: repaymentTerm,
    };

    if (
      data.purchasePrice <= 0 ||
      data.bondAmount <= 0 ||
      data.interestRate <= 0
    ) {
      alert("Please enter valid details to calculate your repayment!");
      return;
    }

    if (data.bondAmount > data.purchasePrice) {
      alert("The bond amount cannot be more than the purchase price!");
      return;
    }

    const repayment = calculateRepayment(data);
    setResult(repayment);
  };

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.inputSection}>
          <div className={styles.control}>
            <NumberInput
              className={styles.purchasePrice}
              min={0}
              max={9999999999}
              step={1}
              debounceTime={500}
              id="purchasePrice"
              value={purchasePrice}
              inputSize="large"
              placeholder="Enter The Purchase Price"
              autoFocus={false}
              required={true}
              onChange={(e) =>
                setPurchasePrice(parseFloat(e.target.value) || 0)
              } // Convert string to number
            />
          </div>

          <div className={styles.control}>
            <NumberInput
              className={styles.bondAmount}
              min={0}
              max={9999999999}
              step={1}
              debounceTime={500}
              id="bondAmount"
              value={bondAmount}
              inputSize="large"
              placeholder="Purchase Price - Deposit"
              autoFocus={false}
              required={true}
              onChange={(e) => setBondAmount(parseFloat(e.target.value) || 0)}
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
              value={interestRate === 11 ? undefined : interestRate} // Set to undefined if it's the default value
              inputSize="large"
              placeholder="11% Interest Rate"
              autoFocus={false}
              required={true}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
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
              onChange={(e) => setRepaymentTerm(parseInt(e.target.value) || 0)}
              autoFocus={false}
              required={false}
            />
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

        <div className={styles.resultSection}>
          <h3 className={styles.title}>Monthly Repayment</h3>

          <p className={styles.resultValue}>
            R {result ? result.monthlyRepayment.toLocaleString() : "0.00"}
          </p>

          <h3 className={styles.title}>Total Repayable</h3>

          <p className={styles.resultValue}>
            R {result ? result.totalRepayable.toLocaleString() : "0.00"}
          </p>

          <h3 className={styles.title}>Estimated Bond & Transfer Costs</h3>

          <p className={styles.resultValue}>
            R{" "}
            {result ? result.totalBondAndTransferCost.toLocaleString() : "0.00"}
          </p>

          <p className={styles.note}>
            Disclaimer: This is an estimate based on 2025 South African market
            trends. Bond and transfer costs are calculated using current rates
            but may vary. Speak to a bank for exact figures.
          </p>
          <div className={styles.share}>
            <ShareCalculator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepaymentCalculator;
