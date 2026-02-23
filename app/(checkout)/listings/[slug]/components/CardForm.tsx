import styles from "./CardForm.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard } from "lucide-react";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import SmallInputWrapper from "@/components/SmallInputWrapper";
import Link from "next/link";

const schema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Invalid card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY required"),
  cvc: z.string().regex(/^\d{3,4}$/, "3-4 digits"),
  name: z.string().min(2, "Name required"),
});

type FormData = z.infer<typeof schema>;

const CardForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [cardNumberError, setCardNumberError] = useState<string | null>(null);
  const [expiryError, setExpiryError] = useState<string | null>(null);
  const [cvcError, setCvcError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { cardNumber: "", expiry: "", cvc: "", name: "" },
  });

  const cardNumberValue = watch("cardNumber");
  const expiryValue = watch("expiry");

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    console.log("Payment:", data);
    setSubmitting(false);
    reset();
    alert("Processed (demo)");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          className={styles.name}
          placeholder="Cardholder Name"
          inputType="text"
          inputSize="large"
          label="Card holder"
          id="name"
          ariaLabel="Cardholder name"
          dashboard
          {...register("name")}
        />
        <Input
          className={styles.cardNumber}
          placeholder="Card Number"
          inputType="text"
          inputSize="Large"
          label="Card number"
          id="cardNumber"
          iconSrcRight={<CreditCard className={styles.creditCardIcon} />}
          iconWidth={32}
          iconHeight={32}
          iconPosition="right"
          ariaLabel="Card number"
          maxLength={19}
          inputMode="numeric"
          error={cardNumberError || errors.cardNumber?.message}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            // Allow: backspace, delete, tab, escape, enter, space (for formatting)
            if (
              ["Backspace", "Delete", "Tab", "Escape", "Enter", " "].includes(
                e.key,
              ) ||
              // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
              (e.ctrlKey &&
                ["a", "c", "v", "x"].includes(e.key.toLowerCase())) ||
              // Allow: arrow keys
              e.key.startsWith("Arrow")
            ) {
              setCardNumberError(null);
              return;
            }
            // Block non-numeric keys and show error
            if (!/^\d$/.test(e.key)) {
              e.preventDefault();
              setCardNumberError("Card Number must be numbers only");
            } else {
              setCardNumberError(null);
            }
          }}
          {...register("cardNumber", {
            onChange: (e) => {
              let v = e.target.value.replace(/\D/g, "");
              v = v.replace(/(\d{4})(?=\d)/g, "$1 ");
              setValue("cardNumber", v);
            },
          })}
          value={cardNumberValue}
          dashboard
        />
        <SmallInputWrapper
          className={styles.expiry}
          wrapperClass={styles.smallInputWrapper}
          placeholder="Expiry MM/YY"
          inputType="text"
          inputSize="small"
          wrapperSize="large"
          inputPosition="right"
          label="Expiry"
          id="expiry"
          ariaLabel="Expiry"
          maxLength={5}
          inputMode="numeric"
          error={expiryError || errors.expiry?.message}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            // Allow: backspace, delete, tab, escape, enter, slash (for formatting)
            if (
              ["Backspace", "Delete", "Tab", "Escape", "Enter", "/"].includes(
                e.key,
              ) ||
              // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
              (e.ctrlKey &&
                ["a", "c", "v", "x"].includes(e.key.toLowerCase())) ||
              // Allow: arrow keys
              e.key.startsWith("Arrow")
            ) {
              setExpiryError(null);
              return;
            }
            // Block non-numeric keys and show error
            if (!/^\d$/.test(e.key)) {
              e.preventDefault();
              setExpiryError("Expiry must be numbers only");
            } else {
              setExpiryError(null);
            }
          }}
          {...register("expiry", {
            onChange: (e) => {
              let v = e.target.value.replace(/\D/g, "");
              if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
              setValue("expiry", v);
            },
          })}
          value={expiryValue}
          dashboard
        />
        <SmallInputWrapper
          className={styles.cvc}
          wrapperClass={styles.smallInputWrapper}
          placeholder="CVC"
          inputType="text"
          inputSize="small"
          wrapperSize="large"
          inputPosition="right"
          label="CVC"
          id="cvc"
          ariaLabel="CVC"
          maxLength={4}
          inputMode="numeric"
          error={cvcError || errors.cvc?.message}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            // Allow: backspace, delete, tab, escape, enter
            if (
              ["Backspace", "Delete", "Tab", "Escape", "Enter"].includes(
                e.key,
              ) ||
              // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
              (e.ctrlKey &&
                ["a", "c", "v", "x"].includes(e.key.toLowerCase())) ||
              // Allow: arrow keys
              e.key.startsWith("Arrow")
            ) {
              setCvcError(null);
              return;
            }
            // Block non-numeric keys and show error
            if (!/^\d$/.test(e.key)) {
              e.preventDefault();
              setCvcError("CVC must be numbers only");
            } else {
              setCvcError(null);
            }
          }}
          {...register("cvc")}
          dashboard
        />
  <Link href={`/listings/some-slug/payment-success`}>
  <Button
          className={styles.payButton}
          buttonChildren={submitting ? "Processing..." : "Pay"}
          buttonType="primary"
          buttonSize="large"
          name="pay-btn"
          type="submit"
          ariaLabel="Pay Button"
          autoFocus={false}
          disabled={submitting}
          dashboard
        /></Link>
        
      </form>
    </div>
  );
};

export default CardForm;
