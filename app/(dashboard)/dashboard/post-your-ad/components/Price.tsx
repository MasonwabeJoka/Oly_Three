"use client";
import styles from "./Price.module.scss";
import { useFormContext } from "react-hook-form";
import Select from "@/components/Select";
import NumberInput from "@/components/NumberInput";
import { useState, ChangeEvent } from "react";
import { FormWrapper } from "./FormWrapper";
import Button from "@/components/Buttons";
import useFAQStore from "../store/useFAQStore";
import { priceValidations } from "../validations/multiStepFormValidations";

const Price = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const [price, setPrice] = useState<number>(0);
  const priceType = watch("price.pricingOption");
  const { setShowFAQs } = useFAQStore();

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueAsNumber = parseFloat(event.target.value) || 0;
    setPrice(valueAsNumber);
    setValue("price", valueAsNumber, { shouldValidate: true });
  };

  const pricingOption = {
    fixedPrice: { label: "Fixed Price", value: "fixedPrice" },
    auction: { label: "Auction", value: "auction" },
    negotiable: { label: "Negotiable Price", value: "negotiable" },
    free: { label: "Free", value: "free" },
    contactForPrice: { label: "Contact For Price", value: "contactForPrice" },
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
                pricingOption.negotiable,
                pricingOption.auction,
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
              // error={errors.pricingOption?.message as string}
              {...register("price.pricingOption")}
              error={errors.price?.pricingOption?.message}
            />
          </div>

          {(priceType === "Fixed Price" ||
            priceType === "Negotiable Price") && (
            <div className={`${styles.controls} ${styles.priceContainer}`}>
              <NumberInput
                className={styles.price}
                min={0}
                max={9999999999}
                step={1}
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
          )}

          {priceType === "Auction" && (
            <>
              <div className={`${styles.controls} ${styles.priceContainer}`}>
                <NumberInput
                  className={styles.price}
                  min={0}
                  max={9999999999}
                  step={100}
                  debounceTime={500}
                  id="startingPrice"
                  value={price}
                  inputSize="large"
                  placeholder="Starting Price"
                  autoFocus={false}
                  required={true}
                  dashboard
                  error={errors.startingPrice?.message as string}
                  {...register("startingPrice")}
                  onChange={handlePriceChange}
                />
              </div>
              <div className={`${styles.controls} ${styles.priceContainer}`}>
                <NumberInput
                  className={styles.price}
                  min={0}
                  max={9999999999}
                  step={100}
                  debounceTime={500}
                  id="buyNowPrice"
                  value={price}
                  inputSize="large"
                  placeholder="Buy Now Price"
                  autoFocus={false}
                  required={true}
                  dashboard
                  error={errors.buyNowPrice?.message as string}
                  {...register("buyNowPrice")}
                  onChange={handlePriceChange}
                />
              </div>

              <div className={`${styles.controls} ${styles.priceContainer}`}>
                <Select
                  className={styles.auctionDuration}
                  options={[
                    "1 Day Auction",
                    "5 Days Auction",
                    "10 Days Auction",
                    "Set Custom Duration (Number of Days)",
                  ]}
                  currentValue="Auction Duration"
                  selectSize="large"
                  selectPrompt="Auction Duration"
                  label="Auction Duration"
                  id="auctionDuration"
                  ariaLabel="Auction Duration"
                  autoFocus={false}
                  autoComplete="off"
                  disabled={false}
                  required={true}
                  dashboard
                  error={errors.auctionDuration?.message as string}
                  {...register("auctionDuration")}
                />
              </div>
              <div className={`${styles.controls} ${styles.priceContainer}`}>
                <Select
                  className={styles.startTime}
                  options={[
                    "Start Now",
                    "Start in 4 Hours",
                    "Start in 24 Hours (1 day)",
                    "Start in 48 Hours (2 days)",
                    "Select Custom Date",
                    "Select Custom Time",
                  ]}
                  currentValue="Auction Start Time"
                  selectSize="large"
                  selectPrompt="Start Time"
                  label="Auction Start Time"
                  id="startTime"
                  ariaLabel="Auction Start Time"
                  autoFocus={false}
                  autoComplete="off"
                  disabled={false}
                  required={true}
                  dashboard
                  error={errors.startTime?.message as string}
                  {...register("startTime")}
                />
              </div>
              <div className={styles.faqs}>
                <Button
                  className={styles.proceedButton}
                  buttonChildren="Auctions FAQs"
                  buttonType="info"
                  buttonSize="large"
                  name="faq-btn"
                  type="button"
                  ariaLabel="Auctions FAQs"
                  autoFocus={false}
                  disabled={false}
                  dashboard
                  onClick={() => setShowFAQs(true)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};

export default Price;
