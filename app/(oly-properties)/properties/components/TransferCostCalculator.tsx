"use client";
import { useState } from "react";
import styles from "../calculators/styles/calculatorStyles.module.scss";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import ShareCalculator from "./shareCalculator";
import NumberInput from "@/components/NumberInput";

const TransferCostCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [bondAmount, setBondAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(11);
  const [repaymentTerm, setRepaymentTerm] = useState<number>(20);
  const [result, setResult] = useState<{
    totalBondAndTransferCost: number;
    bondCosts: {
      bondRegistrationCost: number;
      deedsOfficeFees: number;
      sundries: number;
    };
    transferCosts: {
      transferDuty: number;
      propertyTransferCosts: number;
      deedsOfficeFees: number;
      sundries: number;
    };
  } | null>(null);

  // Transfer Duty Brackets (2025 SARS rates)
const transferDutyBrackets = [
  { upTo: 1100000, rate: 0 },        // 0% up to R1,100,000
  { upTo: 1572500, rate: 0.03 },     // 3% from R1,100,001 to R1,572,500
  { upTo: 2200000, rate: 0.06 },     // 6% from R1,572,501 to R2,200,000
  { upTo: 2825000, rate: 0.08 },     // 8% from R2,200,001 to R2,825,000
  { upTo: 11312500, rate: 0.11 },    // 11% from R2,825,001 to R11,312,500
  { upTo: Infinity, rate: 0.13 },    // 13% above R11,312,500
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
  function calculateTransferCosts(purchasePrice: number) {
    const transferDuty = calculateTransferDuty(purchasePrice);
    const conveyancingFeesBeforeVAT = 15000 + 0.00971 * purchasePrice; // Matches R28,544 at R1M
    const conveyancingFees = conveyancingFeesBeforeVAT * 1.155; // 15.5% VAT
    const deedsOfficeFees = 1374; // As per example
    const sundries = 2000; // Post, petties, FICA, etc., as per example
    return {
      transferDuty,
      propertyTransferCosts: Math.round(conveyancingFees),
      deedsOfficeFees,
      sundries,
      total: Math.round(
        transferDuty + conveyancingFees + deedsOfficeFees + sundries
      ),
    };
  }

  // Calculate Bond Costs
  function calculateBondCosts(bondAmount: number) {
    if (bondAmount <= 0) {
      return {
        bondRegistrationCost: 0,
        deedsOfficeFees: 0,
        sundries: 0,
        total: 0,
      };
    }
    const bondAttorneyFeesBeforeVAT = 15000 + 0.008595 * bondAmount; // Matches R26,261 at R900,000
    const bondAttorneyFees = bondAttorneyFeesBeforeVAT * 1.155; // 15.5% VAT
    const deedsOfficeFees = 1374; // As per example
    const sundries = 2000; // Post, petties, FICA, etc., as per example
    return {
      bondRegistrationCost: Math.round(bondAttorneyFees),
      deedsOfficeFees,
      sundries,
      total: Math.round(bondAttorneyFees + deedsOfficeFees + sundries),
    };
  }

  // Calculate Total Bond and Transfer Costs
  function calculateTotalBondAndTransferCosts(
    purchasePrice: number,
    bondAmount: number
  ) {
    const transferCosts = calculateTransferCosts(purchasePrice);
    const bondCosts = calculateBondCosts(bondAmount);
    return {
      totalBondAndTransferCost: transferCosts.total + bondCosts.total,
      bondCosts,
      transferCosts,
    };
  }

  const handleCalculate = () => {
    const data = {
      purchasePrice: purchasePrice || 0,
      bondAmount: bondAmount || 0,
      interestRate: interestRate || 0,
      repaymentTerm: repaymentTerm,
    };

    if (data.purchasePrice <= 0 || data.bondAmount <= 0) {
      alert("Please enter valid details to calculate your costs!");
      return;
    }

    if (data.bondAmount > data.purchasePrice) {
      alert("The bond amount cannot be more than the purchase price!");
      return;
    }

    const costs = calculateTotalBondAndTransferCosts(
      data.purchasePrice,
      data.bondAmount
    );
    setResult(costs);
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
              }
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
          <h3 className={styles.title}>Total Cost</h3>
          <p className={styles.resultValue}>
            R{" "}
            {result ? result.totalBondAndTransferCost.toLocaleString() : "0.00"}
          </p>

          <h3 className={styles.title}>Total Bond Costs</h3>
          <p className={styles.resultValue}>
            R {result ? result.bondCosts.total.toLocaleString() : "0.00"}
          </p>

          <div className={styles.subItems}>
            <div className={styles.subItem}>
              <h3 className={styles.title}>Bond registration cost</h3>
              <p>
                R{" "}
                {result
                  ? result.bondCosts.bondRegistrationCost.toLocaleString()
                  : "0.00"}
              </p>
            </div>

            <div className={styles.subItem}>
              <h3 className={styles.title}>Bond deeds office fees</h3>
              <p>
                R{" "}
                {result
                  ? result.bondCosts.deedsOfficeFees.toLocaleString()
                  : "0.00"}
              </p>
            </div>

            <div className={styles.subItem}>
              <h3 className={styles.title}>Post, petties, FICA, other fees</h3>
              <p>
                R {result ? result.bondCosts.sundries.toLocaleString() : "0.00"}
              </p>
            </div>
          </div>

          <h3 className={styles.title}>Total Transfer Costs</h3>
          <p className={styles.resultValue}>
            R {result ? result.transferCosts.total.toLocaleString() : "0.00"}
          </p>

          <div className={styles.subItems}>
            <div className={styles.subItem}>
              <h3 className={styles.title}>Transfer duty</h3>
              <p>
                R{" "}
                {result
                  ? result.transferCosts.transferDuty.toLocaleString()
                  : "0.00"}
              </p>
            </div>

            <div className={styles.subItem}>
              <h3 className={styles.title}>Property transfer costs</h3>
              <p>
                R{" "}
                {result
                  ? result.transferCosts.propertyTransferCosts.toLocaleString()
                  : "0.00"}
              </p>
            </div>

            <div className={styles.subItem}>
              <h3 className={styles.title}>Transfer deeds office fees</h3>
              <p>
                R{" "}
                {result
                  ? result.transferCosts.deedsOfficeFees.toLocaleString()
                  : "0.00"}
              </p>
            </div>

            <div className={styles.subItem}>
              <h3 className={styles.title}>Post, petties FICA, other fees</h3>
              <p>
                R{" "}
                {result
                  ? result.transferCosts.sundries.toLocaleString()
                  : "0.00"}
              </p>
            </div>
            <p className={styles.note} style={{ marginTop: "  3rem" }}>
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
    </div>
  );
};

export default TransferCostCalculator;
