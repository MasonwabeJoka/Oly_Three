"use client";
import styles from "./HeroSectionFieldsClient.module.scss";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import Button from "./Button";
import Input from "@/components/Input";
import { suggestions } from "@/data/SuggestionsData";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import { useModalStore } from "@/store/modalStore";
import Link from "next/link";

type FormValues = z.infer<typeof searchFormSchema>;

interface Props {
  searchTerm?: string;
  locationSearch?: string;
}

const HeroSectionFieldsClient = ({ searchTerm, locationSearch }: Props) => {
  const [isSearchTermOpen, setIsSearchTermOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const setShowCategoriesModal = useModalStore(
    (state) => state.setShowCategoriesModal,
  );

  const {
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: { searchTerm, locationSearch },
  });

  // Get pending state from parent <Form>; fallback to isSubmitting if unavailable
  const { pending } = useFormStatus() || { pending: isSubmitting };

  return (
    <div
      className={`${styles.container} ${
        isSearchTermOpen
          ? styles.hideBelowSearchTerm
          : isLocationOpen
            ? styles.hideBelowLocation
            : ""
      }`}
    >
      <Link href="/dashboard/create-listing" className={styles.link}>
        <Button
          children="Create A Listing"
          className={styles.createAListingBtn}
          buttonVariant="danger"
          buttonSize="large"


          ariaLabel="Create A Listing Button"


        />
      </Link>
      <div className={styles.categoriesBtnContainer}>
        <Button
          children="See All Categories"
          className={styles.categoriesBtn}
          buttonVariant="normal"
          buttonSize="large"


          ariaLabel="Categories Button"


          onClick={() => setShowCategoriesModal(true)}
        />
      </div>

   
      

        <div
          className={`${styles.searchTerm} ${
            isSearchTermOpen ? styles.dropdownOpen : ""
          }`}
        >
          <p className={styles.errorMessage}>
            {(errors.searchTerm as any)?.message}
          </p>
          <Controller
            name="searchTerm"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className={styles.searchTermInput}
                isSearchBar={true}
                suggestions={suggestions}
                inputType="text"
                inputSize="large"
                iconSrcRight="/icons/search.png"
                iconPosition="right"
                iconWidth={32}
                iconHeight={32}
                label="Search Term"
                placeholder="What are you looking for?"
                id="searchTerm"
                error={errors.searchTerm?.message}
                ariaLabel="Search Term"
                autoComplete="off"
                required={false}
                overlayDropdown
                overlaySuggestionsClass={styles.searchTermOverlay}
                onDropdownOpenChange={setIsSearchTermOpen}
              />
            )}
          />
        </div>
        <div
          className={`${styles.searchLocation} ${
            isLocationOpen ? styles.dropdownOpen : ""
          }`}
        >
          <p className={styles.errorMessage}>
            {(errors.locationSearch as any)?.message}
          </p>
          <Controller
            name="locationSearch"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
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
                error={errors.locationSearch?.message}
                ariaLabel="Location"
                autoComplete="off"
                required
                overlayDropdown
                overlaySuggestionsClass={styles.searchLocationOverlay}
                onDropdownOpenChange={setIsLocationOpen}
              />
            )}
          />
        </div>
        <div className={styles.searchButton}>
          <Button
            children="Search"
            className={styles.search}
            buttonVariant="normal"
            buttonSize="large"
            type="submit"
            ariaLabel="Search Button"
            isDisabled={pending}
          />
        </div>
      
    </div>
  );
};

export default HeroSectionFieldsClient;
