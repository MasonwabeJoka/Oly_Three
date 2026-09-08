import styles from "./VehiclePrice.module.scss";
import Button from "./Button";
interface VehiclePriceProps {
  buttonLabel?: string;
  buttonLabelSub?: string;
}

const VehiclePrice = ({}: VehiclePriceProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.description}>Choose how you'd like to view prices</p>
      {/* 
      <p className={styles.temp}>Or</p>
      <p className={styles.description}>
       Change how you view prices:
      </p> */}

      <div className={styles.buttonsContainer}>
        <Button
          children={
            <ButtonChildren
              buttonLabel="Cash Price"
              buttonLabelSub="Shows cash prices"
            />
          }
          className={styles.button}
          buttonVariant="primary"
          buttonSize="large"

          type="submit"
          ariaLabel="Cash Price Button"


        />
        <Button
          children={
            <ButtonChildren
              buttonLabel="2-Year Monthly Price"
              buttonLabelSub="Shows monthly prices for a 2-year term"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="2-Year Monthly Price Button"


        />
        <Button
          children={
            <ButtonChildren
              buttonLabel="4-Year Monthly Price"
              buttonLabelSub="Shows monthly prices for a 4-year term"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="4-Year Monthly Price Button"


        />
        <Button
          children={
            <ButtonChildren
              buttonLabel="6-Year Monthly Price"
              buttonLabelSub="Shows monthly prices for a 6-year term"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="6-Year Monthly Price Button"


        />
      </div>
      <p className={styles.disclaimer}>
        Monthly prices are estimates based on current lending conditions. Actual terms may differ.
      </p>
    </div>
  );
};

export default VehiclePrice;

const ButtonChildren = ({ buttonLabel, buttonLabelSub }: VehiclePriceProps) => {
  return (
    <div className={styles.buttonChildren}>
      <p className={styles.buttonLabel}>{buttonLabel}</p>
      <p className={styles.buttonLabelSub}>{buttonLabelSub}</p>
    </div>
  );
};
