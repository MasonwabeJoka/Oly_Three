"use client";
import styles from "./styles.module.scss";
import Link from "next/link";
import Select from "@/components/Select";
import Input from "@/components/Input";
import NumberInput from "@/components/NumberInput";
import Icon from "@/components/Icon";
import Button from "@/components/Buttons";
import { useEffect, useState } from "react";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import Modal from "@/components/Modal";
import TransactionFee from "@/components/modals/TransactionFeeModal";

const Price = () => {
  const [price, setPrice] = useState<any>("");
  const transactionFee = Formatter.formatPrice(price * 0.05);
  const [showTransactionFeeModal, setShowTransactionFeeModal] = useState(false);

  // Cleans the string and parses it into a float. Returns 0 if the input is invalid.
  function parseToNumber(input: string | number): number {
    if (typeof input === "number") return input;
    const cleanedInput = input.replace(/[^\d.-]/g, "");
    const number = parseFloat(cleanedInput);
    return isNaN(number) ? 0 : number;
  }
  

  const totalPrice = Formatter.formatPrice(
    parseToNumber(price) + parseToNumber(transactionFee)
  );

  // Function to update the price value
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const openModal = () => {
    setShowTransactionFeeModal(true);
  };

  return (
    <form className={styles.container}>
      <h4 className={styles.title}>Set Price</h4>

      <div className={styles.mainSection}>
        <div className={styles.controls}>
          <Select
            className={styles.priceTypes}
            options={[
              "Selling Price",
              " Negotiable Price",
              "Free",
              "Auction",
              "Price On Request",
            ]}
            initialValue="Choose Pricing Option"
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
            dashboard
          />
        </div>
        <div className={styles.priceDisplay}>
          <div className={styles.transactionFeeModalContainer}>
            <Modal
              showModal={showTransactionFeeModal}
              setShowModal={() => {
                setShowTransactionFeeModal;
              }}
              modalContent={<TransactionFee />}
            />
          </div>
          <p className={styles.itemPrice}>
            Item Price: {Formatter.formatPrice(parseToNumber(price))}
          </p>
          <div className={styles.transactionFee}>
            <p className={styles.transactionFeeText}>
              Transaction Fee:{" "}
              {Formatter.formatPrice(parseToNumber(transactionFee))}
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
            Total Price:{" "}
            <span> {Formatter.formatPrice(parseToNumber(totalPrice))}</span>
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
