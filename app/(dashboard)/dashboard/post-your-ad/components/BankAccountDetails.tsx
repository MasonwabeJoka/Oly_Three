import Input from "@/components/Input";
import styles from "./BankAccountDetails.module.scss";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { FormWrapper } from "./FormWrapper";
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

const BankAccountDetails = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormContext<FormDataSchema>();

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

  const {
    data: banks,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["banks"],
    queryFn: fetchBanks,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error fetching banks: {error.message}</div>;

  const bankNames = banks?.map((bank: any) => bank.name);

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
            value={watch("createAccount.bankName") || ""}
            error={errors.createAccount?.bankName?.message as string}
            {...register("createAccount.bankName")}
            // error={errors.bankAccount?.bankName?.message}
            onChange={(e) => handleInputChange(e, "bankName")}
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
            id="createAccount.accountHolder"
            placeholder="Enter account holder's name"
            ariaLabel="Account Holder"
            autoComplete="off"
            required
            value={watch("createAccount.accountHolder") || ""}
            error={errors.createAccount?.accountHolder?.message as string}
            {...register("createAccount.accountHolder")}
            // error={errors.bankAccount?.accountHolder?.message}
            onChange={(e) => handleInputChange(e, "accountHolder")}
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
            value={watch("createAccount.accountNumber") || ""}
            error={errors.createAccount?.accountNumber?.message as string}
            {...register("createAccount.accountNumber")}
            // error={errors.createAccount?.accountNumber?.message}
            onChange={(e) => handleInputChange(e, "accountNumber")}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default BankAccountDetails;
