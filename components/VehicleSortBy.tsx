import styles from "./VehicleSortBy.module.scss";
import Button from "./Buttons";
interface VehicleSortByProps {
  buttonLabel?: string;
  buttonLabelSub?: string;
}

const VehicleSortBy = ({}: VehicleSortByProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.description}>Sorting options</p>

      <div className={styles.buttonsContainer}>
        <Button
          buttonChildren={<ButtonChildren buttonLabel="Default" />}
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="default"
          type="submit"
          ariaLabel="Default Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={<ButtonChildren buttonLabel="Price: Low to High" />}
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="price-low-to-high"
          type="submit"
          ariaLabel="Price: Low to High Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={<ButtonChildren buttonLabel="Price: High to Low" />}
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="price-high-to-low"
          type="submit"
          ariaLabel="Price: High to Low Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={<ButtonChildren buttonLabel="Mileage: Low to High" />}
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="mileage-low-to-high"
          type="submit"
          ariaLabel="Mileage: Low to High Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={<ButtonChildren buttonLabel="Year: Newest First" />}
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="year-newest-first"
          type="submit"
          ariaLabel="Year: Newest First Button"
          autoFocus={false}
          disabled={false}
        />

        <Button
          buttonChildren={<ButtonChildren buttonLabel="Recently Added" />}
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="recently-added"
          type="submit"
          ariaLabel="Recently Added Button"
          autoFocus={false}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default VehicleSortBy;

const ButtonChildren = ({
  buttonLabel,
  buttonLabelSub,
}: VehicleSortByProps) => {
  return (
    <div className={styles.buttonChildren}>
      <p className={styles.buttonLabel}>{buttonLabel}</p>
      <p className={styles.buttonLabelSub}>{buttonLabelSub}</p>
    </div>
  );
};
