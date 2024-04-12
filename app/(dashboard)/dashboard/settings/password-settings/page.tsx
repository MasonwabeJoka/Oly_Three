import styles from "./styles.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import Link from "next/link";

const PasswordSettings = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Password Settings</h4>
      <div className={styles.inputContainer}>
        <Input
          className={styles.oldPassword}
          inputType="password"
          inputSize="large"
          placeholder="Enter old password"
          label="Enter old password"
          id="old-password"
          name="old-password"
          ariaLabel="Old Password Field"
          autoFocus={false}
          autoComplete="off"
          disabled={false}
          required={true}
        />
      </div>

      <div className={styles.inputContainer}>
        <Input
          className={styles.newPassword}
          inputType="password"
          inputSize="large"
          placeholder="Enter new password"
          label="Enter new password"
          id="new-password"
          name="new-password"
          ariaLabel="New Password Field"
          autoFocus={false}
          autoComplete="off"
          disabled={false}
          required={true}
        />
      </div>
      <div className={styles.inputContainer}>
        <Input
          className={styles.reEnterPassword}
          inputType="password"
          inputSize="large"
          placeholder="Re-enter new password"
          label="Re-enter new password"
          id="reenter-password"
          name="reenter-password"
          ariaLabel="Re-enter New Password Field"
          autoFocus={false}
          autoComplete="off"
          disabled={false}
          required={true}
        />
      </div>
      <div
        className={`${styles.passwordButtonContainer} ${styles.buttonContainer}`}
      >
        <Button
          className={styles.changePasswordButton}
          buttonChildren="Change password"
          buttonType="primary"
          buttonSize="large"
          name="change-password-btn"
          type="button"
          ariaLabel="Change Password Button"
          autoFocus={false}
          disabled={false}
        />
      </div>

      <div className={styles.buttonContainer}>
        <Link href="/dashboard/post-your-ad/settings">
          <Button
            className={styles.backButton}
            buttonChildren="Back"
            buttonType="normal"
            buttonSize="large"
            name="back-btn"
            type="button"
            ariaLabel="Back Button"
            autoFocus={false}
            disabled={false}
          />
        </Link>
      </div>
    </div>
  );
};

export default PasswordSettings;
