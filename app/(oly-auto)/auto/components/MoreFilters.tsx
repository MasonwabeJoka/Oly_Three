import styles from "./MoreFilters.module.scss";
interface MoreFiltersProps {}

const MoreFilters = ({}: MoreFiltersProps) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.field} ${styles.bodyType}`}>Body Type</div>
      <div className={`${styles.field} ${styles.fuelType}`}>Fuel Type</div>
      <div className={`${styles.field} ${styles.transmission}`}>
        Transmission
      </div>
      <div className={`${styles.field} ${styles.driveType}`}>Drive Type</div>
      <div className={`${styles.field} ${styles.engineSize}`}>Engine Size</div>
      <div className={`${styles.field} ${styles.power}`}>Power</div>
      <div className={`${styles.field} ${styles.colour}`}>Colour</div>
      <div className={`${styles.field} ${styles.interiorColour}`}>
        Interior Colour
      </div>
      <div className={`${styles.field} ${styles.doors}`}>Doors</div>
      <div className={`${styles.field} ${styles.mileage}`}>Mileage</div>
    </div>
  );
};

export default MoreFilters;
