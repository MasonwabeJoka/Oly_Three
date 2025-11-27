"use client";
import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom"; // Correct import for pending status
import styles from "./AutoHeroSectionFieldsClient.module.scss";
import Button from "../../../../components/Buttons";
import Input from "@/components/Input";
import { suggestions } from "@/data/SuggestionsData";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import { useModalStore } from "@/store/modalStore";
import Select from "../../../../components/Select";
import NumberInput from "../../../../components/NumberInput";
import Link from "next/link";

type FormValues = z.infer<typeof searchFormSchema>;

const AutoHeroSectionFieldsClient = () => {
  const {
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {},
  });

  // Get pending state from parent <Form>; fallback to isSubmitting if unavailable
  const { pending } = useFormStatus() || { pending: isSubmitting };

  return (
    <>
      <div className={styles.searchFields}>
        <Link
          href="/dashboard/create-listing"
          className={`${styles.link} ${styles.field}`}
        >
          {/* {errors && <p className={styles.errorMessage}>{errors?.message}</p>} */}
          <Button
            buttonChildren="Sell Your Car"
            className={styles.createAListingBtn}
            buttonType="danger"
            buttonSize="large"
            name="sell-your-car-btn"
            type="button"
            ariaLabel="Sell Your Car Button"
            autoFocus={false}
            disabled={false}
          />
        </Link>

        <div className={`${styles.vehicleType} ${styles.field}`}>
          {/* <p className={styles.errorMessage}>{errors.searchTerm?.message}</p> */}
          <Controller
            name="vehicleType"
            control={control}
            render={({ field }) => (
              <Select
                options={[
                  "Cars",
                  "Motorcycles",
                  "Farm & Construction Vehicles",
                  "Buses",
                ]}
                initialValue="Select Vehicle Type"
                selectSize="large"
                label="Property Type"
                id="propertyType"
                name="propertyType"
                ariaLabel="Property Type Selector"
                autoFocus={false}
                required={false}
                //   onDropdownOpenChange={(isOpen) => {
                //     setIsPropertyTypeSelect(isOpen);
                //   }}
              />
            )}
          />
        </div>

        <div className={`${styles.totalPrice} ${styles.field}`}>
          <NumberInput
            className={styles.totalPriceInput}
            min={0}
            max={9999999999}
            step={100}
            debounceTime={500}
            id="totalPrice"
            value={0}
            inputSize="large"
            placeholder="What’s your budget (total amount)"
            autoFocus={false}
            required={true}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className={`${styles.totalPrice} ${styles.field}`}>
          <NumberInput
            className={styles.totalPriceInput}
            min={0}
            max={9999999999}
            step={100}
            debounceTime={500}
            id="totalPrice"
            value={0}
            inputSize="large"
            placeholder="What's your target monthly payment"
            autoFocus={false}
            required={true}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className={`${styles.totalPrice} ${styles.field}`}>
          <NumberInput
            className={styles.totalPriceInput}
            min={0}
            max={9999999999}
            step={100}
            debounceTime={500}
            id="totalPrice"
            value={0}
            inputSize="large"
            placeholder="Your planned deposit amount"
            autoFocus={false}
            required={true}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>

        <div className={styles.searchButton}>
          <Button
            buttonChildren="Continue"
            className={styles.search}
            buttonType="normal"
            buttonSize="large"
            name="Continue Button"
            type="submit"
            ariaLabel="Continue Button"
            autoFocus={false}
            disabled={pending} 
          />
        </div>
      </div>
    </>
  );
};

export default AutoHeroSectionFieldsClient;
