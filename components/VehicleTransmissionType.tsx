import styles from "./VehicleTransmissionType.module.scss";
import Button from "./Buttons";
interface VehicleTransmissionTypeProps {
  buttonLabel?: string;
  buttonLabelSub?: string;
}

const VehicleTransmissionType = ({}: VehicleTransmissionTypeProps) => {
   return (
    <div className={styles.container}>
      <p className={styles.description}>Manual or Automatic?</p>
     

      <div className={styles.buttonsContainer}>
        <Button
          buttonChildren={
            <ButtonChildren
              buttonLabel="Automatic"
            />
          }
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="automatic"
          type="submit"
          ariaLabel="Automatic Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={
            <ButtonChildren
              buttonLabel="Manual"
            />
          }
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="manual"
          type="submit"
          ariaLabel="Manual Button"
          autoFocus={false}
          disabled={false}
        />
     
      </div>
      
    </div>
  );
};

export default VehicleTransmissionType;

const ButtonChildren = ({
  buttonLabel,
  buttonLabelSub,
}: VehicleTransmissionTypeProps) => {
  return (
    <div className={styles.buttonChildren}>
      <p className={styles.buttonLabel}>{buttonLabel}</p>
      <p className={styles.buttonLabelSub}>{buttonLabelSub}</p>
    </div>
  );
};
