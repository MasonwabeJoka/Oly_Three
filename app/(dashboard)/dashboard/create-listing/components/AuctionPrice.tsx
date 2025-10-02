"use client";
import styles from "./AuctionPrice.module.scss";
import { useFormContext } from "react-hook-form";
import Select from "@/components/Select";
import NumberInput from "@/components/NumberInput";
import { useState, ChangeEvent } from "react";
import Button from "@/components/Buttons";
import useFAQStore from "../store/useFAQStore";
import Modal from "@/components/Modal";
import AuctionStartTime from "./AuctionStartTime";

interface Props {
  onNext: () => void;
}

const AuctionPrice = ({ onNext }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormContext();

  const { setShowFAQs } = useFAQStore();
  const [isPricingOptionsOpen, setIsPricingOptionsOpen] = useState(false);
  const [isAuctionDurationOpen, setIsAuctionDurationOpen] = useState(false);
  const [isAuctionStartTimeOpen, setIsAuctionStartTimeOpen] = useState(false);
  const [showAuctionStartTime, setShowAuctionStartTime] = useState(false);

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
        <h2 className={styles.title} style={{ marginTop: "4rem" }}>
          Auction Price
        </h2>
        <div className={styles.mainSection}>
          {!isPricingOptionsOpen && (
            <>
              <div className={`${styles.controls} ${styles.priceContainer}`}>
                <NumberInput
                  className={styles.price}
                  min={0}
                  max={9999999999}
                  step={100}
                  debounceTime={500}
                  id="startingPrice"
                  value={watch("price.startingPrice") || 0}
                  inputSize="large"
                  placeholder="Starting Price"
                  autoFocus={false}
                  required={true}
                  dashboard
                  error={errors.price?.startingPrice?.message as string}
                  {...register("price.startingPrice", { valueAsNumber: true })}
                  onChange={(e) => handlePriceChange(e, "startingPrice")}
                />
              </div>

              {!isPricingOptionsOpen && (
                <div className={`${styles.controls} ${styles.priceContainer}`}>
                  <NumberInput
                    className={styles.price}
                    min={0}
                    max={9999999999}
                    step={100}
                    debounceTime={500}
                    id="buyNowPrice"
                    value={watch("price.buyNowPrice") || 0}
                    inputSize="large"
                    placeholder="Buy Now Price"
                    autoFocus={false}
                    required={true}
                    dashboard
                    error={errors.price?.buyNowPrice?.message as string}
                    {...register("price.buyNowPrice", { valueAsNumber: true })}
                    onChange={(e) => handlePriceChange(e, "buyNowPrice")}
                  />
                </div>
              )}

              {!isPricingOptionsOpen && (
                <div
                  className={`${styles.controls} ${styles.priceContainer} ${styles.startTimeContainer}`}
                >
                  <Select
                    className={styles.startTime}
                    options={[
                      { label: "Start Now", value: "now" },
                      { label: "1 hour from now", value: "1h" },
                      { label: "6 hours from now", value: "6h" },
                      { label: "12 hours from now", value: "12h" },
                      { label: "24 hours from now", value: "24h" },
                      {
                        label: "Set your own start time",
                        value: "customStartTime",
                      },
                    ]}
                    initialValue="Auction Start Time"
                    selectSize="large"
                    selectPrompt="Start Time"
                    label="Auction Start Time"
                    id="startTime"
                    ariaLabel="Auction Start Time"
                    autoFocus={false}
                    autoComplete="off"
                    disabled={false}
                    required={true}
                    dashboard
                    error={errors.price?.startTime?.message as string}
                    {...register("price.startTime")}
                    onDropdownOpenChange={(isOpen) =>
                      setIsAuctionStartTimeOpen(isOpen)
                    }
                    onChange={(e) => {
                      if (e.target.value === "customStartTime") {
                        setShowAuctionStartTime(true);
                        setValue("price.startTime", "");
                      }
                    }}
                  />
                </div>
              )}
              {!isPricingOptionsOpen && !isAuctionStartTimeOpen && (
                <div
                  className={`${styles.controls} ${styles.priceContainer} ${styles.auctionDurationContainer}`}
                >
                  <Select
                    className={styles.auctionDuration}
                    options={[
                      { label: "1 hour", value: "1h" },
                      { label: "6 hours", value: "6h" },
                      { label: "12 hours", value: "12h" },
                      { label: "24 hours", value: "24h" },
                      { label: "3 Days", value: "3d" },
                      { label: "5 Days", value: "5d" },
                      { label: "7 Days", value: "7d" },
                      { label: "10 Days", value: "10d" },
                      { label: "30 Days", value: "30d" },
                      {
                        label: "Set your own duration",
                        value: "customDuration",
                      },
                    ]}
                    initialValue="Auction Duration"
                    selectSize="large"
                    selectPrompt="Auction Duration"
                    label="Auction Duration"
                    id="auctionDuration"
                    ariaLabel="Auction Duration"
                    autoFocus={false}
                    autoComplete="off"
                    disabled={false}
                    required={true}
                    dashboard
                    error={errors.price?.auctionDuration?.message as string}
                    {...register("price.auctionDuration")}
                    onDropdownOpenChange={(isOpen) =>
                      setIsAuctionDurationOpen(isOpen)
                    }
                    onChange={(e) => {
                      if (e.target.value === "customDuration") {
                        setShowAuctionStartTime(true);
                        setValue("price.auctionDuration", "");
                      }
                    }}
                  />
                </div>
              )}

              {!isPricingOptionsOpen &&
                !isAuctionStartTimeOpen &&
                !isAuctionDurationOpen && (
                  <div className={styles.faqs}>
                    <Button
                      className={styles.proceedButton}
                      buttonChildren="Auctions FAQs"
                      buttonType="info"
                      buttonSize="large"
                      name="faq-btn"
                      type="button"
                      ariaLabel="Auctions FAQs"
                      autoFocus={false}
                      disabled={false}
                      dashboard
                      onClick={() => setShowFAQs(true)}
                    />
                  </div>
                )}
            </>
          )}
          {showAuctionStartTime && (
            <Modal
              showModal={showAuctionStartTime}
              setShowModal={setShowAuctionStartTime}
              modalContent={<AuctionStartTime />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionPrice;
