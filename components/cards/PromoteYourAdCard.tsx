"use client";
import styles from "./PromoteYourAdCard.module.scss";
import { useState, useRef, useEffect } from "react";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import useIsDashboardStore from "@/store/isDashboardStore";
import { useResponsive } from "@/store/useResponsive";
import useSidebarStore from "@/store/useSidebarStore";
import { useFormContext } from "react-hook-form";
import { FormDataSchema } from "@/app/(dashboard)/dashboard/create-listing/validations/formDataSchema";

interface CardProps {
  id: string | number;
  src: string;
  alt: string;
  title?: string;
  price: any[];
}

const PromoteYourAdCard = ({ id, src, alt, title, price }: CardProps) => {
  const [isClient, setIsClient] = useState(false);
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

  useEffect(() => {
    setIsClient(true);
  }, []);
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

  // Get form context - this will be available since we're inside FormProvider
  const formContext = useFormContext<FormDataSchema>();
  const register = formContext?.register || (() => ({}));
  const errors = formContext?.formState?.errors || {};

  //Todo: When you select a promotion duration the value of the select must be replaced.
  //Todo: When you select a promotion duration the checkbox must be checked.

  // Don't render until client-side hydration is complete to prevent hydration mismatch
  if (!isClient) {
    return null;
  }

  if (isMobile) {
    return (
      <div
        className={styles.container}
        ref={containerRef}
        style={{
          width: "30rem",
        }}
      >
        <div
          className={styles.wrapper}
          ref={wrapperRef}
          style={{ flexDirection: "column" }}
        >
          <p className={styles.title}>{title}</p>

          <div style={{ marginBottom: "3.2rem" }}>
            <Icon
              className={styles.icon}
              src={src}
              alt={alt}
              width={40}
              height={40}
            />
          </div>

          <div
            className={`${styles.setPromotionDurationContainer} ${
              isDurationSelectOpen ? styles.dropdownOpen : ""
            }`}
            style={{ marginBottom: "1.6rem" }}
          >
            <Select
              options={options()}
              initialValue="Promotion duration"
              className={styles.setPromotionDuration}
              selectSize="medium"
              selectColourType="normal"
              label="Duration"
              id="set-promotion_duration"
              ariaLabel="Set Promotion Duration"


              required={true}
              multiple={false}
              dashboard
              error={(errors as any).promotionDuration?.message as string}
              {...register("promoteYourAd.promotionDuration")}
              onChange={handleSelectChange}
              overlayDropdown
              overlayOptionsClass={styles.durationOverlay}
              onDropdownOpenChange={(isOpen: any) =>
                setIsDurationSelectOpen(isOpen)
              }
            />
          </div>

          <Button
            className={styles.moreInfoButton}
            children="More Info"
            buttonVariant="normal"
            buttonSize="medium"


            ariaLabel="More Info Button"


            dashboard={isDashboard}

            style={{ marginBottom: "3.2rem" }}
          />

          <div
            className={styles.priceContainer}
            style={{
              width: "4.8rem",
              height: "4.8rem",
              margin: "0 auto",
              marginBottom: "3.2rem",
            }}
          >
            <h4 className={styles.price}>{`R${selectedPrice}`}</h4>
          </div>
          <div
            style={{
              marginBottom: "1.6rem",
            }}
          >
            <Checkbox
              className={styles.checkbox}
              label=""
              id={id?.toString() || ""}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      ref={containerRef}
      style={{ backgroundColor: isDurationSelectOpen ? "#edf2f7" : "#edf2f7"}}
    >
      <div className={styles.wrapper} ref={wrapperRef}>
        <div className={styles.platformContainer}>
          <Icon
            className={styles.icon}
            src={src}
            alt={alt}
            width={64}
            height={64}
          />
          <p className={styles.title}>{title}</p>
        </div>
        <div
          className={`${styles.formControls} ${
            isDurationSelectOpen ? styles.hideBelowDuration : ""
          }`}
        >
          {/* <p className={styles.title}>{isDurationSelectOpen ? "" : title}</p> */}

          <div
            className={`${styles.setPromotionDurationContainer} ${
              isDurationSelectOpen ? styles.dropdownOpen : ""
            }`}
          >
            <Select
              options={options()}
              initialValue={selectedDuration}
              className={styles.setPromotionDuration}
              selectSize="medium"
              selectColourType="normal"
              label="Duration"
              id="set-promotion_duration"
              ariaLabel="Set Promotion Duration"


              required={true}
              dashboard={isDashboard}
              error={(errors as any).promotionDuration?.message as string}
              {...register("promoteYourAd.promotionDuration")}
              onChange={handleSelectChange}
              overlayDropdown
              overlayOptionsClass={styles.durationOverlay}
              onDropdownOpenChange={(isOpen: any) =>
                setIsDurationSelectOpen(isOpen)
              }
            />
          </div>

          <Button
            className={styles.moreInfoButton}
            children="More Info"
            buttonVariant="normal"
            buttonSize="medium"
            ariaLabel="More Info Button"

            dashboard={isDashboard}
          />
        </div>

        <div className={styles.priceContainer}>
          <h4
            className={styles.price}
          >{`R${selectedPrice?.toString() || ""}`}</h4>
        </div>
        <Checkbox
          className={styles.checkbox}
          label=""
          id={id?.toString() || ""}
        />
      </div>
    </div>
  );
};

export default PromoteYourAdCard;
