import styles from "./VehicleDriveTrainType.module.scss";
import Button from "./Button";
interface VehicleDriveTrainTypeProps {
  buttonLabel?: string;
  buttonLabelSub?: string;
}

const VehicleDriveTrainType = ({}: VehicleDriveTrainTypeProps) => {
   return (
    <div className={styles.container}>
      <p className={styles.description}>Choose your drivetrain type</p>

      <div className={styles.buttonsContainer}>
        <Button
          children={
            <ButtonChildren
              buttonLabel="FWD (Front-Wheel Drive)"
              buttonLabelSub="Great fuel economy and stable on city roads"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Front-Wheel Drive Button"


        />
        <Button
          children={
            <ButtonChildren
              buttonLabel="RWD (Rear-Wheel Drive)"
              buttonLabelSub="Sportier feel with balanced handling"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Rear-Wheel Drive Button"


        />
        <Button
          children={
            <ButtonChildren
              buttonLabel="AWD (All-Wheel Drive)"
              buttonLabelSub="Stable and predictable on slippery surfaces"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="All-Wheel Drive Button"


        />
        <Button
          children={
            <ButtonChildren
              buttonLabel="4×4"
              buttonLabelSub="Ideal for heavy-duty and challenging conditions"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="4x4 Button"


        />
      </div>
      {/* <p className={styles.disclaimer}>
        Monthly prices are estimates based on current lending conditions. Actual
        terms may differ.
      </p> */}
    </div>
  );
};

export default VehicleDriveTrainType;

const ButtonChildren = ({ buttonLabel, buttonLabelSub }: VehicleDriveTrainTypeProps) => {
  return (
    <div className={styles.buttonChildren}>
      <p className={styles.buttonLabel}>{buttonLabel}</p>
      <p className={styles.buttonLabelSub}>{buttonLabelSub}</p>
    </div>
  );
};
