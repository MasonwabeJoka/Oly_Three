import styles from "./VehicleFuelType.module.scss";
import Button from "./Buttons";
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
          buttonChildren={
            <ButtonChildren
              buttonLabel="Petrol"
            />
          }
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="petrol"
          type="submit"
          ariaLabel="Petrol Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={
            <ButtonChildren
              buttonLabel="Diesel"
            />
          }
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="diesel"
          type="submit"
          ariaLabel="Diesel Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={
            <ButtonChildren
              buttonLabel="Hybrid"
            />
          }
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="hybrid"
          type="submit"
          ariaLabel="Hybrid Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={
            <ButtonChildren
              buttonLabel="Plug-in Hybrid (PHEV)"
            />
          }
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="plug-in-hybrid"
          type="submit"
          ariaLabel="Plug-in Hybrid Button"
          autoFocus={false}
          disabled={false}
        />
        <Button
          buttonChildren={
            <ButtonChildren
              buttonLabel="Electric (EV)"
            />
          }
          className={styles.button}
          buttonType="normal"
          buttonSize="large"
          name="electric"
          type="submit"
          ariaLabel="Electric Button"
          autoFocus={false}
          disabled={false}
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
