"use client";
import styles from "./Price.module.scss";
import { useFormContext } from "react-hook-form";
import Select from "@/components/Select";
import NumberInput from "@/components/NumberInput";
import { useState, ChangeEvent, useEffect } from "react";
import useFAQStore from "../store/useFAQStore";
import useIsSelectOpen from "../store/useIsSelectOpen";

interface Props {
  onNext: () => void;
}

const Price = ({ onNext }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormContext();

  const priceType = watch("price.pricingOption");
  const [isPricingOptionsOpen, setIsPricingOptionsOpen] = useState(false);
  const { setIsSelectOpen } = useIsSelectOpen();

  useEffect(() => {
    setIsSelectOpen(isPricingOptionsOpen);
  }, [isPricingOptionsOpen, setIsSelectOpen]);

  const handlePriceChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const valueAsNumber = parseFloat(event.target.value) || 0;
    setValue(`price.${field}`, valueAsNumber, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div>
      <div className={styles.container}>
        <h2
          className={styles.title}
          style={{ marginTop: priceType === "auction" ? "4rem" : "" }}
        >
          Price
        </h2>
        <div className={styles.mainSection}>
          <div className={styles.controls}>
            <Select
              className={styles.pricingOptions}
              options={[
                "Fixed Price",
                "Negotiable",
                "Free",
                "Contact For Price",
              ]}
              initialValue="Choose Pricing Option"
              selectSize="large"
              label="Price Types"
              id="price-types"
              ariaLabel="Price Types Select"
              autoFocus={false}
              disabled={false}
              required={true}
              dashboard
              {...register("price.pricingOption")}
              error={(errors.price as any)?.pricingOption?.message}
              onDropdownOpenChange={(isOpen: any) =>
                setIsPricingOptionsOpen(isOpen)
              }
            />
          </div>

          {!isPricingOptionsOpen &&
            (priceType === "Fixed Price" || priceType === "Negotiable") && (
              <div className={`${styles.controls} ${styles.priceContainer}`}>
                <NumberInput
                  className={styles.price}
                  min={0}
                  max={9999999999}
                  step={1}
                  debounceTime={500}
                  id="price"
                  label="Price"
                  value={watch("price.amount") || 0}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const numValue = parseFloat(e.target.value) || 0;
                    setValue("price.amount", numValue, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                  inputSize="large"
                  inputType="normal"
                  placeholder="Price"
                  autoFocus={false}
                  required={true}
                  dashboard
                  error={(errors.price as any)?.amount?.message}
                  reactHookFormProps={register("price.amount", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Price;
