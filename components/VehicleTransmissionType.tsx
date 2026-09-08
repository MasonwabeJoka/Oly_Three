import styles from "./VehicleTransmissionType.module.scss";
import Button from "./Button";
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
          children={
            <ButtonChildren
              buttonLabel="Automatic"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Automatic Button"


        />
        <Button
          children={
            <ButtonChildren
              buttonLabel="Manual"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Manual Button"


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
