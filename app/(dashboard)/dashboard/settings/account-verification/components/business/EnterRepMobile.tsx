import Input from "@/components/Input";
import styles from "./EnterRepMobile.module.scss";
import axios from "axios";
import { useState } from "react";
import Button from "@/components/Buttons";

const EnterRepMobile = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = async () => {
    try {
      // Simulate sending SMS via API
      await axios.post("https://api.example.com/send-sms", { phoneNumber });
      setCodeSent(true);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate verifying code
      await axios.post("https://api.example.com/verify-sms", {
        phoneNumber,
        code,
      });
    //   nextStep();
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
      <div className={styles.container}>
        <p className={styles.description}>
          Enter the business representative's phone number below. We’ll send a
          6-digit verification code to complete the verification process.
        </p>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            inputType="tel"
            inputSize="large"
            placeholder="Representative's Phone Number"
            label="Representative's Phone Number"
            id="rep-phone-number"
            ariaLabel="Representative's Phone Number Field"
            autoFocus={false}
            autoComplete="off"
            disabled={codeSent}
            required={true}
            dashboard
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {codeSent && (
            <Input
              className={styles.input}
              inputType="text"
              inputSize="large"
              placeholder="Verification Code"
              label="Verification Code"
              id="rep-verification-code"
              ariaLabel="Verification Code Field"
              autoFocus={true}
              autoComplete="off"
              required={true}
              dashboard
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          )}
        </div>
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
            disabled={false}
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
            disabled={false}
            dashboard
            onClick={handleVerifyCode}
          />
        )}
      </div>
  
  );
};

export default EnterRepMobile;
