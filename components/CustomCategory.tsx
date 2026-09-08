import styles from "./CustomCategory.module.scss";
import Input from "./Input";
import Button from "./Button";

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
        ariaLabel="Submit Your Product"
        required={true}
      />
      <Button
        className={styles.submitButton}
        children="Submit"
        buttonVariant="normal"
        buttonSize="large"
        ariaLabel="Submit Button"

      />
    </div>
  );
};

export default CustomCategory;
