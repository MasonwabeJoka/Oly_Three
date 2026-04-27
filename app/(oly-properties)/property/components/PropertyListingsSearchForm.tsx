"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "./PropertyListingsSearchForm.module.scss";
import { useState } from "react";
import { suggestions } from "@/data/SuggestionsData";
import Modal from "@/components/Modal";
import PropertiesFilters from "./PropertiesFilters";

type FormValues = z.infer<typeof searchFormSchema>;

interface PropertyListingsSearchFormProps {
  searchTerm?: string;
  locationSearch?: string;
  categories: string;
}

export default function PropertyListingsSearchForm({
  searchTerm,
  locationSearch,
  categories,
}: PropertyListingsSearchFormProps) {
  const [isBuyRent, setIsBuyRent] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const {
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchTerm,
      locationSearch,
      categories: "Buy / Rent",
    },
  });

  return (
    <div
      className={`${styles.searchContainer} ${
        isBuyRent ? styles.hideBelowBuyRent : ""
      }`}
    >
      <div
        className={`${styles.buyRentContainer} ${
          isBuyRent ? styles.dropdownOpen : ""
        }`}
      >
        <Select
          isMultiSelect={true}
          useRadioButtons={true}
          className={styles.buyRent}
          options={["Buy", "Rent", "Short-Term Rental"]}
          showSelectAll={false}
          initialValue={`Buy ${"\u00A0".repeat(3)}/${"\u00A0".repeat(3)} Rent`}
          selectSize="large"
          label="Buy or Rent"
          id="buyRent"
          name="buyRent"
          ariaLabel="Buy or Rent Selector"
          autoFocus={false}
          required={false}
          overlayDropdown
          overlayOptionsClass={styles.buyRentOverlay}
          onDropdownOpenChange={(isOpen: any) => {
            setIsBuyRent(isOpen);
          }}
        />
      </div>

      <div className={styles.searchLocationContainer}>
        <div className={`${styles.breadcrumbs} ${styles.searchTermBreadcrumbs}`}>
          <Breadcrumbs
            homeBreadcrumb={{ id: 1, name: "All Categories", href: "#" }}
            firstBreadcrumb={{
              id: 2,
              name: "Electronics & Computers",
              href: "#",
            }}
            searchResult={{ id: 3, name: "Computer", href: "#" }}
          />
        </div>

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
          />
        </div>
      </div>
      <div className={styles.moreFiltersButtonContainer}>
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

      <Modal
        showModal={showFilters}
        setShowModal={setShowFilters}
        modalContent={<PropertiesFilters />}
        contentGreaterThanScreenHeight={true}
      />
      <div className={styles.searchButton}>
        <Button
          buttonChildren="Search"
          className={styles.search}
          buttonType="primary"
          buttonSize="large"
          name="search"
          autoFocus={false}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
}
