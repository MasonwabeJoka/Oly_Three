"use client";
import Link from "next/link";
import Button from "@/components/Button";
import Select from "@/components/Select";
import styles from "./HeroSectionStepOne.module.scss";
import { suggestions } from "@/data/SuggestionsData";
import { useState } from "react";
import Input from "@/components/Input";
import Image from "next/image";

interface Props {
  onClick: () => void;
}

export default function HeroSectionStepOne({ onClick }: Props) {
  const [isBuyRentOpen, setIsBuyRentOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const visibilityClass = isBuyRentOpen
    ? styles.hideBelowBuyRent
    : isLocationOpen
      ? styles.hideBelowLocation
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
      <Link href="/dashboard/create-listing" className={styles.link}>
        <Button
          children={"Create A Listing"}
          className={styles.createAListingBtn}
          buttonVariant="danger"
          buttonSize="large"
          ariaLabel="Create A Listing Button"

        />
      </Link>

      <div
        className={`${styles.byRentContainer} ${
          isBuyRentOpen ? styles.dropdownOpen : ""
        }`}
      >
        <Select
          isMultiSelect={true}
          useRadioButtons={true}
          className={styles.buyRent}
          options={["Buy", "Rent"]}
          showSelectAll={false}
          initialValue={`Buy ${"\u00A0".repeat(3)}/${"\u00A0".repeat(3)} Rent`}
          selectSize="large"
          label="Buy or Rent"
          id="buyRent"
          ariaLabel="Buy or Rent Selector"
          required={false}
          overlayDropdown
          overlayOptionsClass={styles.buyRentOverlay}
          onDropdownOpenChange={(isOpen: any) => {
            setIsBuyRentOpen(isOpen);
          }}
        />
      </div>

      <div
        className={`${styles.searchLocation} ${
          isLocationOpen ? styles.dropdownOpen : ""
        }`}
      >
        <Input
          isSearchBar={true}
          suggestions={suggestions}
          className={styles.searchLocationInput}
          inputType="text"
          inputSize="large"
          iconSrcRight="/icons/search.png"
          iconPosition="right"
          iconWidth={32}
          iconHeight={32}
          label="Location"
          placeholder="Search by city, province, town..."
          id="locationSearch"
          ariaLabel="Location"
          autoComplete="off"
          required
          overlayDropdown
          overlaySuggestionsClass={styles.locationOverlay}
          onDropdownOpenChange={setIsLocationOpen}
        />
      </div>
      <Link href="/property/locations">
        <Button
          children="See All Locations"
          className={styles.createAListingBtn}
          buttonVariant="normal"
          buttonSize="large"
          ariaLabel="Create A Listing Button"

        />
      </Link>

      <div className={styles.searchButton}>
        <Button
          children="Continue"
          className={styles.continueBtn}
          buttonVariant="normal"
          buttonSize="large"
          ariaLabel="Search Button"
          onClick={onClick}
          // isDisabled={pending} // Disables during submission
        />
      </div>
    </div>
  );
}
