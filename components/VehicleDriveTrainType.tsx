import styles from "./VehicleDriveTrainType.module.scss";
import Button from "./Buttons";
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
          buttonChildren={
            <ButtonChildren
              buttonLabel="FWD (Front-Wheel Drive)"
              buttonLabelSub="Great fuel economy and stable on city roads"
            />
          }
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="fwd"
          type="submit"
          ariaLabel="Front-Wheel Drive Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={
            <ButtonChildren
              buttonLabel="RWD (Rear-Wheel Drive)"
              buttonLabelSub="Sportier feel with balanced handling"
            />
          }
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="rwd"
          type="submit"
          ariaLabel="Rear-Wheel Drive Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={
            <ButtonChildren
              buttonLabel="AWD (All-Wheel Drive)"
              buttonLabelSub="Stable and predictable on slippery surfaces"
            />
          }
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="awd"
          type="submit"
          ariaLabel="All-Wheel Drive Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={
            <ButtonChildren
              buttonLabel="4×4"
              buttonLabelSub="Ideal for heavy-duty and challenging conditions"
            />
          }
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="4x4"
          type="submit"
          ariaLabel="4x4 Button"
          autoFocus={false}
          disabled={false}
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
