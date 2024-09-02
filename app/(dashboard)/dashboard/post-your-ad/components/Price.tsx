"use client";
import styles from "./Price.module.scss";
import { useFormContext } from "react-hook-form";
import Select from "@/components/Select";
import NumberInput from "@/components/NumberInput";
import Icon from "@/components/Icon";
import { useState, ChangeEvent } from "react";
import * as Formatter from "@/utils/formatterFunctions/Formatter";
import Modal from "@/components/Modal";
import TransactionFee from "@/components/modals/TransactionFeeModal";
import { FormWrapper } from "./FormWrapper";

const Price = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const [price, setPrice] = useState<number>(0);
  const [showTransactionFeeModal, setShowTransactionFeeModal] =
    useState<boolean>(false);

  const transactionFee = Formatter.formatPrice(price * 0.05);
  const totalPrice = Formatter.formatPrice(price + parseFloat(transactionFee));

  // Function to handle price changes
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueAsNumber = parseFloat(event.target.value) || 0;
    setPrice(valueAsNumber);
    setValue("price", valueAsNumber);
  };

  const openModal = () => {
    setShowTransactionFeeModal(true);
  };

  const pricingOption = {
    fixedPrice: {
      label: "Fixed Price",
      value: "fixedPrice",
    },

    auction: {
      label: "Auction",
      value: "auction",
    },

    negotiable: {
      label: "Negotiable Price",
      value: "negotiable",
    },
    free: {
      label: "Free",
      value: "free",
    },

    contactForPrice: {
      label: "Contact For Price",
      value: "contactForPrice",
    },
  };
  return (
    <FormWrapper title="Price">
      <div className={styles.container}>
        <div className={styles.mainSection}>
          <div className={styles.controls}>
            <Select
              className={styles.pricingOptions}
              options={[
                pricingOption.fixedPrice,
                pricingOption.auction,
                pricingOption.negotiable,
                pricingOption.free,
                pricingOption.contactForPrice,
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
              dashboard
              error={errors.pricingOption?.message as string}
              {...register("pricingOption")}
            />
          </div>

          <div className={`${styles.controls} ${styles.priceContainer}`}>
            <NumberInput
              className={styles.price}
              min={0}
              max={9999999999}
              step={100}
              debounceTime={500}
              id="price"
              value={price}
              inputSize="large"
              placeholder="Price"
              autoFocus={false}
              required={true}
              dashboard
              error={errors.price?.message as string}
              {...register("price")}
              onChange={handlePriceChange}
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Price;
