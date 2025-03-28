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
    trigger,
  } = useFormContext();

  const priceType = watch("price.pricingOption");
  const { setShowFAQs } = useFAQStore();

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    const valueAsNumber = parseFloat(event.target.value) || 0;
    setValue(`price.${field}`, valueAsNumber, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
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
              {...register("price.pricingOption")}
              error={errors.price?.pricingOption?.message}
            />
          </div>

          {(priceType === "fixedPrice" || priceType === "negotiable") && (
            <div className={`${styles.controls} ${styles.priceContainer}`}>
              <NumberInput
                className={styles.price}
                min={0}
                max={9999999999}
                step={1}
                debounceTime={500}
                id="price"
                value={watch("price.amount") || 0}
                inputSize="large"
                placeholder="Price"
                autoFocus={false}
                required={true}
                dashboard
                error={errors.price?.amount?.message}
                {...register("price.amount")}
                onChange={(e) => handlePriceChange(e, "amount")}
              />
            </div>
          )}

          {priceType === "auction" && (
            <>
              <div className={`${styles.controls} ${styles.priceContainer}`}>
                <NumberInput
                  className={styles.price}
                  min={0}
                  max={9999999999}
                  step={100}
                  debounceTime={500}
                  id="startingPrice"
                  value={watch("price.startingPrice") || 0}
                  inputSize="large"
                  placeholder="Starting Price"
                  autoFocus={false}
                  required={true}
                  dashboard
                  error={errors.price?.startingPrice?.message}
                  {...register("price.startingPrice")}
                  onChange={(e) => handlePriceChange(e, "startingPrice")}
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
                  value={watch("price.buyNowPrice") || 0}
                  inputSize="large"
                  placeholder="Buy Now Price"
                  autoFocus={false}
                  required={true}
                  dashboard
                  error={errors.price?.buyNowPrice?.message}
                  {...register("price.buyNowPrice")}
                  onChange={(e) => handlePriceChange(e, "buyNowPrice")}
                />
              </div>

              <div className={`${styles.controls} ${styles.priceContainer}`}>
                <Select
                  className={styles.auctionDuration}
                  options={[
                    { label: "1 Day Auction", value: "1" },
                    { label: "5 Days Auction", value: "5" },
                    { label: "10 Days Auction", value: "10" },
                    { label: "Set Custom Duration (Number of Days)", value: "custom" },
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
                  error={errors.price?.auctionDuration?.message}
                  {...register("price.auctionDuration")}
                />
              </div>
              <div className={`${styles.controls} ${styles.priceContainer}`}>
                <Select
                  className={styles.startTime}
                  options={[
                    { label: "Start Now", value: "now" },
                    { label: "Start in 4 Hours", value: "4h" },
                    { label: "Start in 24 Hours (1 day)", value: "24h" },
                    { label: "Start in 48 Hours (2 days)", value: "48h" },
                    { label: "Select Custom Date", value: "customDate" },
                    { label: "Select Custom Time", value: "customTime" },
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
                  error={errors.price?.startTime?.message}
                  {...register("price.startTime")}
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

