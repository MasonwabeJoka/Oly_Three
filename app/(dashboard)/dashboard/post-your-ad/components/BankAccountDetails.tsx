import Input from "@/components/Input";
import styles from "./BankAccountDetails.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { FormWrapper } from "./FormWrapper";
import { useFormContext } from "react-hook-form";
import { bankAccountValidations } from "../validations/multiStepFormValidations";
const fetchBanks = async () => {
  try {
    const response = await axios.get("/api/paystack/getBanksList", {
      params: {
        country: "South Africa",
        enabled_for_verification: "true",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching banks:", error);
    throw error; // Rethrow to ensure the error is caught by useQuery
  }
};

const BankAccountDetails = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const handleBankNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("bankName", e.target.value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const handleAccountHolderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("accountHolder", e.target.value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("accountNumber", e.target.value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const {
    data: banks,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["banks"],
    queryFn: fetchBanks,
    enabled: false, // Disable automatic query on mount
  });

  useEffect(() => {
    refetch(); // Manually trigger the query
  }, [refetch]);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error fetching banks: {error.message}</div>;

  const bankNames = banks?.map((bank: any) => bank.name);

  //Todo: Create a select for saved bank cards/accounts
  //Todo: The select options should have the bank name and card/account number
  return (
    <FormWrapper title="Bank Account Details">
      <div className={styles.container}>
        <div className={styles.bankNameContainer}>
          <Input
            className={styles.bankName}
            isSearchBar={true}
            suggestions={bankNames}
            inputType="text"
            inputSize="large"
            iconSrcRight="/icons/search.png"
            iconPosition="right"
            iconWidth={32}
            iconHeight={32}
            label="Bank Name"
            placeholder="Enter your bank's name"
            id="bankName"
            ariaLabel="Bank Name"
            autoComplete="off"
            required
            error={errors.bankName?.message as string}
            {...register("bankName")}
            onChange={handleBankNameChange}
          />
        </div>
        <div className={styles.accountHolderContainer}>
          <Input
            className={styles.accountHolder}
            isSearchBar={false}
            inputType="text"
            inputSize="large"
            iconSrcRight="/icons/search.png"
            iconPosition="right"
            iconWidth={32}
            iconHeight={32}
            label="Account Holder"
            id="accountHolder"
            placeholder="Enter account holder's name"
            ariaLabel="Account Holder"
            autoComplete="off"
            required
            error={errors.accountHolder?.message as string}
            {...register("accountHolder")}
            onChange={handleAccountHolderChange}
          />
        </div>
        <div className={styles.accountNumberContainer}>
          <Input
            className={styles.accountNumber}
            isSearchBar={false}
            inputType="text"
            inputSize="large"
            iconSrcRight="/icons/search.png"
            iconPosition="right"
            iconWidth={32}
            iconHeight={32}
            label="Account Number"
            placeholder="Enter your account number"
            id="accountNumber"
            ariaLabel="Account Number"
            autoComplete="off"
            required
            error={errors.accountNumber?.message as string}
            {...register("accountNumber")}
            onChange={handleAccountNumberChange}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default BankAccountDetails;
