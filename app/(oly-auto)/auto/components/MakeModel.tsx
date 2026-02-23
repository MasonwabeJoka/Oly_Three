import Select from "@/components/Select";
import styles from "./MakeModel.module.scss";
import Button from "@/components/Buttons";
interface MakeModelProps {}

const MakeModel = ({}: MakeModelProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={`${styles.field} ${styles.condition}`}>
          <Select
            options={["New", "Used"]}
            initialValue="Condition"
            selectSize="large"
            label="Condition"
            id="condition"
            name="condition"
            ariaLabel="Condition"
            autoFocus={false}
            required={false}
          />
        </div>
        <div className={`${styles.field} ${styles.year}`}>
          <Select
            options={["2021", "2022", "2023"]}
            initialValue="Year"
            selectSize="large"
            label="Year"
            id="year"
            name="year"
            ariaLabel="Year"
            autoFocus={false}
            required={false}
          />
        </div>
        <div className={`${styles.field} ${styles.make}`}>
          <Select
            options={["Toyota", "Ford", "Honda"]}
            initialValue="Make"
            selectSize="large"
            label="Make"
            id="make"
            name="make"
            ariaLabel="Make"
            autoFocus={false}
            required={false}
          />
        </div>
        <div className={`${styles.field} ${styles.model}`}>
          <Select
            options={["Camry", "Corolla", "RAV4"]}
            initialValue="Model"
            selectSize="large"
            label="Model"
            id="model"
            name="model"
            ariaLabel="Model"
            autoFocus={false}
            required={false}
          />
        </div>
      </div>
      {/* <div className={`${styles.field} ${styles.variant}`}>
        <Select
          options={["Variant 1", "Variant 2", "Variant 3"]}
          initialValue="Variant"
          selectSize="large"
          label="Variant"
          id="variant"
          name="variant"
          ariaLabel="Variant"
          autoFocus={false}
          required={false}
        />
      </div> */}
      <div className={`${styles.field} ${styles.moreFilters}`}>
        <Button
          buttonChildren="More Filters"
          className={styles.moreFiltersBtn}
          buttonType="normal"
          buttonSize="large"
          name="more-filters-btn"
          type="button"
          ariaLabel="More Filters Button"
          autoFocus={false}
          disabled={false}
        />
      </div>
      <div className={`${styles.field} ${styles.continue}`}>
        <Button
          buttonChildren="Continue"
          className={styles.continueBtn}
          buttonType="primary"
          buttonSize="large"
          name="continue-btn"
          type="submit"
          ariaLabel="Continue Button"
          autoFocus={false}
          disabled={false}
        />
      </div>

    </div>
  );
};

export default MakeModel;
