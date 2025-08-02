"use client";
import styles from "./PromoteYourAdCard.module.scss";
import { useState, useRef } from "react";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import useIsDashboardStore from "@/store/isDashboardStore";
import { useResponsive } from "@/store/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";
import { useFormContext } from "react-hook-form";
import { FormDataSchema } from "@/app/(dashboard)/dashboard/post-your-ad/validations/formDataSchema";

interface CardProps {
  id: string | number;
  src: string;
  alt: string;
  title?: string;
  price: any[];
}

const PromoteYourAdCard = ({ id, src, alt, title, price }: CardProps) => {
  const [selectedPrice, setSelectedPrice] = useState<number>(price[0]?.price);
  const [selectedDuration, setSelectedDuration] = useState<string>(
    price[0]?.duration
  );
  const durations = price.map((price) => price.duration);
  const prices = price.map((price) => price.price);
  const isDashboard = useIsDashboardStore((state) => state.isDashboard);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const isMobile = useResponsive("mobile", isSidebarOpen);
  const [isDurationSelectOpen, setIsDurationSelectOpen] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDuration = e.target.value;

    // Find the selected promotion based on the duration
    const selectedPromotion = price.find(
      (promotion) => promotion.duration === selectedDuration
    );

    // Update the price and duration based on the selection
    if (selectedPromotion) {
      setSelectedPrice(selectedPromotion.price); // Update the price
    }
    setSelectedDuration(selectedDuration); // Update the selected duration
  };

  const options = () => {
    const duration = durations.map((duration) => duration);
    return duration;
  };

  const {
    register,
    formState: { errors },
  } = useFormContext<FormDataSchema>();
  //Todo: When you select a promotion duration the value of the select must be replaced.
  //Todo: When you select a promotion duration the checkbox must be checked.

  if (isMobile) {
    return (
      <div
        className={styles.container}
        ref={containerRef}
        style={{
          width: "18.75rem",
        }}
      >
        <div
          className={styles.wrapper}
          ref={wrapperRef}
          style={{ flexDirection: "column" }}
        >
          <p className={styles.title}>{title}</p>

          <div style={{ marginBottom: "2rem" }}>
            <Icon
              className={styles.icon}
              src={src}
              alt={alt}
              width={40}
              height={40}
            />
          </div>

          <div
            className={styles.setPromotionDurationContainer}
            style={{ marginBottom: "1rem" }}
          >
            <Select
              options={options()}
              initialValue="Promotion duration"
              className={styles.setPromotionDuration}
              selectSize="medium"
              selectColourType="normal"
              selectPrompt="5 Days"
              displayTextArray={["a", "b"]}
              label="Set PromotionDuration"
              id="set-promotion_duration"
              ariaLabel="Set Promotion Duration"
              autoFocus={false}
              autoComplete="on"
              disabled={false}
              required={true}
              multiple={false}
              dashboard={isDashboard}
              error={errors.promotionDuration?.message as string}
              {...register("promoteYourAd.promotionDuration")}
              onChange={handleSelectChange}
              onOpenChange={(isOpen) => setIsDurationSelectOpen(isOpen)}
            />
          </div>

          <Button
            className={styles.moreInfoButton}
            buttonChildren="More Info"
            buttonType="normal"
            buttonSize="medium"
            name="more-info-btn"
            type="button"
            ariaLabel="More Info Button"
            autoFocus={false}
            disabled={false}
            dashboard={isDashboard}
            ariaHidden={false}
            style={{ marginBottom: "2rem" }}
          />

          <div
            className={styles.priceContainer}
            style={{
              width: "3rem",
              height: "3rem",
              margin: "0 auto",
              marginBottom: "2rem",
            }}
          >
            <h4 className={styles.price}>{`R${selectedPrice}`}</h4>
          </div>
          <div
            style={{
              marginBottom: "1rem",
            }}
          >
            <Checkbox className={styles.checkbox} label="" id={id} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.wrapper} ref={wrapperRef}>
        <div className={styles.iconContainer}>
          <Icon
            className={styles.icon}
            src={src}
            alt={alt}
            width={64}
            height={64}
          />
        </div>
        <div className={styles.formControls}>
          <p className={styles.title}>{title}</p>

          <div className={styles.setPromotionDurationContainer}>
            <Select
              options={options()}
              initialValue={selectedDuration}
              className={styles.setPromotionDuration}
              selectSize="medium"
              selectColourType="normal"
              selectPrompt="Select Promotion Duration"
              displayTextArray={durations} // Display available durations
              label="Set Promotion Duration"
              id="set-promotion_duration"
              ariaLabel="Set Promotion Duration"
              autoFocus={false}
              autoComplete="on"
              disabled={false}
              required={true}
              multiple={false}
              dashboard={isDashboard}
              error={errors.promotionDuration?.message as string}
              {...register("promoteYourAd.promotionDuration")}
              onChange={handleSelectChange}
              onOpenChange={(isOpen) => setIsDurationSelectOpen(isOpen)}
            />
          </div>

          {!isDurationSelectOpen && (
            <Button
              className={styles.moreInfoButton}
              buttonChildren="More Info"
              buttonType="normal"
              buttonSize="medium"
              name="more-info-btn"
              type="button"
              ariaLabel="More Info Button"
              autoFocus={false}
              disabled={false}
              dashboard={isDashboard}
            />
          )}
        </div>

        <div className={styles.priceContainer}>
          <h4 className={styles.price}>{`R${selectedPrice}`}</h4>
        </div>
        <Checkbox className={styles.checkbox} label="" id={id} />
      </div>
    </div>
  );
};

export default PromoteYourAdCard;
