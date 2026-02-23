import styles from "./VehicleMileage.module.scss";
import { mileageData } from "@/data/vehicleMileageData";

interface VehicleMileageProps {}

const VehicleMileage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {mileageData.map((item) => (
          <div className={styles.card} key={item.id}>
            <div className={styles.labelAndValue}>
              <p className={styles.label}>{item.label}</p>
              <p className={styles.value}>{item.value}</p>
            </div>
            <p className={styles.description}>{item.description}</p>
            <p className={styles.typicalAge}>Typical Age: {item.typicalAge}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleMileage;
