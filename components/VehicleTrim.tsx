import styles from "./VehicleTrim.module.scss";
import VehicleTrimCard from "./cards/VehicleTrimCard";
import Checkbox from "./Checkbox";
import { vehicleTrimData } from "@/data/vehicleTrimData";


const VehicleTrim = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select Trim</h2>
      <div className={styles.wrapper}>
        <div className={styles.checkboxContainer}>
          <Checkbox
            id="1"
            label="Select All"
            labelSide="left"
            isFeed={false}
            checkedColour="#14d6ff"
            hoverColour="#ffff"
            checkedHovered="#ccf6ff"
          />
        </div>
        {vehicleTrimData.map((item) => {
          return (
            <div key={item.id} className={styles.cardContainer}>
              <VehicleTrimCard
                image={item.image}
                trimName={item.variantName}
                engine={item.engine}
                transmission={item.transmission}
                fuelType={item.fuelType}
                driveType={item.driveType}
                trimLevel={item.trimLevel}
                bodyStyle={item.bodyStyle}
                power={item.power}
                torque={item.torque}
                features={item.features}
                yearRange={item.yearRange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleTrim;
