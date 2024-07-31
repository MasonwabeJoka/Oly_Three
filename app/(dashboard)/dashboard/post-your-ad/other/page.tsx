"use client";
import styles from "./styles.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Buttons";
import Select from "@/components/Select";

const Other = () => {
  return (
    <form className={styles.container}>
      <legend className={styles.title}>Other Job</legend>
      <div className={styles.selectCategory}>
        <Select
          options={[]}
          currentValue="Select a category"
          selectSize="large"
          label="Categories"
          id="categories"
          name="categories"
          ariaLabel="Categories"
          autoFocus={false}
          required={true}
        />
      </div>
      <div className={styles.customItemContainer}>
        <Input
          className={styles.customItem}
          inputType="text"
          inputSize="large"
          placeholder="List your product or service"
          label="List your product or service"
          id="custom_category_item"
          name="custom_category_item"
          ariaLabel="Custom Category Item"
          autoFocus={false}
          autoComplete="on"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          disabled={false}
          required={true}
        />
      </div>
      <div className={styles.customCategoryContainer}>
        <Input
          className={styles.customCategory}
          inputType="text"
          inputSize="large"
          placeholder="Add a custom category"
          label="Add your custom category"
          id="custom_category"
          name="custom_category"
          ariaLabel="Custom Category"
          autoFocus={false}
          autoComplete="on"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          disabled={false}
          required={true}
        />
      </div>
      <div className={styles.proceedButtonContainer}>
        <Button
          className={styles.proceedButton}
          buttonChildren="Proceed"
          buttonType="primary"
          buttonSize="large"
          name="proceed"
          type="button"
          ariaLabel="Proceed Button"
          autoFocus={false}
          disabled={false}
        />
      </div>
      <div className={styles.backButtonContainer}>
        <Button
          className={styles.backButton}
          buttonChildren="Back"
          buttonType="normal"
          buttonSize="large"
          name="back"
          type="button"
          ariaLabel="Back Button"
          autoFocus={false}
          disabled={false}
        />
      </div>
    </form>
  );
};
export default Other;
