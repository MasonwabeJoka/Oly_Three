"use client";
import styles from "./styles.module.scss";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import { locations } from "@/data/LocationData";
import Link from "next/link";

const Location = () => {
  return (
    <form className={styles.container}>
      <legend className={styles.title}>Location</legend>

      <div className={styles.selects}>
        <div className={styles.select}>
          <Select
            options={locations[0].provinces}
            currentValue="Select your province"
            selectSize="large"
            label="Provinces"
            id="provinces"
            name="provinces"
            ariaLabel="Provinces"
            autoFocus={false}
            required={true}
            dashboard
          />
        </div>
        <div className={styles.select}>
          <Select
            options={locations[0].city}
            currentValue="Select your city"
            selectSize="large"
            label="Cities"
            id="cities"
            name="cities"
            ariaLabel="Cities"
            disabled={false}
            autoFocus={false}
            required={true}
            dashboard
          />
        </div>
        <div className={styles.select}>
          <Select
            options={locations[0].suburb}
            currentValue="Select your suburb"
            selectSize="large"
            label="Suburbs"
            id="suburbs"
            name="suburbs"
            ariaLabel="Suburbs"
            disabled={false}
            autoFocus={false}
            required={true}
            dashboard
          />
        </div>
        <div className={styles.select}>
          <Input
            className={styles.suburb}
            inputType="text"
            inputSize="large"
            placeholder="You can add more here"
            label="Suburb"
            id="suburb"
            name="suburb"
            ariaLabel="Suburb Search Field"
            autoFocus={false}
            autoComplete="on"
            disabled={false}
            required={true}
            dashboard
          />
        </div>
      </div>
      <Link
        href="/dashboard/my-ads/promote-your-ads"
        className={styles.proceedButtonContainer}
      >
        <Button
          className={styles.proceedButton}
          buttonChildren="Proceed"
          buttonType="primary"
          buttonSize="large"
          name="proceed"
          type="button"
          ariaLabel="Proceed Button"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </Link>

      <Link
        href="/dashboard/post-your-ad/upload-media"
        className={styles.backButtonContainer}
      >
        <Button
          className={styles.backButton}
          buttonChildren="Back"
          buttonType="normal"
          buttonSize="large"
          name="back"
          type="button"
          ariaLabel="Back Button"
          autoFocus={false}
          disabled={false}
          dashboard
        />
      </Link>
    </form>
  );
};
export default Location;
