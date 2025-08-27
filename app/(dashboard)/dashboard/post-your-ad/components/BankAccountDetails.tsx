import styles from "./BankAccountDetails.module.scss";
import { FormWrapper } from "./FormWrapper";
import BankAccountDetailsClient from "./BankAccountDetailsClient";

interface Props {
  onNext: () => void;
}

export default function BankAccountDetails({onNext}: Props) {
  return (
      <div className={styles.container}>
        <h2 className={styles.title}>Bank Account Details</h2>
        <BankAccountDetailsClient onNext={onNext} />
      </div>
  );
}
