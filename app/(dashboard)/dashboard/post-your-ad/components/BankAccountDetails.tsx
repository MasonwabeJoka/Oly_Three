import styles from "./BankAccountDetails.module.scss";
import { FormWrapper } from "./FormWrapper";
import BankAccountDetailsClient from "./BankAccountDetailsClient";

export default function BankAccountDetails() {
  return (
    <FormWrapper title="">
      <div className={styles.container}>
        <h2 className={styles.title}>Bank Account Details</h2>
        <BankAccountDetailsClient />
      </div>
    </FormWrapper>
  );
}
