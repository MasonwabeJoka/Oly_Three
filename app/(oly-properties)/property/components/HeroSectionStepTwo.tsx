"use client";
import { useState } from "react";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import styles from "./HeroSectionStepTwo.module.scss";
import Modal from "@/components/Modal";
import PropertiesFilters from "./PropertiesFilters";
import Image from "next/image";
interface Props {
  onClick: () => void;
}

export default function AdvancedFilters({ onClick }: Props) {
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
  const [isMaxPriceOpen, setIsMaxPriceOpen] = useState(false);
  const [isMinPriceOpen, setIsMinPriceOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const visibilityClass = isPropertyTypeOpen
    ? styles.hideBelowPropertyType
    : isMaxPriceOpen
      ? styles.hideBelowMaxPrice
      : isMinPriceOpen
        ? styles.hideBelowMinPrice
        : "";

  return (
    <div className={`${styles.container} ${visibilityClass}`}>
      <div className={styles.logo}>
        <Image
          src="/logo.png"
          alt="logo"
          width={120}
          height={120}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
        />
      </div>
      <div
        className={`${styles.propertyTypeSelectContainer} ${
          isPropertyTypeOpen ? styles.dropdownOpen : ""
        }`}
      >
        <Select
          isMultiSelect={true}
          useRadioButtons={true}
          className={styles.propertyTypeSelect}
          options={[
            "House",
            "Apartment",
            "Townhouse",
            "Vacant Land",
            "Development",
            "Commercial Property",
            "Industrial Property",
            "Agricultural Property",
            "Other Property",
          ]}
          initialValue={"Property Type"}
          selectSize="large"
          label="Property Type"
          id="propertyType"
          name="propertyType"
          ariaLabel="Property Type Selector"
          autoFocus={false}
          required={false}
          overlayDropdown
          overlayOptionsClass={styles.propertyTypeOverlay}
          onDropdownOpenChange={(isOpen: any) => {
            setIsPropertyTypeOpen(isOpen);
          }}
        />
      </div>
      <div
        className={`${styles.maximumPriceSelectContainer} ${
          isMaxPriceOpen ? styles.dropdownOpen : ""
        }`}
      >
        <Select
          isMultiSelect={false}
          className={styles.maximumPriceSelect}
          options={[
            "R 100 000",
            "R 200 000",
            "R 300 000",
            "R 400 000",
            "R 500 000",
            "R 600 000",
            "R 700 000",
            "R 800 000",
            "R 900 000",
            "R 1 000 000",
            "R 2 000 000",
            "R 3 000 000",
            "R 4 000 000",
            "R 5 000 000",
            "R 6 000 000",
            "R 7 000 000",
            "R 8 000 000",
            "R 9 000 000",
            "R 10 000 000",
            "R 12 000 000",
            "R 14 000 000",
            "R 16 000 000",
            "R 20 000 000+",
          ]}
          initialValue="Maximum Price"
          selectSize="large"
          label="Max Price"
          id="maxPrice"
          name="maxPrice"
          ariaLabel="Maximum Price Selector"
          autoFocus={false}
          required={false}
          overlayDropdown
          overlayOptionsClass={styles.maxPriceOverlay}
          onDropdownOpenChange={(isOpen: any) => {
            setIsMaxPriceOpen(isOpen);
          }}
        />
      </div>
      <div
        className={`${styles.minimumPriceSelectContainer} ${
          isMinPriceOpen ? styles.dropdownOpen : ""
        }`}
      >
        <Select
          isMultiSelect={false}
          className={styles.minimumPriceSelect}
          options={[
            "Less than R 100 000",
            "R 100 000",
            "R 200 000",
            "R 300 000",
            "R 400 000",
            "R 500 000",
            "R 600 000",
            "R 700 000",
            "R 800 000",
            "R 900 000",
            "R 1 000 000",
            "R 2 000 000",
            "R 3 000 000",
            "R 4 000 000",
            "R 5 000 000",
            "R 6 000 000",
            "R 7 000 000",
            "R 8 000 000",
            "R 9 000 000",
            "R 10 000 000",
            "R 12 000 000",
            "R 14 000 000",
            "R 16 000 000",
            "R 20 000 000",
          ]}
          initialValue="Minimum Price"
          selectSize="large"
          label="Min Price"
          id="minPrice"
          name="minPrice"
          ariaLabel="Minimum Price Selector"
          autoFocus={false}
          required={false}
          overlayDropdown
          overlayOptionsClass={styles.minPriceOverlay}
          onDropdownOpenChange={(isOpen: any) => setIsMinPriceOpen(isOpen)}
        />
      </div>

      <div className={styles.searchButton}>
        <Button
          buttonChildren="More Filters"
          className={styles.moreFiltersButton}
          buttonType="normal"
          buttonSize="large"
          name="More Filters Button"
          type="button"
          ariaLabel="More Filters Button"
          autoFocus={false}
          onClick={() => setShowFilters(true)}
        />
      </div>
      <div className={styles.searchButton}>
        <Button
          buttonChildren="Search"
          className={styles.search}
          buttonType="primary"
          buttonSize="large"
          name="Search Button"
          type="submit"
          ariaLabel="Search Button"
          autoFocus={false}
          // disabled={pending} // Disables during submission
        />
      </div>
      <Modal
        showModal={showFilters}
        setShowModal={setShowFilters}
        modalContent={<PropertiesFilters />}
        contentGreaterThanScreenHeight={true}
      />
      <div className={styles.backButtonContainer}>
        <Button
          buttonChildren="Back"
          className={styles.backButton}
          buttonType="normal"
          buttonSize="large"
          name="Back Button"
          type="button"
          ariaLabel="Back Button"
          autoFocus={false}
          onClick={onClick}
          // disabled={pending} // Disables during submission
        />
      </div>
    </div>
  );
}
