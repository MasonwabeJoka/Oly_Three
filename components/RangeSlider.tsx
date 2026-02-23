"use client";
import { useState, useEffect } from "react";
import NumberInput from "./NumberInput";
import styles from "./RangeSlider.module.scss";
import { Slider } from "radix-ui";

interface RangeSliderProps {
  placeholder: string;
  onChange: (value: number) => void; // Changed to pass number directly
  min?: number;
  max?: number;
  inputMax?: number;
  step?: number;
  defaultValue?: number;
  inputLabel?: string;
}

const RangeSlider = ({
  placeholder,
  onChange,
  min = 0,
  max = 1000000,
  inputMax,
  step,
  defaultValue = 0,
  inputLabel,
}: RangeSliderProps) => {
  const [value, setValue] = useState<number>(defaultValue);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    setValue(newValue);
    onChange(newValue);
  };

  // Handle slider changes
  const handleSliderChange = (sliderValue: number[]) => {
    const newValue = sliderValue[0];
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <NumberInput
          className={styles.input}
          min={min}
          max={inputMax || max}
          step={step}
          debounceTime={500}
          id="number-input"
          value={value}
          inputSize="large"
          inputType="normal"
          placeholder={placeholder}
          label={inputLabel}
          autoFocus={false}
          required={true}
          onChange={handleInputChange}
        />
      </div>
      <Slider.Root
        className={styles.slider}
        value={[value]}
        onValueChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
      >
        <Slider.Track className={styles.sliderTrack}>
          <Slider.Range className={styles.sliderRange} />
        </Slider.Track>
        <Slider.Thumb
          className={styles.sliderThumb}
          aria-label="Number Input"
        />
      </Slider.Root>
    </div>
  );
};

export default RangeSlider;
