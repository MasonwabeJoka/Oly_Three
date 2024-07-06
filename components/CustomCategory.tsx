import styles from "./CustomCategory.module.scss";
import Input from "./Input";
import Button from "./Buttons";

const CustomCategory = () => {
  return (
    <div className={styles.container}>
      <Input
        className={styles.submitProduct}
        inputType="text"
        inputColourType="normal"
        inputSize="large"
        iconSrcLeft=""
        iconSrcRight=""
        iconPosition="right"
        iconWidth={32}
        iconHeight={32}
        label="Submit Your Product"
        placeholder="Submit Your Product Or Service"
        id="submitProduct"
        name="submitProduct"
        ariaLabel="Submit Your Product"
        autoFocus={false}
        required={false}
      />
      <Button
        className={styles.submitButton}
        buttonChildren="Submit"
        buttonType="normal"
        buttonSize="large"
        name="submit-btn"
        type="button"
        ariaLabel="Submit Button"
        autoFocus={false}
        disabled={false}
      />
    </div>
  );
};

export default CustomCategory;
