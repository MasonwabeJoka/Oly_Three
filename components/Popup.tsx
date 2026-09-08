import styles from "./Popup.module.scss";
import  Button  from "@/components/Button";
import { UIData } from "@/data/UIData";

const Popup = () => {
  const {normal, medium} = UIData;
  return (
    <div className={styles.container}>
      <p>You have entered an invalid email or password</p>
      <Button
        className={styles.okButton}
        children="OK"
        buttonVariant={normal}
        buttonSize={medium}
        ariaLabel="OK button"

      />
    </div>
  );
};

export default Popup;
