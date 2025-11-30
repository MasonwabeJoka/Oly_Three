"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/lib/validations/formValidations";
import { z } from "zod";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Buttons";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "./ListingsSearchForm.module.scss";
import Form from "next/form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { suggestions } from "@/data/SuggestionsData";

type FormValues = z.infer<typeof searchFormSchema>;

interface ListingsSearchFormProps {
  searchTerm: string;
  locationSearch: string;
  categories: string;
}

export default function ListingsSearchForm({
  searchTerm,
  locationSearch,
  categories,
}: ListingsSearchFormProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const {
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchTerm,
      locationSearch,
      categories,
    },
  });

  return (
    <div className={styles.searchContainer}>
      <div className={styles.search}>
        <div className={styles.categories}>
          <p className={styles.errorMessage}>{errors.categories?.message}</p>
          <Controller
            name="categories"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  "Domestic Appliances",
                  "Small Appliances",
                  "Oven Hobs & Cookers",
                  "Fridge Freezers",
                  "Washing Machines",
                  "Miscellaneous Appliances",
                  "Health & Beauty Appliances",
                  "Tumble Dryers",
                  "Dishwashers",
                  "Vacuum Cleaners",
                  "Integrated Appliances",
                ]}
                initialValue={categories}
                selectSize="large"
                label="Categories"
                id="categories"
                name="categories"
                ariaLabel="Categories"
                autoFocus={false}
                required={false}
                error={errors.categories?.message}
                onDropdownOpenChange={(isOpen: any) =>
                  setIsCategoriesOpen(isOpen)
                }
              />
            )}
          />
        </div>

        {!isCategoriesOpen && (
          <div className={styles.searchTerm}>
            <p className={styles.errorMessage}>{errors.searchTerm?.message}</p>
            <div
              className={`${styles.breadcrumbs} ${styles.searchTermBreadcrumbs}`}
            >
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
            <div className={styles.searchTermInputContainer}>
              <Controller
                name="searchTerm"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className={styles.searchTermInput}
                    isSearchBar={true}
                    suggestions={suggestions}
                    iconSrcRight="/icons/search.png"
                    iconPosition="right"
                    iconWidth={32}
                    iconHeight={32}
                    inputType="text"
                    inputSize="large"
                    label="Search"
                    placeholder="What are you looking for?"
                    id="searchTerm"
                    error={errors.searchTerm?.message}
                    ariaLabel="Search Term"
                    autoComplete="off"
                    required={false}
                  />
                )}
              />
            </div>
          </div>
        )}
        {!isCategoriesOpen && (
          <div className={styles.location}>
            <p className={styles.errorMessage}>
              {errors.locationSearch?.message}
            </p>
            <div
              className={`${styles.breadcrumbs} ${styles.locationBreadcrumbs}`}
            >
              <Breadcrumbs
                homeBreadcrumb={{ id: 4, name: "South Africa", href: "#" }}
                firstBreadcrumb={{ id: 5, name: "Gauteng", href: "#" }}
                secondBreadcrumb={{ id: 6, name: "Johannesburg", href: "#" }}
                searchResult={{ id: 7, name: "Sandton", href: "#" }}
              />
            </div>
            <div className={styles.locationInputContainer}>
              <Controller
                name="locationSearch"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    className={styles.searchLocationInput}
                    isSearchBar={true}
                    suggestions={suggestions}
                    iconSrcRight="/icons/search.png"
                    iconPosition="right"
                    iconWidth={32}
                    iconHeight={32}
                    inputType="text"
                    inputSize="large"
                    label="Location"
                    placeholder="Search by city, province, town..."
                    id="locationSearch"
                    error={errors.locationSearch?.message}
                    ariaLabel="Location"
                    autoComplete="off"
                    // required
                  />
                )}
              />
            </div>
          </div>
        )}
      </div>

      {!isCategoriesOpen && (
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
      )}
    </div>
  );
}
