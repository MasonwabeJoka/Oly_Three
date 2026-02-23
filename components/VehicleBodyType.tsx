import VehicleBodyTypeCard from "./cards/VehicleBodyTypeCard";
import Checkbox from "./Checkbox";
import styles from "./VehicleBodyType.module.scss";
import { vehicleBodyTypeData } from "@/data/vehicleBodyTypeData";

const VehicleBodyType = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search By Body Type</h2>
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
        {vehicleBodyTypeData.map((item) => {
          return (
            <div key={item.id} className={styles.cardContainer}>
              <VehicleBodyTypeCard
                name={item.name}
                image={item.image}
                make="Toyota"
                city=""
                province=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleBodyType;
