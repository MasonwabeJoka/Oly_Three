"use client";
import styles from "./Location.module.scss";
import Input from "@/components/Input";
import Select from "@/components/Select";

import { locations } from "@/data/LocationData";
import { FormWrapper } from "./FormWrapper";

const Location = () => {
  return (
    <FormWrapper title="Location">
      <div className={styles.container}>
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
              required={false}
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
              required={false}
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
              required={false}
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
      </div>
    </FormWrapper>
  );
};
export default Location;
