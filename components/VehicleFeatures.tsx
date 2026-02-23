import Button from "./Buttons";
import BulletPoint from "./BulletPoint";
import Checkbox from "./Checkbox";
import styles from "./VehicleFeatures.module.scss";
import { vehicleFeaturesData } from "@/data/vehicleFeatures";
interface VehicleFeaturesProps {}

const VehicleFeatures = ({}: VehicleFeaturesProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Find Cars By Features</h2>
      <div className={styles.featuresContainer}>
        {vehicleFeaturesData.map((features, index) => (
          <div className={styles.featureGroup} key={index}>
            <h4 className={styles.category}>{features.category}</h4>
            <ul className={styles.features}>
              {features.features.map((feature, index) => (
                <div className={styles.feature} key={index}>
                  <Checkbox
                    id={`feature-${index}`}
                    label=""
                    isFeed={false}
                    checkedColour="#14d6ff"
                    hoverColour="#ffff"
                    checkedHovered="#ccf6ff"
                  />
                  <li >{feature}</li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          buttonChildren="Search"
          buttonType="primary"
          buttonSize="large"
          name="Search Button"
          type="submit"
          ariaLabel="Search Button"
          autoFocus={false}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default VehicleFeatures;
