import styles from "./Popup.module.scss";
import  Button  from "@/components/Buttons";
import { UIData } from "@/data/UIData";

const Popup = () => {
  const {normal, medium} = UIData;
  return (
    <div className={styles.container}>
      <p>You have entered an invalid email or password</p>
      <Button
        className={styles.okButton}
        buttonChildren="OK"
        buttonType={normal}
        buttonSize={medium}
        name="ok"
        type="button"
        ariaLabel="OK button"
        autoFocus={false}
        disabled={false}
      />
    </div>
  );
};

export default Popup;
