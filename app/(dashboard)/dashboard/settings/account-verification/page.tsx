import Button from "@/components/Buttons";
import styles from "./styles.module.scss";
import Link from "next/link";
const AccountVerification = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Account Verification</h4>
      <Link href="/dashboard/settings/account-verification/individual" className={styles.individualAccount}>
        <Button
          className={styles.individualAccountButton}
          buttonChildren="Verify Individual Account"
          buttonType="primary"
          buttonSize="large"
          name="individual-account-btn"
          type="button"
          ariaLabel="Verify Individual Account"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </Link>
      <Link href="/dashboard/settings/account-verification/individual" className={styles.BusinessAccount}>
        <Button
          className={styles.BusinessAccountButton}
          buttonChildren="Verify Business Account"
          buttonType="normal"
          buttonSize="large"
          name="business-account-btn"
          type="button"
          ariaLabel="Verify Business Account"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </Link>
    </div>
  );
};

export default AccountVerification;
