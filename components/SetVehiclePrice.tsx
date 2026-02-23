"use client";
import styles from "./SetVehiclePrice.module.scss";
import NumberInput from "./NumberInput";
import { Slider } from "radix-ui";

interface SetVehiclePriceProps {}

const SetVehiclePrice = ({}: SetVehiclePriceProps) => {
  return (
    <div>
      <NumberInput
        className={styles.input}
        min={0}
        max={9999999999}
        step={100}
        debounceTime={500}
        id="price"
        value={0}
        inputSize="large"
        placeholder="Set Your Price"
        autoFocus={false}
        required={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          console.log(e.target.value)
        }
      />

      <Slider.Root
        className={styles.slider}
        defaultValue={[50]}
        max={100}
        step={1}
      >
        <Slider.Track className={styles.sliderTrack}>
          <Slider.Range className={styles.sliderRange} />
        </Slider.Track>
        <Slider.Thumb className={styles.sliderThumb} aria-label="Volume" />
      </Slider.Root>
    </div>
  );
};

export default SetVehiclePrice;
