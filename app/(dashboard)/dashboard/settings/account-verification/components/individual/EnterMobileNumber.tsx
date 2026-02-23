"use client";
import styles from "./EnterMobileNumber.module.scss";
import Input from "@/components/Input";
import axios from "axios";
import { useState } from "react";
import Button from "@/components/Buttons";
import { useFormContext } from "react-hook-form";

interface EnterMobileNumberProps {
  onNext: () => void | Promise<void>;
}

const EnterMobileNumber: React.FC<EnterMobileNumberProps> = ({ onNext }) => {
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
    trigger,
  } = useFormContext();
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = async () => {
    const isValid = await trigger("phoneNumber");
    if (isValid) {
      try {
        const phoneNumber = (
          document.getElementById("phone-number") as HTMLInputElement
        )?.value;
        await axios.post("https://api.example.com/send-sms", { phoneNumber });
        setCodeSent(true);
        clearErrors("phoneNumber");
      } catch (error) {
        setError("phoneNumber", {
          message: "Failed to send SMS. Please try again.",
        });
      }
    }
  };

  const handleVerifyCode = async () => {
    const isValid = await trigger("verificationCode");
    if (isValid) {
      try {
        const phoneNumber = (
          document.getElementById("phone-number") as HTMLInputElement
        )?.value;
        const code = (
          document.getElementById("verification-code") as HTMLInputElement
        )?.value;
        await axios.post("https://api.example.com/verify-sms", {
          phoneNumber,
          code,
        });
        onNext();
      } catch (error) {
        setError("verificationCode", {
          message: "Invalid code. Please try again.",
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Enter your phone number below. We’ll send a 6-digit verification code to
        complete the verification process.
      </p>
      <div className={styles.inputContainer}>
           {errors.phoneNumber && (
          <p className={styles.error}>
            {String(errors.phoneNumber.message || "")}
          </p>
        )}
        <Input
          className={styles.input}
          inputType="tel"
          inputSize="large"
          placeholder="Phone Number"
          label="Phone Number"
          id="phone-number"
          ariaLabel="Phone Number Field"
          autoFocus={false}
          autoComplete="off"
          disabled={codeSent}
          required
          dashboard
          {...register("phoneNumber")}
        />
     
        {codeSent && (
          <Input
            className={styles.input}
            inputType="text"
            inputSize="large"
            placeholder="Verification Code"
            label="Verification Code"
            id="verification-code"
            ariaLabel="Verification Code Field"
            autoFocus={true}
            autoComplete="off"
            required
            dashboard
            {...register("verificationCode")}
          />
        )}
        <div className={styles.codeButtonContainer}>
       
            {errors.verificationCode && (
              <p className={styles.error}>
                {String(errors.verificationCode.message || "")}
              </p>
            )}
          
          {!codeSent ? (
            <Button
              className={styles.button}
              buttonChildren="Send Code"
              buttonType="primary"
              buttonSize="large"
              name="send-code-btn"
              type="button"
              ariaLabel="Send Code"
              autoFocus={false}
              disabled={!!errors.phoneNumber}
              dashboard
              onClick={handleSendCode}
            />
          ) : (
            <Button
              className={styles.button}
              buttonChildren="Verify Code"
              buttonType="primary"
              buttonSize="large"
              name="verify-code-btn"
              type="button"
              ariaLabel="Verify Code"
              autoFocus={false}
              disabled={!!errors.verificationCode}
              dashboard
              onClick={handleVerifyCode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EnterMobileNumber;
