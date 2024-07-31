"use client";
import styles from "./Price.module.scss";
import { useFormContext} from "react-hook-form";
import { multiStepFormSchema } from "@/lib/validations/formValidations";
import Select from "@/components/Select";
import NumberInput from "@/components/NumberInput";
import Icon from "@/components/Icon";
import { useEffect, useState, ChangeEvent } from "react";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import Modal from "@/components/Modal";
import TransactionFee from "@/components/modals/TransactionFeeModal";
import { DevTool } from "@hookform/devtools";

const Price = () => {
  const [price, setPrice] = useState<string>("");

    const {
      register,
      control,
      formState: { errors},
      getValues,
      setValue,
      watch,
    } = useFormContext();
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

  // const incrementPrice = () => {
  //   setPrice((prevPrice) => {
  //     const newValue = parseToNumber(prevPrice) + 1;
  //     return newValue.toString();
  //   });
  // };

  // const decrementPrice = () => {
  //   setPrice((prevPrice) => {
  //     const newValue = Math.max(0, parseToNumber(prevPrice) - 1);
  //     return newValue.toString();
  //   });
  // };

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
            className={styles.priceTypes}
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
            id="price-types"
            ariaLabel="Price Types Select"
            autoFocus={false}
            autoComplete="off"
            disabled={false}
            required={true}
            multiple={false}
            dashboard
            error={errors.priceType?.message as string}
            {...register("priceType")}
              onChange={(e) => {
                setValue("priceType", e.target.value, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
          />
        </div>

        <div className={`${styles.controls} ${styles.priceContainer}`}>
          <NumberInput
            className={styles.price}
            value={price}
            inputSize="large"
            placeholder="Price"
            autoFocus={false}
            required={true}
            dashboard
            error={errors.price?.message as string}
            {...register("price")}
              onChange={(e) => {
                // handlePriceChange
                setValue("price", e.target.value, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
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
      {/* <div className={styles.buttons}>
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
      </div> */}
       <DevTool control={control} />
    </form>
  );
};

export default Price;