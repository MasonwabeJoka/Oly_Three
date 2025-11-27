"use client";
import Input from "@/components/Input";
import styles from "./VehicleListingIntro.module.scss";

const VehicleListingIntro = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sell Your Car</h1>
      <p className={styles.subtitle}>
        Know what your car is worth before you list it.
      </p>
      <p className={styles.description}>
        Enter your license plate or VIN number to get accurate vehicle
        information and a trusted valuation.
      </p>

      <Input
        className={styles.input}
        inputType="text"
        inputSize="large"
        label="License Plate or VIN"
        placeholder="Enter your license plate or VIN"
        id="licensePlateOrVin"
        name="licensePlateOrVin"
        ariaLabel="License Plate or VIN"
        autoFocus={false}
        autoComplete="off"
        required={false}
        dashboard
      />
    </div>
  );
};

export default VehicleListingIntro;
