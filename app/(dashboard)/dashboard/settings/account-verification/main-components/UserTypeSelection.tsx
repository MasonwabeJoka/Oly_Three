import React from "react";
import styles from "./UserTypeSelection.module.scss";
import Button from "@/components/Button";

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
          children="Verify Individual Account"
          buttonVariant={"primary"}
          buttonSize="large"


          ariaLabel="Verify Individual Account"


          dashboard
          onClick={() => onSelect("individual")}
        />
        <Button
          className={styles.businessButton}
          children="Verify Business Account"
          buttonVariant={"normal"}
          buttonSize="large"


          ariaLabel="Verify Business Account"


          dashboard
          onClick={() => onSelect("business")}
        />
      </div>
    </div>
  );
};

export default UserTypeSelection;
