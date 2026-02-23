import React from "react";
import styles from "./UserTypeSelection.module.scss";
import Button from "@/components/Buttons";

interface UserTypeSelectionProps {
  onSelect: (type: "individual" | "business") => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose Verification Type</h1>
      <div className={styles.buttons}>
        <Button
          className={styles.individualButton}
          buttonChildren="Verify Individual Account"
          buttonType={"primary"}
          buttonSize="large"
          name="individual-btn"
          type="button"
          ariaLabel="Verify Individual Account"
          autoFocus={false}
          disabled={false}
          dashboard
          onClick={() => onSelect("individual")}
        />
        <Button
          className={styles.businessButton}
          buttonChildren="Verify Business Account"
          buttonType={"normal"}
          buttonSize="large"
          name="business-btn"
          type="button"
          ariaLabel="Verify Business Account"
          autoFocus={false}
          disabled={false}
          dashboard
          onClick={() => onSelect("business")}
        />
      </div>
    </div>
  );
};

export default UserTypeSelection;
