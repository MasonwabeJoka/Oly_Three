"use client";
import Link from "next/link";
import Button from "@/components/Buttons";
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
  const [isForSaleToLetOpen, setIsForSaleToLetOpen] = useState(false);
  const [isPriceRangeSelect, setIsPriceRangeSelect] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState(0);

  return (
    <div className={styles.container}>
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
          buttonChildren={"Create A Listing"}
          className={styles.createAListingBtn}
          buttonType="danger"
          buttonSize="large"
          name="Create A Listing Button"
          type="button"
          ariaLabel="Create A Listing Button"
          autoFocus={false}
          disabled={false}
        />
      </Link>

      <div className={styles.byRentContainer}>
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
          name="buyRent"
          ariaLabel="Buy or Rent Selector"
          autoFocus={false}
          required={false}
          onDropdownOpenChange={(isOpen: any) => {
            setIsForSaleToLetOpen(isOpen);
          }}
        />
      </div>

      {isForSaleToLetOpen ||
        (!isPriceRangeSelect && (
          <div className={styles.searchLocation}>
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
              onSuggestionCountChange={(count: any) =>
                setLocationSuggestions(count)
              }
            />
          </div>
        ))}

      {locationSuggestions === 0 && !isForSaleToLetOpen && (
        <div className={styles.searchButton}>
          <Button
            buttonChildren="Continue"
            className={styles.continueBtn}
            buttonType="normal"
            buttonSize="large"
            name="Search Button"
            type="button"
            ariaLabel="Search Button"
            autoFocus={false}
            onClick={onClick}
            // disabled={pending} // Disables during submission
          />
        </div>
      )}
    </div>
  );
}
