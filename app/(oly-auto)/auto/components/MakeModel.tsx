import Select from "@/components/Select";
import styles from "./MakeModel.module.scss";
import Button from "@/components/Button";
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

            ariaLabel="Condition"

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

            ariaLabel="Year"

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

            ariaLabel="Make"

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

            ariaLabel="Model"

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

          ariaLabel="Variant"

          required={false}
        />
      </div> */}
      <div className={`${styles.field} ${styles.moreFilters}`}>
        <Button
          children="More Filters"
          className={styles.moreFiltersBtn}
          buttonVariant="normal"
          buttonSize="large"


          ariaLabel="More Filters Button"


        />
      </div>
      <div className={`${styles.field} ${styles.continue}`}>
        <Button
          children="Continue"
          className={styles.continueBtn}
          buttonVariant="primary"
          buttonSize="large"

          type="submit"
          ariaLabel="Continue Button"


        />
      </div>

    </div>
  );
};

export default MakeModel;
