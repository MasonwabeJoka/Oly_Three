import styles from "./VehicleFuelType.module.scss";
import Button from "./Button";
interface VehicleFuelTypeProps {
  buttonLabel?: string;
  buttonLabelSub?: string;
}

const VehicleFuelType = ({}: VehicleFuelTypeProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.description}>Pick the fuel type for your search</p>

      <div className={styles.buttonsContainer}>
        <Button
          children={
            <ButtonChildren
              buttonLabel="Petrol"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Petrol Button"


        />
        <Button
          children={
            <ButtonChildren
              buttonLabel="Diesel"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Diesel Button"


        />
        <Button
          children={
            <ButtonChildren
              buttonLabel="Hybrid"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Hybrid Button"


        />
        <Button
          children={
            <ButtonChildren
              buttonLabel="Plug-in Hybrid (PHEV)"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Plug-in Hybrid Button"


        />
        <Button
          children={
            <ButtonChildren
              buttonLabel="Electric (EV)"
            />
          }
          className={styles.button}
          buttonVariant="normal"
          buttonSize="large"

          type="submit"
          ariaLabel="Electric Button"


        />
      </div>
     
    </div>
  );
};

export default VehicleFuelType;

const ButtonChildren = ({
  buttonLabel,
  buttonLabelSub,
}: VehicleFuelTypeProps) => {
  return (
    <div className={styles.buttonChildren}>
      <p className={styles.buttonLabel}>{buttonLabel}</p>
      <p className={styles.buttonLabelSub}>{buttonLabelSub}</p>
    </div>
  );
};
