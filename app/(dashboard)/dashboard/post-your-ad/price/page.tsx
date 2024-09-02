"use client";
import styles from "./styles.module.scss";
import Link from "next/link";
import Select from "@/components/Select";
import NumberInput from "@/components/NumberInput";
import Icon from "@/components/Icon";
import Button from "@/components/Buttons";
import { useEffect, useState, ChangeEvent } from "react";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import Modal from "@/components/Modal";
import TransactionFee from "@/components/modals/TransactionFeeModal";
// TODO: Remove Transaction Fee
const Price = () => {
  const [price, setPrice] = useState<string>("");

  // Cleans the string and parses it into a float. Returns 0 if the input is invalid.
  function parseToNumber(input: string | number): number {
    if (typeof input === "number") return input;
    if (typeof input === "string" && input.trim() !== "") {
      const cleanedInput = input.replace(/[^\d.-]/g, "");
      const number = parseFloat(cleanedInput);
      return isNaN(number) ? 0 : number;
    }
    return 0;
  }

  const transactionFee = Formatter.formatPrice(parseToNumber(price) * 0.05);
  const totalPrice = Formatter.formatPrice(
    parseToNumber(price) + parseToNumber(transactionFee)
  );

  // Function to update the price value
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const incrementPrice = () => {
    setPrice((prevPrice) => {
      const newValue = parseToNumber(prevPrice) + 1;
      return newValue.toString();
    });
  };

  const decrementPrice = () => {
    setPrice((prevPrice) => {
      const newValue = Math.max(0, parseToNumber(prevPrice) - 1);
      return newValue.toString();
    });
  };

  const [showTransactionFeeModal, setShowTransactionFeeModal] =
    useState<boolean>(false);

  const openModal = () => {
    setShowTransactionFeeModal(true);
  };

  return (
    <form className={styles.container}>
      <h4 className={styles.title}>Set Price</h4>

      <div className={styles.mainSection}>
        <div className={styles.controls}>
          <Select
            className={styles.pricingOptions}
            options={[
              "Selling Price",
              "Negotiable Price",
              "Free",
              "Auction",
              "Price On Request",
            ]}
            currentValue="Choose Pricing Option"
            selectSize="large"
            selectPrompt="Price Types"
            label="Price Types"
            name="price-types"
            id="price-types"
            ariaLabel="Price Types Select"
            autoFocus={false}
            autoComplete="off"
            disabled={false}
            required={true}
            multiple={false}
            dashboard
          />
        </div>

        <div className={`${styles.controls} ${styles.priceContainer}`}>
          <NumberInput
            className={styles.price}
            inputSize="large"
            placeholder="Price"
            label="Price"
            id="price"
            name="price"
            ariaLabel="Price Input Field"
            autoFocus={false}
            required={true}
            value={price}
            onChange={handlePriceChange}
            onIncrement={incrementPrice}
            onDecrement={decrementPrice}
            dashboard
          />
        </div>
        <div className={styles.priceDisplay}>
          <div className={styles.transactionFeeModalContainer}>
            <Modal
              showModal={showTransactionFeeModal}
              setShowModal={setShowTransactionFeeModal}
              modalContent={
                <TransactionFee
                  setShowTransactionFeeModal={setShowTransactionFeeModal}
                />
              }
              dashboard
            />
          </div>
          <p className={styles.itemPrice}>
            Item Price: {Formatter.formatPrice(parseToNumber(price))}
          </p>
          <div className={styles.transactionFee}>
            <p className={styles.transactionFeeText}>
              Transaction Fee: {transactionFee}
            </p>
            <div className={styles.helpIconContainer} onClick={openModal}>
              <Icon
                className={styles.helpIcon}
                src="/icons/info.png"
                alt="help icon"
                width={24}
                height={16}
              />
            </div>
          </div>
          <p>
            Total Price: <span>{totalPrice}</span>
          </p>
        </div>
      </div>
      <div className={styles.buttons}>
        <Link href="/dashboard/post-your-ad/ad-description">
          <Button
            className={styles.proceedButton}
            buttonChildren="Proceed"
            buttonType="primary"
            buttonSize="large"
            name="proceed-btn"
            type="button"
            ariaLabel="Proceed Book"
            autoFocus={false}
            disabled={false}
            dashboard
          />
        </Link>
        <Link href="/dashboard/post-your-ad/features">
          <Button
            className={styles.backButton}
            buttonChildren="Back"
            buttonType="normal"
            buttonSize="large"
            name="back-btn"
            type="button"
            ariaLabel="Back Button"
            autoFocus={false}
            disabled={false}
            dashboard
          />
        </Link>
      </div>
    </form>
  );
};

export default Price;
