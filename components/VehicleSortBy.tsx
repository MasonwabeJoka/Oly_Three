import styles from "./VehicleSortBy.module.scss";
import Button from "./Button";
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
          children={<ButtonChildren buttonLabel="Default" />}
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Default Button"


        />
        <Button
          children={<ButtonChildren buttonLabel="Price: Low to High" />}
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Price: Low to High Button"


        />
        <Button
          children={<ButtonChildren buttonLabel="Price: High to Low" />}
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Price: High to Low Button"


        />
        <Button
          children={<ButtonChildren buttonLabel="Mileage: Low to High" />}
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Mileage: Low to High Button"


        />
        <Button
          children={<ButtonChildren buttonLabel="Year: Newest First" />}
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Year: Newest First Button"


        />

        <Button
          children={<ButtonChildren buttonLabel="Recently Added" />}
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Recently Added Button"


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
