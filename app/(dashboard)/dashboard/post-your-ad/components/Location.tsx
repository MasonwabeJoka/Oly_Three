"use client";
import styles from "./Location.module.scss";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { locations } from "@/data/LocationData";
import { FormWrapper } from "./FormWrapper";
import { useFormContext } from "react-hook-form";
import { locationValidations } from "../validations/multiStepFormValidations";

const Location = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormWrapper title="Location">
      <div className={styles.container}>
        <div className={styles.selects}>
          <div className={styles.select}>
            <Select
              options={locations[0].provinces}
              currentValue="Select your province"
              selectSize="large"
              selectColourType="normal"
              label="Province"
              id="province"
              ariaLabel="Province"
              autoFocus={false}
              required={false}
              multiple={false}
              dashboard
              error={errors.province?.message as string}
              {...register("province")}
            />
          </div>
          <div className={styles.select}>
            <Select
              options={locations[0].city}
              currentValue="Select your city"
              selectSize="large"
              label="City"
              id="city"
              ariaLabel="City"
              disabled={false}
              autoFocus={false}
              required={false}
              dashboard
              error={errors.city?.message as string}
              {...register("city")}
            />
          </div>
          <div className={styles.select}>
            <Select
              options={locations[0].suburb}
              currentValue="Select your suburb"
              selectSize="large"
              label="Suburb"
              id="suburb"
              ariaLabel="Suburb"
              disabled={false}
              autoFocus={false}
              required={false}
              dashboard
              error={errors.suburb?.message as string}
              {...register("suburb")}
            />
          </div>
          <div className={styles.select}>
            <Input
              className={styles.suburb}
              inputType="text"
              inputSize="large"
              placeholder="You can add more here"
              label="Custom Location"
              id="customLocation"
              ariaLabel="Custom Location Field"
              autoFocus={false}
              autoComplete="on"
              disabled={false}
              required={true}
              dashboard
              error={errors.customLocation?.message as string}
              {...register("customLocation")}
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
export default Location;
