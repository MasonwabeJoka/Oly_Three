"use client";
import Input from "@/components/Input";
import styles from "./BankAccountDetailsClient.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useFormContext } from "react-hook-form";
import type { FormDataSchema } from "../validations/formDataSchema";

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
    throw error;
  }
};

type CreateAccountKey = keyof FormDataSchema["createAccount"];

interface Props {
  onNext: () => void;
}

const BankAccountDetailsClient = ({ onNext }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormContext<FormDataSchema>();

  const [banks, setBanks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBankNameOpen, setIsBankNameOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: CreateAccountKey
  ) => {
    setValue(`createAccount.${field}`, e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    trigger(`createAccount.${field}`);
  };

  useEffect(() => {
    const loadBanks = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBanks();
        setBanks(data);
        setIsError(false);
      } catch (error: any) {
        setIsError(true);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadBanks();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error fetching banks: {errorMessage}</div>;

  const bankNames = banks?.map((bank: any) => bank.name);
  return (
    <>
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
          value={watch("createAccount.bankName") || ""}
          error={errors.createAccount?.bankName?.message as string}
          {...register("createAccount.bankName")}
          onChange={(e) => handleInputChange(e, "bankName")}
          onDropdownOpenChange={(isOpen) => setIsBankNameOpen(isOpen)}
          dashboard
        />
      </div>
      {!isBankNameOpen && (
        <>
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
              label="Name"
              id="createAccount.accountHolder"
              placeholder="Enter account holder's name"
              ariaLabel="Account Holder"
              autoComplete="off"
              required
              value={watch("createAccount.accountHolder") || ""}
              error={errors.createAccount?.accountHolder?.message as string}
              {...register("createAccount.accountHolder")}
              onChange={(e) => handleInputChange(e, "accountHolder")}
              dashboard
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
              label="Account #"
              placeholder="Enter your account number"
              id="accountNumber"
              ariaLabel="Account Number"
              autoComplete="off"
              required
              value={watch("createAccount.accountNumber") || ""}
              error={errors.createAccount?.accountNumber?.message as string}
              {...register("createAccount.accountNumber")}
              onChange={(e) => handleInputChange(e, "accountNumber")}
              dashboard
            />
          </div>
        </>
      )}
    </>
  );
};

export default BankAccountDetailsClient;
